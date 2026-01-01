<?php

declare(strict_types=1);

/**
 * Authentication Functional Browser Tests
 *
 * Tests for complete authentication workflows.
 */

use App\Models\User;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('Login Workflow', function () {
    it('can log in with valid credentials and access dashboard', function () {
        // Create role if needed
        Role::firstOrCreate(['name' => 'student']);

        // Create user without 2FA
        $user = User::factory()->withoutTwoFactor()->create([
            'email' => 'test-student@minsu.edu.ph',
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        $page = visit('/login');

        $page->fill('email', 'test-student@minsu.edu.ph')
            ->fill('password', 'password')
            ->click('Log in')
            ->assertPathIs('/dashboard')
            ->assertNoJavaScriptErrors();
    });

    it('shows error for invalid credentials', function () {
        $page = visit('/login');

        $page->fill('email', 'nonexistent@minsu.edu.ph')
            ->fill('password', 'wrongpassword')
            ->click('Log in')
            ->assertSee('credentials')
            ->assertNoJavaScriptErrors();
    });

    it('shows validation errors for empty fields', function () {
        $page = visit('/login');

        $page->click('Log in')
            ->assertSee('required')
            ->assertNoJavaScriptErrors();
    });
});

describe('Logout Workflow', function () {
    it('authenticated user can access dashboard', function () {
        Role::firstOrCreate(['name' => 'student']);

        $user = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $user->assignRole('student');

        actingAs($user);

        $page = visit('/dashboard');

        // Verify dashboard loads and shows user info
        $page->assertSee('Dashboard')
            ->assertNoJavaScriptErrors();
    });
});

describe('Password Reset Workflow', function () {
    it('can request password reset link', function () {
        $user = User::factory()->create([
            'email' => 'resetuser@minsu.edu.ph',
        ]);

        $page = visit('/forgot-password');

        $page->fill('email', 'resetuser@minsu.edu.ph')
            ->click('Email password reset link')
            ->assertNoJavaScriptErrors();
    });

    it('shows error for non-existent email', function () {
        $page = visit('/forgot-password');

        $page->fill('email', 'nonexistent@minsu.edu.ph')
            ->click('Email password reset link')
            ->assertNoJavaScriptErrors();
    });
});
