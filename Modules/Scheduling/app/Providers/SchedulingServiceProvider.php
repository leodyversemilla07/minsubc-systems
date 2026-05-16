<?php

namespace Modules\Scheduling\Providers;

use Illuminate\Support\ServiceProvider;

class SchedulingServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Scheduling';
    protected string $moduleNameLower = 'scheduling';

    public function boot(): void
    {
        $this->registerConfig();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'database/migrations'));
    }

    public function register(): void
    {
        $this->app->register(\Modules\Scheduling\Providers\RouteServiceProvider::class);
        $this->app->register(\Modules\Scheduling\Providers\EventServiceProvider::class);
    }

    protected function registerConfig(): void
    {
        $config = module_path($this->moduleName, 'config/config.php');
        $this->publishes([$config => config_path($this->moduleNameLower . '.php')], 'config');
        $this->mergeConfigFrom($config, $this->moduleNameLower);
    }
}