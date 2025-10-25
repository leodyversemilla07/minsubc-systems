<?php

use Database\Seeders\RolesAndPermissionsSeeder;

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
});

test('new users can register', function () {
    // Seed roles and permissions for testing
    $this->seed(RolesAndPermissionsSeeder::class);

    $response = $this->post(route('register.store'), [
        'first_name' => 'Test',
        'middle_name' => 'User',
        'last_name' => 'Example',
        'email' => 'test@example.com',
        'student_id' => 'MBC2025-9999',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    // Assert that the user has the student role assigned
    $user = auth()->user();
    expect($user->hasRole('student'))->toBeTrue();
    expect($user->hasPermissionTo('view_own_requests'))->toBeTrue();
});

test('new users can register with 2018 student id', function () {
    // Seed roles and permissions for testing
    $this->seed(RolesAndPermissionsSeeder::class);

    $response = $this->post(route('register.store'), [
        'first_name' => 'Test',
        'middle_name' => 'User',
        'last_name' => 'Example',
        'email' => 'test2@example.com',
        'student_id' => '2018-0001',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    // Assert that the user has the student role assigned
    $user = auth()->user();
    expect($user->hasRole('student'))->toBeTrue();
    expect($user->hasPermissionTo('view_own_requests'))->toBeTrue();
});

test('registration fails with invalid student id', function () {
    $response = $this->post(route('register.store'), [
        'first_name' => 'Test',
        'middle_name' => 'User',
        'last_name' => 'Example',
        'email' => 'test@example.com',
        'student_id' => 'INVALID-1234',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertInvalid(['student_id']);
});
