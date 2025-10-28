<?php

namespace App\Notifications\USG;

use App\Modules\USG\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Event $event)
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
        if (! $notifiable->notify_event_created) {
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
            ->subject('New Event: '.$this->event->title)
            ->greeting('Hello '.$notifiable->first_name.'!')
            ->line('A new event has been created that might interest you.')
            ->line('**'.$this->event->title.'**')
            ->line($this->formatEventDetails())
            ->action('View Event Details', $eventUrl);

        if ($this->event->description) {
            $message->line(substr(strip_tags($this->event->description), 0, 200).'...');
        }

        return $message->line('We hope to see you there!');
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

        // Category
        if ($this->event->category) {
            $details[] = '🏷️ '.ucfirst($this->event->category);
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
            'start_date' => $this->event->start_date,
        ];
    }
}
