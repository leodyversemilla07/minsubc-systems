<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Database\Seeders\USGAdminSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Seed roles first (now includes USG roles)
    $this->seed(RolesAndPermissionsSeeder::class);
});

it('creates a default USG admin user', function () {
    $this->seed(USGAdminSeeder::class);

    $user = User::where('email', 'usg-admin@minsu.edu.ph')->first();

    expect($user)->not->toBeNull()
        ->and($user->first_name)->toBe('USG')
        ->and($user->last_name)->toBe('Administrator')
        ->and($user->email_verified_at)->not->toBeNull()
        ->and($user->hasRole('usg-admin'))->toBeTrue();
});

it('does not duplicate USG admin user on multiple runs', function () {
    $this->seed(USGAdminSeeder::class);
    $this->seed(USGAdminSeeder::class);

    $count = User::where('email', 'usg-admin@minsu.edu.ph')->count();

    expect($count)->toBe(1);
});

it('assigns usg-admin role to existing user without the role', function () {
    // Create user without role
    $user = User::create([
        'first_name' => 'USG',
        'last_name' => 'Administrator',
        'email' => 'usg-admin@minsu.edu.ph',
        'password' => bcrypt('password'),
        'email_verified_at' => now(),
    ]);

    expect($user->hasRole('usg-admin'))->toBeFalse();

    $this->seed(USGAdminSeeder::class);

    $user->refresh();

    expect($user->hasRole('usg-admin'))->toBeTrue();
});

it('fails gracefully when usg-admin role does not exist', function () {
    // Delete the role
    Role::where('name', 'usg-admin')->delete();

    // Should not throw exception
    $this->seed(USGAdminSeeder::class);

    $user = User::where('email', 'usg-admin@minsu.edu.ph')->first();

    expect($user)->toBeNull();
});
