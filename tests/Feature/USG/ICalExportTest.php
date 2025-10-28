<?php

use App\Models\User;
use App\Modules\USG\Models\Event;
use App\Modules\USG\Services\ICalService;

uses()->group('usg', 'ical-export');

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
    $this->iCalService = app(ICalService::class);
});

describe('ICalService', function () {
    it('generates valid iCalendar content for a single event', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event = Event::factory()->create([
            'title' => 'Test Event',
            'description' => 'This is a test event description',
            'location' => 'MinSU Campus',
            'start_date' => now()->addDays(5)->setTime(10, 0),
            'end_date' => now()->addDays(5)->setTime(12, 0),
            'all_day' => false,
            'status' => 'published',
            'organizer' => 'USG Team',
            'created_by' => $user->id,
        ]);

        $icalContent = $this->iCalService->generateEventICalendar($event);

        // Verify iCalendar structure
        expect($icalContent)->toContain('BEGIN:VCALENDAR')
            ->and($icalContent)->toContain('END:VCALENDAR')
            ->and($icalContent)->toContain('BEGIN:VEVENT')
            ->and($icalContent)->toContain('END:VEVENT')
            ->and($icalContent)->toContain('VERSION:2.0')
            ->and($icalContent)->toContain('PRODID:-//MinSU USG//Events Calendar//EN');

        // Verify event details
        expect($icalContent)->toContain('SUMMARY:Test Event')
            ->and($icalContent)->toContain('DESCRIPTION:This is a test event description')
            ->and($icalContent)->toContain('LOCATION:MinSU Campus')
            ->and($icalContent)->toContain('STATUS:CONFIRMED')
            ->and($icalContent)->toContain('ORGANIZER');
    });

    it('generates iCalendar for all-day events', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event = Event::factory()->create([
            'title' => 'All Day Event',
            'start_date' => now()->addDays(1)->startOfDay(),
            'end_date' => now()->addDays(1)->endOfDay(),
            'all_day' => true,
            'status' => 'published',
            'created_by' => $user->id,
        ]);

        $icalContent = $this->iCalService->generateEventICalendar($event);

        // All-day events should use VALUE=DATE format
        expect($icalContent)->toContain('DTSTART;VALUE=DATE:')
            ->and($icalContent)->toContain('DTEND;VALUE=DATE:');
    });

    it('generates iCalendar for multiple events', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $events = Event::factory()->count(3)->create([
            'status' => 'published',
            'created_by' => $user->id,
        ]);

        $icalContent = $this->iCalService->generateMultipleEventsICalendar($events);

        // Should have one calendar with multiple events
        expect(substr_count($icalContent, 'BEGIN:VCALENDAR'))->toBe(1)
            ->and(substr_count($icalContent, 'END:VCALENDAR'))->toBe(1)
            ->and(substr_count($icalContent, 'BEGIN:VEVENT'))->toBe(3)
            ->and(substr_count($icalContent, 'END:VEVENT'))->toBe(3);
    });

    it('handles cancelled events correctly', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event = Event::factory()->create([
            'title' => 'Cancelled Event',
            'status' => 'cancelled',
            'created_by' => $user->id,
        ]);

        $icalContent = $this->iCalService->generateEventICalendar($event);

        expect($icalContent)->toContain('STATUS:CANCELLED');
    });

    it('handles draft events as tentative', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event = Event::factory()->create([
            'title' => 'Draft Event',
            'status' => 'draft',
            'created_by' => $user->id,
        ]);

        $icalContent = $this->iCalService->generateEventICalendar($event);

        expect($icalContent)->toContain('STATUS:TENTATIVE');
    });

    it('escapes special characters correctly', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event = Event::factory()->create([
            'title' => 'Event with, commas; semicolons',
            'description' => 'Line 1\nLine 2\nLine 3',
            'location' => 'Room #123, Building A',
            'status' => 'published',
            'created_by' => $user->id,
        ]);

        $icalContent = $this->iCalService->generateEventICalendar($event);

        // Special characters should be escaped
        expect($icalContent)->toContain('\\,')
            ->and($icalContent)->toContain('\\;')
            ->and($icalContent)->toContain('\\n');
    });

    it('generates unique UIDs for events', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event1 = Event::factory()->create(['created_by' => $user->id]);
        $event2 = Event::factory()->create(['created_by' => $user->id]);

        $ical1 = $this->iCalService->generateEventICalendar($event1);
        $ical2 = $this->iCalService->generateEventICalendar($event2);

        // Extract UIDs
        preg_match('/UID:(.+)/', $ical1, $matches1);
        preg_match('/UID:(.+)/', $ical2, $matches2);

        expect($matches1[1])->not->toBe($matches2[1]);
    });

    it('generates proper filenames', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event = Event::factory()->create([
            'title' => 'Annual General Meeting',
            'created_by' => $user->id,
        ]);

        $filename = $this->iCalService->generateFilename($event);

        expect($filename)->toBe('annual-general-meeting.ics');
    });
});

describe('ICalendar Export Routes', function () {
    it('can export a single event as iCalendar', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event = Event::factory()->create([
            'title' => 'Test Event',
            'slug' => 'test-event',
            'status' => 'published',
            'start_date' => now()->addDays(1),
            'end_date' => now()->addDays(1)->addHours(2),
            'created_by' => $user->id,
        ]);

        $response = $this->get(route('usg.events.export', $event->slug));

        $response->assertSuccessful()
            ->assertHeader('Content-Type', 'text/calendar; charset=utf-8')
            ->assertHeader('Content-Disposition')
            ->assertSee('BEGIN:VCALENDAR', false)
            ->assertSee('SUMMARY:Test Event', false);
    });

    it('can export all upcoming events', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create 3 upcoming published events
        Event::factory()->count(3)->create([
            'status' => 'published',
            'start_date' => now()->addDays(rand(1, 10)),
            'end_date' => now()->addDays(rand(11, 20)),
            'created_by' => $user->id,
        ]);

        // Create a past event (should not be included)
        Event::factory()->create([
            'status' => 'published',
            'start_date' => now()->subDays(10),
            'end_date' => now()->subDays(9),
            'created_by' => $user->id,
        ]);

        $response = $this->get(route('usg.events.export.all'));

        $response->assertSuccessful()
            ->assertHeader('Content-Type', 'text/calendar; charset=utf-8');

        $content = $response->getContent();

        // Should have 3 events (not 4)
        expect(substr_count($content, 'BEGIN:VEVENT'))->toBe(3);
    });

    it('returns 404 for non-existent event', function () {
        $response = $this->get(route('usg.events.export', 'non-existent-event'));

        $response->assertNotFound();
    });

    it('includes event URL in iCalendar', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $event = Event::factory()->create([
            'slug' => 'test-event-url',
            'status' => 'published',
            'created_by' => $user->id,
        ]);

        $response = $this->get(route('usg.events.export', $event->slug));

        $expectedUrl = route('usg.events.show', $event->slug);
        $response->assertSee('URL:'.$expectedUrl, false);
    });
});
