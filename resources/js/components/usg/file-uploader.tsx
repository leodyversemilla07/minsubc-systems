import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    AlertCircle,
    CheckCircle,
    Download,
    Eye,
    File,
    FileAudio,
    FileImage,
    FileText,
    FileVideo,
    Plus,
    Trash2,
    Upload,
} from 'lucide-react';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';

interface FileItem {
    id: string;
    file: File;
    preview?: string;
    progress?: number;
    status: 'pending' | 'uploading' | 'complete' | 'error';
    error?: string;
}

interface ExistingFile {
    id: string | number;
    name: string;
    original_name: string;
    file_path: string;
    file_size: number;
    mime_type: string;
    created_at?: string;
}

interface FileUploaderProps {
    // Core functionality
    files: FileItem[];
    onFilesChange: (files: FileItem[]) => void;

    // Existing files (for edit forms)
    existingFiles?: ExistingFile[];
    removedFileIds?: (string | number)[];
    onRemoveExisting?: (id: string | number) => void;

    // Configuration
    multiple?: boolean;
    accept?: string;
    maxSize?: number; // in MB
    maxFiles?: number;

    // Upload behavior
    autoUpload?: boolean;
    uploadUrl?: string;
    onUpload?: (files: FileItem[]) => Promise<void>;

    // Styling and behavior
    variant?: 'default' | 'compact' | 'dropzone';
    className?: string;
    disabled?: boolean;

    // Labels and text
    label?: string;
    description?: string;
    buttonText?: string;
    dropText?: string;

    // Preview options
    showPreview?: boolean;
    imagePreviewSize?: 'sm' | 'md' | 'lg';
}

