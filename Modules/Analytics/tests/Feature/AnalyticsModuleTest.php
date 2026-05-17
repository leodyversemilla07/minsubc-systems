<?php

use Modules\Analytics\Services\AnalyticsService;

test('analytics service handles missing tables gracefully', function () {
    $service = app(AnalyticsService::class);
    $stats = $service->getAllStats();

    // All categories should be present with zero defaults
    expect($stats)->toHaveKeys(['academic', 'financial', 'operations', 'student_services', 'governance', 'trends']);

    // All numeric stats should default to 0 when tables don't exist
    expect($stats['academic']['total_students'])->toBe(0);
    expect($stats['academic']['active_enrollments'])->toBe(0);
    expect($stats['financial']['total_invoiced'])->toBe(0.0);
    expect($stats['financial']['total_collected'])->toBe(0.0);
    expect($stats['operations']['employees'])->toBe(0);
    expect($stats['operations']['helpdesk_open'])->toBe(0);
    expect($stats['student_services']['discipline_incidents'])->toBe(0);
    expect($stats['governance']['usg_officers'])->toBe(0);

    // Trend collections should be empty
    expect($stats['trends']['enrollment'])->toBeEmpty();
    expect($stats['trends']['revenue'])->toBeEmpty();
    expect($stats['trends']['incidents'])->toBeEmpty();
});