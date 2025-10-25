<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    // Ensure the usg-admin role exists
    Role::firstOrCreate(['name' => 'usg-admin']);
});

it('redirects usg-admin to usg admin dashboard when accessing dashboard', function () {
    // Create a USG admin user
    $user = User::factory()->create([
        'email' => 'test-usg-admin@minsu.edu.ph',
        'password' => Hash::make('password123'),
        'email_verified_at' => now(),
    ]);
    $user->assignRole('usg-admin');

    // Act as the user and access dashboard
    actingAs($user);

    $response = $this->get('/dashboard');

    // Should redirect to USG admin dashboard
    $response->assertRedirect(route('usg.admin.dashboard'));
});

it('redirects usg-officer to usg admin dashboard when accessing dashboard', function () {
    Role::firstOrCreate(['name' => 'usg-officer']);

    $user = User::factory()->create([
        'email' => 'test-usg-officer@minsu.edu.ph',
        'password' => Hash::make('password123'),
        'email_verified_at' => now(),
    ]);
    $user->assignRole('usg-officer');

    actingAs($user);

    $response = $this->get('/dashboard');

    $response->assertRedirect(route('usg.admin.dashboard'));
});

it('does not redirect student when accessing dashboard', function () {
    Role::firstOrCreate(['name' => 'student']);

    $user = User::factory()->create([
        'email' => 'test-student@minsu.edu.ph',
        'password' => Hash::make('password123'),
        'email_verified_at' => now(),
    ]);
    $user->assignRole('student');

    actingAs($user);

    $response = $this->get('/dashboard');

    // Students should see the dashboard page (200 OK), not be redirected
    $response->assertOk();
});

it('redirects registrar-admin to registrar admin dashboard when accessing dashboard', function () {
    Role::firstOrCreate(['name' => 'registrar-admin']);

    $user = User::factory()->create([
        'email' => 'test-registrar-admin@minsu.edu.ph',
        'password' => Hash::make('password123'),
        'email_verified_at' => now(),
    ]);
    $user->assignRole('registrar-admin');

    actingAs($user);

    $response = $this->get('/dashboard');

    $response->assertRedirect(route('registrar.admin.dashboard'));
});

it('redirects registrar-staff to registrar admin dashboard when accessing dashboard', function () {
    Role::firstOrCreate(['name' => 'registrar-staff']);

    $user = User::factory()->create([
        'email' => 'test-registrar-staff@minsu.edu.ph',
        'password' => Hash::make('password123'),
        'email_verified_at' => now(),
    ]);
    $user->assignRole('registrar-staff');

    actingAs($user);

    $response = $this->get('/dashboard');

    $response->assertRedirect(route('registrar.admin.dashboard'));
});

it('redirects the seeded usg-admin user correctly when accessing dashboard', function () {
    // Find the seeded USG admin user
    $user = User::where('email', 'usg-admin@minsu.edu.ph')->first();

    // If the user doesn't exist, create it for this test
    if (! $user) {
        $user = User::factory()->create([
            'first_name' => 'USG',
            'last_name' => 'Administrator',
            'email' => 'usg-admin@minsu.edu.ph',
            'password' => Hash::make('USGAdmin@2024'),
            'email_verified_at' => now(),
        ]);
        $user->assignRole('usg-admin');
    }

    actingAs($user);

    $response = $this->get('/dashboard');

    $response->assertRedirect(route('usg.admin.dashboard'));
});
