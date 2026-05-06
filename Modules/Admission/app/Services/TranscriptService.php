<?php

namespace Modules\Admission\Services;

use App\Models\User;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentSubject;
use Modules\Admission\Models\Section;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class TranscriptService
{
    /**
     * Generate a student's transcript of records.
     */
    public function generate(User $user, array $options = []): array
    {
        $enrollments = Enrollment::where('user_id', $user->id)
            ->whereIn('status', ['enrolled', 'dropped'])
            ->with(['subjects.subject', 'section.course', 'academicTerm'])
            ->orderBy('academic_year')
            ->orderBy('semester')
            ->get();

        $student = \Modules\Registrar\Models\Student::where('user_id', $user->id)->first();

        $transcriptData = [
            'student' => [
                'id' => $student?->student_id ?? $user->id,
                'name' => $user->full_name,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $student?->phone ?? $user->phone ?? '',
                'course' => $student?->course ?? '',
                'current_year_level' => $student?->year_level ?? 1,
                'enrolled_at' => $enrollments->first()?->enrolled_at?->format('M Y') ?? 'N/A',
                'graduated_at' => $this->checkGraduation($enrollments),
            ],
            'enrollments' => [],
            'summary' => [
                'total_units' => 0,
                'total_grade_points' => 0,
                'gwa' => 0.0,
                'total_subjects' => 0,
                'passed_subjects' => 0,
                'failed_subjects' => 0,
                'incomplete_subjects' => 0,
                'dropped_subjects' => 0,
            ],
            'generated_at' => now()->format('F d, Y H:i:s'),
            'issued_by' => $options['issued_by'] ?? 'Registrar',
            'purpose' => $options['purpose'] ?? 'Official Use',
        ];

        foreach ($enrollments as $enrollment) {
            $enrollmentRecord = [
                'academic_year' => $enrollment->academic_year,
                'semester' => $enrollment->semester,
                'section' => $enrollment->section?->name ?? 'N/A',
                'year_level' => $enrollment->year_level,
                'status' => $enrollment->status,
                'subjects' => [],
                'semester_units' => 0,
                'semester_average' => null,
            ];

            foreach ($enrollment->subjects as $es) {
                $subject = $es->subject;
                $units = $subject?->units ?? 0;

                $enrollmentRecord['subjects'][] = [
                    'code' => $subject?->code ?? 'N/A',
                    'name' => $subject?->name ?? 'Unknown',
                    'units' => $units,
                    'grade' => $es->grade,
                    'grade_display' => $this->formatGrade($es->grade),
                    'grade_points' => $es->grade ? $this->gradeToPoints($es->grade) : null,
                    'status' => $es->status,
                ];

                $enrollmentRecord['semester_units'] += $units;

                // Update summary
                if ($es->status !== 'dropped') {
                    $transcriptData['summary']['total_subjects']++;
                    $transcriptData['summary']['total_units'] += $units;

                    if ($es->status === 'passed' || ($es->grade && $es->grade >= 75)) {
                        $transcriptData['summary']['passed_subjects']++;
                    } elseif ($es->status === 'failed') {
                        $transcriptData['summary']['failed_subjects']++;
                    } elseif ($es->status === 'incomplete') {
                        $transcriptData['summary']['incomplete_subjects']++;
                    }

                    if ($es->grade) {
                        $transcriptData['summary']['total_grade_points'] += $this->gradeToPoints($es->grade) * $units;
                    }
                } else {
                    $transcriptData['summary']['dropped_subjects']++;
                }
            }

            // Calculate semester average
            $subjectsWithGrades = array_filter($enrollmentRecord['subjects'], fn ($s) => $s['grade'] !== null);
            if (!empty($subjectsWithGrades)) {
                $enrollmentRecord['semester_average'] = array_sum(array_column($subjectsWithGrades, 'grade')) / count($subjectsWithGrades);
            }

            $transcriptData['enrollments'][] = $enrollmentRecord;
        }

        // Calculate GWA (General Weighted Average)
        if ($transcriptData['summary']['total_units'] > 0) {
            $transcriptData['summary']['gwa'] = round(
                $transcriptData['summary']['total_grade_points'] / $transcriptData['summary']['total_units'],
                4
            );
        }

        $transcriptData['summary']['gwa_display'] = $this->formatGWA($transcriptData['summary']['gwa']);

        return $transcriptData;
    }

    /**
     * Generate PDF transcript.
     */
    public function generatePDF(User $user, array $options = []): string
    {
        $data = $this->generate($user, $options);
        
        $pdf = Pdf::loadView('admission::pdf.transcript', $data);
        $pdf->setPaper('A4', 'portrait');

        if (isset($options['save']) && $options['save']) {
            $filename = "transcripts/{$data['student']['id']}_" . date('Ymd_His') . ".pdf";
            Storage::put($filename, $pdf->output());
            return $filename;
        }

        return $pdf->output();
    }

    /**
     * Generate temporary transcript view for browser.
     */
    public function generateView(User $user, array $options = []): \Illuminate\View\View
    {
        $data = $this->generate($user, $options);
        
        return view('admission::pdf.transcript', $data);
    }

    /**
     * Format grade for display.
     */
    protected function formatGrade(?float $grade): string
    {
        if ($grade === null) {
            return 'INC';
        }

        if ($grade >= 75) {
            return number_format($grade, 0);
        }

        return number_format($grade, 0);
    }

    /**
     * Convert grade to grade points.
     */
    protected function gradeToPoints(float $grade): float
    {
        // Philippine grading scale (4.0 scale)
        if ($grade >= 98) return 4.0;
        if ($grade >= 95) return 3.9;
        if ($grade >= 92) return 3.7;
        if ($grade >= 89) return 3.5;
        if ($grade >= 86) return 3.2;
        if ($grade >= 83) return 3.0;
        if ($grade >= 80) return 2.7;
        if ($grade >= 77) return 2.5;
        if ($grade >= 75) return 2.3;
        return 0.0;
    }

    /**
     * Format GWA for display.
     */
    protected function formatGWA(float $gwa): string
    {
        return number_format($gwa, 2);
    }

    /**
     * Check if student has graduated.
     */
    protected function checkGraduation($enrollments): ?string
    {
        // Check if all required subjects are passed
        // For now, just check if they have 4+ years of enrollment
        $years = $enrollments->pluck('academic_year')->unique()->count();
        
        if ($years >= 4) {
            return $enrollments->last()?->enrolled_at?->format('M Y');
        }

        return null;
    }

    /**
     * Get academic honors based on GWA.
     */
    public function getAcademicHonors(float $gwa): ?string
    {
        if ($gwa >= 1.2) return 'Summa Cum Laude';
        if ($gwa >= 1.45) return 'Magna Cum Laude';
        if ($gwa >= 1.75) return 'Cum Laude';
        if ($gwa >= 2.0) return 'With Honors';
        return null;
    }

    /**
     * Generate enrollment certificate.
     */
    public function generateEnrollmentCertificate(Enrollment $enrollment): array
    {
        $user = $enrollment->user;
        
        return [
            'student' => [
                'id' => $enrollment->student_id ?? 'N/A',
                'name' => $enrollment->full_name,
                'course' => $enrollment->program ?? 'N/A',
            ],
            'enrollment' => [
                'academic_year' => $enrollment->academic_year,
                'semester' => $enrollment->semester,
                'year_level' => $enrollment->year_level,
                'section' => $enrollment->section?->name ?? 'N/A',
                'enrolled_at' => $enrollment->enrolled_at?->format('F d, Y'),
            ],
            'subjects' => $enrollment->subjects->map(fn ($es) => [
                'code' => $es->subject?->code,
                'name' => $es->subject?->name,
                'units' => $es->subject?->units,
            ])->toArray(),
            'total_units' => $enrollment->subjects->sum(fn ($es) => $es->subject?->units ?? 0),
            'issued_at' => now()->format('F d, Y H:i:s'),
        ];
    }

    /**
     * Generate True Copy of Grades (TCOG).
     */
    public function generateTrueCopyOfGrades(User $user): array
    {
        return $this->generate($user, [
            'purpose' => 'True Copy of Grades (TCOG)',
            'issued_by' => 'University Registrar',
        ]);
    }

    /**
     * Verify transcript authenticity.
     */
    public function verify(string $studentId): array
    {
        $student = \Modules\Registrar\Models\Student::where('student_id', $studentId)->first();

        if (!$student) {
            return [
                'verified' => false,
                'message' => 'Student not found',
            ];
        }

        $enrollments = Enrollment::where('user_id', $student->user_id)
            ->where('status', 'enrolled')
            ->count();

        return [
            'verified' => true,
            'student_id' => $studentId,
            'name' => $student->user->full_name ?? 'N/A',
            'total_semesters' => $enrollments,
            'last_updated' => Enrollment::where('user_id', $student->user_id)
                ->latest('updated_at')
                ->value('updated_at'),
            'message' => 'Transcript verification successful',
        ];
    }
}