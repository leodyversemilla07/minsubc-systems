<?php

namespace App\Observers;

use App\Models\AuditLog;
use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        AuditLog::log(
            'user_created',
            auth()->id(),
            User::class,
            $user->id,
            null,
            $user->toArray(),
            "User account created: {$user->name} ({$user->email})",
            [
                'user_email' => $user->email,
                'user_name' => $user->name,
                'created_by' => auth()->user()?->name ?? 'system',
            ]
        );
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        $changes = $user->getChanges();
        $original = $user->getOriginal();

        // Log other user updates (excluding role changes which are handled by events)
        if (! empty($changes)) {
            AuditLog::log(
                'user_updated',
                auth()->id(),
                User::class,
                $user->id,
                $original,
                $user->toArray(),
                "User profile updated: {$user->name} ({$user->email})",
                [
                    'user_email' => $user->email,
                    'user_name' => $user->name,
                    'changes' => $changes,
                    'updated_by' => auth()->user()?->name ?? 'system',
                ]
            );
        }
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        AuditLog::log(
            'user_deleted',
            auth()->id(),
            User::class,
            $user->id,
            $user->toArray(),
            null,
            "User account deleted: {$user->name} ({$user->email})",
            [
                'user_email' => $user->email,
                'user_name' => $user->name,
                'deleted_by' => auth()->user()?->name ?? 'system',
            ]
        );
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        AuditLog::log(
            'user_restored',
            auth()->id(),
            User::class,
            $user->id,
            null,
            $user->toArray(),
            "User account restored: {$user->name} ({$user->email})",
            [
                'user_email' => $user->email,
                'user_name' => $user->name,
                'restored_by' => auth()->user()?->name ?? 'system',
            ]
        );
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        AuditLog::log(
            'user_force_deleted',
            auth()->id(),
            User::class,
            $user->id,
            $user->toArray(),
            null,
            "User account permanently deleted: {$user->name} ({$user->email})",
            [
                'user_email' => $user->email,
                'user_name' => $user->name,
                'deleted_by' => auth()->user()?->name ?? 'system',
            ]
        );
    }
}
