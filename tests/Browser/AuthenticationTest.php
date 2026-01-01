<?php

declare(strict_types=1);

/**
 * Authentication Browser Tests
 *
 * Tests for authentication page rendering and basic functionality.
 */

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Login Page', function () {
    it('displays login page correctly', function () {
        $page = visit('/login');

        $page->assertSee('Log in to your account')
            ->assertSee('Email')
            ->assertSee('Password')
            ->assertNoJavaScriptErrors();
    });

    it('shows forgot password link', function () {
        $page = visit('/login');

        $page->assertSee('Forgot password?')
            ->assertNoJavaScriptErrors();
    });

    it('shows sign up link', function () {
        $page = visit('/login');

        $page->assertSee('Sign up')
            ->assertNoJavaScriptErrors();
    });
});

describe('Registration Page', function () {
    it('displays registration page correctly', function () {
        $page = visit('/register');

        $page->assertSee('Create an account')
            ->assertSee('Email')
            ->assertSee('Password')
            ->assertNoJavaScriptErrors();
    });

    it('shows login link', function () {
        $page = visit('/register');

        $page->assertSee('Already have an account')
            ->assertNoJavaScriptErrors();
    });
});

describe('Password Reset Page', function () {
    it('displays forgot password page correctly', function () {
        $page = visit('/forgot-password');

        $page->assertSee('Forgot password')
            ->assertSee('Email')
            ->assertNoJavaScriptErrors();
    });
});
