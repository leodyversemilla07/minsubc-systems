<?php

namespace Modules\Admission\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Enrollment;

class EnrollmentService
{
    public function __construct(
        private ApplicationService $applicationService,
    ) {}

    public function confirmEnrollment(Applicant $applicant, array $data): Enrollment
    {
        if ($applicant->status !== ApplicantStatus::Accepted) {
            throw new \RuntimeException('Only accepted applicants can be enrolled.');
        }

        return DB::transaction(function () use ($applicant, $data) {
            $user = User::create([
                'first_name' => $applicant->first_name,
                'middle_name' => $applicant->middle_name,
                'last_name' => $applicant->last_name,
                'email' => $applicant->email,
                'password' => Hash::make(Str::random(16)),
            ]);

            $user->assignRole('student');

            $enrollment = Enrollment::create([
                'applicant_id' => $applicant->id,
                'user_id' => $user->id,
                'student_id' => $data['student_id'] ?? null,
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

            if (class_exists(\Modules\Registrar\Models\Student::class)) {
                $program = $applicant->program;
                \Modules\Registrar\Models\Student::create([
                    'user_id' => $user->id,
                    'student_id' => $data['student_id'] ?? $this->generateStudentId(),
                    'phone' => $applicant->phone,
                    'course' => $program?->course?->code ?? $data['course'] ?? '',
                    'year_level' => (int) ($data['year_level'] ?? 1),
                    'campus' => $data['campus'] ?? 'Main',
                    'status' => 'active',
                ]);

                $enrollment->update(['student_id' => $data['student_id']]);
            }

            $this->applicationService->updateStatus(
                $applicant, ApplicantStatus::Enrolled,
                'Enrollment confirmed',
                ['enrollment_id' => $enrollment->id, 'user_id' => $user->id]
            );

            $applicant->update(['user_id' => $user->id]);

            return $enrollment->fresh();
        });
    }

    public function generateStudentId(): string
    {
        $year = now()->year;
        $prefix = "MBC{$year}-";

        $lastStudent = \Modules\Registrar\Models\Student::where('student_id', 'like', "{$prefix}%")
            ->orderBy('student_id', 'desc')
            ->first();

        $sequence = $lastStudent ? intval(substr($lastStudent->student_id, -4)) + 1 : 1;

        return $prefix . str_pad($sequence, 4, '0', STR_PAD_LEFT);
    }

    public function getStats(): array
    {
        return [
            'total_enrolled' => Enrollment::where('status', 'enrolled')->count(),
            'pending_confirmation' => Enrollment::where('status', 'pending')->count(),
        ];
    }
}
