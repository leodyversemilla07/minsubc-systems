<?php

use App\Models\User;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Student;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

test('student can create document request', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a user and student
    $user = User::factory()->create();
    $student = Student::factory()->create(['user_id' => $user->id]);

    // Assign the student role and permissions
    $user->assignRole('student');

    // Act as the user
    $response = $this->actingAs($user)->get(route('registrar.document-requests.create'));

    // Assert the page loads
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page->component('registrar/document-requests/create'));
});

test('document request can be stored', function () {
    // Seed roles and permissions
    $this->seed(RolesAndPermissionsSeeder::class);

    // Create a user and student
    $user = User::factory()->create();
    $student = Student::factory()->create(['user_id' => $user->id]);

    // Assign the student role and permissions
    $user->assignRole('student');

    $requestData = [
        'document_type' => 'coe',
        'processing_type' => 'regular',
        'quantity' => 1,
        'purpose' => 'For employment purposes',
    ];

    // Act as the user and submit the form
    $response = $this->actingAs($user)->post(route('registrar.document-requests.store'), $requestData);

    // Assert redirect and success message
    $response->assertRedirect(route('registrar.document-requests.index'));
    $response->assertSessionHas('success');

    // Assert the document request was created
    $this->assertDatabaseHas('document_requests', [
        'student_id' => $student->student_id,
        'document_type' => 'coe',
        'processing_type' => 'regular',
        'quantity' => 1,
        'purpose' => 'For employment purposes',
        'status' => 'pending_payment',
    ]);
});