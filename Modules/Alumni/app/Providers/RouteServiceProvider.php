<?php

namespace Modules\Alumni\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('web')
                ->group(module_path('Alumni', 'routes/web.php'));
            Route::middleware('api')
                ->prefix('api/alumni')
                ->group(module_path('Alumni', 'routes/api.php'));
        });
    }
}