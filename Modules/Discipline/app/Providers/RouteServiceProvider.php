<?php

namespace Modules\Discipline\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('web')
                ->group(module_path('Discipline', 'routes/web.php'));
            Route::middleware('api')
                ->prefix('api/discipline')
                ->group(module_path('Discipline', 'routes/api.php'));
        });
    }
}