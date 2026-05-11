<?php

namespace Modules\Accounting\Providers;

use Nwidart\Modules\Support\ModuleServiceProvider;

class AccountingServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'Accounting';
    protected string $nameLower = 'accounting';

    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];
}