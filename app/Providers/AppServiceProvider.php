<?php

namespace App\Providers;

use App\Models\User;
use App\Modules\USG\Models\Event;
use App\Observers\UserObserver;
use App\Observers\USG\EventObserver;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production (Heroku, etc.)
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        // Register observers
        User::observe(UserObserver::class);
        Event::observe(EventObserver::class);
    }
}
