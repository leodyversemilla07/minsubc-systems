<?php

namespace Modules\Accounting\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    protected string $name = 'Accounting';

    public function map(): void
    {
        $this->mapWebRoutes();
        $this->mapApiRoutes();
    }

    protected function mapWebRoutes(): void
    {
        Route::middleware('web')
            ->namespace('Modules\Accounting\Http\Controllers')
            ->group(module_path($this->name, 'routes/web.php'));
    }

    protected function mapApiRoutes(): void
    {
        Route::middleware('api')
            ->prefix('api/accounting')
            ->namespace('Modules\Accounting\Http\Controllers')
            ->group(module_path($this->name, 'routes/api.php'));
    }
}