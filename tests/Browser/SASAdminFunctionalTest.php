<?php

declare(strict_types=1);

/**
 * SAS Admin Functional Browser Tests
 *
 * Tests for Student Affairs and Services admin workflows.
 */

use App\Models\User;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    Role::firstOrCreate(['name' => 'sas-admin']);
    Role::firstOrCreate(['name' => 'sas-staff']);
});

describe('SAS Admin Dashboard', function () {
    it('can access admin dashboard', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('sas-admin');

        actingAs($admin);

        $page = visit('/sas/admin/dashboard');

        $page->assertPathIs('/sas/admin/dashboard')
            ->assertNoJavaScriptErrors();
    });
});

describe('SAS Scholarships Management', function () {
    it('can access scholarships list', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('sas-admin');

        actingAs($admin);

        $page = visit('/sas/admin/scholarships');

        $page->assertSee('Scholarship')
            ->assertNoJavaScriptErrors();
    });
});

describe('SAS Organizations Management', function () {
    it('can access organizations list', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('sas-admin');

        actingAs($admin);

        $page = visit('/sas/admin/organizations');

        $page->assertSee('Organization')
            ->assertNoJavaScriptErrors();
    });
});

describe('SAS Insurance Management', function () {
    it('can access insurance list', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('sas-admin');

        actingAs($admin);

        $page = visit('/sas/admin/insurance');

        $page->assertSee('Insurance')
            ->assertNoJavaScriptErrors();
    });
});

describe('SAS Activities Management', function () {
    it('can access activities list', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('sas-admin');

        actingAs($admin);

        $page = visit('/sas/admin/activities');

        $page->assertNoJavaScriptErrors();
    });
});
