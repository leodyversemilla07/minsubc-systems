<?php

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
});

test('new users can register', function () {
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
});

test('new users can register with 2018 student id', function () {
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
