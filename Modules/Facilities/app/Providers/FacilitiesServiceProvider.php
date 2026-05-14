<?php

namespace Modules\Facilities\Providers;

use Illuminate\Support\ServiceProvider;

class FacilitiesServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Facilities';
    protected string $moduleNameLower = 'facilities';

    public function boot(): void
    {
        $this->registerConfig();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'database/migrations'));
    }

    public function register(): void
    {
        $this->app->register(\Modules\Facilities\Providers\RouteServiceProvider::class);
        $this->app->register(\Modules\Facilities\Providers\EventServiceProvider::class);
    }

    protected function registerConfig(): void
    {
        $config = module_path($this->moduleName, 'config/config.php');
        $this->publishes([$config => config_path($this->moduleNameLower . '.php')], 'config');
        $this->mergeConfigFrom($config, $this->moduleNameLower);
    }
}