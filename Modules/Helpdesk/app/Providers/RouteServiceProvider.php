<?php

namespace Modules\Helpdesk\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('web')
                ->group(module_path('Helpdesk', 'routes/web.php'));
            Route::middleware('api')
                ->prefix('api/helpdesk')
                ->group(module_path('Helpdesk', 'routes/api.php'));
        });
    }
}