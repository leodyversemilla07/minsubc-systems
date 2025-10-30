<?php

namespace App\Modules\SAS\Notifications;

use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Modules\SAS\Models\ScholarshipRequirement;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RequirementDeadlineReminder extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public ScholarshipRecipient $recipient,
        public ScholarshipRequirement $requirement
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $daysLeft = now()->diffInDays($this->requirement->deadline);

        return (new MailMessage)
            ->subject('Scholarship Requirement Deadline Approaching')
            ->greeting('Hello, '.$notifiable->first_name.'!')
            ->line('This is a reminder that your scholarship requirement is due soon.')
            ->line('Requirement: '.$this->requirement->requirement_name)
            ->line('Scholarship: '.$this->recipient->scholarship->scholarship_name)
            ->line('Deadline: '.date('F d, Y', strtotime($this->requirement->deadline)).' ('.$daysLeft.' days left)')
            ->action('Submit Requirement', url('/sas/student/scholarships/'.$this->recipient->id.'/requirements'))
            ->line('Please submit your requirement before the deadline to maintain your scholarship status.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $daysLeft = now()->diffInDays($this->requirement->deadline);

        return [
            'title' => 'Requirement Deadline Approaching',
            'message' => $this->requirement->requirement_name.' is due in '.$daysLeft.' days',
            'requirement_name' => $this->requirement->requirement_name,
            'deadline' => $this->requirement->deadline,
            'scholarship_name' => $this->recipient->scholarship->scholarship_name,
            'url' => '/sas/student/scholarships/'.$this->recipient->id.'/requirements',
            'icon' => 'clock',
        ];
    }

    /**
     * Get the database representation of the notification.
     */
    public function toDatabase(object $notifiable): array
    {
        return $this->toArray($notifiable);
    }
}
