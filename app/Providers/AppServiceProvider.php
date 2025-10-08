<?php

namespace App\Providers;

use App\Models\User;
use App\Observers\UserObserver;
use Illuminate\Console\Scheduling\Schedule;
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
        // Register observers
        User::observe(UserObserver::class);

        // Schedule the command to run hourly
        $this->app->booted(function () {
            $schedule = $this->app->make(Schedule::class);
            $schedule->command('app:expire-unpaid-document-requests')
                ->hourly()
                ->withoutOverlapping()
                ->runInBackground();
        });
    }
}
