<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $user = $request->validateCredentials();

        if (Features::enabled(Features::twoFactorAuthentication()) && $user->hasEnabledTwoFactorAuthentication()) {
            $request->session()->put([
                'login.id' => $user->getKey(),
                'login.remember' => $request->boolean('remember'),
            ]);

            return to_route('two-factor.login');
        }

        Auth::login($user, $request->boolean('remember'));

        $request->session()->regenerate();

        // Clear any previous intended URL to force role-based redirect
        $request->session()->forget('url.intended');

        // Log successful login
        AuditLog::log(
            'user_login',
            $user->id,
            User::class,
            $user->id,
            null,
            ['last_login_at' => now()],
            "User {$user->name} ({$user->email}) logged in",
            [
                'user_email' => $user->email,
                'user_name' => $user->name,
                'login_method' => 'web',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]
        );

        // Determine redirect URL based on user roles
        $defaultUrl = $this->getRedirectUrl($user);

        return redirect()->intended($defaultUrl);
    }

    /**
     * Get the redirect URL based on user roles.
     */
    protected function getRedirectUrl($user): string
    {
        // USG users (admin or officer)
        if ($user->hasAnyRole(['usg-admin', 'usg-officer'])) {
            return route('usg.admin.dashboard');
        }

        // Registrar users
        if ($user->hasAnyRole(['registrar-admin', 'registrar-staff'])) {
            if (Route::has('registrar.dashboard')) {
                return route('registrar.dashboard');
            }
        }

        // Default to main dashboard
        return route('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::user();

        // Log logout before destroying session
        if ($user) {
            AuditLog::log(
                'user_logout',
                $user->id,
                User::class,
                $user->id,
                null,
                null,
                "User {$user->name} ({$user->email}) logged out",
                [
                    'user_email' => $user->email,
                    'user_name' => $user->name,
                    'logout_method' => 'web',
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                ]
            );
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
