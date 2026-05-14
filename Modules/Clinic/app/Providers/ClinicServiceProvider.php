<?php

namespace Modules\Clinic\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Clinic\Providers\EventServiceProvider;
use Modules\Clinic\Providers\RouteServiceProvider;

class ClinicServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Clinic';
    protected string $moduleNameLower = 'clinic';

    public function boot(): void
    {
        $this->registerConfig();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'database/migrations'));
    }

    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);
        $this->app->register(EventServiceProvider::class);
    }

    protected function registerConfig(): void
    {
        $config = module_path($this->moduleName, 'config/config.php');
        $this->publishes([$config => config_path($this->moduleNameLower . '.php')], 'config');
        $this->mergeConfigFrom($config, $this->moduleNameLower);
    }
}