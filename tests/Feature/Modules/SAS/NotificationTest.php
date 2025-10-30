<?php

use App\Models\User;
use App\Modules\SAS\Models\Insurance;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Modules\SAS\Models\ScholarshipRequirement;
use App\Modules\SAS\Notifications\InsuranceApproved;
use App\Modules\SAS\Notifications\InsuranceExpirationWarning;
use App\Modules\SAS\Notifications\InsuranceRejected;
use App\Modules\SAS\Notifications\InsuranceSubmitted;
use App\Modules\SAS\Notifications\RequirementDeadlineReminder;
use App\Modules\SAS\Notifications\ScholarshipAssigned;
use App\Modules\SAS\Notifications\ScholarshipRenewalReminder;
use App\Modules\SAS\Notifications\ScholarshipStatusChanged;
use App\Modules\SAS\Services\NotificationService;
use Illuminate\Support\Facades\Notification;

beforeEach(function () {
    $this->notificationService = app(NotificationService::class);
});

it('sends scholarship assignment notification', function () {
    Notification::fake();

    $user = User::factory()->create();
    $scholarship = Scholarship::factory()->create();
    $recipient = ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'student_id' => $user->id,
    ]);

    $this->notificationService->notifyScholarshipAssigned($recipient);

    Notification::assertSentTo($user, ScholarshipAssigned::class);
});

it('sends requirement deadline reminder', function () {
    Notification::fake();

    $user = User::factory()->create();
    $scholarship = Scholarship::factory()->create();
    $recipient = ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'student_id' => $user->id,
    ]);
    $requirement = ScholarshipRequirement::factory()->create([
        'recipient_id' => $recipient->id,
        'deadline' => now()->addDays(5),
        'status' => 'Pending',
    ]);

    $this->notificationService->notifyRequirementDeadline($requirement);

    Notification::assertSentTo($user, RequirementDeadlineReminder::class);
});

it('sends scholarship status change notification', function () {
    Notification::fake();

    $user = User::factory()->create();
    $scholarship = Scholarship::factory()->create();
    $recipient = ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'student_id' => $user->id,
        'status' => 'Active',
    ]);

    $this->notificationService->notifyScholarshipStatusChange($recipient, 'Active', 'Suspended');

    Notification::assertSentTo($user, ScholarshipStatusChanged::class, function ($notification) {
        return $notification->oldStatus === 'Active' && $notification->newStatus === 'Suspended';
    });
});

it('sends insurance submission confirmation', function () {
    Notification::fake();

    $user = User::factory()->create();
    $insurance = Insurance::create([
        'student_id' => $user->id,
        'policy_number' => 'POL-'.rand(1000, 9999),
        'insurance_provider' => 'Test Insurance Co.',
        'coverage_type' => 'Health',
        'coverage_start_date' => now(),
        'coverage_end_date' => now()->addYear(),
        'status' => 'Pending',
        'document_path' => 'test/path.pdf',
    ]);

    $this->notificationService->notifyInsuranceSubmitted($insurance);

    Notification::assertSentTo($user, InsuranceSubmitted::class);
});

it('sends insurance approval notification', function () {
    Notification::fake();

    $user = User::factory()->create();
    $insurance = Insurance::create([
        'student_id' => $user->id,
        'policy_number' => 'POL-'.rand(1000, 9999),
        'insurance_provider' => 'Test Insurance Co.',
        'coverage_type' => 'Health',
        'coverage_start_date' => now(),
        'coverage_end_date' => now()->addYear(),
        'status' => 'Approved',
        'document_path' => 'test/path.pdf',
    ]);

    $this->notificationService->notifyInsuranceApproved($insurance);

    Notification::assertSentTo($user, InsuranceApproved::class);
});

