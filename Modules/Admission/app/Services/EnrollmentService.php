<?php

namespace Modules\Admission\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentFee;
use Modules\Admission\Models\EnrollmentPayment;
use Modules\Admission\Models\EnrollmentSubject;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;

class EnrollmentService
{
    public function __construct(
        private ApplicationService $applicationService,
    ) {}

    /**
     * Confirm enrollment for an accepted applicant
     */
    public function confirmEnrollment(Applicant $applicant, array $data): Enrollment
    {
        if ($applicant->status !== ApplicantStatus::Accepted) {
            throw new \RuntimeException('Only accepted applicants can be enrolled.');
        }

        return DB::transaction(function () use ($applicant, $data) {
            // Create user account if not exists
            $user = $this->createUserFromApplicant($applicant);

            // Generate or use provided student ID
            $studentId = $data['student_id'] ?? $this->generateStudentId($data['academic_year'] ?? null);

            // Create enrollment record
            $enrollment = Enrollment::create([
                'applicant_id' => $applicant->id,
                'user_id' => $user->id,
                'student_id' => $studentId,
                'academic_term_id' => $data['academic_term_id'] ?? null,
                'section_id' => $data['section_id'] ?? null,
                'status' => 'enrolled',
                'academic_year' => $data['academic_year'],
                'semester' => $data['semester'],
                'year_level' => $data['year_level'] ?? '1',
                'enrollment_data' => $data['enrollment_data'] ?? null,
                'confirmed_at' => now(),
                'enrolled_at' => now(),
                'confirmed_by' => auth()->id(),
                'notes' => $data['notes'] ?? null,
            ]);

            // Create student record in Registrar module
            $this->createStudentRecord($user, $enrollment, $data);

            // Update applicant status
            $this->applicationService->updateStatus(
                $applicant,
                ApplicantStatus::Enrolled,
                'Enrollment confirmed',
                ['enrollment_id' => $enrollment->id, 'student_id' => $studentId]
            );

            $applicant->update(['user_id' => $user->id]);

            return $enrollment->fresh([
                'applicant.program.course',
                'user',
                'section',
                'academicTerm',
            ]);
        });
    }

    /**
     * Create a user account from applicant data
     */
    protected function createUserFromApplicant(Applicant $applicant): User
    {
        if ($applicant->user_id && $applicant->user) {
            return $applicant->user;
        }

        $password = Str::random(12);

        $user = User::create([
            'first_name' => $applicant->first_name,
            'middle_name' => $applicant->middle_name,
            'last_name' => $applicant->last_name,
            'email' => $applicant->email,
            'password' => Hash::make($password),
        ]);

        $user->assignRole('student');

        // TODO: Send email notification with login credentials

        return $user;
    }

    /**
     * Create student record in Registrar module
     */
    protected function createStudentRecord(User $user, Enrollment $enrollment, array $data): void
    {
        if (!class_exists(\Modules\Registrar\Models\Student::class)) {
            return;
        }

        $program = $enrollment->applicant?->program;

        \Modules\Registrar\Models\Student::updateOrCreate(
            ['user_id' => $user->id],
            [
                'student_id' => $enrollment->student_id,
                'phone' => $enrollment->applicant?->phone ?? $data['phone'] ?? null,
                'course' => $program?->course?->code ?? $data['course'] ?? '',
                'year_level' => (int) ($data['year_level'] ?? 1),
                'campus' => $data['campus'] ?? 'Bongabong',
                'status' => 'active',
            ]
        );
    }

