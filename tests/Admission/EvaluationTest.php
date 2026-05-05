<?php

use App\Models\User;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Course;
use Modules\Admission\Services\EvaluationService;
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
    ]);

    $this->admin = User::factory()->create();
    $this->admin->assignRole('admission-admin');
    $this->actingAs($this->admin);
});

it('can evaluate and accept an applicant', function () {
    $applicant = Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Submitted,
    ]);

    $service = app(EvaluationService::class);
    $evaluation = $service->evaluate($applicant, [
        'decision' => 'accepted',
        'notes' => 'Qualified applicant',
        'score' => 88.5,
    ]);

    expect($evaluation->decision)->toBe('accepted');
    expect((float) $evaluation->score)->toBe(88.5);
    expect($applicant->fresh()->status)->toBe(ApplicantStatus::Accepted);
});

it('can evaluate and reject an applicant', function () {
    $applicant = Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::UnderReview,
    ]);

    $service = app(EvaluationService::class);
    $evaluation = $service->evaluate($applicant, [
        'decision' => 'rejected',
        'notes' => 'Incomplete requirements',
    ]);

    expect($evaluation->decision)->toBe('rejected');
    expect($applicant->fresh()->status)->toBe(ApplicantStatus::Rejected);
});

it('can evaluate and waitlist an applicant', function () {
    $applicant = Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Submitted,
    ]);

    $service = app(EvaluationService::class);
    $service->evaluate($applicant, ['decision' => 'waitlisted']);

    expect($applicant->fresh()->status)->toBe(ApplicantStatus::Waitlisted);
});

it('returns correct evaluation stats', function () {
    Applicant::factory()->count(3)->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Submitted,
    ]);
    Applicant::factory()->count(2)->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Accepted,
    ]);
    Applicant::factory()->create([
        'program_id' => $this->program->id,
        'status' => ApplicantStatus::Rejected,
    ]);

    $service = app(EvaluationService::class);
    $stats = $service->getStats();

    expect($stats['pending_review'])->toBe(3);
    expect($stats['accepted'])->toBe(2);
    expect($stats['rejected'])->toBe(1);
});