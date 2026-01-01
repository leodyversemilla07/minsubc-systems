<?php

declare(strict_types=1);

/**
 * User Settings Functional Browser Tests
 *
 * Tests for user profile and settings management.
 */

use App\Models\User;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('Profile Settings', function () {
    it('can access profile settings page', function () {
        Role::firstOrCreate(['name' => 'student']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        actingAs($user);

        $page = visit('/settings/profile');

        $page->assertSee('Profile')
            ->assertNoJavaScriptErrors();
    });

    it('shows current user information', function () {
        Role::firstOrCreate(['name' => 'student']);

        $user = User::factory()->withoutTwoFactor()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        actingAs($user);

        $page = visit('/settings/profile');

        $page->assertSee('John')
            ->assertSee('Doe')
            ->assertNoJavaScriptErrors();
    });
});

describe('Password Settings', function () {
    it('can access password settings page', function () {
        Role::firstOrCreate(['name' => 'student']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        actingAs($user);

        $page = visit('/settings/password');

        $page->assertSee('Password')
            ->assertNoJavaScriptErrors();
    });
});

describe('Appearance Settings', function () {
    it('can access appearance settings page', function () {
        Role::firstOrCreate(['name' => 'student']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        actingAs($user);

        $page = visit('/settings/appearance');

        $page->assertSee('Appearance')
            ->assertNoJavaScriptErrors();
    });
});
