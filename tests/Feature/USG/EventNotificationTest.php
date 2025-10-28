<?php

use App\Models\User;
use App\Modules\USG\Models\Event;
use App\Notifications\USG\EventCancelledNotification;
use App\Notifications\USG\EventCreatedNotification;
use App\Notifications\USG\EventUpdatedNotification;
use Illuminate\Support\Facades\Notification;

beforeEach(function () {
    $this->user = User::factory()->create([
        'email_verified_at' => now(),
        'notify_event_created' => true,
        'notify_event_updated' => true,
        'notify_event_cancelled' => true,
    ]);
});

describe('Event Created Notifications', function () {
    it('sends notification when event is created as published', function () {
        Notification::fake();

        Event::factory()->create([
            'status' => 'published',
            'title' => 'New Orientation',
        ]);

        Notification::assertSentTo(
            [$this->user],
            EventCreatedNotification::class
        );
    });

    it('does not send notification when event is created as draft', function () {
        Notification::fake();

        Event::factory()->create([
            'status' => 'draft',
        ]);

        Notification::assertNotSentTo(
            [$this->user],
            EventCreatedNotification::class
        );
    });

    it('sends notification when draft event is published', function () {
        Notification::fake();

        $event = Event::factory()->create([
            'status' => 'draft',
        ]);

        Notification::assertNothingSent();

        $event->update(['status' => 'published']);

        Notification::assertSentTo(
            [$this->user],
            EventCreatedNotification::class
        );
    });

    it('does not send notification to users who opted out', function () {
        Notification::fake();

        $optedOutUser = User::factory()->create([
            'email_verified_at' => now(),
            'notify_event_created' => false,
        ]);

        Event::factory()->create(['status' => 'published']);

        Notification::assertSentTo([$this->user], EventCreatedNotification::class);
        Notification::assertNotSentTo([$optedOutUser], EventCreatedNotification::class);
    });

    it('includes event details in notification', function () {
        Notification::fake();

        $event = Event::factory()->create([
            'status' => 'published',
            'title' => 'Annual General Assembly',
            'location' => 'Main Auditorium',
            'category' => 'meeting',
        ]);

        Notification::assertSentTo($this->user, function (EventCreatedNotification $notification) use ($event) {
            $mail = $notification->toMail($this->user);

            return str_contains($mail->subject, 'New Event: Annual General Assembly') &&
                   $notification->event->id === $event->id;
        });
    });
});

describe('Event Updated Notifications', function () {
    it('sends notification when published event is updated', function () {
        Notification::fake();

        $event = Event::factory()->create([
            'status' => 'published',
            'title' => 'Original Title',
        ]);

        // Clear notification fake after creation
        Notification::fake();

        $event->update(['title' => 'Updated Title']);

        Notification::assertSentTo(
            [$this->user],
            EventUpdatedNotification::class
        );
    });

    it('does not send update notification for draft events', function () {
        Notification::fake();

        $event = Event::factory()->create([
            'status' => 'draft',
            'title' => 'Original Title',
        ]);

        $event->update(['title' => 'Updated Title']);

        Notification::assertNotSentTo(
            [$this->user],
            EventUpdatedNotification::class
        );
    });

    it('tracks which fields were changed', function () {
        Notification::fake();

        $event = Event::factory()->create([
            'status' => 'published',
            'location' => 'Room 101',
        ]);

        // Clear notification fake after creation
        Notification::fake();

        $event->update([
            'location' => 'Room 202',
            'start_date' => now()->addDay(),
        ]);

        Notification::assertSentTo($this->user, function (EventUpdatedNotification $notification) {
            return array_key_exists('location', $notification->changes) &&
                   array_key_exists('start_date', $notification->changes);
        });
    });

    it('does not send notification to users who opted out of updates', function () {
        Notification::fake();

        $this->user->update(['notify_event_updated' => false]);

        $event = Event::factory()->create(['status' => 'published']);

        // Clear notification fake after creation
        Notification::fake();

        $event->update(['title' => 'Updated']);

        Notification::assertNotSentTo([$this->user], EventUpdatedNotification::class);
    });
});

describe('Event Cancelled Notifications', function () {
    it('sends notification when event is cancelled', function () {
        Notification::fake();

        $event = Event::factory()->create([
            'status' => 'published',
        ]);

        // Clear notification fake after creation
        Notification::fake();

        $event->update(['status' => 'cancelled']);

        Notification::assertSentTo(
            [$this->user],
            EventCancelledNotification::class
        );
    });

    it('does not send update notification when event is cancelled', function () {
        Notification::fake();

        $event = Event::factory()->create(['status' => 'published']);

        // Clear notification fake after creation
        Notification::fake();

        $event->update(['status' => 'cancelled']);

        // Should send cancelled notification, not update
        Notification::assertSentTo([$this->user], EventCancelledNotification::class);
        Notification::assertNotSentTo([$this->user], EventUpdatedNotification::class);
    });

    it('does not send notification to users who opted out of cancellations', function () {
        Notification::fake();

        $this->user->update(['notify_event_cancelled' => false]);

        $event = Event::factory()->create(['status' => 'published']);
        $event->update(['status' => 'cancelled']);

        Notification::assertNotSentTo([$this->user], EventCancelledNotification::class);
    });

    it('includes event details in cancellation notification', function () {
        Notification::fake();

        $event = Event::factory()->create([
            'status' => 'published',
            'title' => 'Cancelled Event',
        ]);

        // Clear notification fake after creation
        Notification::fake();

        $event->update(['status' => 'cancelled']);

        Notification::assertSentTo($this->user, function (EventCancelledNotification $notification) use ($event) {
            $mail = $notification->toMail($this->user);

            return str_contains($mail->subject, 'Event Cancelled: Cancelled Event') &&
                   $notification->event->id === $event->id;
        });
    });
});

describe('Notification Queueing', function () {
    it('queues event created notification', function () {
        Notification::fake();

        Event::factory()->create(['status' => 'published']);

        Notification::assertSentTo($this->user, function (EventCreatedNotification $notification) {
            return $notification instanceof \Illuminate\Contracts\Queue\ShouldQueue;
        });
    });

    it('queues event updated notification', function () {
        Notification::fake();

        $event = Event::factory()->create(['status' => 'published']);
        $event->update(['title' => 'Updated']);

        Notification::assertSentTo($this->user, function (EventUpdatedNotification $notification) {
            return $notification instanceof \Illuminate\Contracts\Queue\ShouldQueue;
        });
    });

    it('queues event cancelled notification', function () {
        Notification::fake();

        $event = Event::factory()->create(['status' => 'published']);
        $event->update(['status' => 'cancelled']);

        Notification::assertSentTo($this->user, function (EventCancelledNotification $notification) {
            return $notification instanceof \Illuminate\Contracts\Queue\ShouldQueue;
        });
    });
});

describe('User Preferences', function () {
    it('only sends to verified users', function () {
        Notification::fake();

        $unverifiedUser = User::factory()->create([
            'email_verified_at' => null,
            'notify_event_created' => true,
        ]);

        Event::factory()->create(['status' => 'published']);

        Notification::assertSentTo([$this->user], EventCreatedNotification::class);
        Notification::assertNotSentTo([$unverifiedUser], EventCreatedNotification::class);
    });
});
