<?php

use App\Models\User;
use App\Modules\USG\Models\Announcement;
use App\Modules\USG\Models\Event;

uses()->group('usg', 'commands');

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
});

describe('ArchiveExpiredContent Command', function () {
    it('archives expired announcements', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create an expired announcement
        $expiredAnnouncement = Announcement::factory()->create([
            'title' => 'Expired Announcement',
            'status' => 'published',
            'publish_date' => now()->subDays(10),
            'expiry_date' => now()->subDays(1),
            'author_id' => $user->id,
        ]);

        // Create a current announcement (should not be archived)
        $currentAnnouncement = Announcement::factory()->create([
            'title' => 'Current Announcement',
            'status' => 'published',
            'publish_date' => now()->subDays(1),
            'expiry_date' => now()->addDays(7),
            'author_id' => $user->id,
        ]);

        // Create an announcement without expiry (should not be archived)
        $noExpiryAnnouncement = Announcement::factory()->create([
            'title' => 'No Expiry Announcement',
            'status' => 'published',
            'publish_date' => now()->subDays(5),
            'expiry_date' => null,
            'author_id' => $user->id,
        ]);

        $this->artisan('usg:archive-expired')
            ->assertSuccessful();

        // Verify the expired announcement was archived
        expect($expiredAnnouncement->fresh()->status)->toBe('archived');

        // Verify other announcements were not archived
        expect($currentAnnouncement->fresh()->status)->toBe('published')
            ->and($noExpiryAnnouncement->fresh()->status)->toBe('published');
    });

    it('archives past events that ended more than 7 days ago', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create a past event (ended 10 days ago)
        $pastEvent = Event::factory()->create([
            'title' => 'Past Event',
            'status' => 'published',
            'start_date' => now()->subDays(11),
            'end_date' => now()->subDays(10),
            'created_by' => $user->id,
        ]);

        // Create a recent past event (ended 5 days ago - should NOT be archived)
        $recentPastEvent = Event::factory()->create([
            'title' => 'Recent Past Event',
            'status' => 'published',
            'start_date' => now()->subDays(6),
            'end_date' => now()->subDays(5),
            'created_by' => $user->id,
        ]);

        // Create an upcoming event (should not be archived)
        $upcomingEvent = Event::factory()->create([
            'title' => 'Upcoming Event',
            'status' => 'published',
            'start_date' => now()->addDays(1),
            'end_date' => now()->addDays(2),
            'created_by' => $user->id,
        ]);

        $this->artisan('usg:archive-expired')
            ->assertSuccessful();

        // Verify the past event was archived
        expect($pastEvent->fresh()->status)->toBe('archived');

        // Verify other events were not archived
        expect($recentPastEvent->fresh()->status)->toBe('published')
            ->and($upcomingEvent->fresh()->status)->toBe('published');
    });

    it('does not archive already archived content', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create an already archived announcement
        $archivedAnnouncement = Announcement::factory()->create([
            'title' => 'Already Archived',
            'status' => 'archived',
            'publish_date' => now()->subDays(10),
            'expiry_date' => now()->subDays(1),
            'author_id' => $user->id,
        ]);

        // Create an already archived event
        $archivedEvent = Event::factory()->create([
            'title' => 'Already Archived Event',
            'status' => 'archived',
            'start_date' => now()->subDays(11),
            'end_date' => now()->subDays(10),
            'created_by' => $user->id,
        ]);

        $this->artisan('usg:archive-expired')
            ->assertSuccessful();

        // Verify they remain archived (status unchanged)
        expect($archivedAnnouncement->fresh()->status)->toBe('archived')
            ->and($archivedEvent->fresh()->status)->toBe('archived');
    });

    it('supports dry-run mode without making changes', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create an expired announcement
        $expiredAnnouncement = Announcement::factory()->create([
            'title' => 'Expired Announcement',
            'status' => 'published',
            'publish_date' => now()->subDays(10),
            'expiry_date' => now()->subDays(1),
            'author_id' => $user->id,
        ]);

        // Create a past event
        $pastEvent = Event::factory()->create([
            'title' => 'Past Event',
            'status' => 'published',
            'start_date' => now()->subDays(11),
            'end_date' => now()->subDays(10),
            'created_by' => $user->id,
        ]);

        $this->artisan('usg:archive-expired --dry-run')
            ->assertSuccessful();

        // Verify nothing was archived
        expect($expiredAnnouncement->fresh()->status)->toBe('published')
            ->and($pastEvent->fresh()->status)->toBe('published');
    });

    it('displays correct summary of archived content', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create 3 expired announcements
        Announcement::factory()->count(3)->create([
            'status' => 'published',
            'publish_date' => now()->subDays(10),
            'expiry_date' => now()->subDays(1),
            'author_id' => $user->id,
        ]);

        // Create 2 past events
        Event::factory()->count(2)->create([
            'status' => 'published',
            'start_date' => now()->subDays(11),
            'end_date' => now()->subDays(10),
            'created_by' => $user->id,
        ]);

        $this->artisan('usg:archive-expired')
            ->expectsOutputToContain('Announcements')
            ->expectsOutputToContain('Events')
            ->expectsOutputToContain('3') // 3 announcements
            ->expectsOutputToContain('2') // 2 events
            ->expectsOutputToContain('5') // 5 total
            ->assertSuccessful();
    });

    it('handles empty database gracefully', function () {
        $this->artisan('usg:archive-expired')
            ->expectsOutputToContain('No expired announcements found')
            ->expectsOutputToContain('No past events to archive')
            ->assertSuccessful();
    });

    it('does not archive draft announcements even if expired', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create an expired draft announcement
        $draftAnnouncement = Announcement::factory()->create([
            'title' => 'Expired Draft',
            'status' => 'draft',
            'publish_date' => now()->subDays(10),
            'expiry_date' => now()->subDays(1),
            'author_id' => $user->id,
        ]);

        $this->artisan('usg:archive-expired')
            ->assertSuccessful();

        // Verify the draft remains a draft (not archived)
        expect($draftAnnouncement->fresh()->status)->toBe('draft');
    });

    it('archives cancelled past events', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create a cancelled past event
        $cancelledEvent = Event::factory()->create([
            'title' => 'Cancelled Past Event',
            'status' => 'cancelled',
            'start_date' => now()->subDays(11),
            'end_date' => now()->subDays(10),
            'created_by' => $user->id,
        ]);

        $this->artisan('usg:archive-expired')
            ->assertSuccessful();

        // Cancelled events should NOT be archived (only published and draft)
        expect($cancelledEvent->fresh()->status)->toBe('cancelled');
    });
});
