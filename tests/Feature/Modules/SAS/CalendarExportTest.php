<?php

use App\Models\User;
use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\SASActivity;
use App\Modules\SAS\Services\CalendarService;

beforeEach(function () {
    $this->calendarService = app(CalendarService::class);
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

it('exports a single activity as ics file', function () {
    $organization = Organization::factory()->create();
    $activity = SASActivity::factory()->create([
        'activity_title' => 'Test Workshop',
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'start_date' => now()->addDays(7)->format('Y-m-d H:i:s'),
        'end_date' => now()->addDays(7)->addHours(3)->format('Y-m-d H:i:s'),
        'location' => 'Conference Room A',
    ]);

    $response = $this->get("/sas/activities/{$activity->slug}/export");

    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'text/calendar; charset=utf-8');
    $response->assertHeader('Content-Disposition');

    $content = $response->getContent();
    expect($content)->toContain('BEGIN:VCALENDAR');
    expect($content)->toContain('BEGIN:VEVENT');
    expect($content)->toContain('SUMMARY:Test Workshop');
    expect($content)->toContain('END:VEVENT');
    expect($content)->toContain('END:VCALENDAR');
});

it('exports multiple activities with filtering', function () {
    $organization = Organization::factory()->create();

    // Create scheduled activities
    SASActivity::factory()->count(3)->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'category' => 'Workshop',
        'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
    ]);

    // Create cancelled activity (should not be included)
    SASActivity::factory()->create([
        'status' => 'Cancelled',
        'organization_id' => $organization->id,
        'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
    ]);

    $response = $this->get('/sas/activities/export');

    $response->assertSuccessful();

    $content = $response->getContent();
    expect($content)->toContain('BEGIN:VCALENDAR');

    // Should have 3 VEVENT entries (excluding cancelled)
    $eventCount = substr_count($content, 'BEGIN:VEVENT');
    expect($eventCount)->toBe(3);
});

it('filters activities by category', function () {
    $organization = Organization::factory()->create();

    SASActivity::factory()->count(2)->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'category' => 'Workshop',
        'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
    ]);

    SASActivity::factory()->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'category' => 'Seminar',
        'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
    ]);

    $response = $this->get('/sas/activities/export?category=Workshop');

    $response->assertSuccessful();

    $content = $response->getContent();
    $eventCount = substr_count($content, 'BEGIN:VEVENT');
    expect($eventCount)->toBe(2);
});

it('filters activities by date range', function () {
    $organization = Organization::factory()->create();

    // Activity within range
    SASActivity::factory()->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'start_date' => now()->addDays(15)->format('Y-m-d H:i:s'),
    ]);

    // Activity outside range
    SASActivity::factory()->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'start_date' => now()->addDays(60)->format('Y-m-d H:i:s'),
    ]);

    $dateFrom = now()->addDays(10)->format('Y-m-d');
    $dateTo = now()->addDays(30)->format('Y-m-d');

    $response = $this->get("/sas/activities/export?date_from={$dateFrom}&date_to={$dateTo}");

    $response->assertSuccessful();

    $content = $response->getContent();
    $eventCount = substr_count($content, 'BEGIN:VEVENT');
    expect($eventCount)->toBe(1);
});

it('filters activities by month and year', function () {
    $organization = Organization::factory()->create();

    // Activity in target month
    SASActivity::factory()->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'start_date' => now()->addMonth()->startOfMonth()->addDays(5)->format('Y-m-d H:i:s'),
    ]);

    // Activity in different month
    SASActivity::factory()->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'start_date' => now()->addMonths(2)->format('Y-m-d H:i:s'),
    ]);

    $targetDate = now()->addMonth();
    $year = $targetDate->year;
    $month = $targetDate->month;

    $response = $this->get("/sas/activities/export?year={$year}&month={$month}");

    $response->assertSuccessful();

    $content = $response->getContent();
    $eventCount = substr_count($content, 'BEGIN:VEVENT');
    expect($eventCount)->toBe(1);
});

it('generates dynamic filenames based on filters', function () {
    $organization = Organization::factory()->create();

    SASActivity::factory()->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'category' => 'Workshop',
        'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
    ]);

    $response = $this->get('/sas/activities/export?category=Workshop');

    $response->assertSuccessful();
    $disposition = $response->headers->get('Content-Disposition');
    expect($disposition)->toContain('sas-activities');
    expect($disposition)->toContain('workshop');
    expect($disposition)->toContain('.ics');
});

it('includes rich event descriptions', function () {
    $organization = Organization::factory()->create([
        'organization_name' => 'Tech Club',
    ]);

    $activity = SASActivity::factory()->create([
        'activity_title' => 'AI Workshop',
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'description' => 'Learn about artificial intelligence',
        'category' => 'Workshop',
        'target_participants' => 50,
        'location' => 'Room 101',
        'start_date' => now()->addDays(7)->format('Y-m-d H:i:s'),
    ]);

    $response = $this->get("/sas/activities/{$activity->slug}/export");

    $response->assertSuccessful();

    $content = $response->getContent();
    expect($content)->toContain('SUMMARY:AI Workshop');
    expect($content)->toContain('LOCATION:Room 101');
    expect($content)->toContain('Learn about artificial intelligence');
    expect($content)->toContain('Tech Club');
});

it('handles all-day events correctly', function () {
    $organization = Organization::factory()->create();

    $activity = SASActivity::factory()->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'all_day' => true,
        'start_date' => now()->addDays(7)->startOfDay()->format('Y-m-d H:i:s'),
        'end_date' => now()->addDays(7)->endOfDay()->format('Y-m-d H:i:s'),
    ]);

    $response = $this->get("/sas/activities/{$activity->slug}/export");

    $response->assertSuccessful();

    $content = $response->getContent();
    expect($content)->toContain('BEGIN:VEVENT');
});

it('only exports scheduled and ongoing activities', function () {
    $organization = Organization::factory()->create();

    SASActivity::factory()->create([
        'status' => 'Scheduled',
        'organization_id' => $organization->id,
        'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
    ]);

    SASActivity::factory()->create([
        'status' => 'Ongoing',
        'organization_id' => $organization->id,
        'start_date' => now()->format('Y-m-d H:i:s'),
    ]);

    SASActivity::factory()->create([
        'status' => 'Completed',
        'organization_id' => $organization->id,
        'start_date' => now()->subDays(10)->format('Y-m-d H:i:s'),
    ]);

    SASActivity::factory()->create([
        'status' => 'Cancelled',
        'organization_id' => $organization->id,
        'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
    ]);

    $response = $this->get('/sas/activities/export');

    $response->assertSuccessful();

    $content = $response->getContent();
    $eventCount = substr_count($content, 'BEGIN:VEVENT');
    expect($eventCount)->toBe(2); // Only upcoming and ongoing
});
