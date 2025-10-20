<?php

namespace App\Modules\USG\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class FileUploadService
{
    private array $allowedImageTypes = ['jpeg', 'jpg', 'png', 'gif', 'webp'];

    private array $allowedDocumentTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];

    private int $maxImageSize = 5120; // 5MB in KB

    private int $maxDocumentSize = 10240; // 10MB in KB

    /**
     * Upload image file
     */
    public function uploadImage(UploadedFile $file, string $directory = 'usg/images'): array
    {
        $this->validateImage($file);

        $path = $this->storeFile($file, $directory);

        return [
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'url' => Storage::url($path),
            'extension' => $file->getClientOriginalExtension(),
        ];
    }

    /**
     * Upload document file
     */
    public function uploadDocument(UploadedFile $file, string $directory = 'usg/documents'): array
    {
        $this->validateDocument($file);

        $path = $this->storeFile($file, $directory);

        return [
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'url' => Storage::url($path),
            'extension' => $file->getClientOriginalExtension(),
        ];
    }

    /**
     * Upload multiple files
     */
    public function uploadMultiple(array $files, string $directory, string $type = 'document'): array
    {
        $results = [];

        foreach ($files as $file) {
            try {
                if ($type === 'image') {
                    $results[] = $this->uploadImage($file, $directory);
                } else {
                    $results[] = $this->uploadDocument($file, $directory);
                }
            } catch (ValidationException $e) {
                $results[] = [
                    'error' => true,
                    'message' => $e->validator->errors()->first(),
                    'file' => $file->getClientOriginalName(),
                ];
            }
        }

        return $results;
    }

    /**
     * Delete file from storage
     */
    public function deleteFile(string $path): bool
    {
        if ($this->fileExists($path)) {
            return Storage::disk('public')->delete($path);
        }

        return false;
    }

    /**
     * Check if file exists
     */
    public function fileExists(string $path): bool
    {
        return Storage::disk('public')->exists($path);
    }

    /**
     * Get file URL
     */
    public function getFileUrl(string $path): string
    {
        return Storage::url($path);
    }

    /**
     * Get file size in bytes
     */
    public function getFileSize(string $path): int
    {
        if ($this->fileExists($path)) {
            return Storage::disk('public')->size($path);
        }

        return 0;
    }

    /**
     * Get human readable file size
     */
    public function getHumanFileSize(string $path): string
    {
        $bytes = $this->getFileSize($path);

        if ($bytes === 0) {
            return '0 B';
        }

        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $exponent = floor(log($bytes, 1024));

        return round($bytes / pow(1024, $exponent), 2).' '.$units[$exponent];
    }

    /**
     * Move file to different directory
     */
    public function moveFile(string $fromPath, string $toPath): bool
    {
        if ($this->fileExists($fromPath)) {
            return Storage::disk('public')->move($fromPath, $toPath);
        }

        return false;
    }

    /**
     * Copy file to different location
     */
    public function copyFile(string $fromPath, string $toPath): bool
    {
        if ($this->fileExists($fromPath)) {
            return Storage::disk('public')->copy($fromPath, $toPath);
        }

        return false;
    }

    /**
     * Get file contents
     */
    public function getFileContents(string $path): ?string
    {
        if ($this->fileExists($path)) {
            return Storage::disk('public')->get($path);
        }

        return null;
    }

    /**
     * Store file with unique name
     */
    private function storeFile(UploadedFile $file, string $directory): string
    {
        $filename = $this->generateUniqueFilename($file, $directory);

        return $file->storeAs($directory, $filename, 'public');
    }

    /**
     * Generate unique filename
     */
    private function generateUniqueFilename(UploadedFile $file, string $directory): string
    {
        $extension = $file->getClientOriginalExtension();
        $basename = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
        $filename = $basename.'.'.$extension;

        $counter = 1;
        while (Storage::disk('public')->exists($directory.'/'.$filename)) {
            $filename = $basename.'-'.$counter.'.'.$extension;
            $counter++;
        }

        return $filename;
    }

    /**
     * Validate image file
     */
    private function validateImage(UploadedFile $file): void
    {
        $validator = Validator::make([
            'file' => $file,
        ], [
            'file' => [
                'required',
                'file',
                'image',
                'mimes:'.implode(',', $this->allowedImageTypes),
                'max:'.$this->maxImageSize,
            ],
        ], [
            'file.required' => 'Please select an image file.',
            'file.image' => 'The file must be an image.',
            'file.mimes' => 'The image must be a file of type: '.implode(', ', $this->allowedImageTypes).'.',
            'file.max' => 'The image may not be greater than '.($this->maxImageSize / 1024).'MB.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Validate document file
     */
    private function validateDocument(UploadedFile $file): void
    {
        $validator = Validator::make([
            'file' => $file,
        ], [
            'file' => [
                'required',
                'file',
                'mimes:'.implode(',', $this->allowedDocumentTypes),
                'max:'.$this->maxDocumentSize,
            ],
        ], [
            'file.required' => 'Please select a document file.',
            'file.mimes' => 'The document must be a file of type: '.implode(', ', $this->allowedDocumentTypes).'.',
            'file.max' => 'The document may not be greater than '.($this->maxDocumentSize / 1024).'MB.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    /**
     * Get allowed file types
     */
    public function getAllowedImageTypes(): array
    {
        return $this->allowedImageTypes;
    }

    public function getAllowedDocumentTypes(): array
    {
        return $this->allowedDocumentTypes;
    }

    public function getMaxImageSize(): int
    {
        return $this->maxImageSize;
    }

    public function getMaxDocumentSize(): int
    {
        return $this->maxDocumentSize;
    }

    /**
     * Set file size limits
     */
    public function setMaxImageSize(int $sizeInKB): void
    {
        $this->maxImageSize = $sizeInKB;
    }

    public function setMaxDocumentSize(int $sizeInKB): void
    {
        $this->maxDocumentSize = $sizeInKB;
    }

    /**
     * Add allowed file types
     */
    public function addAllowedImageType(string $type): void
    {
        if (! in_array($type, $this->allowedImageTypes)) {
            $this->allowedImageTypes[] = $type;
        }
    }

    public function addAllowedDocumentType(string $type): void
    {
        if (! in_array($type, $this->allowedDocumentTypes)) {
            $this->allowedDocumentTypes[] = $type;
        }
    }

    /**
     * Clean up old files in directory
     */
    public function cleanupOldFiles(string $directory, int $daysOld = 30): int
    {
        $files = Storage::disk('public')->files($directory);
        $deletedCount = 0;
        $cutoffTime = now()->subDays($daysOld);

        foreach ($files as $file) {
            $lastModified = Storage::disk('public')->lastModified($file);

            if ($lastModified < $cutoffTime->timestamp) {
                Storage::disk('public')->delete($file);
                $deletedCount++;
            }
        }

        return $deletedCount;
    }

    /**
     * Get directory size in bytes
     */
    public function getDirectorySize(string $directory): int
    {
        $files = Storage::disk('public')->allFiles($directory);
        $totalSize = 0;

        foreach ($files as $file) {
            $totalSize += Storage::disk('public')->size($file);
        }

        return $totalSize;
    }
}
