<?php

use App\Models\User;
use Illuminate\Support\Facades\Notification;
use Modules\SAS\Models\Insurance;
use Modules\SAS\Models\InsuranceRecord;
use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;
use Modules\SAS\Models\ScholarshipRequirement;
use Modules\SAS\Notifications\InsuranceApproved;
use Modules\SAS\Notifications\InsuranceExpirationWarning;
use Modules\SAS\Notifications\InsuranceRejected;
use Modules\SAS\Notifications\InsuranceSubmitted;
use Modules\SAS\Notifications\RequirementDeadlineReminder;
use Modules\SAS\Notifications\ScholarshipAssigned;
use Modules\SAS\Notifications\ScholarshipRenewalReminder;
use Modules\SAS\Notifications\ScholarshipStatusChanged;
use Modules\SAS\Services\SASNotificationService;

beforeEach(function () {
    $this->notificationService = app(SASNotificationService::class);
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
    ]);

    $this->notificationService->notifyRequirementDeadline($recipient, $requirement);

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
    $insurance = InsuranceRecord::factory()->create([
        'student_id' => $user->id,
        'status' => 'Pending Review',
    ]);

    $this->notificationService->notifyInsuranceSubmitted($insurance);

    Notification::assertSentTo($user, InsuranceSubmitted::class);
});

it('sends insurance approval notification', function () {
    Notification::fake();

    $user = User::factory()->create();
    $insurance = InsuranceRecord::factory()->create([
        'student_id' => $user->id,
        'status' => 'Approved',
    ]);

    $this->notificationService->notifyInsuranceApproved($insurance);

    Notification::assertSentTo($user, InsuranceApproved::class);
});

it('sends insurance rejection notification with reason', function () {
    Notification::fake();

    $user = User::factory()->create();
    $insurance = InsuranceRecord::factory()->create([
        'student_id' => $user->id,
        'status' => 'Rejected',
        'review_notes' => 'Incomplete documentation',
    ]);

    $this->notificationService->notifyInsuranceRejected($insurance, 'Incomplete documentation');

    Notification::assertSentTo($user, InsuranceRejected::class, function ($notification) use ($insurance) {
        return $notification->insurance->id === $insurance->id;
    });
});

it('sends insurance expiration warnings', function () {
    Notification::fake();

    $user = User::factory()->create();

    // Create insurance expiring in exactly 30 days (should get 30-day warning)
    InsuranceRecord::factory()->create([
        'student_id' => $user->id,
        'status' => 'Approved',
        'expiration_date' => now()->addDays(30)->startOfDay(),
    ]);

    // Create insurance expiring in exactly 7 days (should get 7-day warning)
    InsuranceRecord::factory()->create([
        'student_id' => $user->id,
        'status' => 'Approved',
        'expiration_date' => now()->addDays(7)->startOfDay(),
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

    // Create requirement due in exactly 7 days
    ScholarshipRequirement::factory()->create([
        'recipient_id' => $recipient->id,
        'deadline' => now()->addDays(7)->startOfDay(),
        'is_submitted' => false,
    ]);

    $count = $this->notificationService->sendRequirementDeadlineReminders(7);

    expect($count)->toBeGreaterThan(0);
    Notification::assertSentTo($user, RequirementDeadlineReminder::class);
});

it('sends scholarship renewal reminder', function () {
    Notification::fake();

    $user = User::factory()->create();
    $scholarship = Scholarship::factory()->create();

    // Create scholarship expiring exactly 30 days from now
    ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'student_id' => $user->id,
        'expiration_date' => now()->addDays(30)->format('Y-m-d'),
        'status' => 'Active', // Capital A to match database enum
    ]);

    $count = $this->notificationService->sendScholarshipRenewalReminders(30);

    expect($count)->toBeGreaterThan(0);
    Notification::assertSentTo($user, ScholarshipRenewalReminder::class);
});

it('scheduled reminder command returns correct counts', function () {
    $user = User::factory()->create();
    $scholarship = Scholarship::factory()->create();

    // Create upcoming requirement (exactly 7 days from now)
    $recipient = ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'student_id' => $user->id,
    ]);

    ScholarshipRequirement::factory()->create([
        'recipient_id' => $recipient->id,
        'deadline' => now()->addDays(7)->startOfDay(),
        'is_submitted' => false,
    ]);

    // Create expiring insurance (exactly 30 days from now)
    InsuranceRecord::factory()->create([
        'student_id' => $user->id,
        'status' => 'Approved',
        'expiration_date' => now()->addDays(30)->startOfDay(),
    ]);

    $requirementCount = $this->notificationService->sendRequirementDeadlineReminders(7);
    $insuranceCount = $this->notificationService->sendInsuranceExpirationWarnings();

    expect($requirementCount)->toBeGreaterThan(0);
    expect($insuranceCount)->toBeGreaterThan(0);
});
