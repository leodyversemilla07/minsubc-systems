<?php

use Modules\SAS\Models\InsuranceRecord;

beforeEach(function () {
    $admin = \App\Models\User::factory()->create();
    $admin->assignRole('admin');
    $this->actingAs($admin);
});

test('insurance records report generates PDF successfully', function () {
    InsuranceRecord::factory()->count(5)->create([
        'status' => 'Active',
    ]);

    $response = $this->get('/sas/admin/reports/insurance/records');

    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/pdf');
});

test('insurance records report can be filtered by policy type', function () {
    InsuranceRecord::factory()->count(3)->create([
        'policy_type' => 'Health',
    ]);
    InsuranceRecord::factory()->count(2)->create([
        'policy_type' => 'Accident',
    ]);

    $response = $this->get('/sas/admin/reports/insurance/records?policy_type=Health');

    $response->assertSuccessful();
});

test('insurance records report can be filtered by status', function () {
    InsuranceRecord::factory()->count(3)->create([
        'status' => 'Active',
    ]);
    InsuranceRecord::factory()->count(2)->create([
        'status' => 'Expired',
    ]);

    $response = $this->get('/sas/admin/reports/insurance/records?status=Active');

    $response->assertSuccessful();
});

test('insurance records report can be filtered by provider', function () {
    InsuranceRecord::factory()->count(3)->create([
        'insurance_provider' => 'PhilHealth',
    ]);
    InsuranceRecord::factory()->count(2)->create([
        'insurance_provider' => 'SSS',
    ]);

    $response = $this->get('/sas/admin/reports/insurance/records?insurance_provider=PhilHealth');

    $response->assertSuccessful();
});

test('insurance records report can be filtered by date range', function () {
    InsuranceRecord::factory()->create([
        'effective_date' => now()->subDays(10),
    ]);
    InsuranceRecord::factory()->create([
        'effective_date' => now()->subDays(5),
    ]);

    $response = $this->get('/sas/admin/reports/insurance/records?date_from='.now()->subDays(7)->toDateString());

    $response->assertSuccessful();
});

test('insurance records can be exported to Excel', function () {
    InsuranceRecord::factory()->count(5)->create();

    $response = $this->get('/sas/admin/reports/insurance/records?format=excel');

    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
});

test('insurance statistics report generates PDF successfully', function () {
    InsuranceRecord::factory()->count(10)->create([
        'status' => 'Active',
        'effective_date' => now(),
        'expiration_date' => now()->addYear(),
    ]);

    $response = $this->get('/sas/admin/reports/insurance/statistics/2024-2025');

    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/pdf');
});
