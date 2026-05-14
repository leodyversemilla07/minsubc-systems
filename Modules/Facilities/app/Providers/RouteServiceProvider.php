<?php

namespace Modules\Facilities\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('web')
                ->group(module_path('Facilities', 'routes/web.php'));
            Route::middleware('api')
                ->prefix('api/facilities')
                ->group(module_path('Facilities', 'routes/api.php'));
        });
    }
}