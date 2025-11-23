<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Document;
use Modules\USG\Models\Resolution;
use Modules\USG\Services\SearchService;

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);
    $this->searchService = app(SearchService::class);
});

describe('SearchService - Announcements', function () {
    it('can search announcements by title', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'title' => 'Important Campus Update',
            'author_id' => $user->id,
        ]);

        Announcement::factory()->create([
            'title' => 'Regular Notice',
            'author_id' => $user->id,
        ]);

        $results = $this->searchService->searchAnnouncements(query: 'Campus');

        expect($results->total())->toBe(1)
            ->and($results->first()->title)->toBe('Important Campus Update');
    });

    it('can search announcements by content', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'title' => 'Test Announcement',
            'content' => 'This announcement contains special keyword',
            'author_id' => $user->id,
        ]);

        Announcement::factory()->create([
            'title' => 'Another Announcement',
            'content' => 'This is regular content',
            'author_id' => $user->id,
        ]);

        $results = $this->searchService->searchAnnouncements(query: 'special');

        expect($results->total())->toBe(1);
    });

    it('can filter announcements by category', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'category' => 'academic',
            'author_id' => $user->id,
        ]);

        Announcement::factory()->count(2)->create([
            'category' => 'events',
            'author_id' => $user->id,
        ]);

        $results = $this->searchService->searchAnnouncements(category: 'events');

        expect($results->total())->toBe(2);
    });

    it('can filter announcements by status', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'status' => 'published',
            'author_id' => $user->id,
        ]);

        Announcement::factory()->create([
            'status' => 'draft',
            'author_id' => $user->id,
        ]);

        $results = $this->searchService->searchAnnouncements(status: 'published');

        expect($results->total())->toBe(1);
    });

    it('can filter announcements by date range', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'publish_date' => now()->subDays(10),
            'author_id' => $user->id,
        ]);

        Announcement::factory()->create([
            'publish_date' => now()->subDays(5),
            'author_id' => $user->id,
        ]);

        Announcement::factory()->create([
            'publish_date' => now()->subDays(2),
            'author_id' => $user->id,
        ]);

        $results = $this->searchService->searchAnnouncements(
            dateFrom: now()->subDays(7)->format('Y-m-d'),
            dateTo: now()->format('Y-m-d')
        );

        expect($results->total())->toBe(2);
    });

    it('can combine search and filters', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'title' => 'Academic Event Announcement',
            'category' => 'academic',
            'status' => 'published',
            'author_id' => $user->id,
        ]);

        Announcement::factory()->create([
            'title' => 'Academic Update',
            'category' => 'academic',
            'status' => 'draft',
            'author_id' => $user->id,
        ]);

        Announcement::factory()->create([
            'title' => 'Event Notice',
            'category' => 'events',
            'status' => 'published',
            'author_id' => $user->id,
        ]);

        $results = $this->searchService->searchAnnouncements(
            query: 'Academic',
            category: 'academic',
            status: 'published'
        );

        expect($results->total())->toBe(1)
            ->and($results->first()->title)->toBe('Academic Event Announcement');
    });
});

describe('SearchService - Resolutions', function () {
    it('can search resolutions by title', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Resolution::factory()->create([
            'title' => 'Budget Resolution',
            'submitted_by' => $user->id,
        ]);

        Resolution::factory()->create([
            'title' => 'Policy Update',
            'submitted_by' => $user->id,
        ]);

        $results = $this->searchService->searchResolutions(query: 'Budget');

        expect($results->total())->toBe(1);
    });

    it('can search resolutions by resolution number', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Resolution::factory()->create([
            'resolution_number' => 'RES-2025-001',
            'submitted_by' => $user->id,
        ]);

        Resolution::factory()->create([
            'resolution_number' => 'RES-2025-002',
            'submitted_by' => $user->id,
        ]);

        $results = $this->searchService->searchResolutions(query: 'RES-2025-001');

        expect($results->total())->toBe(1);
    });

    it('can filter resolutions by category', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Resolution::factory()->count(2)->create([
            'category' => 'Finance',
            'submitted_by' => $user->id,
        ]);

        Resolution::factory()->create([
            'category' => 'Academic',
            'submitted_by' => $user->id,
        ]);

        $results = $this->searchService->searchResolutions(category: 'Finance');

        expect($results->total())->toBe(2);
    });

    it('can filter resolutions by status', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Resolution::factory()->published()->count(3)->create([
            'submitted_by' => $user->id,
        ]);

        Resolution::factory()->archived()->create([
            'submitted_by' => $user->id,
        ]);

        $results = $this->searchService->searchResolutions(status: 'published');

        expect($results->total())->toBe(3);
    });
});

