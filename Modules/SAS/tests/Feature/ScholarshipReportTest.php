<?php

use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::create(['name' => 'sas-admin']);
    $admin = \App\Models\User::factory()->create();
    $admin->assignRole('sas-admin');
    $this->actingAs($admin);
});

test('scholarship recipients report generates PDF successfully', function () {
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(5)->create([
        'scholarship_id' => $scholarship->id,
        'status' => 'Active',
    ]);

    $response = $this->get('/sas/admin/reports/scholarships/recipients');

    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/pdf');
});

test('scholarship recipients report can be filtered by status', function () {
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(3)->create([
        'scholarship_id' => $scholarship->id,
        'status' => 'Active',
    ]);
    ScholarshipRecipient::factory()->count(2)->create([
        'scholarship_id' => $scholarship->id,
        'status' => 'Suspended',
    ]);

    $response = $this->get('/sas/admin/reports/scholarships/recipients?status=Active');

    $response->assertSuccessful();
});

test('scholarship recipients report can be filtered by semester', function () {
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(3)->create([
        'scholarship_id' => $scholarship->id,
        'semester' => '1st',
    ]);
    ScholarshipRecipient::factory()->count(2)->create([
        'scholarship_id' => $scholarship->id,
        'semester' => '2nd',
    ]);

    $response = $this->get('/sas/admin/reports/scholarships/recipients?semester=1st');

    $response->assertSuccessful();
});

test('scholarship recipients report can be filtered by academic year', function () {
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(3)->create([
        'scholarship_id' => $scholarship->id,
        'academic_year' => '2024-2025',
    ]);

    $response = $this->get('/sas/admin/reports/scholarships/recipients?academic_year=2024-2025');

    $response->assertSuccessful();
});

test('scholarship recipients report can be filtered by date range', function () {
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'date_awarded' => now()->subDays(10),
    ]);
    ScholarshipRecipient::factory()->create([
        'scholarship_id' => $scholarship->id,
        'date_awarded' => now()->subDays(5),
    ]);

    $response = $this->get('/sas/admin/reports/scholarships/recipients?date_from='.now()->subDays(7)->toDateString());

    $response->assertSuccessful();
});

test('scholarship recipients can be exported to Excel', function () {
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(5)->create([
        'scholarship_id' => $scholarship->id,
    ]);

    $response = $this->get('/sas/admin/reports/scholarships/recipients?format=excel');

    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
});

test('approved scholars report generates PDF successfully', function () {
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(3)->create([
        'scholarship_id' => $scholarship->id,
        'status' => 'Active',
        'semester' => '1st',
        'academic_year' => '2024-2025',
    ]);

    $response = $this->get('/sas/admin/reports/scholarships/approved/1st/2024-2025');

    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/pdf');
});

test('scholarship statistics report generates PDF successfully', function () {
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(10)->create([
        'scholarship_id' => $scholarship->id,
        'academic_year' => '2024-2025',
        'status' => 'Active',
    ]);

    $response = $this->get('/sas/admin/reports/scholarships/statistics/2024-2025');

    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/pdf');
});

test('reports index page loads successfully', function () {
    $response = $this->get('/sas/admin/reports');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page->component('sas/admin/reports/index'));
});
