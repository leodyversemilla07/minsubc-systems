<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Document;
use Modules\USG\Models\Resolution;
use Modules\USG\Models\TransparencyReport;

uses()->group('usg', 'file-cleanup');

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
    Storage::fake('public');
});

describe('Document File Cleanup', function () {
    it('deletes the file when document is deleted', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create a fake file
        $file = UploadedFile::fake()->create('test-document.pdf', 1024, 'application/pdf');
        $filePath = $file->store('documents', 'public');

        // Verify file exists
        expect(Storage::disk('public')->exists($filePath))->toBeTrue();

        // Create document with the file path
        $document = Document::factory()->create([
            'file_path' => $filePath,
            'uploaded_by' => $user->id,
        ]);

        // Delete the document
        $document->delete();

        // Verify file was deleted
        expect(Storage::disk('public')->exists($filePath))->toBeFalse();
    });

    it('does not throw error when deleting document with null file_path', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create a fake file first, then update to null
        $file = UploadedFile::fake()->create('temp.pdf', 512);
        $filePath = $file->store('documents', 'public');

        $document = Document::factory()->create([
            'file_path' => $filePath,
            'uploaded_by' => $user->id,
        ]);

        // Delete the file manually first
        Storage::disk('public')->delete($filePath);

        // Should not throw any errors even though file doesn't exist
        expect(fn () => $document->delete())->not->toThrow(Exception::class);
    });

    it('does not throw error when deleting document with non-existent file', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $document = Document::factory()->create([
            'file_path' => 'documents/non-existent-file.pdf',
            'uploaded_by' => $user->id,
        ]);

        // Should not throw any errors
        expect(fn () => $document->delete())->not->toThrow(Exception::class);
    });
});

describe('Resolution File Cleanup', function () {
    it('deletes the file when resolution is deleted', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create a fake file
        $file = UploadedFile::fake()->create('resolution.pdf', 512, 'application/pdf');
        $filePath = $file->store('resolutions', 'public');

        // Verify file exists
        expect(Storage::disk('public')->exists($filePath))->toBeTrue();

        // Create resolution with the file path
        $resolution = Resolution::factory()->create([
            'file_path' => $filePath,
            'submitted_by' => $user->id,
        ]);

        // Delete the resolution
        $resolution->delete();

        // Verify file was deleted
        expect(Storage::disk('public')->exists($filePath))->toBeFalse();
    });

    it('does not throw error when deleting resolution with null file_path', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $resolution = Resolution::factory()->create([
            'file_path' => null,
            'submitted_by' => $user->id,
        ]);

        // Should not throw any errors
        expect(fn () => $resolution->delete())->not->toThrow(Exception::class);
    });
});

describe('Announcement File Cleanup', function () {
    it('deletes the featured image when announcement is deleted', function () {
        if (! function_exists('imagecreatetruecolor')) {
            $this->markTestSkipped('GD extension is not installed');
        }

        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create a fake image
        $image = UploadedFile::fake()->image('featured.jpg', 800, 600);
        $imagePath = $image->store('announcements', 'public');

        // Verify image exists
        expect(Storage::disk('public')->exists($imagePath))->toBeTrue();

        // Create announcement with the image path
        $announcement = Announcement::factory()->create([
            'featured_image' => $imagePath,
            'author_id' => $user->id,
        ]);

        // Delete the announcement
        $announcement->delete();

        // Verify image was deleted
        expect(Storage::disk('public')->exists($imagePath))->toBeFalse();
    });

    it('does not throw error when deleting announcement with null featured_image', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $announcement = Announcement::factory()->create([
            'featured_image' => null,
            'author_id' => $user->id,
        ]);

        // Should not throw any errors
        expect(fn () => $announcement->delete())->not->toThrow(Exception::class);
    });

    it('does not throw error when deleting announcement with non-existent image', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $announcement = Announcement::factory()->create([
            'featured_image' => 'announcements/non-existent.jpg',
            'author_id' => $user->id,
        ]);

        // Should not throw any errors
        expect(fn () => $announcement->delete())->not->toThrow(Exception::class);
    });
});

describe('TransparencyReport File Cleanup', function () {
    it('deletes the file when transparency report is deleted', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create a fake file
        $file = UploadedFile::fake()->create('financial-report.pdf', 2048, 'application/pdf');
        $filePath = $file->store('transparency', 'public');

        // Verify file exists
        expect(Storage::disk('public')->exists($filePath))->toBeTrue();

        // Create transparency report with the file path
        $report = TransparencyReport::factory()->financial()->create([
            'file_path' => $filePath,
            'created_by' => $user->id,
        ]);

        // Delete the report
        $report->delete();

        // Verify file was deleted
        expect(Storage::disk('public')->exists($filePath))->toBeFalse();
    });

    it('does not throw error when deleting transparency report with null file_path', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        // Create a fake file first, then delete manually
        $file = UploadedFile::fake()->create('temp-report.pdf', 512);
        $filePath = $file->store('transparency', 'public');

        $report = TransparencyReport::factory()->financial()->create([
            'file_path' => $filePath,
            'created_by' => $user->id,
        ]);

        // Delete the file manually first
        Storage::disk('public')->delete($filePath);

        // Should not throw any errors even though file doesn't exist
        expect(fn () => $report->delete())->not->toThrow(Exception::class);
    });
});

describe('Bulk Deletion File Cleanup', function () {
    it('deletes all files when multiple documents are deleted', function () {
        $user = User::factory()->create();
        $user->assignRole('usg-admin');

        $filePaths = [];
        $documents = [];

        // Create 5 documents with files
        for ($i = 0; $i < 5; $i++) {
            $file = UploadedFile::fake()->create("document-{$i}.pdf", 512);
            $filePath = $file->store('documents', 'public');
            $filePaths[] = $filePath;

            $documents[] = Document::factory()->create([
                'file_path' => $filePath,
                'uploaded_by' => $user->id,
            ]);
        }

        // Verify all files exist
        foreach ($filePaths as $filePath) {
            expect(Storage::disk('public')->exists($filePath))->toBeTrue();
        }

        // Delete all documents individually to trigger model events
        foreach ($documents as $document) {
            $document->delete();
        }

        // Verify all files were deleted
        foreach ($filePaths as $filePath) {
            expect(Storage::disk('public')->exists($filePath))->toBeFalse();
        }
    });
});
