<?php

namespace Modules\Research\Providers;

use Nwidart\Modules\Support\ModuleServiceProvider;

class ResearchServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'Research';
    protected string $nameLower = 'research';

    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];
}