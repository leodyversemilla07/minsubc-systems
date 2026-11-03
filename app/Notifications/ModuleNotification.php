<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class ModuleNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $icon,
        public string $title,
        public string $body,
        public ?string $actionUrl = null,
        public ?string $actionText = null,
        public string $module = 'general',
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'icon' => $this->icon,
            'title' => $this->title,
            'body' => $this->body,
            'module' => $this->module,
            'action_url' => $this->actionUrl,
            'action_text' => $this->actionText,
        ];
    }
}