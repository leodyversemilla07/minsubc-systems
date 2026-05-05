<?php

use App\Models\User;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Course;
use Modules\Admission\Services\EnrollmentService;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->artisan('migrate:fresh');
    $this->artisan('db:seed', ['--class' => 'Modules\Admission\Database\Seeders\AdmissionPermissionsSeeder']);
    Role::firstOrCreate(['name' => 'student']);

    $this->course = Course::factory()->create(['code' => 'BSIT']);
    $this->program = AdmissionProgram::factory()->create([
        'course_id' => $this->course->id,
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'status' => 'open',
    ]);

    $this->admin = User::factory()->create();
    $this->admin->assignRole('admission-admin');
    $this->actingAs($this->admin);
});

it('can confirm enrollment for an accepted applicant', function () {
    $applicant = Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Accepted,
        'first_name' => 'Enrolled',
        'last_name' => 'Student',
        'email' => 'enrolled@example.com',
        'phone' => '09170000001',
    ]);

    $service = app(EnrollmentService::class);
    $enrollment = $service->confirmEnrollment($applicant, [
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'year_level' => '1',
        'campus' => 'Main',
    ]);

    expect($enrollment->status)->toBe('enrolled');
    expect($applicant->fresh()->status)->toBe(ApplicantStatus::Enrolled);
    expect($enrollment->user_id)->not->toBeNull();
});

it('creates a user account on enrollment', function () {
    $applicant = Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Accepted,
        'first_name' => 'New',
        'last_name' => 'User',
        'email' => 'newuser@example.com',
        'phone' => '09170000002',
    ]);

    $service = app(EnrollmentService::class);
    $enrollment = $service->confirmEnrollment($applicant, [
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'year_level' => '1',
        'campus' => 'Main',
    ]);

    $user = User::find($enrollment->user_id);
    expect($user)->not->toBeNull();
    expect($user->email)->toBe('newuser@example.com');
    expect($user->hasRole('student'))->toBeTrue();
});

it('throws exception when enrolling non-accepted applicant', function () {
    $applicant = Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Submitted,
    ]);

    $service = app(EnrollmentService::class);

    expect(fn () => $service->confirmEnrollment($applicant, [
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'year_level' => '1',
    ]))->toThrow(\RuntimeException::class, 'Only accepted applicants can be enrolled.');
});