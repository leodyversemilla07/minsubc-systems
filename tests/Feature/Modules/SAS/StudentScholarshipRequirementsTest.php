<?php

use App\Models\User;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Modules\SAS\Models\ScholarshipRequirement;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    // Create a test student with student role
    $this->student = User::factory()->create([
        'first_name' => 'Test',
        'last_name' => 'Student',
        'email' => 'student@test.com',
    ]);
    $this->student->assignRole('student');

    // Create a scholarship
    $scholarship = Scholarship::factory()->create([
        'scholarship_name' => 'Test Scholarship',
        'scholarship_type' => 'TES',
    ]);

    // Create a recipient record for the student
    $this->recipient = ScholarshipRecipient::factory()->create([
        'student_id' => $this->student->id,
        'scholarship_id' => $scholarship->id,
        'status' => 'Active',
    ]);

    // Create requirements for this scholarship
    $this->requirement1 = ScholarshipRequirement::factory()->create([
        'recipient_id' => $this->recipient->id,
        'requirement_name' => 'Grade Report',
        'is_submitted' => false,
        'deadline' => now()->addDays(7),
    ]);

    $this->requirement2 = ScholarshipRequirement::factory()->create([
        'recipient_id' => $this->recipient->id,
        'requirement_name' => 'Scholarship Application Form',
        'is_submitted' => true,
        'submission_date' => now()->subDays(2),
        'file_path' => 'test/application.pdf',
    ]);

    Storage::fake('public');
});

test('student can view requirements page for their scholarship', function () {
    $response = $this->actingAs($this->student)
        ->get("/sas/student/scholarships/{$this->recipient->id}/requirements");

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('sas/student/scholarships/requirements')
            ->has('recipient')
            ->has('requirements', 2)
            ->has('stats', fn ($stats) => $stats
                ->where('total', 2)
                ->where('submitted', 1)
                ->where('pending', 1)
                ->where('completion_percentage', 50)
            )
        );
});

test('student cannot view requirements for another students scholarship', function () {
    $anotherStudent = User::factory()->create();
    $anotherRecipient = ScholarshipRecipient::factory()->create([
        'student_id' => $anotherStudent->id,
    ]);

    $response = $this->actingAs($this->student)
        ->get("/sas/student/scholarships/{$anotherRecipient->id}/requirements");

    $response->assertForbidden();
});

test('student can upload a requirement document', function () {
    $file = UploadedFile::fake()->create('grade_report.pdf', 100, 'application/pdf');

    $response = $this->actingAs($this->student)
        ->post("/sas/student/scholarships/{$this->recipient->id}/upload-requirement", [
            'requirement_id' => $this->requirement1->id,
            'file' => $file,
        ]);

    $response->assertRedirect();

    // Verify the requirement was updated
    $this->requirement1->refresh();
    expect($this->requirement1->is_submitted)->toBeTrue()
        ->and($this->requirement1->file_path)->not->toBeNull()
        ->and($this->requirement1->submission_date)->not->toBeNull();

    // Verify file was stored
    Storage::disk('public')->assertExists($this->requirement1->file_path);
});

test('student can only upload valid file types for requirements', function () {
    $invalidFile = UploadedFile::fake()->create('document.exe', 100);

    $response = $this->actingAs($this->student)
        ->post("/sas/student/scholarships/{$this->recipient->id}/upload-requirement", [
            'requirement_id' => $this->requirement1->id,
            'file' => $invalidFile,
        ]);

    $response->assertSessionHasErrors('file');
});

test('student cannot upload requirement for another students scholarship', function () {
    $anotherStudent = User::factory()->create();
    $anotherRecipient = ScholarshipRecipient::factory()->create([
        'student_id' => $anotherStudent->id,
    ]);
    $anotherRequirement = ScholarshipRequirement::factory()->create([
        'recipient_id' => $anotherRecipient->id,
    ]);

    $file = UploadedFile::fake()->create('grade_report.pdf', 100, 'application/pdf');

    $response = $this->actingAs($this->student)
        ->post("/sas/student/scholarships/{$anotherRecipient->id}/upload-requirement", [
            'requirement_id' => $anotherRequirement->id,
            'file' => $file,
        ]);

    $response->assertForbidden();
});

test('guest cannot access requirements page', function () {
    $response = $this->get("/sas/student/scholarships/{$this->recipient->id}/requirements");

    $response->assertRedirect('/login');
});
