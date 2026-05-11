<?php

namespace Modules\Guidance\Providers;

use Nwidart\Modules\Support\ModuleServiceProvider;

class GuidanceServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'Guidance';
    protected string $nameLower = 'guidance';

    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];
}