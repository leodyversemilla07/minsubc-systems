<?php

use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;
use Modules\SAS\Services\ScholarshipReportService;

test('scholarship report service can generate recipients report', function () {
    $service = app(ScholarshipReportService::class);
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(5)->create([
        'scholarship_id' => $scholarship->id,
    ]);

    $response = $service->generateRecipientsReport();

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\Response::class);
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
});

test('scholarship report service applies filters correctly', function () {
    $service = app(ScholarshipReportService::class);
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(3)->create([
        'scholarship_id' => $scholarship->id,
        'status' => 'Active',
    ]);
    ScholarshipRecipient::factory()->count(2)->create([
        'scholarship_id' => $scholarship->id,
        'status' => 'Inactive',
    ]);

    $filters = ['status' => 'Active'];
    $response = $service->generateRecipientsReport($filters);

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\Response::class);
});

test('scholarship report service can export to Excel', function () {
    $service = app(ScholarshipReportService::class);
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(5)->create([
        'scholarship_id' => $scholarship->id,
    ]);

    $response = $service->exportToExcel();

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\BinaryFileResponse::class);
});

test('scholarship report service can generate approved scholars report', function () {
    $service = app(ScholarshipReportService::class);
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(3)->create([
        'scholarship_id' => $scholarship->id,
        'status' => 'Active',
        'semester' => '1st Semester',
        'academic_year' => '2024-2025',
    ]);

    $response = $service->generateApprovedScholarsReport('1st Semester', '2024-2025');

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\Response::class);
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
});

test('scholarship report service can generate statistics report', function () {
    $service = app(ScholarshipReportService::class);
    $scholarship = Scholarship::factory()->create();
    ScholarshipRecipient::factory()->count(10)->create([
        'scholarship_id' => $scholarship->id,
        'academic_year' => '2024-2025',
        'status' => 'Active',
    ]);

    $response = $service->generateStatisticsReport('2024-2025');

    expect($response)->toBeInstanceOf(\Symfony\Component\HttpFoundation\Response::class);
    expect($response->headers->get('Content-Type'))->toContain('application/pdf');
});
