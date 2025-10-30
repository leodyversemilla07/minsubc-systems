<?php

use App\Models\User;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use function Pest\Laravel\delete;

describe('Student Scholarship Views', function () {
    it('allows authenticated student to view their scholarships', function () {
        $studentUser = User::factory()->create();
        $studentUser->assignRole('student');
        
        $scholarship = Scholarship::factory()->create();
        
        ScholarshipRecipient::factory()->create([
            'student_id' => $studentUser->id,
            'scholarship_id' => $scholarship->id,
            'status' => 'Active',
        ]);

        actingAs($studentUser);

        $response = get('/sas/student/scholarships');

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/student/scholarships/index')
            ->has('scholarships')
        );
    });

    it('allows student to view scholarship details', function () {
        $studentUser = User::factory()->create();
        $studentUser->assignRole('student');
        
        $scholarship = Scholarship::factory()->create();
        
        $recipient = ScholarshipRecipient::factory()->create([
            'student_id' => $studentUser->id,
            'scholarship_id' => $scholarship->id,
        ]);

        actingAs($studentUser);

        $response = get("/sas/student/scholarships/{$recipient->id}");

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/student/scholarships/show')
            ->has('scholarship')
        );
    });
});

describe('Admin Scholarship Management', function () {
    it('allows admin to view scholarships index', function () {
        Scholarship::factory()->count(3)->create();

        actingAs($this->adminUser);

        $response = get('/sas/admin/scholarships');

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarships/index')
            ->has('scholarships')
        );
    });

    it('allows admin to view create scholarship page', function () {
        actingAs($this->adminUser);

        $response = get('/sas/admin/scholarships/create');

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarships/create')
        );
    });

    it('allows admin to create new scholarship', function () {
        actingAs($this->adminUser);

        $response = post('/sas/admin/scholarships', [
            'scholarship_name' => 'Test Scholarship',
            'scholarship_code' => 'TEST123',
            'scholarship_type' => 'TES',
            'provider' => 'Test Provider',
            'description' => 'Test Description',
        ]);

        $response->assertRedirect('/sas/admin/scholarships');
        $this->assertDatabaseHas('scholarships', [
            'scholarship_name' => 'Test Scholarship',
            'scholarship_code' => 'TEST123',
        ]);
    });

    it('allows admin to view edit scholarship page', function () {
        $scholarship = Scholarship::factory()->create();

        actingAs($this->adminUser);

        $response = get("/sas/admin/scholarships/{$scholarship->id}/edit");

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarships/edit')
            ->has('scholarship')
        );
    });

    it('allows admin to update scholarship', function () {
        $scholarship = Scholarship::factory()->create();

        actingAs($this->adminUser);

        $response = put("/sas/admin/scholarships/{$scholarship->id}", [
            'scholarship_name' => 'Updated Scholarship',
            'scholarship_code' => $scholarship->scholarship_code,
            'scholarship_type' => $scholarship->scholarship_type,
            'provider' => 'Updated Provider',
            'description' => 'Updated Description',
            'is_active' => true,
        ]);

        $response->assertRedirect('/sas/admin/scholarships');
        $this->assertDatabaseHas('scholarships', [
            'id' => $scholarship->id,
            'scholarship_name' => 'Updated Scholarship',
        ]);
    });

    it('allows admin to delete scholarship', function () {
        $scholarship = Scholarship::factory()->create();

        actingAs($this->adminUser);

        $response = delete("/sas/admin/scholarships/{$scholarship->id}");

        $response->assertRedirect('/sas/admin/scholarships');
        $this->assertDatabaseMissing('scholarships', [
            'id' => $scholarship->id,
        ]);
    });
});

describe('Admin Scholarship Recipients Management', function () {
    it('allows admin to view recipients index', function () {
        $scholarship = Scholarship::factory()->create();
        
        ScholarshipRecipient::factory()->count(3)->create([
            'scholarship_id' => $scholarship->id,
        ]);

        actingAs($this->adminUser);

        $response = get('/sas/admin/scholarship-recipients');

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarship-recipients/index')
            ->has('recipients')
        );
    });

    it('allows admin to view create recipient page', function () {
        actingAs($this->adminUser);

        $response = get('/sas/admin/scholarship-recipients/create');

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarship-recipients/create')
            ->has('students')
            ->has('scholarships')
        );
    });

    it('allows admin to create new recipient', function () {
        $scholarship = Scholarship::factory()->create();
        $student = User::factory()->create();
        $student->assignRole('student');

        actingAs($this->adminUser);

        $response = post('/sas/admin/scholarship-recipients', [
            'student_id' => $student->id,
            'scholarship_id' => $scholarship->id,
            'academic_year' => '2024-2025',
            'semester' => '1st Semester',
            'amount' => 5000,
            'date_awarded' => now()->format('Y-m-d'),
            'expiration_date' => now()->addYear()->format('Y-m-d'),
            'status' => 'Active',
        ]);

        $response->assertRedirect('/sas/admin/scholarship-recipients');
        $this->assertDatabaseHas('scholarship_recipients', [
            'student_id' => $student->id,
            'scholarship_id' => $scholarship->id,
        ]);
    });

    it('allows admin to view edit recipient page', function () {
        $recipient = ScholarshipRecipient::factory()->create();

        actingAs($this->adminUser);

        $response = get("/sas/admin/scholarship-recipients/{$recipient->id}/edit");

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarship-recipients/edit')
            ->has('recipient')
        );
    });

    it('allows admin to update recipient', function () {
        $recipient = ScholarshipRecipient::factory()->create([
            'status' => 'Active',
        ]);

        actingAs($this->adminUser);

        $response = put("/sas/admin/scholarship-recipients/{$recipient->id}", [
            'student_id' => $recipient->student_id,
            'scholarship_id' => $recipient->scholarship_id,
            'academic_year' => $recipient->academic_year,
            'semester' => $recipient->semester,
            'amount' => $recipient->amount,
            'date_awarded' => $recipient->date_awarded->format('Y-m-d'),
            'expiration_date' => $recipient->expiration_date->format('Y-m-d'),
            'status' => 'Completed',
            'requirements_complete' => true,
        ]);

        $response->assertRedirect('/sas/admin/scholarship-recipients');
        $this->assertDatabaseHas('scholarship_recipients', [
            'id' => $recipient->id,
            'status' => 'Completed',
            'requirements_complete' => true,
        ]);
    });

    it('prevents students from accessing admin routes', function () {
        actingAs($this->studentUser);

        $response = get('/sas/admin/scholarships');

        $response->assertForbidden();
    });
});

describe('Admin Dashboard', function () {
    it('allows admin to view SAS dashboard', function () {
        actingAs($this->adminUser);

        $response = get('/sas/admin/dashboard');

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/dashboard')
            ->has('statistics')
        );
    });

    it('dashboard shows correct statistics', function () {
        // Create test data
        Scholarship::factory()->count(5)->create();
        ScholarshipRecipient::factory()->count(10)->create();

        actingAs($this->adminUser);

        $response = get('/sas/admin/dashboard');

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->where('statistics.scholarships', 5)
            ->where('statistics.recipients', 10)
        );
    });
});

