import { useState, useCallback, useRef } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
    Upload,
    X,
    File,
    FileText,
    Image,
    CheckCircle,
    AlertCircle,
    Loader2,
} from 'lucide-react';

interface Requirement {
    id: number;
    name: string;
    is_required: boolean;
}

interface Document {
    id: number;
    requirement_id: number;
    name: string;
    original_name: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes: string | null;
    url: string;
}

interface DocumentUploadProps {
    applicationNumber: string;
    requirements: Requirement[];
    documents: Document[];
    onUploadComplete?: () => void;
}


type UploadingFile = {
    id: string;
    name: string;
    size: number;
    requirementId: number;
    progress: number;
    error?: string;
};

export function DocumentUpload({
    applicationNumber,
    requirements,
    documents,
    onUploadComplete,
}: DocumentUploadProps) {
    const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
    const [draggedOver, setDraggedOver] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadFile = useCallback(

        (file: File, requirementId: number) => {
            const tempId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            setUploadingFiles((prev) => [
                ...prev,
                {
                    id: tempId,
                    name: file.name,
                    size: file.size,
                    requirementId,
                    progress: 0,
                },
            ]);

            const formData = new FormData();
            formData.append('document', file);
            formData.append('requirement_id', requirementId.toString());

            router.post(
                route('admission.application.documents.upload', applicationNumber),
                formData,
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onProgress: (progress) => {
                        setUploadingFiles((prev) =>
                            prev.map((f) =>
                                f.id === tempId
                                    ? { ...f, progress: progress.percentage }
                                    : f
                            )
                        );
                    },
                    onSuccess: () => {
                        setUploadingFiles((prev) =>
                            prev.filter((f) => f.id !== tempId)
                        );
                        onUploadComplete?.();
                    },
                    onError: (errors) => {
                        setUploadingFiles((prev) =>
                            prev.map((f) =>
                                f.id === tempId
                                    ? {
                                          ...f,
                                          error: errors.message || 'Upload failed',
                                      }
                                    : f
                            )
                        );
                    },
                }
            );
        },
        [applicationNumber, onUploadComplete]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent, requirementId: number) => {
            e.preventDefault();
            setDraggedOver(null);

            const files = Array.from(e.dataTransfer.files);
            files.forEach((file) => {
                uploadFile(file, requirementId);
            });
        },
        [uploadFile]
    );

    const handleFileSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, requirementId: number) => {
            const files = Array.from(e.target.files || []);
            files.forEach((file) => {
                uploadFile(file, requirementId);
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        },
        [uploadFile]
    );

    const deleteDocument = useCallback(
        (documentId: number) => {
            if (
                confirm(
                    'Are you sure you want to delete this document? This action cannot be undone.'
                )
            ) {
                router.delete(
                    route(
                        'admission.application.documents.delete',
                        applicationNumber,
                        documentId
                    ),
                    {
                        preserveScroll: true,
                        onSuccess: () => onUploadComplete?.(),
                    }
                );
            }
        },
        [applicationNumber, onUploadComplete]
    );

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
            return <Image className="h-5 w-5 text-blue-500" />;
        }
        return <FileText className="h-5 w-5 text-gray-500" />;
    };

    const getDocumentForRequirement = (requirementId: number) => {
        return documents.find((d) => d.requirement_id === requirementId);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Upload Required Documents
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Upload the following documents. You can drag and drop files or
                    click to select.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {requirements.map((requirement) => {
                    const document = getDocumentForRequirement(requirement.id);
                    const isDragged = draggedOver === requirement.id;
                    const uploadingFile = uploadingFiles.find(
                        (f) => f.requirementId === requirement.id
                    );

                    return (
                        <div
                            key={requirement.id}
                            className={cn(
                                'rounded-lg border-2 border-dashed p-4 transition-colors',
                                isDragged
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                    : document
                                      ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'
                                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                            )}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDraggedOver(requirement.id);
                            }}
                            onDragLeave={() => setDraggedOver(null)}
                            onDrop={(e) => handleDrop(e, requirement.id)}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            {requirement.name}
                                        </h4>
                                        {requirement.is_required ? (
                                            <Badge
                                                variant="destructive"
                                                className="text-xs"
                                            >
                                                Required
                                            </Badge>
                                        ) : (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                Optional
                                            </Badge>
                                        )}
                                    </div>

                                    {document ? (
                                        <div className="mt-3">
                                            <div className="flex items-center gap-2 rounded-lg bg-white p-3 dark:bg-gray-900">
                                                {getFileIcon(document.original_name)}
                                                <div className="flex-1 min-w-0">
                                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                        {document.original_name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {document.status}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {document.status ===
                                                        'approved' && (
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                    )}
                                                    {document.status ===
                                                        'rejected' && (
                                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            deleteDocument(
                                                                document.id
                                                            )
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            {document.admin_notes && (
                                                <p className="mt-2 text-xs text-gray-500">
                                                    Admin note: {document.admin_notes}
                                                </p>
                                            )}
                                        </div>
                                    ) : uploadingFile ? (
                                        <div className="mt-3">
                                            <div className="flex items-center gap-2">
                                                <File className="h-4 w-4 text-gray-400" />
                                                <span className="flex-1 truncate text-sm text-gray-600 dark:text-gray-300">
                                                    {uploadingFile.name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatFileSize(uploadingFile.size)}
                                                </span>
                                            </div>
                                            <div className="mt-2">
                                                <Progress
                                                    value={uploadingFile.progress}
                                                    className="h-2"
                                                />
                                            </div>
                                            {uploadingFile.error && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {uploadingFile.error}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-6 text-sm text-gray-500 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-600 dark:hover:text-blue-400">
                                            <Upload className="h-5 w-5" />
                                            <span>Drop file or click to upload</span>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) =>
                                                    handleFileSelect(
                                                        e,
                                                        requirement.id
                                                    )
                                                }
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {documents.length > 0 && (
                <div className="rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                        Uploaded Documents ({documents.length}/{requirements.length})
                    </h4>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center gap-2 rounded bg-white p-2 dark:bg-gray-900"
                            >
                                {getFileIcon(doc.original_name)}
                                <span className="flex-1 truncate text-sm">
                                    {doc.name}
                                </span>
                                {doc.status === 'approved' ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : doc.status === 'rejected' ? (
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                ) : (
                                    <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}