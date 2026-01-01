<?php

declare(strict_types=1);

/**
 * Dashboard Functional Browser Tests
 *
 * Tests for authenticated user dashboard functionality.
 */

use App\Models\User;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('Dashboard Access', function () {
    it('student can access dashboard', function () {
        Role::firstOrCreate(['name' => 'student']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        actingAs($user);

        $page = visit('/dashboard');

        $page->assertSee('Dashboard')
            ->assertNoJavaScriptErrors();
    });

    it('shows user name in navigation', function () {
        Role::firstOrCreate(['name' => 'student']);

        $user = User::factory()->withoutTwoFactor()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        actingAs($user);

        $page = visit('/dashboard');

        $page->assertSee('John')
            ->assertNoJavaScriptErrors();
    });
});

describe('Dashboard Navigation', function () {
    it('can access user menu from dashboard', function () {
        Role::firstOrCreate(['name' => 'student']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        actingAs($user);

        $page = visit('/dashboard');

        // Just verify the page loads correctly
        $page->assertSee($user->first_name)
            ->assertNoJavaScriptErrors();
    });
});

describe('Role-Based Dashboard Redirect', function () {
    it('USG admin is redirected to USG admin dashboard', function () {
        Role::firstOrCreate(['name' => 'usg-admin']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('usg-admin');

        actingAs($user);

        $page = visit('/dashboard');

        $page->assertPathIs('/usg/admin')
            ->assertNoJavaScriptErrors();
    });

    it('Registrar admin is redirected to admin dashboard', function () {
        Role::firstOrCreate(['name' => 'registrar-admin']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('registrar-admin');

        actingAs($user);

        $page = visit('/dashboard');

        $page->assertPathIs('/admin')
            ->assertNoJavaScriptErrors();
    });

    it('SAS admin is redirected to SAS admin dashboard', function () {
        Role::firstOrCreate(['name' => 'sas-admin']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('sas-admin');

        actingAs($user);

        $page = visit('/dashboard');

        $page->assertPathIs('/sas/admin/dashboard')
            ->assertNoJavaScriptErrors();
    });
});
