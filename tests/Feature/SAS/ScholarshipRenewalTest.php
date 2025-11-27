<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Notification;
use Modules\SAS\Models\ScholarshipRecipient;
use Modules\SAS\Notifications\ScholarshipRenewalReminderNotification;
use Modules\SAS\Services\ScholarshipRenewalService;

beforeEach(function () {
    $this->admin = User::factory()->create();
    $this->service = new ScholarshipRenewalService;
});

it('identifies eligible scholars for renewal', function () {
    // Create eligible scholar (Active, no recent renewal)
    $eligible = ScholarshipRecipient::factory()->create([
        'status' => 'Active',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
    ]);

    // Create ineligible scholar (Suspended)
    ScholarshipRecipient::factory()->create([
        'status' => 'Suspended',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
    ]);

    $eligibleScholars = $this->service->getEligibleScholars('2024-2025', '1st');

    expect($eligibleScholars)->toHaveCount(1)
        ->and($eligibleScholars->first()->id)->toBe($eligible->id);
});

it('checks if scholar is eligible for renewal', function () {
    $activeScholar = ScholarshipRecipient::factory()->create([
        'status' => 'Active',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
        'requirements_complete' => true,
    ]);

    $suspendedScholar = ScholarshipRecipient::factory()->create([
        'status' => 'Suspended',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
    ]);

    expect($this->service->isEligibleForRenewal($activeScholar, '2024-2025', '1st'))->toBeTrue()
        ->and($this->service->isEligibleForRenewal($suspendedScholar, '2024-2025', '1st'))->toBeFalse();
});

it('sends renewal reminders to eligible scholars', function () {
    Notification::fake();

    $scholar = ScholarshipRecipient::factory()->create([
        'status' => 'Active',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
    ]);

    $count = $this->service->sendRenewalReminders('2024-2025', '1st');

    expect($count)->toBe(1);

    Notification::assertSentTo(
        [$scholar->student],
        ScholarshipRenewalReminderNotification::class
    );
});

it('does not send reminders to ineligible scholars', function () {
    Notification::fake();

    ScholarshipRecipient::factory()->create([
        'status' => 'Suspended',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
    ]);

    $count = $this->service->sendRenewalReminders('2024-2025', '1st');

    expect($count)->toBe(0);

    Notification::assertNothingSent();
});

it('creates renewal application for eligible scholar', function () {
    $scholar = ScholarshipRecipient::factory()->create([
        'status' => 'Active',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
    ]);

    $renewal = $this->service->createRenewalApplication($scholar, [
        'academic_year' => '2024-2025',
        'semester' => '1st',
    ]);

    expect($renewal)->toBeInstanceOf(ScholarshipRecipient::class)
        ->and($renewal->academic_year)->toBe('2024-2025')
        ->and($renewal->semester)->toBe('1st')
        ->and($renewal->status)->toBe('Active')
        ->and($renewal->student_id)->toBe($scholar->student_id)
        ->and($renewal->scholarship_id)->toBe($scholar->scholarship_id);
});

it('gets scholars needing renewal soon', function () {
    // Create scholar with expiration date in 20 days
    $scholar = ScholarshipRecipient::factory()->create([
        'status' => 'Active',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
        'expiration_date' => now()->addDays(20),
    ]);

    $scholars = $this->service->getScholarsNeedingRenewal(30);

    expect($scholars)->toHaveCount(1);
});

it('renewal notification contains correct details', function () {
    $scholar = ScholarshipRecipient::factory()->create([
        'academic_year' => '2023-2024',
        'semester' => '2nd',
    ]);

    $notification = new ScholarshipRenewalReminderNotification($scholar, '2024-2025', '1st');

    $mailData = $notification->toMail($scholar->student);

    expect($mailData->subject)->toContain('Scholarship Renewal Reminder')
        ->and($mailData->viewData)->toHaveKey('recipient')
        ->and($mailData->viewData)->toHaveKey('newAcademicYear')
        ->and($mailData->viewData)->toHaveKey('newSemester');
});

it('artisan command sends renewal reminders', function () {
    Notification::fake();

    ScholarshipRecipient::factory()->create([
        'status' => 'Active',
        'academic_year' => '2023-2024',
        'semester' => '2nd',
    ]);

    $this->artisan('sas:send-renewal-reminders', [
        'academic_year' => '2024-2025',
        'semester' => '1st',
    ])
        ->assertSuccessful();
});
