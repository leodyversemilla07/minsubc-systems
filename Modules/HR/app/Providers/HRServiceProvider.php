<?php

namespace Modules\HR\Providers;

use Nwidart\Modules\Support\ModuleServiceProvider;

class HRServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'HR';
    protected string $nameLower = 'hr';

    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];
}