<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Fake notifications to avoid database conflicts
        Notification::fake();

        // Only create roles if the roles table exists (might not exist in some test setups)
        try {
            $this->createRolesIfNeeded();
        } catch (\Exception $e) {
            // Silently skip - roles will be seeded by tests that need them
        }
    }

    protected function createRolesIfNeeded(): void
    {
        $roles = [
            'admin',
            'student',
            'org_adviser',
            'sas_officer',
            'sas-admin',
            'sas-staff',
            'registrar',
            'registrar-admin',
            'registrar-staff',
            'cashier',
            'super-admin',
            'usg-admin',
            'usg-officer',
        ];

        foreach ($roles as $roleName) {
            if (! Role::where('name', $roleName)->exists()) {
                Role::create(['name' => $roleName]);
            }
        }
    }
}