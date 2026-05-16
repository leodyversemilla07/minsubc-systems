<?php

namespace Modules\Dormitory\Providers;

use Illuminate\Support\ServiceProvider;

class DormitoryServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Dormitory';
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
        $this->publishes([$config => config_path('dormitory.php')], 'config');
        $this->mergeConfigFrom($config, 'dormitory');
    }
}