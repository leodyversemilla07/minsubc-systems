<?php

namespace Modules\Scheduling\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('web')
                ->group(module_path('Scheduling', 'routes/web.php'));
            Route::middleware('api')
                ->prefix('api/scheduling')
                ->group(module_path('Scheduling', 'routes/api.php'));
        });
    }
}