<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->instance(LoginResponse::class, new class() implements LoginResponse
        {
            public function toResponse($request): RedirectResponse
            {
                $user = auth()->user();
                $userRoles = $user->roles->pluck('name')->toArray();

                if (array_intersect($userRoles, ['usg-admin', 'usg-officer', 'super-admin'])) {
                    return redirect()->intended(route('usg.admin.dashboard'));
                }

                if (array_intersect($userRoles, ['registrar-admin', 'registrar-staff'])) {
                    return redirect()->intended(route('registrar.admin.dashboard'));
                }

                return redirect()->intended(route('dashboard'));
            }
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));
        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
