<?php

namespace Modules\SAS\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload a file to the specified directory.
     */
    public function uploadFile(UploadedFile $file, string $directory = 'uploads', string $disk = 'public'): array
    {
        $filename = $this->generateUniqueFilename($file);
        $path = $file->storeAs($directory, $filename, $disk);

        return [
            'path' => $path,
            'filename' => $filename,
            'original_name' => $file->getClientOriginalName(),
            'extension' => $file->getClientOriginalExtension(),
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ];
    }

    /**
     * Upload multiple files to the specified directory.
     */
    public function uploadMultipleFiles(array $files, string $directory = 'uploads', string $disk = 'public'): array
    {
        $uploadedFiles = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $uploadedFiles[] = $this->uploadFile($file, $directory, $disk);
            }
        }

        return $uploadedFiles;
    }

    /**
     * Delete a file from storage.
     */
    public function deleteFile(string $path, string $disk = 'public'): bool
    {
        if (Storage::disk($disk)->exists($path)) {
            return Storage::disk($disk)->delete($path);
        }

        return false;
    }

    /**
     * Delete multiple files from storage.
     */
    public function deleteMultipleFiles(array $paths, string $disk = 'public'): void
    {
        foreach ($paths as $path) {
            $this->deleteFile($path, $disk);
        }
    }

    /**
     * Get file information.
     */
    public function getFileInfo(string $path, string $disk = 'public'): ?array
    {
        if (! Storage::disk($disk)->exists($path)) {
            return null;
        }

        return [
            'path' => $path,
            'size' => Storage::disk($disk)->size($path),
            'last_modified' => Storage::disk($disk)->lastModified($path),
            'url' => asset('storage/'.$path),
        ];
    }

    /**
     * Generate a unique filename for the uploaded file.
     */
    protected function generateUniqueFilename(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $sanitizedName = Str::slug($originalName);

        return $sanitizedName.'_'.time().'_'.Str::random(8).'.'.$extension;
    }

    /**
     * Validate file type against allowed extensions.
     */
    public function validateFileType(UploadedFile $file, array $allowedExtensions): bool
    {
        $extension = strtolower($file->getClientOriginalExtension());

        return in_array($extension, $allowedExtensions);
    }

    /**
     * Get human-readable file size.
     */
    public function formatFileSize(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2).' '.$units[$i];
    }

    /**
     * Move a file from one location to another.
     */
    public function moveFile(string $fromPath, string $toPath, string $disk = 'public'): bool
    {
        if (! Storage::disk($disk)->exists($fromPath)) {
            return false;
        }

        return Storage::disk($disk)->move($fromPath, $toPath);
    }

    /**
     * Copy a file from one location to another.
     */
    public function copyFile(string $fromPath, string $toPath, string $disk = 'public'): bool
    {
        if (! Storage::disk($disk)->exists($fromPath)) {
            return false;
        }

        return Storage::disk($disk)->copy($fromPath, $toPath);
    }
}
