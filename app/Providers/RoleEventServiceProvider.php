<?php

namespace App\Providers;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Spatie\Permission\Events\RoleAttached;
use Spatie\Permission\Events\RoleDetached;

class RoleEventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Listen for role attachment events
        Event::listen(RoleAttached::class, function (RoleAttached $event) {
            $this->logRoleAttached($event);
        });

        // Listen for role detachment events
        Event::listen(RoleDetached::class, function (RoleDetached $event) {
            $this->logRoleDetached($event);
        });
    }

    /**
     * Log when a role is attached to a user.
     */
    protected function logRoleAttached(RoleAttached $event): void
    {
        $user = $event->model;
        $rolesOrIds = $event->rolesOrIds;

        // Convert rolesOrIds to role names
        $roleNames = $this->normalizeRolesToNames($rolesOrIds);

        AuditLog::log(
            'user_role_attached',
            auth()->id(),
            User::class,
            $user->id,
            ['roles' => $user->roles->pluck('name')->toArray()], // Roles before attachment
            ['roles' => $user->fresh()->roles->pluck('name')->toArray()], // Roles after attachment
            "Role(s) attached to user {$user->name} ({$user->email}): ".implode(', ', $roleNames),
            [
                'user_email' => $user->email,
                'user_name' => $user->name,
                'attached_roles' => $roleNames,
                'performed_by' => auth()->user()?->name ?? 'system',
            ]
        );
    }

    /**
     * Log when a role is detached from a user.
     */
    protected function logRoleDetached(RoleDetached $event): void
    {
        $user = $event->model;
        $rolesOrIds = $event->rolesOrIds;

        // Convert rolesOrIds to role names
        $roleNames = $this->normalizeRolesToNames($rolesOrIds);

        AuditLog::log(
            'user_role_detached',
            auth()->id(),
            User::class,
            $user->id,
            ['roles' => $user->fresh()->roles->pluck('name')->toArray()], // Roles before detachment (after refresh)
            ['roles' => $user->roles->pluck('name')->toArray()], // Roles after detachment
            "Role(s) detached from user {$user->name} ({$user->email}): ".implode(', ', $roleNames),
            [
                'user_email' => $user->email,
                'user_name' => $user->name,
                'detached_roles' => $roleNames,
                'performed_by' => auth()->user()?->name ?? 'system',
            ]
        );
    }

    /**
     * Normalize various role input types to role names array.
     */
    protected function normalizeRolesToNames(mixed $rolesOrIds): array
    {
        if (is_array($rolesOrIds)) {
            return collect($rolesOrIds)->map(function ($role) {
                return is_object($role) && method_exists($role, 'getAttribute')
                    ? $role->getAttribute('name')
                    : (string) $role;
            })->toArray();
        }

        if (is_object($rolesOrIds)) {
            if ($rolesOrIds instanceof Collection) {
                return $rolesOrIds->map(function ($role) {
                    return is_object($role) && method_exists($role, 'getAttribute')
                        ? $role->getAttribute('name')
                        : (string) $role;
                })->toArray();
            }

            // Single role object
            return method_exists($rolesOrIds, 'getAttribute')
                ? [$rolesOrIds->getAttribute('name')]
                : [(string) $rolesOrIds];
        }

        // Single ID or name
        return [(string) $rolesOrIds];
    }
}
