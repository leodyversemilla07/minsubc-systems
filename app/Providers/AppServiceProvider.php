<?php

namespace App\Providers;

use App\Models\User;
use App\Modules\USG\Models\Event;
use App\Observers\UserObserver;
use App\Observers\USG\EventObserver;
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
        Event::observe(EventObserver::class);
    }
}
