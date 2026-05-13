<?php

namespace Modules\Alumni\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Alumni\Providers\EventServiceProvider;
use Modules\Alumni\Providers\RouteServiceProvider;

class AlumniServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Alumni';
    protected string $moduleNameLower = 'alumni';

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