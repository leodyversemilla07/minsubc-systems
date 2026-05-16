<?php

namespace Modules\Analytics\Providers;

use Illuminate\Support\ServiceProvider;

class AnalyticsServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Analytics';
    public function boot(): void
    {
        $this->registerConfig();
    }
    public function register(): void
    {
        $this->app->register(\Modules\Analytics\Providers\RouteServiceProvider::class);
    }
    protected function registerConfig(): void
    {
        $config = module_path($this->moduleName, 'config/config.php');
        $this->publishes([$config => config_path('analytics.php')], 'config');
        $this->mergeConfigFrom($config, 'analytics');
    }
}