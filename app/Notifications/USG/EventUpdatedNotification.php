<?php

namespace App\Notifications\USG;

use App\Modules\USG\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventUpdatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Event $event, public array $changes = [])
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        // Only send if user has enabled this notification
        if (! $notifiable->notify_event_updated) {
            return [];
        }

        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $eventUrl = route('usg.events.show', $this->event->slug);

        $message = (new MailMessage())
            ->subject('Event Updated: '.$this->event->title)
            ->greeting('Hello '.$notifiable->first_name.'!')
            ->line('An event you might be interested in has been updated.')
            ->line('**'.$this->event->title.'**');

        // Show what changed
        if (! empty($this->changes)) {
            $message->line('**What Changed:**');
            $message->line($this->formatChanges());
        }

        $message->line($this->formatEventDetails())
            ->action('View Updated Event', $eventUrl)
            ->line('Please review the changes to ensure they work with your schedule.');

        return $message;
    }

    /**
     * Format the changes for the email.
     */
    protected function formatChanges(): string
    {
        $formatted = [];

        foreach ($this->changes as $field => $values) {
            $label = $this->getFieldLabel($field);
            $formatted[] = "• {$label} changed";
        }

        return implode("\n", $formatted);
    }

    /**
     * Get a user-friendly label for a field.
     */
    protected function getFieldLabel(string $field): string
    {
        return match ($field) {
            'title' => 'Event name',
            'start_date' => 'Start date/time',
            'end_date' => 'End date/time',
            'location' => 'Location',
            'description' => 'Description',
            'category' => 'Category',
            default => ucfirst(str_replace('_', ' ', $field))
        };
    }

    /**
     * Format event details for the email.
     */
    protected function formatEventDetails(): string
    {
        $details = [];

        // Date and time
        if ($this->event->all_day) {
            $details[] = '📅 '.$this->event->start_date->format('F j, Y');
        } else {
            $details[] = '📅 '.$this->event->start_date->format('F j, Y \a\t g:i A');
        }

        // Location
        if ($this->event->location) {
            $details[] = '📍 '.$this->event->location;
        }

        return implode("\n", $details);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'event_id' => $this->event->id,
            'event_title' => $this->event->title,
            'event_slug' => $this->event->slug,
            'changes' => $this->changes,
        ];
    }
}
