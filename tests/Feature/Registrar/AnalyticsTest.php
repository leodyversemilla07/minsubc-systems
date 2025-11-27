<?php

declare(strict_types=1);

use App\Models\User;
use Modules\Registrar\Models\DocumentRequest;
use Modules\Registrar\Services\AnalyticsService;

beforeEach(function () {
    $this->admin = User::factory()->create();
    $this->service = new AnalyticsService;
});

it('calculates dashboard stats correctly', function () {
    // Create test data
    DocumentRequest::factory()->count(10)->create(['status' => 'claimed']);
    DocumentRequest::factory()->count(5)->create(['status' => 'pending_payment']);
    DocumentRequest::factory()->count(3)->create(['status' => 'processing']);

    $stats = $this->service->getDashboardStats();

    expect($stats['total_requests'])->toBe(18)
        ->and($stats['pending_requests'])->toBe(5)
        ->and($stats['processing_requests'])->toBe(3)
        ->and($stats['completed_requests'])->toBe(10)
        ->and($stats)->toHaveKeys([
            'total_requests',
            'pending_requests',
            'processing_requests',
            'completed_requests',
            'total_revenue',
            'average_processing_time',
        ]);
});

it('groups requests by type correctly', function () {
    // Create different document types
    DocumentRequest::factory()->create(['document_type' => 'transcript']);
    DocumentRequest::factory()->create(['document_type' => 'transcript']);
    DocumentRequest::factory()->create(['document_type' => 'diploma']);

    $data = $this->service->getRequestsByType();

    expect($data)->toHaveCount(2)
        ->and($data->firstWhere('document_type', 'transcript')['count'])->toBe(2)
        ->and($data->firstWhere('document_type', 'diploma')['count'])->toBe(1);
});

it('groups requests by status correctly', function () {
    DocumentRequest::factory()->count(5)->create(['status' => 'claimed']);
    DocumentRequest::factory()->count(3)->create(['status' => 'pending_payment']);

    $data = $this->service->getRequestsByStatus();

    expect($data)->toHaveCount(2)
        ->and($data->firstWhere('status', 'claimed')['count'])->toBe(5)
        ->and($data->firstWhere('status', 'pending_payment')['count'])->toBe(3);
});

it('calculates revenue by type correctly', function () {
    // Create document requests with amounts
    DocumentRequest::factory()->count(3)->create([
        'document_type' => 'transcript',
        'amount' => 100.00,
        'payment_method' => 'digital',
    ]);

    $data = $this->service->getRevenueByType();

    expect($data)->toHaveCount(1)
        ->and((float) $data->first()['total_revenue'])->toBe(300.00);
});

it('calculates average processing time correctly', function () {
    // Create released requests with processing times
    DocumentRequest::factory()->create([
        'status' => 'released',
        'created_at' => now()->subDays(5),
        'released_at' => now()->subDays(3), // 2 days
    ]);

    DocumentRequest::factory()->create([
        'status' => 'released',
        'created_at' => now()->subDays(10),
        'released_at' => now()->subDays(6), // 4 days
    ]);

    $avgTime = $this->service->getAverageProcessingTime();

    expect($avgTime)->toBeNumeric()
        ->and($avgTime)->toBeGreaterThan(0);
});
it('provides request trends for specified period', function () {
    // Create requests across different dates
    DocumentRequest::factory()->create(['created_at' => now()->subDays(1)]);
    DocumentRequest::factory()->count(2)->create(['created_at' => now()->subDays(2)]);
    DocumentRequest::factory()->count(3)->create(['created_at' => now()->subDays(3)]);

    $trends = $this->service->getRequestTrends(now()->subDays(7));

    expect($trends)->toHaveCount(8)
        ->and($trends->first())->toHaveKeys(['date', 'count']);
});

it('provides revenue trends for specified period', function () {
    DocumentRequest::factory()->create([
        'amount' => 100.00,
        'payment_method' => 'digital',
        'created_at' => now()->subDays(1),
    ]);

    $trends = $this->service->getRevenueTrends(now()->subDays(7));

    expect($trends)->toHaveCount(8)
        ->and($trends->first())->toHaveKeys(['date', 'revenue']);
});

it('identifies top requested documents', function () {
    DocumentRequest::factory()->count(5)->create(['document_type' => 'transcript']);
    DocumentRequest::factory()->count(3)->create(['document_type' => 'diploma']);
    DocumentRequest::factory()->count(1)->create(['document_type' => 'certificate']);

    $topDocs = $this->service->getTopRequestedDocuments(2);

    expect($topDocs)->toHaveCount(2)
        ->and($topDocs->first()['document_type'])->toBe('transcript')
        ->and($topDocs->first()['count'])->toBe(5);
});

it('calculates completion rate correctly', function () {
    DocumentRequest::factory()->count(8)->create(['status' => 'claimed']);
    DocumentRequest::factory()->count(2)->create(['status' => 'pending_payment']);

    $rate = $this->service->getCompletionRate();

    expect($rate)->toBe(80.0);
});

it('returns analytics data via controller endpoint', function () {
    DocumentRequest::factory()->count(5)->create();
    $this->admin->assignRole('registrar-admin');

    $response = $this->actingAs($this->admin)
        ->get(route('registrar.admin.analytics'));

    $response->assertSuccessful()
        ->assertInertia(
            fn($page) => $page
                ->component('registrar/analytics/index')
                ->has('stats')
        );
});

it('returns analytics JSON data for AJAX requests', function () {
    DocumentRequest::factory()->count(5)->create();
    $this->admin->assignRole('registrar-admin');

    $response = $this->actingAs($this->admin)
        ->get(route('registrar.admin.analytics.data', ['period' => 30]));

    $response->assertSuccessful()
        ->assertJsonStructure([
            'stats',
            'revenueStats',
        ]);
});

it('requires authentication to access analytics', function () {
    $response = $this->get(route('registrar.admin.analytics'));

    $response->assertRedirect(route('login'));
});
