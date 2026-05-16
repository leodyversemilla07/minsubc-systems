<?php

namespace Modules\Dormitory\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('web')
                ->group(module_path('Dormitory', 'routes/web.php'));
            Route::middleware('api')
                ->prefix('api/dormitory')
                ->group(module_path('Dormitory', 'routes/api.php'));
        });
    }
}