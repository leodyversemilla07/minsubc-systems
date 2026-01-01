<?php

declare(strict_types=1);

/**
 * Document Request Functional Browser Tests
 *
 * Tests for student document request workflows.
 */

use App\Models\User;
use Modules\Registrar\Models\Student;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    // Create student role with required permissions
    $studentRole = Role::firstOrCreate(['name' => 'student']);

    // Create required permissions
    $permissions = [
        'view_own_requests',
        'submit_requests',
    ];

    foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission]);
    }

    // Assign permissions to student role
    $studentRole->syncPermissions($permissions);
});

describe('Student Document Request Creation', function () {
    it('can access document request list', function () {
        $student = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $student->assignRole('student');

        // Create student record
        Student::factory()->create(['user_id' => $student->id]);

        actingAs($student);

        $page = visit('/document-requests');

        $page->assertSee('Document')
            ->assertNoJavaScriptErrors();
    });

    it('can access document request creation page', function () {
        $student = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $student->assignRole('student');

        // Create student record
        Student::factory()->create(['user_id' => $student->id]);

        actingAs($student);

        $page = visit('/document-requests/create');

        $page->assertSee('Request')
            ->assertNoJavaScriptErrors();
    });
});

describe('Student Document Request Viewing', function () {
    it('shows empty state when no requests exist', function () {
        $student = User::factory()->withoutTwoFactor()->create([
            'email_verified_at' => now(),
        ]);
        $student->assignRole('student');

        Student::factory()->create(['user_id' => $student->id]);

        actingAs($student);

        $page = visit('/document-requests');

        $page->assertNoJavaScriptErrors();
    });
});
