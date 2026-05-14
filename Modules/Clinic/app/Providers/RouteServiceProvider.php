<?php

namespace Modules\Clinic\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('web')
                ->group(module_path('Clinic', 'routes/web.php'));
            Route::middleware('api')
                ->prefix('api/clinic')
                ->group(module_path('Clinic', 'routes/api.php'));
        });
    }
}