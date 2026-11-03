<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\ModuleNotification;

class NotificationDispatcher
{
    /**
     * Send a notification to a specific user.
     */
    public static function toUser(
        User $user,
        string $title,
        string $body,
        ?string $actionUrl = null,
        ?string $actionText = null,
        string $module = 'general',
        string $icon = 'Bell',
    ): void {
        $user->notify(new ModuleNotification(
            icon: $icon,
            title: $title,
            body: $body,
            actionUrl: $actionUrl,
            actionText: $actionText,
            module: $module,
        ));
    }

    /**
     * Send a notification to all users with a specific role.
     */
    public static function toRole(
        string $role,
        string $title,
        string $body,
        ?string $actionUrl = null,
        ?string $actionText = null,
        string $module = 'general',
        string $icon = 'Bell',
    ): void {
        $users = User::role($role)->get();
        foreach ($users as $user) {
            self::toUser($user, $title, $body, $actionUrl, $actionText, $module, $icon);
        }
    }

    /**
     * Send a notification to multiple users.
     */
    public static function toUsers(
        array $users,
        string $title,
        string $body,
        ?string $actionUrl = null,
        ?string $actionText = null,
        string $module = 'general',
        string $icon = 'Bell',
    ): void {
        foreach ($users as $user) {
            if ($user instanceof User) {
                self::toUser($user, $title, $body, $actionUrl, $actionText, $module, $icon);
            }
        }
    }
}