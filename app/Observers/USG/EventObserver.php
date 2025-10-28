<?php

namespace App\Observers\USG;

use App\Models\User;
use App\Modules\USG\Models\Event;
use App\Notifications\USG\EventCancelledNotification;
use App\Notifications\USG\EventCreatedNotification;
use App\Notifications\USG\EventUpdatedNotification;
use Illuminate\Support\Facades\Notification;

class EventObserver
{
    /**
     * Tracked fields for update notifications.
     */
    protected array $trackedFields = [
        'title',
        'start_date',
        'end_date',
        'location',
        'description',
        'category',
    ];

    /**
     * Handle the Event "created" event.
     */
    public function created(Event $event): void
    {
        // Only send notifications for published events
        if ($event->status !== 'published') {
            return;
        }

        $this->notifyUsers(new EventCreatedNotification($event));
    }

    /**
     * Handle the Event "updated" event.
     */
    public function updated(Event $event): void
    {
        // Check if status changed to cancelled
        if ($event->isDirty('status') && $event->status === 'cancelled') {
            $this->notifyUsers(new EventCancelledNotification($event));

            return;
        }

        // Check if status changed to published (was draft)
        if ($event->isDirty('status') && $event->status === 'published' && $event->getOriginal('status') === 'draft') {
            $this->notifyUsers(new EventCreatedNotification($event));

            return;
        }

        // Only notify for published events
        if ($event->status !== 'published') {
            return;
        }

        // Check if any tracked fields changed
        $changes = $this->getRelevantChanges($event);

        if (! empty($changes)) {
            $this->notifyUsers(new EventUpdatedNotification($event, $changes));
        }
    }

    /**
     * Get relevant changes for notification.
     */
    protected function getRelevantChanges(Event $event): array
    {
        $changes = [];

        foreach ($this->trackedFields as $field) {
            if ($event->isDirty($field)) {
                $changes[$field] = [
                    'old' => $event->getOriginal($field),
                    'new' => $event->$field,
                ];
            }
        }

        return $changes;
    }

    /**
     * Notify all users who have opted in.
     */
    protected function notifyUsers(object $notification): void
    {
        // Get all users who have notifications enabled
        $users = User::query()
            ->whereNotNull('email_verified_at')
            ->get();

        // Send notification - the notification itself will check user preferences
        Notification::send($users, $notification);
    }
}
