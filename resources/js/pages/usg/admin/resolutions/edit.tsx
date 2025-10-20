import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, router, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    Download,
    Eye,
    FileText,
    Gavel,
    Plus,
    Save,
    Tag,
    Trash2,
    Upload,
    Users,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Attachment {
    id: number;
    filename: string;
    original_name: string;
    file_path: string;
    file_size: number;
    mime_type: string;
    created_at: string;
}

interface Resolution {
    id: number;
    title: string;
    resolution_number?: string;
    description: string;
    background?: string;
    whereas_clauses: string[];
    resolved_clauses: string[];
    category?: string;
    status: string;
    author_name: string;
    co_authors: string[];
    date_passed?: string;
    effective_date?: string;
    tags: string[];
    attachments: Attachment[];
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    resolution: Resolution;
    categories: string[];
    statuses: string[];
    canManage?: boolean;
}

export default function EditResolution({
    resolution,
    categories,
    statuses,
    canManage = true,
}: Props) {
    const [newAttachments, setNewAttachments] = useState<File[]>([]);
    const [removedAttachmentIds, setRemovedAttachmentIds] = useState<number[]>(
        [],
    );

    const {
        data,
        setData,
        put,
        post,
        processing,
        errors,
        wasSuccessful,
        recentlySuccessful,
    } = useForm({
        title: resolution.title,
        resolution_number: resolution.resolution_number || '',
        description: resolution.description,
        background: resolution.background || '',
        whereas_clauses:
            resolution.whereas_clauses.length > 0
                ? resolution.whereas_clauses
                : [''],
        resolved_clauses:
            resolution.resolved_clauses.length > 0
                ? resolution.resolved_clauses
                : [''],
        category: resolution.category || '',
        status: resolution.status,
        author_name: resolution.author_name,
        co_authors: resolution.co_authors,
        date_passed: resolution.date_passed || '',
        effective_date: resolution.effective_date || '',
        tags: resolution.tags,
        new_attachments: [] as File[],
        removed_attachment_ids: [] as number[],
        is_published: resolution.is_published,
        _method: 'PUT',
    });

    const [currentTag, setCurrentTag] = useState('');
    const [currentCoAuthor, setCurrentCoAuthor] = useState('');

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // Update form data with current state
        setData({
            ...data,
            new_attachments: newAttachments,
            removed_attachment_ids: removedAttachmentIds,
        });

        if (newAttachments.length > 0) {
            // Use POST with _method for file uploads
            post(`/usg/admin/resolutions/${resolution.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    router.visit('/usg/admin/resolutions');
                },
            });
        } else {
            // Regular PUT for text-only updates
            const { new_attachments, _method, ...updateData } = data;
            put(`/usg/admin/resolutions/${resolution.id}`, {
                onSuccess: () => {
                    // Don't redirect, stay on page to show success message
                },
            });
        }
    };

    const handleNewAttachmentsChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(e.target.files || []);
        const updatedAttachments = [...newAttachments, ...files];
        setNewAttachments(updatedAttachments);
    };

    const removeNewAttachment = (index: number) => {
        setNewAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingAttachment = (attachmentId: number) => {
        const updatedRemovedIds = [...removedAttachmentIds, attachmentId];
        setRemovedAttachmentIds(updatedRemovedIds);
    };

    const addWhereasClause = () => {
        setData('whereas_clauses', [...data.whereas_clauses, '']);
    };

    const removeWhereasClause = (index: number) => {
        setData(
            'whereas_clauses',
            data.whereas_clauses.filter((_, i) => i !== index),
        );
    };

    const updateWhereasClause = (index: number, value: string) => {
        const newClauses = [...data.whereas_clauses];
        newClauses[index] = value;
        setData('whereas_clauses', newClauses);
    };

    const addResolvedClause = () => {
        setData('resolved_clauses', [...data.resolved_clauses, '']);
    };

    const removeResolvedClause = (index: number) => {
        setData(
            'resolved_clauses',
            data.resolved_clauses.filter((_, i) => i !== index),
        );
    };

    const updateResolvedClause = (index: number, value: string) => {
        const newClauses = [...data.resolved_clauses];
        newClauses[index] = value;
        setData('resolved_clauses', newClauses);
    };

    const addTag = () => {
        if (currentTag.trim() && !data.tags.includes(currentTag.trim())) {
            setData('tags', [...data.tags, currentTag.trim()]);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setData(
            'tags',
            data.tags.filter((tag) => tag !== tagToRemove),
        );
    };

    const addCoAuthor = () => {
        if (
            currentCoAuthor.trim() &&
            !data.co_authors.includes(currentCoAuthor.trim())
        ) {
            setData('co_authors', [...data.co_authors, currentCoAuthor.trim()]);
            setCurrentCoAuthor('');
        }
    };

    const removeCoAuthor = (authorToRemove: string) => {
        setData(
            'co_authors',
            data.co_authors.filter((author) => author !== authorToRemove),
        );
    };

    const handleKeyPress = (
        e: React.KeyboardEvent,
        action: 'tag' | 'coauthor',
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (action === 'tag') {
                addTag();
            } else {
                addCoAuthor();
            }
        }
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

    const existingAttachments = resolution.attachments.filter(
        (att) => !removedAttachmentIds.includes(att.id),
    );

    return (
        <>
            <Head title={`Edit ${resolution.title} - USG Admin`} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.visit('/usg/admin')}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Dashboard
                                </Button>
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Edit Resolution
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Update resolution information
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.visit(
                                            `/usg/resolutions/${resolution.id}`,
                                        )
                                    }
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Public
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {(wasSuccessful || recentlySuccessful) && (
                        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800 dark:text-green-200">
                                Resolution has been updated successfully!
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Error Messages */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Please fix the errors below before saving.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!canManage && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                You don't have permission to edit resolutions.
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Gavel className="h-5 w-5 text-blue-600" />
                                    Resolution Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Resolution Title *
                                        </Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Enter resolution title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData('title', e.target.value)
                                            }
                                            className={
                                                errors.title
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-600">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="resolution_number">
                                            Resolution Number
                                        </Label>
                                        <Input
                                            id="resolution_number"
                                            type="text"
                                            placeholder="e.g., USG-2024-001"
                                            value={data.resolution_number}
                                            onChange={(e) =>
                                                setData(
                                                    'resolution_number',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.resolution_number
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.resolution_number && (
                                            <p className="text-sm text-red-600">
                                                {errors.resolution_number}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Brief Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Brief summary of what this resolution addresses..."
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        rows={2}
                                        className={
                                            errors.description
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                        required
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="background">
                                        Background/Context
                                    </Label>
                                    <Textarea
                                        id="background"
                                        placeholder="Provide background information and context for this resolution..."
                                        value={data.background}
                                        onChange={(e) =>
                                            setData(
                                                'background',
                                                e.target.value,
                                            )
                                        }
                                        rows={4}
                                        className={
                                            errors.background
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                    />
                                    {errors.background && (
                                        <p className="text-sm text-red-600">
                                            {errors.background}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">
                                            Category
                                        </Label>
                                        <select
                                            id="category"
                                            value={data.category}
                                            onChange={(e) =>
                                                setData(
                                                    'category',
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ${
                                                errors.category
                                                    ? 'border-red-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            disabled={!canManage}
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <p className="text-sm text-red-600">
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    'status',
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ${
                                                errors.status
                                                    ? 'border-red-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            disabled={!canManage}
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.status && (
                                            <p className="text-sm text-red-600">
                                                {errors.status}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Whereas Clauses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-green-600" />
                                        Whereas Clauses
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={addWhereasClause}
                                        disabled={!canManage}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Clause
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Add the "WHEREAS" statements that provide
                                    the reasoning and justification for this
                                    resolution.
                                </p>

                                {data.whereas_clauses.map((clause, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <div className="flex-1">
                                            <Label
                                                htmlFor={`whereas-${index}`}
                                                className="sr-only"
                                            >
                                                Whereas Clause {index + 1}
                                            </Label>
                                            <Textarea
                                                id={`whereas-${index}`}
                                                placeholder={`WHEREAS, clause ${index + 1}...`}
                                                value={clause}
                                                onChange={(e) =>
                                                    updateWhereasClause(
                                                        index,
                                                        e.target.value,
                                                    )
                                                }
                                                rows={2}
                                                disabled={!canManage}
                                            />
                                        </div>
                                        {data.whereas_clauses.length > 1 &&
                                            canManage && (
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        removeWhereasClause(
                                                            index,
                                                        )
                                                    }
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                    </div>
                                ))}

                                {errors.whereas_clauses && (
                                    <p className="text-sm text-red-600">
                                        {errors.whereas_clauses}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Resolved Clauses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Gavel className="h-5 w-5 text-purple-600" />
                                        Resolved Clauses
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={addResolvedClause}
                                        disabled={!canManage}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Clause
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Add the "BE IT RESOLVED" statements that
                                    specify the actions to be taken.
                                </p>

                                {data.resolved_clauses.map((clause, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2"
                                    >
                                        <div className="flex-1">
                                            <Label
                                                htmlFor={`resolved-${index}`}
                                                className="sr-only"
                                            >
                                                Resolved Clause {index + 1}
                                            </Label>
                                            <Textarea
                                                id={`resolved-${index}`}
                                                placeholder={`BE IT RESOLVED, that clause ${index + 1}...`}
                                                value={clause}
                                                onChange={(e) =>
                                                    updateResolvedClause(
                                                        index,
                                                        e.target.value,
                                                    )
                                                }
                                                rows={2}
                                                disabled={!canManage}
                                            />
                                        </div>
                                        {data.resolved_clauses.length > 1 &&
                                            canManage && (
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        removeResolvedClause(
                                                            index,
                                                        )
                                                    }
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                    </div>
                                ))}

                                {errors.resolved_clauses && (
                                    <p className="text-sm text-red-600">
                                        {errors.resolved_clauses}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Authors & Dates */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-orange-600" />
                                    Authors & Dates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="author_name">
                                        Primary Author *
                                    </Label>
                                    <Input
                                        id="author_name"
                                        type="text"
                                        placeholder="Enter primary author name"
                                        value={data.author_name}
                                        onChange={(e) =>
                                            setData(
                                                'author_name',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.author_name
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                        required
                                    />
                                    {errors.author_name && (
                                        <p className="text-sm text-red-600">
                                            {errors.author_name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <Label>Co-Authors</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Add co-author name..."
                                            value={currentCoAuthor}
                                            onChange={(e) =>
                                                setCurrentCoAuthor(
                                                    e.target.value,
                                                )
                                            }
                                            onKeyPress={(e) =>
                                                handleKeyPress(e, 'coauthor')
                                            }
                                            disabled={!canManage}
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            onClick={addCoAuthor}
                                            disabled={
                                                !currentCoAuthor.trim() ||
                                                !canManage
                                            }
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add
                                        </Button>
                                    </div>

                                    {data.co_authors.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {data.co_authors.map(
                                                (author, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="flex items-center gap-2"
                                                    >
                                                        {author}
                                                        {canManage && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeCoAuthor(
                                                                        author,
                                                                    )
                                                                }
                                                                className="ml-1 hover:text-red-500"
                                                            >
                                                                ×
                                                            </button>
                                                        )}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="date_passed">
                                            Date Passed
                                        </Label>
                                        <Input
                                            id="date_passed"
                                            type="date"
                                            value={data.date_passed}
                                            onChange={(e) =>
                                                setData(
                                                    'date_passed',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.date_passed
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.date_passed && (
                                            <p className="text-sm text-red-600">
                                                {errors.date_passed}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="effective_date">
                                            Effective Date
                                        </Label>
                                        <Input
                                            id="effective_date"
                                            type="date"
                                            value={data.effective_date}
                                            onChange={(e) =>
                                                setData(
                                                    'effective_date',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.effective_date
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.effective_date && (
                                            <p className="text-sm text-red-600">
                                                {errors.effective_date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Tag className="h-5 w-5 text-indigo-600" />
                                    Tags
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Add a tag..."
                                        value={currentTag}
                                        onChange={(e) =>
                                            setCurrentTag(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            handleKeyPress(e, 'tag')
                                        }
                                        disabled={!canManage}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        onClick={addTag}
                                        disabled={
                                            !currentTag.trim() || !canManage
                                        }
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add
                                    </Button>
                                </div>

                                {data.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="flex items-center gap-2"
                                            >
                                                {tag}
                                                {canManage && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeTag(tag)
                                                        }
                                                        className="ml-1 hover:text-red-500"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {errors.tags && (
                                    <p className="text-sm text-red-600">
                                        {errors.tags}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Attachments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-red-600" />
                                    Supporting Documents
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Existing Attachments */}
                                {existingAttachments.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Current Documents</Label>
                                        <div className="space-y-2">
                                            {existingAttachments.map(
                                                (attachment) => (
                                                    <div
                                                        key={attachment.id}
                                                        className="flex items-center justify-between rounded-md border bg-gray-50 p-3 dark:bg-gray-800"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-5 w-5 text-gray-500" />
                                                            <div>
                                                                <p className="text-sm font-medium">
                                                                    {
                                                                        attachment.original_name
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {formatFileSize(
                                                                        attachment.file_size,
                                                                    )}{' '}
                                                                    •{' '}
                                                                    {
                                                                        attachment.mime_type
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    window.open(
                                                                        attachment.file_path,
                                                                        '_blank',
                                                                    )
                                                                }
                                                            >
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                            {canManage && (
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        removeExistingAttachment(
                                                                            attachment.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Add New Attachments */}
                                <div className="space-y-2">
                                    <Label htmlFor="new-attachments">
                                        Add New Documents
                                    </Label>
                                    <Input
                                        id="new-attachments"
                                        type="file"
                                        multiple
                                        onChange={handleNewAttachmentsChange}
                                        disabled={!canManage}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                    />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Supported: PDF, DOC, XLS, PPT up to 10MB
                                        each
                                    </p>
                                </div>

                                {/* New Attachments Preview */}
                                {newAttachments.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>New Documents to Upload</Label>
                                        <div className="space-y-2">
                                            {newAttachments.map(
                                                (file, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between rounded border border-blue-200 bg-blue-50 p-2 dark:border-blue-800 dark:bg-blue-950"
                                                    >
                                                        <span className="text-sm">
                                                            {file.name}
                                                        </span>
                                                        {canManage && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    removeNewAttachment(
                                                                        index,
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                                {errors.new_attachments && (
                                    <p className="text-sm text-red-600">
                                        {errors.new_attachments}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Publishing Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-gray-600" />
                                    Publishing Options
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        id="is_published"
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) =>
                                            setData(
                                                'is_published',
                                                e.target.checked,
                                            )
                                        }
                                        disabled={!canManage}
                                        className="rounded border-gray-300"
                                    />
                                    <Label htmlFor="is_published">
                                        Publish Resolution
                                    </Label>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Published resolutions will be visible to the
                                    public. Unpublished resolutions remain
                                    drafts.
                                </p>
                                {errors.is_published && (
                                    <p className="text-sm text-red-600">
                                        {errors.is_published}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Resolution Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Resolution Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div>
                                        <strong>Created:</strong>{' '}
                                        {new Date(
                                            resolution.created_at,
                                        ).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Last Updated:</strong>{' '}
                                        {new Date(
                                            resolution.updated_at,
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        {canManage && (
                            <div className="flex items-center justify-end gap-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        router.visit('/usg/admin/resolutions')
                                    }
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="min-w-[120px]"
                                >
                                    {processing ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
