<?php

namespace Modules\Curriculum\Providers;

use Nwidart\Modules\Support\ModuleServiceProvider;

class CurriculumServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'Curriculum';
    protected string $nameLower = 'curriculum';
    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];
}