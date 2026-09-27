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
            'voting-admin',
            'voting-manager',
            'curriculum-admin',
            'curriculum-staff',
            'research-admin',
            'research-panelist',
            'research-adviser',
            'accounting-admin',
            'accounting-staff',
            'admission-admin',
            'admission-staff',
            'alumni-admin',
            'alumni-staff',
            'analytics-viewer',
            'clinic-admin',
            'clinic-doctor',
            'clinic-nurse',
            'discipline-admin',
            'discipline-staff',
            'dormitory-admin',
            'dormitory-warden',
            'facilities-admin',
            'facilities-staff',
            'guidance-admin',
            'guidance-counselor',
            'helpdesk-admin',
            'helpdesk-technician',
            'hr-admin',
            'hr-staff',
            'library-admin',
            'library-staff',
            'scheduling-admin',
            'scheduling-staff',
        ];

        foreach ($roles as $roleName) {
            if (! Role::where('name', $roleName)->exists()) {
                Role::create(['name' => $roleName]);
            }
        }
    }
}
