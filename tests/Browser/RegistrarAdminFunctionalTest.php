<?php

declare(strict_types=1);

/**
 * Registrar Admin Functional Browser Tests
 *
 * Tests for Registrar admin dashboard and document request management.
 */

use App\Models\User;
use Modules\Registrar\Models\DocumentRequest;
use Modules\Registrar\Models\DocumentType;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    Role::firstOrCreate(['name' => 'registrar-admin']);
    Role::firstOrCreate(['name' => 'registrar-staff']);
    Role::firstOrCreate(['name' => 'cashier']);
});

describe('Registrar Admin Dashboard', function () {
    it('can access admin dashboard', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('registrar-admin');

        actingAs($admin);

        $page = visit('/admin');

        $page->assertSee('Dashboard')
            ->assertNoJavaScriptErrors();
    });

    it('shows document request statistics', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('registrar-admin');

        actingAs($admin);

        $page = visit('/admin');

        $page->assertSee('Requests')
            ->assertNoJavaScriptErrors();
    });
});

describe('Registrar Analytics', function () {
    it('can access analytics page', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('registrar-admin');

        actingAs($admin);

        $page = visit('/admin/analytics');

        $page->assertNoJavaScriptErrors();
    });
});

describe('Cashier Dashboard', function () {
    it('can access cashier dashboard', function () {
        $cashier = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $cashier->assignRole('cashier');

        actingAs($cashier);

        $page = visit('/cashier');

        $page->assertSee('Cashier')
            ->assertNoJavaScriptErrors();
    });
});

describe('Student Management', function () {
    it('can access students page', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('registrar-admin');

        actingAs($admin);

        $page = visit('/students');

        $page->assertPathIs('/students')
            ->assertNoJavaScriptErrors();
    });
});
