<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Notification;
use Spatie\Permission\Models\Role;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Fake notifications to avoid database conflicts
        Notification::fake();

        // Create roles that are commonly used in tests
        $this->createRolesIfNeeded();
    }

    protected function createRolesIfNeeded(): void
    {
        $roles = ['admin', 'student', 'org_adviser', 'sas_officer', 'sas_admin', 'registrar', 'cashier'];

        foreach ($roles as $roleName) {
            if (! Role::where('name', $roleName)->exists()) {
                Role::create(['name' => $roleName]);
            }
        }
    }
}
