<?php

namespace Modules\USG\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\USG\Models\Event;

class EventCancelledNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Event $event, public ?string $reason = null)
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
        if (! $notifiable->notify_event_cancelled) {
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

        $message = (new MailMessage)
            ->subject('Event Cancelled: '.$this->event->title)
            ->greeting('Hello '.$notifiable->first_name.'!')
            ->line('We regret to inform you that the following event has been cancelled:')
            ->line('**'.$this->event->title.'**')
            ->line($this->formatEventDetails());

        if ($this->reason) {
            $message->line('**Reason for cancellation:**')
                ->line($this->reason);
        }

        $message->action('View Event Details', $eventUrl)
            ->line('We apologize for any inconvenience this may cause.');

        return $message;
    }

    /**
     * Format event details for the email.
     */
    protected function formatEventDetails(): string
    {
        $details = [];

        // Date and time (original schedule)
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
            'reason' => $this->reason,
        ];
    }
}