    /**
     * Generate a unique student ID
     */
    public function generateStudentId(?string $academicYear = null): string
    {
        $year = $academicYear ? substr($academicYear, 0, 4) : date('Y');
        $prefix = "MSU{$year}-";

        $lastStudent = \Modules\Registrar\Models\Student::where('student_id', 'like', "{$prefix}%")
            ->orderBy('student_id', 'desc')
            ->first();

        $sequence = $lastStudent ? (int) substr($lastStudent->student_id, -4) + 1 : 1;

        return $prefix . str_pad($sequence, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Re-enroll an existing student for a new semester
     */
    public function reEnroll(Enrollment $previousEnrollment, array $data): Enrollment
    {
        return DB::transaction(function () use ($previousEnrollment, $data) {
            $user = $previousEnrollment->user;

            // Calculate new year level
            $previousYearLevel = (int) $previousEnrollment->year_level;
            $newYearLevel = $data['year_level'] ?? ($previousYearLevel + 1);

            // Create new enrollment
            $enrollment = Enrollment::create([
                'applicant_id' => $previousEnrollment->applicant_id,
                'user_id' => $user->id,
                'student_id' => $previousEnrollment->student_id,
                'academic_term_id' => $data['academic_term_id'] ?? null,
                'section_id' => $data['section_id'] ?? null,
                'status' => 'confirmed',
                'academic_year' => $data['academic_year'],
                'semester' => $data['semester'],
                'year_level' => (string) $newYearLevel,
                'enrollment_data' => [
                    'previous_enrollment_id' => $previousEnrollment->id,
                    'promotion_type' => 'regular',
                ],
                'confirmed_at' => now(),
                'confirmed_by' => auth()->id(),
                'notes' => $data['notes'] ?? "Re-enrolled from AY {$previousEnrollment->academic_year}",
            ]);

            // Update student record year level
            $this->updateStudentYearLevel($user, $newYearLevel);

            return $enrollment->fresh(['user', 'section', 'academicTerm']);
        });
    }

    /**
     * Update student's year level in Registrar module
     */
    protected function updateStudentYearLevel(User $user, int $yearLevel): void
    {
        if (!class_exists(\Modules\Registrar\Models\Student::class)) {
            return;
        }

        \Modules\Registrar\Models\Student::where('user_id', $user->id)
            ->update(['year_level' => $yearLevel]);
    }

    /**
     * Assign subjects to an enrollment
     */
    public function assignSubjects(Enrollment $enrollment, array $subjectIds, ?int $sectionId = null): void
    {
        foreach ($subjectIds as $subjectId) {
            $subject = Subject::find($subjectId);

            if (!$subject) {
                continue;
            }

            EnrollmentSubject::updateOrCreate(
                [
                    'enrollment_id' => $enrollment->id,
                    'subject_id' => $subjectId,
                ],
                [
                    'section_id' => $sectionId,
                    'status' => 'enrolled',
                ]
            );
        }
    }

    /**
     * Drop a subject from enrollment
     */
    public function dropSubject(Enrollment $enrollment, int $subjectId, ?string $reason = null): void
    {
        $enrollmentSubject = EnrollmentSubject::where('enrollment_id', $enrollment->id)
            ->where('subject_id', $subjectId)
            ->first();

        if ($enrollmentSubject) {
            $enrollmentSubject->update([
                'status' => 'dropped',
                'remarks' => $reason,
            ]);
        }
    }

    /**
     * Calculate total fees for an enrollment
     */
    public function calculateFees(Enrollment $enrollment): array
    {
        $totalUnits = $enrollment->subjects->sum(function ($es) {
            return $es->subject?->units ?? 0;
        });

        $fees = EnrollmentFee::where('academic_term_id', $enrollment->academic_term_id)
            ->active()
            ->orderBy('priority')
            ->get()
            ->map(function ($fee) use ($totalUnits, $enrollment) {
                $calculatedAmount = $fee->calculateAmount($totalUnits, $enrollment->subjects->count());

                return [
                    'id' => $fee->id,
                    'name' => $fee->name,
                    'type' => $fee->type,
                    'amount' => $calculatedAmount,
                    'unit' => $fee->unit,
                    'is_required' => $fee->is_required,
                ];
            })
            ->toArray();

        $totalAmount = array_sum(array_column($fees, 'amount'));
        $totalPaid = $enrollment->payments()->where('status', 'verified')->sum('amount');

        return [
            'fees' => $fees,
            'total_units' => $totalUnits,
            'total_amount' => $totalAmount,
            'total_paid' => $totalPaid,
            'balance' => max(0, $totalAmount - $totalPaid),
        ];
    }

    /**
     * Record a payment for enrollment
     */
    public function recordPayment(Enrollment $enrollment, array $paymentData): EnrollmentPayment
    {
        $payment = EnrollmentPayment::create([
            'enrollment_id' => $enrollment->id,
            'type' => $paymentData['type'] ?? 'full',
            'amount' => $paymentData['amount'],
            'method' => $paymentData['method'] ?? 'cash',
            'reference_number' => $paymentData['reference_number'] ?? null,
            'status' => 'pending',
            'paid_at' => now(),
            'notes' => $paymentData['notes'] ?? null,
        ]);

        return $payment;
    }

    /**
     * Verify a payment
     */
    public function verifyPayment(EnrollmentPayment $payment, User $verifier): void
    {
        $payment->approve($verifier);
    }

    /**
     * Reject a payment
     */
    public function rejectPayment(EnrollmentPayment $payment, User $verifier, ?string $reason = null): void
    {
        $payment->reject($verifier, $reason);
    }

    /**
     * Get enrollment statistics
     */
    public function getStats(?int $academicTermId = null): array
    {
        $query = Enrollment::query();

        if ($academicTermId) {
            $query->where('academic_term_id', $academicTermId);
        }

        return [
            'total_enrolled' => (clone $query)->where('status', 'enrolled')->count(),
            'pending_confirmation' => (clone $query)->where('status', 'pending')->count(),
            'confirmed' => (clone $query)->where('status', 'confirmed')->count(),
            'dropped' => (clone $query)->where('status', 'dropped')->count(),
            'by_year_level' => (clone $query)
                ->where('status', 'enrolled')
                ->selectRaw('year_level, count(*) as count')
                ->groupBy('year_level')
                ->pluck('count', 'year_level')
                ->toArray(),
        ];
    }

    /**
     * Get enrollment reports
     */
    public function getReports(?int $academicTermId = null, ?string $academicYear = null): array
    {
        $query = Enrollment::query();

        if ($academicTermId) {
            $query->where('academic_term_id', $academicTermId);
        } elseif ($academicYear) {
            $query->where('academic_year', $academicYear);
        }

        $enrollments = $query->with(['applicant.program.course', 'section'])->get();

        return [
            'total_enrollments' => $enrollments->count(),
            'by_status' => $enrollments->groupBy('status')->map->count(),
            'by_semester' => $enrollments->groupBy('semester')->map->count(),
            'by_year_level' => $enrollments->groupBy('year_level')->map->count(),
            'by_program' => $enrollments
                ->groupBy(fn ($e) => $e->applicant?->program?->course?->name ?? 'Unknown')
                ->map->count(),
            'total_payments' => $enrollments->flatMap->payments->where('status', 'verified')->sum('amount'),
            'average_load' => $enrollments->avg(fn ($e) => $e->subjects->count()),
        ];
    }

    /**
     * Assign a section to an enrollment
     */
    public function assignSection(Enrollment $enrollment, int $sectionId): void
    {
        $section = Section::findOrFail($sectionId);

        if ($section->is_full) {
            throw new \RuntimeException('Section is already full.');
        }

        DB::transaction(function () use ($enrollment, $section) {
            $enrollment->update([
                'section_id' => $section->id,
                'year_level' => $section->year_level,
            ]);

            $section->increment('current_students');

            if ($section->current_students >= $section->max_students) {
                $section->update(['status' => 'full']);
            }
        });
    }
}