<?php

namespace Modules\Admission\Services;

use Illuminate\Support\Collection;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentSubject;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;
use PhpOffice\PhpSpreadsheet\Reader\Csv;

class GradeService
{
    /**
     * Determine grade status based on numeric grade.
     */
    public function determineStatus(?float $grade): string
    {
        if ($grade === null) {
            return 'enrolled';
        }

        if ($grade >= 75) {
            return 'passed';
        }

        return 'failed';
    }

    /**
     * Calculate GPA for an enrollment.
     */
    public function calculateGPA(Enrollment $enrollment): float
    {
        $subjects = $enrollment->subjects()
            ->whereNotNull('grade')
            ->with('subject')
            ->get();

        if ($subjects->isEmpty()) {
            return 0.0;
        }

        $totalPoints = 0;
        $totalUnits = 0;

        foreach ($subjects as $subject) {
            $units = $subject->subject?->units ?? 3;
            $grade = $subject->grade;

            // Convert grade to grade points (4.0 scale)
            $points = $this->gradeToPoints($grade);

            $totalPoints += $points * $units;
            $totalUnits += $units;
        }

        return $totalUnits > 0 ? $totalPoints / $totalUnits : 0.0;
    }

    /**
     * Convert numeric grade to grade points.
     */
    public function gradeToPoints(?float $grade): ?float
    {
        if ($grade === null) return null;
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
     * Get academic standing based on GPA.
     */
    public function getAcademicStanding(float $gpa): string
    {
        if ($gpa >= 3.5) return "Dean's Lister";
        if ($gpa >= 3.0) return 'Honors';
        if ($gpa >= 2.5) return 'Good';
        if ($gpa >= 2.0) return 'Satisfactory';
        if ($gpa >= 1.5) return 'Warning';
        return 'Academic Probation';
    }

    /**
     * Get grade statistics.
     */
    public function getStatistics(?int $sectionId = null, ?string $academicYear = null): array
    {
        $query = Enrollment::whereIn('status', ['confirmed', 'enrolled']);

        if ($sectionId) {
            $query->where('section_id', $sectionId);
        }

        if ($academicYear) {
            $query->where('academic_year', $academicYear);
        }

        $enrollments = $query->with('subjects')->get();

        $totalStudents = $enrollments->count();
        
        $grades = $enrollments->flatMap->subjects->filter(fn ($s) => $s->grade !== null);
        
        $passedCount = $grades->filter(fn ($s) => $s->grade >= 75)->count();
        $failedCount = $grades->filter(fn ($s) => $s->grade && $s->grade < 75)->count();

        $averageGrade = $grades->count() > 0 ? $grades->avg('grade') : 0;

        return [
            'total_students' => $totalStudents,
            'total_grades' => $grades->count(),
            'passed' => $passedCount,
            'failed' => $failedCount,
            'average_grade' => round($averageGrade, 2),
            'pass_rate' => $grades->count() > 0 ? round(($passedCount / $grades->count()) * 100, 1) : 0,
            'gpas' => $enrollments->map(fn ($e) => [
                'student_id' => $e->student_id,
                'name' => $e->full_name,
                'gpa' => round($this->calculateGPA($e), 2),
            ])->sortByDesc('gpa')->values()->toArray(),
        ];
    }

    /**
     * Bulk upload grades from CSV.
     */
    public function bulkUpload($file, Section $section): array
    {
        $reader = new Csv();
        $reader->setInputEncoding('UTF-8');
        $spreadsheet = $reader->load($file->getPathname());
        $worksheet = $spreadsheet->getActiveSheet();
        
        $rows = $worksheet->toArray();
        $imported = 0;
        $errors = 0;
        $errorMessages = [];

        // Skip header row
        array_shift($rows);

        foreach ($rows as $rowIndex => $row) {
            try {
                if (count($row) < 4) {
                    $errors++;
                    $errorMessages[] = "Row " . ($rowIndex + 2) . ": Insufficient columns";
                    continue;
                }

                $studentId = trim($row[0]);
                $subjectCode = trim($row[1]);
                $grade = is_numeric($row[2]) ? (float) $row[2] : null;
                $remarks = isset($row[3]) ? trim($row[3]) : null;

                // Find enrollment by student ID
                $enrollment = Enrollment::where('student_id', $studentId)
                    ->where('section_id', $section->id)
                    ->whereIn('status', ['confirmed', 'enrolled'])
                    ->first();

                if (!$enrollment) {
                    $errors++;
                    $errorMessages[] = "Row " . ($rowIndex + 2) . ": Student ID {$studentId} not found in section";
                    continue;
                }

                // Find subject by code
                $subject = Subject::where('code', $subjectCode)
                    ->where('course_id', $section->course_id)
                    ->first();

                if (!$subject) {
                    $errors++;
                    $errorMessages[] = "Row " . ($rowIndex + 2) . ": Subject {$subjectCode} not found";
                    continue;
                }

                // Update or create grade
                $status = $this->determineStatus($grade);

                EnrollmentSubject::updateOrCreate(
                    [
                        'enrollment_id' => $enrollment->id,
                        'subject_id' => $subject->id,
                    ],
                    [
                        'grade' => $grade,
                        'status' => $status,
                        'remarks' => $remarks,
                    ]
                );

                $imported++;
            } catch (\Exception $e) {
                $errors++;
                $errorMessages[] = "Row " . ($rowIndex + 2) . ": " . $e->getMessage();
            }
        }

        return [
            'imported' => $imported,
            'errors' => $errors,
            'messages' => $errorMessages,
        ];
    }

    /**
     * Export grades to CSV format.
     */
    public function exportGrades(?int $sectionId = null, ?string $academicYear = null, ?string $semester = null): string
    {
        $query = Enrollment::whereIn('status', ['confirmed', 'enrolled'])
            ->with(['subjects.subject', 'user', 'section']);

        if ($sectionId) {
            $query->where('section_id', $sectionId);
        }

        if ($academicYear) {
            $query->where('academic_year', $academicYear);
        }

        if ($semester) {
            $query->where('semester', $semester);
        }

        $enrollments = $query->get();

        $csv = "Student ID,Name,Subject Code,Subject Name,Units,Grade,Status,Remarks\n";

        foreach ($enrollments as $enrollment) {
            foreach ($enrollment->subjects as $es) {
                $csv .= sprintf(
                    "%s,%s,%s,%s,%d,%s,%s,%s\n",
                    $enrollment->student_id ?? '',
                    str_replace(',', ';', $enrollment->full_name),
                    $es->subject?->code ?? '',
                    str_replace(',', ';', $es->subject?->name ?? ''),
                    $es->subject?->units ?? 0,
                    $es->grade ?? '',
                    $es->status,
                    str_replace(',', ';', $es->remarks ?? '')
                );
            }
        }

        return $csv;
    }

    /**
     * Calculate semester average for an enrollment.
     */
    public function calculateSemesterAverage(Enrollment $enrollment): ?float
    {
        $grades = $enrollment->subjects()
            ->whereNotNull('grade')
            ->get();

        if ($grades->isEmpty()) {
            return null;
        }

        return $grades->avg('grade');
    }

    /**
     * Get grade distribution statistics.
     */
    public function getGradeDistribution(array $grades): array
    {
        $distribution = [
            '95-100' => 0,
            '90-94' => 0,
            '85-89' => 0,
            '80-84' => 0,
            '75-79' => 0,
            '70-74' => 0,
            '65-69' => 0,
            '60-64' => 0,
            '55-59' => 0,
            '50-54' => 0,
            'Below 50' => 0,
        ];

        foreach ($grades as $grade) {
            $g = (float) $grade;
            if ($g >= 95) $distribution['95-100']++;
            elseif ($g >= 90) $distribution['90-94']++;
            elseif ($g >= 85) $distribution['85-89']++;
            elseif ($g >= 80) $distribution['80-84']++;
            elseif ($g >= 75) $distribution['75-79']++;
            elseif ($g >= 70) $distribution['70-74']++;
            elseif ($g >= 65) $distribution['65-69']++;
            elseif ($g >= 60) $distribution['60-64']++;
            elseif ($g >= 55) $distribution['55-59']++;
            elseif ($g >= 50) $distribution['50-54']++;
            else $distribution['Below 50']++;
        }

        return $distribution;
    }
}