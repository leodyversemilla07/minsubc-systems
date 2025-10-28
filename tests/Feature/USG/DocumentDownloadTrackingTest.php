<?php

use App\Models\User;
use App\Modules\USG\Models\Document;
use App\Modules\USG\Models\DocumentDownload;
use Illuminate\Support\Facades\Storage;

uses()->group('usg', 'download-tracking');

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
    Storage::fake('public');
});

describe('DocumentDownload Model', function () {
    it('records a download with user information', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $user->id,
        ]);

        $initialDownloadCount = $document->download_count;

        $download = $document->recordDownload(
            userId: $user->id,
            ipAddress: '192.168.1.1',
            userAgent: 'Mozilla/5.0'
        );

        expect($download)->toBeInstanceOf(DocumentDownload::class)
            ->and($download->document_id)->toBe($document->id)
            ->and($download->user_id)->toBe($user->id)
            ->and($download->ip_address)->toBe('192.168.1.1')
            ->and($download->user_agent)->toBe('Mozilla/5.0')
            ->and($download->downloaded_at)->toBeInstanceOf(\Illuminate\Support\Carbon::class);

        // Verify download count was incremented
        expect($document->fresh()->download_count)->toBe($initialDownloadCount + 1);
    });

    it('records an anonymous download without user', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $user->id,
        ]);

        $download = $document->recordDownload(
            userId: null,
            ipAddress: '203.0.113.45',
            userAgent: 'Chrome/120.0'
        );

        expect($download->user_id)->toBeNull()
            ->and($download->ip_address)->toBe('203.0.113.45')
            ->and($download->document_id)->toBe($document->id);
    });

    it('can retrieve download history for a document', function () {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $uploader = User::factory()->create();
        $uploader->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $uploader->id,
        ]);

        // Create multiple downloads
        $document->recordDownload($user1->id, '192.168.1.1', 'Browser 1');
        $document->recordDownload($user2->id, '192.168.1.2', 'Browser 2');
        $document->recordDownload(null, '192.168.1.3', 'Browser 3'); // Anonymous

        $downloads = $document->downloads;

        expect($downloads)->toHaveCount(3)
            ->and($downloads->where('user_id', $user1->id))->toHaveCount(1)
            ->and($downloads->where('user_id', $user2->id))->toHaveCount(1)
            ->and($downloads->whereNull('user_id'))->toHaveCount(1);
    });

    it('provides download statistics', function () {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $uploader = User::factory()->create();
        $uploader->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $uploader->id,
            'download_count' => 0,
        ]);

        // Record downloads
        $document->recordDownload($user1->id, '192.168.1.1', 'Browser 1');
        $document->recordDownload($user1->id, '192.168.1.1', 'Browser 1'); // Same user downloads again
        $document->recordDownload($user2->id, '192.168.1.2', 'Browser 2');
        $document->recordDownload(null, '192.168.1.3', 'Browser 3'); // Anonymous
        $document->recordDownload(null, '192.168.1.4', 'Browser 4'); // Another anonymous

        $stats = $document->getDownloadStats();

        expect($stats['total_downloads'])->toBe(5)
            ->and($stats['unique_users'])->toBe(2) // user1 and user2
            ->and($stats['anonymous_downloads'])->toBe(2)
            ->and($stats['last_downloaded_at'])->not->toBeNull();
    });

    it('tracks recent downloads within 30 days', function () {
        $user = User::factory()->create();
        $uploader = User::factory()->create();
        $uploader->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $uploader->id,
            'download_count' => 0,
        ]);

        // Create a recent download
        $document->recordDownload($user->id, '192.168.1.1', 'Browser');

        // Create an old download (simulate by directly creating)
        // This doesn't increment download_count because we're bypassing recordDownload
        DocumentDownload::create([
            'document_id' => $document->id,
            'user_id' => $user->id,
            'ip_address' => '192.168.1.2',
            'user_agent' => 'Old Browser',
            'downloaded_at' => now()->subDays(45),
        ]);

        $stats = $document->getDownloadStats();

        // download_count is 1 (only from recordDownload)
        // but we have 2 download records total
        expect($stats['total_downloads'])->toBe(1) // Only recordDownload incremented the count
            ->and($stats['recent_downloads'])->toBe(1) // Only recent download within 30 days
            ->and($document->downloads)->toHaveCount(2); // But we have 2 download records
    });
});

describe('DocumentDownload Relationships', function () {
    it('belongs to a document', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $user->id,
        ]);

        $download = $document->recordDownload($user->id, '192.168.1.1', 'Browser');

        expect($download->document)->toBeInstanceOf(Document::class)
            ->and($download->document->id)->toBe($document->id);
    });

    it('belongs to a user when authenticated', function () {
        $user = User::factory()->create();
        $uploader = User::factory()->create();
        $uploader->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $uploader->id,
        ]);

        $download = $document->recordDownload($user->id, '192.168.1.1', 'Browser');

        expect($download->user)->toBeInstanceOf(User::class)
            ->and($download->user->id)->toBe($user->id);
    });

    it('has null user for anonymous downloads', function () {
        $uploader = User::factory()->create();
        $uploader->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $uploader->id,
        ]);

        $download = $document->recordDownload(null, '192.168.1.1', 'Browser');

        expect($download->user)->toBeNull();
    });
});

describe('Document Download Integration', function () {
    it('increments download count when recording download', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $user->id,
            'download_count' => 5,
        ]);

        $document->recordDownload($user->id, '192.168.1.1', 'Browser');

        expect($document->fresh()->download_count)->toBe(6);
    });

    it('creates download record in database', function () {
        $user = User::factory()->create();
        $uploader = User::factory()->create();
        $uploader->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $uploader->id,
        ]);

        expect(DocumentDownload::count())->toBe(0);

        $document->recordDownload($user->id, '192.168.1.1', 'Browser');

        expect(DocumentDownload::count())->toBe(1);

        $download = DocumentDownload::first();
        expect($download->document_id)->toBe($document->id)
            ->and($download->user_id)->toBe($user->id);
    });

    it('handles multiple downloads by same user', function () {
        $user = User::factory()->create();
        $uploader = User::factory()->create();
        $uploader->assignRole('usg-admin');

        $document = Document::factory()->create([
            'uploaded_by' => $uploader->id,
            'download_count' => 0,
        ]);

        // User downloads 3 times
        $document->recordDownload($user->id, '192.168.1.1', 'Browser');
        $document->recordDownload($user->id, '192.168.1.1', 'Browser');
        $document->recordDownload($user->id, '192.168.1.1', 'Browser');

        expect($document->fresh()->download_count)->toBe(3)
            ->and($document->downloads)->toHaveCount(3);
    });
});
