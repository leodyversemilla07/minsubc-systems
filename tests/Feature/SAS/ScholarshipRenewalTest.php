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
    // Create eligible scholar (active, no recent renewal)
    $eligible = ScholarshipRecipient::factory()->create([
        'status' => 'active',
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
        'created_at' => now()->subMonths(6),
    ]);

    // Create ineligible scholar (inactive)
    ScholarshipRecipient::factory()->create([
        'status' => 'inactive',
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
    ]);

    $eligibleScholars = $this->service->getEligibleScholars('2024-2025', '1st Semester');

    expect($eligibleScholars)->toHaveCount(1)
        ->and($eligibleScholars->first()->id)->toBe($eligible->id);
});

it('checks if scholar is eligible for renewal', function () {
    $activeScholar = ScholarshipRecipient::factory()->create([
        'status' => 'active',
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
        'created_at' => now()->subMonths(6),
    ]);

    $inactiveScholar = ScholarshipRecipient::factory()->create([
        'status' => 'inactive',
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
    ]);

    expect($this->service->isEligibleForRenewal($activeScholar, '2024-2025', '1st Semester'))->toBeTrue()
        ->and($this->service->isEligibleForRenewal($inactiveScholar, '2024-2025', '1st Semester'))->toBeFalse();
});

it('sends renewal reminders to eligible scholars', function () {
    Notification::fake();

    $scholar = ScholarshipRecipient::factory()->create([
        'status' => 'active',
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
        'created_at' => now()->subMonths(6),
    ]);

    $count = $this->service->sendRenewalReminders('2024-2025', '1st Semester');

    expect($count)->toBe(1);

    Notification::assertSentTo(
        [$scholar->user],
        ScholarshipRenewalReminderNotification::class
    );
});

it('does not send reminders to ineligible scholars', function () {
    Notification::fake();

    ScholarshipRecipient::factory()->create([
        'status' => 'inactive',
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
    ]);

    $count = $this->service->sendRenewalReminders('2024-2025', '1st Semester');

    expect($count)->toBe(0);

    Notification::assertNothingSent();
});

it('creates renewal application for eligible scholar', function () {
    $scholar = ScholarshipRecipient::factory()->create([
        'status' => 'active',
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
        'created_at' => now()->subMonths(6),
    ]);

    $renewal = $this->service->createRenewalApplication($scholar, '2024-2025', '1st Semester');

    expect($renewal)->toBeInstanceOf(ScholarshipRecipient::class)
        ->and($renewal->academic_year)->toBe('2024-2025')
        ->and($renewal->semester)->toBe('1st Semester')
        ->and($renewal->status)->toBe('pending')
        ->and($renewal->user_id)->toBe($scholar->user_id)
        ->and($renewal->scholarship_program_id)->toBe($scholar->scholarship_program_id);
});

it('gets scholars needing renewal for current period', function () {
    // Create scholar from last period
    $scholar = ScholarshipRecipient::factory()->create([
        'status' => 'active',
        'academic_year' => '2023-2024',
        'semester' => '2nd Semester',
        'created_at' => now()->subMonths(6),
    ]);

    $scholars = $this->service->getScholarsNeedingRenewal('2024-2025', '1st Semester');

    expect($scholars)->toHaveCount(1);
});

it('renewal notification contains correct details', function () {
    $scholar = ScholarshipRecipient::factory()->create([
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
    ]);

    $notification = new ScholarshipRenewalReminderNotification($scholar, '2024-2025', '1st Semester');

    $mailData = $notification->toMail($scholar->user);

    expect($mailData->subject)->toContain('Scholarship Renewal Reminder')
        ->and($mailData->viewData)->toHaveKey('scholar')
        ->and($mailData->viewData)->toHaveKey('newAcademicYear')
        ->and($mailData->viewData)->toHaveKey('newSemester');
});

it('artisan command sends renewal reminders', function () {
    Notification::fake();

    ScholarshipRecipient::factory()->create([
        'status' => 'active',
        'academic_year' => '2023-2024',
        'semester' => '1st Semester',
        'created_at' => now()->subMonths(6),
    ]);

    $this->artisan('sas:send-renewal-reminders', [
        'academic_year' => '2024-2025',
        'semester' => '1st Semester',
    ])
        ->expectsOutput('Renewal reminders sent to 1 scholar(s).')
        ->assertSuccessful();
});
