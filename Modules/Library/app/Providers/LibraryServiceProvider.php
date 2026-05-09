<?php

namespace Modules\Library\Providers;

use Nwidart\Modules\Support\ModuleServiceProvider;

class LibraryServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'Library';
    protected string $nameLower = 'library';

    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];
}