it('sends insurance rejection notification with reason', function () {
    Notification::fake();

    $user = User::factory()->create();
    $insurance = Insurance::create([
        'student_id' => $user->id,
        'policy_number' => 'POL-'.rand(1000, 9999),
        'insurance_provider' => 'Test Insurance Co.',
        'coverage_type' => 'Health',
        'coverage_start_date' => now(),
        'coverage_end_date' => now()->addYear(),
        'status' => 'Rejected',
        'review_notes' => 'Incomplete documentation',
        'document_path' => 'test/path.pdf',
    ]);

    $this->notificationService->notifyInsuranceRejected($insurance);

    Notification::assertSentTo($user, InsuranceRejected::class, function ($notification) use ($insurance) {
        return $notification->insurance->id === $insurance->id;
    });
});

it('sends insurance expiration warnings', function () {
    Notification::fake();

    $user = User::factory()->create();

    // Create insurance expiring in 25 days (should get 30-day warning)
    Insurance::create([
        'student_id' => $user->id,
        'policy_number' => 'POL-'.rand(1000, 9999),
        'insurance_provider' => 'Test Insurance Co.',
        'coverage_type' => 'Health',
        'coverage_start_date' => now(),
        'coverage_end_date' => now()->addDays(25),
        'status' => 'Approved',
        'document_path' => 'test/path.pdf',
    ]);

    // Create insurance expiring in 5 days (should get 7-day warning)
    Insurance::create([
        'student_id' => $user->id,
        'policy_number' => 'POL-'.rand(1000, 9999),
        'insurance_provider' => 'Test Insurance Co.',
        'coverage_type' => 'Health',
        'coverage_start_date' => now(),
        'coverage_end_date' => now()->addYear(),
        'status' => 'Pending',
        'document_path' => 'test/path.pdf',
    ]);

    $count = $this->notificationService->sendInsuranceExpirationWarnings();

    expect($count)->toBeGreaterThan(0);
    Notification::assertSentTo($user, InsuranceExpirationWarning::class);
});

it('sends requirement deadline reminders for pending requirements', function () {
    Notification::fake();

    $user = User::factory()->create();
    $scholarship = Scholarship::factory()->create();
    $recipient = ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'student_id' => $user->id,
    ]);

    // Create requirement due in 5 days
    ScholarshipRequirement::factory()->create([
        'recipient_id' => $recipient->id,
        'deadline' => now()->addDays(5),
        'status' => 'Pending',
    ]);

    $count = $this->notificationService->sendRequirementDeadlineReminders(7);

    expect($count)->toBeGreaterThan(0);
    Notification::assertSentTo($user, RequirementDeadlineReminder::class);
});

it('sends scholarship renewal reminders for expiring scholarships', function () {
    Notification::fake();

    $user = User::factory()->create();
    $scholarship = Scholarship::factory()->create();

    // Create scholarship expiring exactly 30 days from now
    ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'student_id' => $user->id,
        'expiration_date' => now()->addDays(30)->format('Y-m-d'),
        'status' => 'active', // lowercase to match query
    ]);

    $count = $this->notificationService->sendScholarshipRenewalReminders(30);

    expect($count)->toBeGreaterThan(0);
    Notification::assertSentTo($user, ScholarshipRenewalReminder::class);
});

it('scheduled reminder command returns correct counts', function () {
    $user = User::factory()->create();
    $scholarship = Scholarship::factory()->create();

    // Create upcoming requirement
    $recipient = ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'student_id' => $user->id,
    ]);

    ScholarshipRequirement::factory()->create([
        'recipient_id' => $recipient->id,
        'deadline' => now()->addDays(5),
        'status' => 'Pending',
    ]);

    // Create expiring insurance
    Insurance::create([
        'student_id' => $user->id,
        'policy_number' => 'POL-'.rand(1000, 9999),
        'insurance_provider' => 'Test Insurance Co.',
        'coverage_type' => 'Health',
        'coverage_start_date' => now(),
        'coverage_end_date' => now()->addDays(25),
        'status' => 'Approved',
        'document_path' => 'test/path.pdf',
    ]);

    $requirementCount = $this->notificationService->sendRequirementDeadlineReminders(7);
    $insuranceCount = $this->notificationService->sendInsuranceExpirationWarnings();

    expect($requirementCount)->toBeGreaterThan(0);
    expect($insuranceCount)->toBeGreaterThan(0);
});
