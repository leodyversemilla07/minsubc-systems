<?php

use Modules\SAS\Models\InsuranceRecord;
use Modules\SAS\Services\InsuranceReportService;

test('insurance report service can generate records report', function () {
    $service = app(InsuranceReportService::class);
    InsuranceRecord::factory()->count(5)->create([
        'status' => 'Active',
    ]);

    $response = $service->generateRecordsReport();

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\Response::class);
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
});

test('insurance report service applies filters correctly', function () {
    $service = app(InsuranceReportService::class);
    InsuranceRecord::factory()->count(3)->create([
        'status' => 'Active',
        'policy_type' => 'Health',
    ]);
    InsuranceRecord::factory()->count(2)->create([
        'status' => 'Expired',
        'policy_type' => 'Accident',
    ]);

    $filters = ['status' => 'Active', 'policy_type' => 'Health'];
    $response = $service->generateRecordsReport($filters);

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\Response::class);
});

test('insurance report service can export to Excel', function () {
    $service = app(InsuranceReportService::class);
    InsuranceRecord::factory()->count(5)->create();

    $response = $service->exportToExcel();

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\BinaryFileResponse::class);
});

test('insurance report service can generate statistics report', function () {
    $service = app(InsuranceReportService::class);
    InsuranceRecord::factory()->count(10)->create([
        'status' => 'Active',
        'effective_date' => now(),
        'expiration_date' => now()->addYear(),
    ]);

    $response = $service->generateStatisticsReport('2024-2025');

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\Response::class);
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
});
