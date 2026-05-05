<?php

use App\Models\User;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Course;
use Modules\Admission\Services\ApplicationService;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->artisan('migrate:fresh');
    $this->artisan('db:seed', ['--class' => 'Modules\Admission\Database\Seeders\AdmissionPermissionsSeeder']);

    $this->course = Course::factory()->create(['code' => 'BSIT']);
    $this->program = AdmissionProgram::factory()->create([
        'course_id' => $this->course->id,
        'academic_year' => '2025-2026',
        'semester' => '1st',
        'status' => 'open',
        'application_start' => now()->subMonth(),
        'application_end' => now()->addMonth(),
        'slots' => 50,
    ]);
});

it('can generate a unique application number', function () {
    $service = app(ApplicationService::class);
    $number1 = $service->generateApplicationNumber();
    expect($number1)->toMatch('/^ADM\d{4}-\d{5}$/');

    // Create an applicant to test sequence increment
    $applicant1 = $service->createApplication([
        'program_id' => $this->program->id,
        'first_name' => 'First',
        'last_name' => 'Applicant',
        'email' => 'first@example.com',
        'phone' => '09170000001',
        'date_of_birth' => '2000-01-01',
    ]);

    $number2 = $service->generateApplicationNumber();
    expect($number2)->toMatch('/^ADM\d{4}-\d{5}$/');
    expect($number2)->toEndWith('00002');
});

it('can create a draft application', function () {
    $service = app(ApplicationService::class);
    $applicant = $service->createApplication([
        'program_id' => $this->program->id,
        'first_name' => 'Juan',
        'last_name' => 'Dela Cruz',
        'email' => 'juan@example.com',
        'phone' => '09171234567',
        'date_of_birth' => '2000-01-15',
    ]);

    expect($applicant)->toBeInstanceOf(Applicant::class);
    expect($applicant->status)->toBe(ApplicantStatus::Draft);
    expect($applicant->application_number)->toMatch('/^ADM\d{4}-\d{5}$/');
});

it('can submit a draft application', function () {
    $service = app(ApplicationService::class);
    $applicant = $service->createApplication([
        'program_id' => $this->program->id,
        'first_name' => 'Maria',
        'last_name' => 'Santos',
        'email' => 'maria@example.com',
        'phone' => '09179876543',
        'date_of_birth' => '2001-05-20',
    ]);

    $submitted = $service->submitApplication($applicant);

    expect($submitted->status)->toBe(ApplicantStatus::Submitted);
    expect($submitted->submitted_at)->not->toBeNull();
});

it('cannot submit an already submitted application', function () {
    $service = app(ApplicationService::class);
    $applicant = $service->createApplication([
        'program_id' => $this->program->id,
        'first_name' => 'Pedro',
        'last_name' => 'Gonzales',
        'email' => 'pedro@example.com',
        'phone' => '09171234568',
        'date_of_birth' => '1999-11-10',
    ]);

    $service->submitApplication($applicant);

    expect(fn () => $service->submitApplication($applicant))
        ->toThrow(\RuntimeException::class, 'Only draft applications can be submitted.');
});

it('can update applicant status', function () {
    $service = app(ApplicationService::class);
    $applicant = Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Submitted,
    ]);

    $updated = $service->updateStatus($applicant, ApplicantStatus::UnderReview);
    expect($updated->status)->toBe(ApplicantStatus::UnderReview);
});

it('generates audit logs on status change', function () {
    $service = app(ApplicationService::class);
    $applicant = Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Submitted,
    ]);

    $service->updateStatus($applicant, ApplicantStatus::Accepted);

    expect($applicant->auditLogs()->count())->toBe(1);
    expect($applicant->auditLogs()->first()->action)->toBe('status_changed');
});