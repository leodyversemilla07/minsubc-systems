<?php

declare(strict_types=1);

/**
 * USG Admin Functional Browser Tests
 *
 * Tests for USG admin workflows including announcements, events, and officers.
 */

use App\Models\User;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    Role::firstOrCreate(['name' => 'usg-admin']);
    Role::firstOrCreate(['name' => 'usg-officer']);
});

describe('USG Admin Dashboard', function () {
    it('can access admin dashboard', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('usg-admin');

        actingAs($admin);

        $page = visit('/usg/admin');

        $page->assertSee('Dashboard')
            ->assertNoJavaScriptErrors();
    });

    it('shows navigation menu items', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('usg-admin');

        actingAs($admin);

        $page = visit('/usg/admin');

        $page->assertSee('Announcements')
            ->assertSee('Events')
            ->assertSee('Officers')
            ->assertSee('Resolutions')
            ->assertNoJavaScriptErrors();
    });
});

describe('USG Announcements Management', function () {
    it('can access announcements list', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('usg-admin');

        actingAs($admin);

        $page = visit('/usg/admin/announcements');

        $page->assertSee('Announcements')
            ->assertNoJavaScriptErrors();
    });

    it('can access create announcement page directly', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('usg-admin');

        actingAs($admin);

        $page = visit('/usg/admin/announcements/create');

        $page->assertPathIs('/usg/admin/announcements/create')
            ->assertNoJavaScriptErrors();
    });
});

describe('USG Events Management', function () {
    it('can access events list', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('usg-admin');

        actingAs($admin);

        $page = visit('/usg/admin/events');

        $page->assertSee('Events')
            ->assertNoJavaScriptErrors();
    });

    it('can access create event page directly', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('usg-admin');

        actingAs($admin);

        $page = visit('/usg/admin/events/create');

        $page->assertPathIs('/usg/admin/events/create')
            ->assertNoJavaScriptErrors();
    });
});

describe('USG Officers Management', function () {
    it('can access officers list', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('usg-admin');

        actingAs($admin);

        $page = visit('/usg/admin/officers');

        $page->assertSee('Officers')
            ->assertNoJavaScriptErrors();
    });
});

describe('USG Resolutions Management', function () {
    it('can access resolutions list', function () {
        $admin = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('usg-admin');

        actingAs($admin);

        $page = visit('/usg/admin/resolutions');

        $page->assertSee('Resolutions')
            ->assertNoJavaScriptErrors();
    });
});
