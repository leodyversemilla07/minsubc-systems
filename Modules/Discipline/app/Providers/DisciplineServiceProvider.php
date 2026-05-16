<?php

namespace Modules\Discipline\Providers;

use Illuminate\Support\ServiceProvider;

class DisciplineServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Discipline';
    protected string $moduleNameLower = 'discipline';

    public function boot(): void
    {
        $this->registerConfig();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'database/migrations'));
    }

    public function register(): void
    {
        $this->app->register(\Modules\Discipline\Providers\RouteServiceProvider::class);
        $this->app->register(\Modules\Discipline\Providers\EventServiceProvider::class);
    }

    protected function registerConfig(): void
    {
        $config = module_path($this->moduleName, 'config/config.php');
        $this->publishes([$config => config_path($this->moduleNameLower . '.php')], 'config');
        $this->mergeConfigFrom($config, $this->moduleNameLower);
    }
}