describe('SearchService - Documents', function () {
    it('can search documents by title', function () {
        $user = User::factory()->create();

        Document::factory()->create([
            'title' => 'Budget Report 2025',
            'uploaded_by' => $user->id,
        ]);

        Document::factory()->create([
            'title' => 'Meeting Minutes',
            'uploaded_by' => $user->id,
        ]);

        $results = $this->searchService->searchDocuments(query: 'Budget');

        expect($results->total())->toBe(1);
    });

    it('can filter documents by public/private status', function () {
        $user = User::factory()->create();

        Document::factory()->count(2)->create([
            'is_public' => true,
            'uploaded_by' => $user->id,
        ]);

        Document::factory()->create([
            'is_public' => false,
            'uploaded_by' => $user->id,
        ]);

        $results = $this->searchService->searchDocuments(isPublic: true);

        expect($results->total())->toBe(2);
    });

    it('can filter documents by category', function () {
        $user = User::factory()->create();

        Document::factory()->count(2)->create([
            'category' => 'Financial',
            'uploaded_by' => $user->id,
        ]);

        Document::factory()->create([
            'category' => 'Legal',
            'uploaded_by' => $user->id,
        ]);

        $results = $this->searchService->searchDocuments(category: 'Financial');

        expect($results->total())->toBe(2);
    });
});

describe('SearchService - Global Search', function () {
    it('can perform global search across all content types', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'title' => 'Important Update',
            'author_id' => $user->id,
        ]);

        Resolution::factory()->create([
            'title' => 'Important Resolution',
            'submitted_by' => $user->id,
        ]);

        Document::factory()->create([
            'title' => 'Important Document',
            'is_public' => true,
            'uploaded_by' => $user->id,
        ]);

        $results = $this->searchService->globalSearch('Important');

        expect($results)->toHaveKeys(['announcements', 'resolutions', 'documents'])
            ->and($results['announcements']->total())->toBe(1)
            ->and($results['resolutions']->total())->toBe(1)
            ->and($results['documents']->total())->toBe(1);
    });

    it('can filter global search by content type', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'title' => 'Test Announcement',
            'author_id' => $user->id,
        ]);

        Resolution::factory()->create([
            'title' => 'Test Resolution',
            'submitted_by' => $user->id,
        ]);

        $results = $this->searchService->globalSearch('Test', 'announcements');

        expect($results)->toHaveKey('announcements')
            ->and($results)->not->toHaveKey('resolutions')
            ->and($results['announcements']->total())->toBe(1);
    });
});

describe('SearchService - Suggestions', function () {
    it('can get search suggestions', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->create([
            'title' => 'Budget Announcement',
            'status' => 'published',
            'author_id' => $user->id,
        ]);

        Resolution::factory()->create([
            'title' => 'Budget Resolution',
            'status' => 'published',
            'submitted_by' => $user->id,
        ]);

        $suggestions = $this->searchService->getSearchSuggestions('Budget');

        expect($suggestions)->toBeArray()
            ->and($suggestions)->toContain('Budget Announcement')
            ->and($suggestions)->toContain('Budget Resolution');
    });

    it('limits the number of suggestions', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create 10 announcements with unique titles
        for ($i = 1; $i <= 10; $i++) {
            Announcement::factory()->create([
                'title' => "Test Announcement {$i}",
                'status' => 'published',
                'author_id' => $user->id,
            ]);
        }

        $suggestions = $this->searchService->getSearchSuggestions('Test', 5);

        expect($suggestions)->toHaveCount(5);
    });
});

describe('SearchService - Total Results', function () {
    it('can get total result counts', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        Announcement::factory()->count(3)->create([
            'title' => 'Campus Update',
            'author_id' => $user->id,
        ]);

        Resolution::factory()->count(2)->create([
            'title' => 'Campus Resolution',
            'submitted_by' => $user->id,
        ]);

        Document::factory()->create([
            'title' => 'Campus Document',
            'is_public' => true,
            'uploaded_by' => $user->id,
        ]);

        $totals = $this->searchService->getTotalResults('Campus');

        expect($totals['announcements'])->toBe(3)
            ->and($totals['resolutions'])->toBe(2)
            ->and($totals['documents'])->toBe(1);
    });
});
