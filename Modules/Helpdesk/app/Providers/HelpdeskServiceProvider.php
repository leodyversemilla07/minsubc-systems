<?php

namespace Modules\Helpdesk\Providers;

use Illuminate\Support\ServiceProvider;

class HelpdeskServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Helpdesk';
    protected string $moduleNameLower = 'helpdesk';

    public function boot(): void
    {
        $this->registerConfig();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'database/migrations'));
    }

    public function register(): void
    {
        $this->app->register(\Modules\Helpdesk\Providers\RouteServiceProvider::class);
        $this->app->register(\Modules\Helpdesk\Providers\EventServiceProvider::class);
    }

    protected function registerConfig(): void
    {
        $config = module_path($this->moduleName, 'config/config.php');
        $this->publishes([$config => config_path($this->moduleNameLower . '.php')], 'config');
        $this->mergeConfigFrom($config, $this->moduleNameLower);
    }
}