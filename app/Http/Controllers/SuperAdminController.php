<?php

namespace App\Http\Controllers;

use App\Http\Requests\SuperAdmin\ResetUserPasswordRequest;
use App\Http\Requests\SuperAdmin\UpdateSystemSettingRequest;
use App\Http\Requests\SuperAdmin\UpdateUserRolesRequest;
use App\Models\AuditLog;
use App\Models\SystemSetting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class SuperAdminController extends Controller
{
    /**
     * Show the super admin dashboard
     */
    public function dashboard(Request $request): Response
    {
        $thirtyDaysAgo = now()->subDays(30);
        $sevenDaysAgo = now()->subDays(7);

        $stats = [
            'total_users' => User::count(),
            'active_users' => User::whereNotNull('email_verified_at')->count(),
            'total_roles' => Role::count(),
            'system_admins' => User::role(['super-admin'])->count(),
            'total_audit_logs' => AuditLog::count(),
            'recent_audit_logs' => AuditLog::where('created_at', '>=', $sevenDaysAgo)->count(),
            'system_settings_count' => SystemSetting::count(),
        ];

        $recentAuditLogs = AuditLog::with(['user'])
            ->latest()
            ->take(10)
            ->get();

        $userActivity = [
            'new_users' => User::where('created_at', '>=', $thirtyDaysAgo)->count(),
            'active_users_30d' => User::where('updated_at', '>=', $thirtyDaysAgo)->count(),
            'login_attempts' => AuditLog::where('action', 'login')
                ->where('created_at', '>=', $thirtyDaysAgo)
                ->count(),
        ];

        return Inertia::render('super-admin/dashboard', [
            'stats' => $stats,
            'recentAuditLogs' => $recentAuditLogs,
            'userActivity' => $userActivity,
        ]);
    }

    /**
     * Show user management interface
     */
    public function users(Request $request): Response
    {
        $query = User::with(['roles']);

        // Filter by role
        if ($request->role) {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('name', $request->role);
            });
        }

        // Filter by status
        if ($request->status === 'active') {
            $query->whereNotNull('email_verified_at');
        } elseif ($request->status === 'unverified') {
            $query->whereNull('email_verified_at');
        }

        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', '%'.$request->search.'%')
                    ->orWhere('middle_name', 'like', '%'.$request->search.'%')
                    ->orWhere('last_name', 'like', '%'.$request->search.'%')
                    ->orWhere('email', 'like', '%'.$request->search.'%');
            });
        }

        $users = $query->latest()->paginate(20);

        // Transform roles for each user
        $users->getCollection()->transform(function ($user) {
            $user->roles = $user->roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'display_name' => ucwords(str_replace(['_', '-'], ' ', $role->name)),
                ];
            });

            return $user;
        });

        // Get all roles for filter dropdown
        $roles = Role::select('id', 'name')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'display_name' => ucwords(str_replace(['_', '-'], ' ', $role->name)),
            ];
        });

        return Inertia::render('super-admin/users', [
            'users' => $users,
            'filters' => $request->only(['role', 'status', 'search']),
            'roles' => $roles,
        ]);
    }

    /**
     * Show user details and management
     */
    public function showUser(User $user): Response
    {
        $user->load(['roles', 'auditLogs' => function ($query) {
            $query->latest()->take(20);
        }]);

        $allRoles = Role::all();

        return Inertia::render('super-admin/user-detail', [
            'user' => $user,
            'allRoles' => $allRoles,
        ]);
    }

    /**
     * Update user roles
     */
    public function updateUserRoles(UpdateUserRolesRequest $request, User $user): RedirectResponse
    {
        $oldRoles = $user->roles->pluck('name')->toArray();

        // Sync roles
        $user->syncRoles($request->roles);

        // Log role change
        AuditLog::log(
            'user_roles_updated',
            $request->user()->id,
            User::class,
            $user->id,
            ['roles' => $oldRoles],
            ['roles' => $request->roles],
            "User {$user->name} roles updated by super admin",
            [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'old_roles' => $oldRoles,
                'new_roles' => $request->roles,
                'updated_by' => $request->user()->name,
            ]
        );

        return redirect()->back()->with('success', 'User roles updated successfully.');
    }

    /**
     * Reset user password
     */
    public function resetUserPassword(ResetUserPasswordRequest $request, User $user): RedirectResponse
    {
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // Log password reset
        AuditLog::log(
            'user_password_reset',
            $request->user()->id,
            User::class,
            $user->id,
            [],
            [],
            "User {$user->name} password reset by super admin",
            [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'reset_by' => $request->user()->name,
            ]
        );

        return redirect()->back()->with('success', 'User password reset successfully.');
    }

    /**
     * Disable user account
     */
    public function disableUser(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return redirect()->back()->with('error', 'You cannot disable your own account.');
        }

        $user->update([
            'email_verified_at' => null, // This effectively disables login
        ]);

        // Log user disable
        AuditLog::log(
            'user_disabled',
            $request->user()->id,
            User::class,
            $user->id,
            ['email_verified_at' => $user->email_verified_at],
            ['email_verified_at' => null],
            "User {$user->name} account disabled by super admin",
            [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'disabled_by' => $request->user()->name,
            ]
        );

        return redirect()->back()->with('success', 'User account disabled successfully.');
    }

    /**
     * Enable user account
     */
    public function enableUser(Request $request, User $user): RedirectResponse
    {
        $user->update([
            'email_verified_at' => now(),
        ]);

        // Log user enable
        AuditLog::log(
            'user_enabled',
            $request->user()->id,
            User::class,
            $user->id,
            ['email_verified_at' => $user->email_verified_at],
            ['email_verified_at' => now()],
            "User {$user->name} account enabled by super admin",
            [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'enabled_by' => $request->user()->name,
            ]
        );

        return redirect()->back()->with('success', 'User account enabled successfully.');
    }

    /**
     * Show system settings management
     */
    public function systemSettings(Request $request): Response
    {
        $query = SystemSetting::query();

        // Filter by type
        if ($request->type) {
            $query->where('type', $request->type);
        }

        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('setting_key', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        $settings = $query->latest('updated_at')->paginate(20);

        // Get unique types for filter
        $types = SystemSetting::distinct('type')->pluck('type');

        return Inertia::render('super-admin/system-settings', [
            'settings' => $settings,
            'filters' => $request->only(['type', 'search']),
            'types' => $types,
        ]);
    }

    /**
     * Update a system setting
     */
    public function updateSystemSetting(UpdateSystemSettingRequest $request, SystemSetting $systemSetting): RedirectResponse
    {
        $oldValue = $systemSetting->value;

        $systemSetting->update([
            'value' => $request->value,
            'updated_by' => $request->user()->id,
        ]);

        // Log setting change
        AuditLog::log(
            'system_setting_updated',
            $request->user()->id,
            SystemSetting::class,
            $systemSetting->id,
            ['value' => $oldValue],
            ['value' => $request->value],
            "System setting {$systemSetting->setting_key} updated by super admin",
            [
                'setting_key' => $systemSetting->setting_key,
                'old_value' => $oldValue,
                'new_value' => $request->value,
                'updated_by' => $request->user()->name,
            ]
        );

        return redirect()->back()->with('success', 'System setting updated successfully.');
    }

    /**
     * Show audit logs
     */
    public function auditLogs(Request $request): Response
    {
        $query = AuditLog::with(['user'])
            ->latest();

        // Filter by action
        if ($request->action) {
            $query->where('action', $request->action);
        }

        // Filter by user
        if ($request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by model type
        if ($request->model_type) {
            $query->where('model_type', $request->model_type);
        }

        // Filter by date range
        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Search in description
        if ($request->search) {
            $query->where('description', 'like', '%'.$request->search.'%');
        }

        $auditLogs = $query->paginate(50);

        // Get unique actions for filter dropdown
        $actions = AuditLog::distinct('action')->pluck('action')->sort();

        // Get users who have audit logs
        $users = User::whereHas('auditLogs')
            ->select('id', 'first_name', 'last_name', 'email')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ];
            });

        // Get unique model types
        $modelTypes = AuditLog::distinct('model_type')->pluck('model_type')->filter()->sort();

        return Inertia::render('super-admin/audit-logs', [
            'auditLogs' => $auditLogs,
            'filters' => $request->only(['action', 'user_id', 'model_type', 'date_from', 'date_to', 'search']),
            'actions' => $actions,
            'users' => $users,
            'modelTypes' => $modelTypes,
        ]);
    }

    /**
     * Show detailed audit log entry
     */
    public function showAuditLog(AuditLog $auditLog): Response
    {
        $auditLog->load(['user']);

        return Inertia::render('super-admin/audit-log-detail', [
            'auditLog' => $auditLog,
        ]);
    }

    /**
     * Show system reports
     */
    public function reports(Request $request): Response
    {
        $thirtyDaysAgo = now()->subDays(30);
        $sevenDaysAgo = now()->subDays(7);

        $userStats = [
            'total_users' => User::count(),
            'verified_users' => User::whereNotNull('email_verified_at')->count(),
            'unverified_users' => User::whereNull('email_verified_at')->count(),
            'users_with_2fa' => User::whereNotNull('two_factor_secret')->count(),
            'new_users_30d' => User::where('created_at', '>=', $thirtyDaysAgo)->count(),
            'new_users_7d' => User::where('created_at', '>=', $sevenDaysAgo)->count(),
        ];

        $roleStats = Role::withCount('users')->get()->map(function ($role) {
            return [
                'name' => $role->name,
                'count' => $role->users_count,
            ];
        });

        $auditStats = [
            'total_logs' => AuditLog::count(),
            'logs_30d' => AuditLog::where('created_at', '>=', $thirtyDaysAgo)->count(),
            'logs_7d' => AuditLog::where('created_at', '>=', $sevenDaysAgo)->count(),
            'top_actions' => AuditLog::query()
                ->select('action')
                ->selectRaw('count(*) as count')
                ->groupBy('action')
                ->orderBy('count', 'desc')
                ->take(10)
                ->get(),
        ];

        $settingsStats = [
            'total_settings' => SystemSetting::count(),
            'recently_updated' => SystemSetting::where('updated_at', '>=', $sevenDaysAgo)->count(),
        ];

        return Inertia::render('super-admin/reports', [
            'userStats' => $userStats,
            'roleStats' => $roleStats,
            'auditStats' => $auditStats,
            'settingsStats' => $settingsStats,
        ]);
    }

    /**
     * Show system configuration (modules, features)
     */
    public function systemConfig(Request $request): Response
    {
        // System information
        $system = [
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'database_connection' => config('database.default'),
            'cache_driver' => config('cache.default'),
            'session_driver' => config('session.driver'),
            'queue_connection' => config('queue.default'),
            'mail_driver' => config('mail.default'),
            'filesystem_disk' => config('filesystems.default'),
        ];

        // Environment information
        $environment = [
            'app_name' => config('app.name'),
            'app_env' => config('app.env'),
            'app_debug' => config('app.debug'),
            'app_url' => config('app.url'),
            'timezone' => config('app.timezone'),
            'locale' => config('app.locale'),
        ];

        // Module status with proper structure
        $modules = [
            [
                'name' => 'Registrar Module',
                'status' => 'active',
                'version' => '1.0.0',
                'description' => 'Document request and processing system',
                'last_checked' => now()->toISOString(),
            ],
            [
                'name' => 'USG Module',
                'status' => 'active',
                'version' => '1.0.0',
                'description' => 'University Student Government portal',
                'last_checked' => now()->toISOString(),
            ],
            [
                'name' => 'SAS Module',
                'status' => 'active',
                'version' => '1.0.0',
                'description' => 'Student Affairs Services',
                'last_checked' => now()->toISOString(),
            ],
            [
                'name' => 'Guidance Module',
                'status' => 'active',
                'version' => '1.0.0',
                'description' => 'Student guidance and counseling services',
                'last_checked' => now()->toISOString(),
            ],
        ];

        return Inertia::render('super-admin/system-config', [
            'system' => $system,
            'environment' => $environment,
            'modules' => $modules,
        ]);
    }
}