export function FileUploader({
    files,
    onFilesChange,
    existingFiles = [],
    removedFileIds = [],
    onRemoveExisting,
    multiple = true,
    accept,
    maxSize = 10, // 10MB default
    maxFiles = 10,
    autoUpload = false,
    uploadUrl,
    onUpload,
    variant = 'default',
    className = '',
    disabled = false,
    label = 'Upload Files',
    description,
    buttonText = 'Choose Files',
    dropText = 'Drop files here or click to select',
    showPreview = true,
    imagePreviewSize = 'md',
}: FileUploaderProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getFileIcon = (mimeType: string) => {
        if (mimeType.startsWith('image/')) return FileImage;
        if (mimeType.startsWith('video/')) return FileVideo;
        if (mimeType.startsWith('audio/')) return FileAudio;
        if (mimeType.includes('pdf')) return FileText;
        return File;
    };

    const formatFileSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(
            Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
        );
        return (
            Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
        );
    };

    const validateFile = (file: File): string | null => {
        // Size validation
        if (file.size > maxSize * 1024 * 1024) {
            return `File size must be less than ${maxSize}MB`;
        }

        // Type validation
        if (accept) {
            const acceptedTypes = accept.split(',').map((type) => type.trim());
            const isAccepted = acceptedTypes.some((type) => {
                if (type.startsWith('.')) {
                    return file.name.toLowerCase().endsWith(type.toLowerCase());
                }
                return file.type.match(type.replace('*', '.*'));
            });

            if (!isAccepted) {
                return `File type not accepted. Allowed: ${accept}`;
            }
        }

        // Max files validation
        const totalFiles =
            files.length +
            existingFiles.filter((f) => !removedFileIds.includes(f.id)).length;
        if (totalFiles >= maxFiles) {
            return `Maximum ${maxFiles} files allowed`;
        }

        return null;
    };

    const createFileItem = async (file: File): Promise<FileItem> => {
        const id = Math.random().toString(36).substr(2, 9);
        const fileItem: FileItem = {
            id,
            file,
            status: 'pending',
        };

        // Create preview for images
        if (file.type.startsWith('image/') && showPreview) {
            const preview = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
            });
            fileItem.preview = preview;
        }

        return fileItem;
    };

    const handleFiles = async (newFiles: File[]) => {
        if (disabled) return;

        const validatedFiles: FileItem[] = [];
        const errors: string[] = [];

        for (const file of newFiles) {
            const error = validateFile(file);
            if (error) {
                errors.push(`${file.name}: ${error}`);
            } else {
                const fileItem = await createFileItem(file);
                validatedFiles.push(fileItem);
            }
        }

        if (validatedFiles.length > 0) {
            const updatedFiles = multiple
                ? [...files, ...validatedFiles]
                : validatedFiles;
            onFilesChange(updatedFiles);

            if (autoUpload && (onUpload || uploadUrl)) {
                uploadFiles(validatedFiles);
            }
        }

        if (errors.length > 0) {
            console.error('File validation errors:', errors);
        }
    };

    const uploadFiles = async (filesToUpload: FileItem[]) => {
        if (!onUpload && !uploadUrl) return;

        const updatedFiles = [...files];

        for (const fileItem of filesToUpload) {
            const index = updatedFiles.findIndex((f) => f.id === fileItem.id);
            if (index === -1) continue;

            updatedFiles[index] = {
                ...fileItem,
                status: 'uploading',
                progress: 0,
            };
            onFilesChange([...updatedFiles]);

            try {
                if (onUpload) {
                    await onUpload([fileItem]);
                } else if (uploadUrl) {
                    const formData = new FormData();
                    formData.append('file', fileItem.file);

                    const response = await fetch(uploadUrl, {
                        method: 'POST',
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error('Upload failed');
                    }
                }

                updatedFiles[index] = {
                    ...fileItem,
                    status: 'complete',
                    progress: 100,
                };
            } catch (error) {
                updatedFiles[index] = {
                    ...fileItem,
                    status: 'error',
                    error:
                        error instanceof Error
                            ? error.message
                            : 'Upload failed',
                };
            }

            onFilesChange([...updatedFiles]);
        }
    };

    const removeFile = (id: string) => {
        onFilesChange(files.filter((f) => f.id !== id));
    };

    const removeExistingFile = (id: string | number) => {
        if (onRemoveExisting) {
            onRemoveExisting(id);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        if (disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        handleFiles(selectedFiles);

        // Clear input to allow selecting same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const openFileDialog = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const getPreviewSize = () => {
        switch (imagePreviewSize) {
            case 'sm':
                return 'w-12 h-12';
            case 'lg':
                return 'w-20 h-20';
            default:
                return 'w-16 h-16';
        }
    };

    // Filter existing files that haven't been removed
    const visibleExistingFiles = existingFiles.filter(
        (f) => !removedFileIds.includes(f.id),
    );

    if (variant === 'compact') {
        return (
            <div className={`space-y-2 ${className}`}>
                {label && (
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">{label}</label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={openFileDialog}
                            disabled={disabled}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Files
                        </Button>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={multiple}
                    accept={accept}
                    onChange={handleFileInput}
                    className="hidden"
                    disabled={disabled}
                />

                {(files.length > 0 || visibleExistingFiles.length > 0) && (
                    <div className="space-y-2">
                        {/* Existing files */}
                        {visibleExistingFiles.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center gap-3 rounded-md border bg-gray-50 p-2 dark:bg-gray-800"
                            >
                                <File className="h-4 w-4 text-gray-500" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">
                                        {file.original_name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(file.file_size)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            window.open(
                                                file.file_path,
                                                '_blank',
                                            )
                                        }
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    {onRemoveExisting && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                removeExistingFile(file.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* New files */}
                        {files.map((fileItem) => {
                            const Icon = getFileIcon(fileItem.file.type);
                            return (
                                <div
                                    key={fileItem.id}
                                    className="flex items-center gap-3 rounded-md border p-2"
                                >
                                    <Icon className="h-4 w-4 text-blue-500" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">
                                            {fileItem.file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(fileItem.file.size)}
                                        </p>
                                        {fileItem.status === 'uploading' && (
                                            <Progress
                                                value={fileItem.progress}
                                                className="mt-1 h-1"
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {fileItem.status === 'complete' && (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        )}
                                        {fileItem.status === 'error' && (
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                        )}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                removeFile(fileItem.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {label && <label className="text-sm font-medium">{label}</label>}

            {/* Drop Zone */}
            <Card
                className={`cursor-pointer transition-colors ${
                    isDragOver
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                        : 'border-2 border-dashed hover:border-gray-400'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileDialog}
            >
                <CardContent className="p-6 text-center">
                    <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <p className="mb-2 text-lg font-medium">{dropText}</p>
                    {description && (
                        <p className="mb-4 text-sm text-gray-500">
                            {description}
                        </p>
                    )}
                    <Button type="button" variant="outline" disabled={disabled}>
                        {buttonText}
                    </Button>
                    {accept && (
                        <p className="mt-2 text-xs text-gray-500">
                            Accepted: {accept}
                        </p>
                    )}
                    <p className="text-xs text-gray-500">
                        Max size: {maxSize}MB per file • Max files: {maxFiles}
                    </p>
                </CardContent>
            </Card>

            <input
                ref={fileInputRef}
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={handleFileInput}
                className="hidden"
                disabled={disabled}
            />

            {/* File Lists */}
            {(files.length > 0 || visibleExistingFiles.length > 0) && (
                <div className="space-y-4">
                    {/* Existing Files */}
                    {visibleExistingFiles.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Current Files ({visibleExistingFiles.length})
                            </h4>
                            <div className="grid gap-2">
                                {visibleExistingFiles.map((file) => {
                                    const Icon = getFileIcon(file.mime_type);
                                    return (
                                        <Card key={file.id} className="p-3">
                                            <div className="flex items-center gap-3">
                                                <Icon className="h-5 w-5 text-gray-500" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-medium">
                                                        {file.original_name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatFileSize(
                                                            file.file_size,
                                                        )}{' '}
                                                        • {file.mime_type}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            window.open(
                                                                file.file_path,
                                                                '_blank',
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            window.open(
                                                                file.file_path,
                                                                '_blank',
                                                            )
                                                        }
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                    {onRemoveExisting && (
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeExistingFile(
                                                                    file.id,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* New Files */}
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                New Files ({files.length})
                            </h4>
                            <div className="grid gap-2">
                                {files.map((fileItem) => {
                                    const Icon = getFileIcon(
                                        fileItem.file.type,
                                    );
                                    return (
                                        <Card key={fileItem.id} className="p-3">
                                            <div className="flex items-center gap-3">
                                                {showPreview &&
                                                fileItem.preview ? (
                                                    <img
                                                        src={fileItem.preview}
                                                        alt={fileItem.file.name}
                                                        className={`${getPreviewSize()} rounded object-cover`}
                                                    />
                                                ) : (
                                                    <Icon className="h-5 w-5 text-blue-500" />
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-medium">
                                                        {fileItem.file.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatFileSize(
                                                            fileItem.file.size,
                                                        )}{' '}
                                                        • {fileItem.file.type}
                                                    </p>
                                                    {fileItem.status ===
                                                        'uploading' && (
                                                        <Progress
                                                            value={
                                                                fileItem.progress
                                                            }
                                                            className="mt-2 h-2"
                                                        />
                                                    )}
                                                    {fileItem.error && (
                                                        <Alert
                                                            variant="destructive"
                                                            className="mt-2"
                                                        >
                                                            <AlertCircle className="h-4 w-4" />
                                                            <AlertDescription className="text-xs">
                                                                {fileItem.error}
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {fileItem.status ===
                                                        'complete' && (
                                                        <Badge
                                                            variant="default"
                                                            className="bg-green-100 text-xs text-green-700 dark:bg-green-900 dark:text-green-300"
                                                        >
                                                            <CheckCircle className="mr-1 h-3 w-3" />
                                                            Complete
                                                        </Badge>
                                                    )}
                                                    {fileItem.status ===
                                                        'error' && (
                                                        <Badge
                                                            variant="destructive"
                                                            className="text-xs"
                                                        >
                                                            <AlertCircle className="mr-1 h-3 w-3" />
                                                            Error
                                                        </Badge>
                                                    )}
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeFile(
                                                                fileItem.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
