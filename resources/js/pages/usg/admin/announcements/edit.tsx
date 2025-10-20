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
    FileImage,
    FileText,
    Plus,
    Save,
    Tag,
    Trash2,
    Upload,
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

interface Announcement {
    id: number;
    title: string;
    content: string;
    excerpt?: string;
    category?: string;
    tags: string[];
    featured_image?: string;
    attachments: Attachment[];
    is_published: boolean;
    is_pinned: boolean;
    publish_at: string;
    expires_at?: string;
    author_name?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    announcement: Announcement;
    categories: string[];
    canManage?: boolean;
}

export default function EditAnnouncement({
    announcement,
    categories,
    canManage = true,
}: Props) {
    const [newAttachments, setNewAttachments] = useState<File[]>([]);
    const [featuredImagePreview, setFeaturedImagePreview] = useState<
        string | null
    >(announcement.featured_image || null);
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
        title: announcement.title,
        content: announcement.content,
        excerpt: announcement.excerpt || '',
        category: announcement.category || '',
        tags: announcement.tags,
        featured_image: null as File | null,
        new_attachments: [] as File[],
        removed_attachment_ids: [] as number[],
        is_published: announcement.is_published,
        is_pinned: announcement.is_pinned,
        publish_at: announcement.publish_at,
        expires_at: announcement.expires_at || '',
        author_name: announcement.author_name || '',
        _method: 'PUT',
    });

    const [currentTag, setCurrentTag] = useState('');

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // Update form data with current state
        setData({
            ...data,
            new_attachments: newAttachments,
            removed_attachment_ids: removedAttachmentIds,
        });

        if (data.featured_image || newAttachments.length > 0) {
            // Use POST with _method for file uploads
            post(`/usg/admin/announcements/${announcement.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    router.visit('/usg/admin/announcements');
                },
            });
        } else {
            // Regular PUT for text-only updates
            put(`/usg/admin/announcements/${announcement.id}`, {
                onSuccess: () => {
                    // Don't redirect, stay on page to show success message
                },
            });
        }
    };

    const handleFeaturedImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setFeaturedImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNewAttachmentsChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(e.target.files || []);
        const updatedAttachments = [...newAttachments, ...files];
        setNewAttachments(updatedAttachments);
        setData('new_attachments', updatedAttachments);
    };

    const removeNewAttachment = (index: number) => {
        const updatedAttachments = newAttachments.filter((_, i) => i !== index);
        setNewAttachments(updatedAttachments);
        setData('new_attachments', updatedAttachments);
    };

    const removeExistingAttachment = (attachmentId: number) => {
        const updatedRemovedIds = [...removedAttachmentIds, attachmentId];
        setRemovedAttachmentIds(updatedRemovedIds);
        setData('removed_attachment_ids', updatedRemovedIds);
    };

    const removeFeaturedImage = () => {
        setFeaturedImagePreview(null);
        setData('featured_image', null);
    };

    const addTag = () => {
        if (currentTag.trim() && !data.tags.includes(currentTag.trim())) {
            const newTags = [...data.tags, currentTag.trim()];
            setData('tags', newTags);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setData(
            'tags',
            data.tags.filter((tag) => tag !== tagToRemove),
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
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

    const existingAttachments = announcement.attachments.filter(
        (att) => !removedAttachmentIds.includes(att.id),
    );

    return (
        <>
            <Head title={`Edit ${announcement.title} - USG Admin`} />

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
                                        Edit Announcement
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Update announcement information
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.visit(
                                            `/usg/announcements/${announcement.id}`,
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
                                Announcement has been updated successfully!
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
                                You don't have permission to edit announcements.
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Enter announcement title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        className={
                                            errors.title ? 'border-red-500' : ''
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
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        placeholder="Brief summary of the announcement..."
                                        value={data.excerpt}
                                        onChange={(e) =>
                                            setData('excerpt', e.target.value)
                                        }
                                        rows={2}
                                        className={
                                            errors.excerpt
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                    />
                                    {errors.excerpt && (
                                        <p className="text-sm text-red-600">
                                            {errors.excerpt}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content *</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Enter the full announcement content..."
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        rows={8}
                                        className={
                                            errors.content
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                        required
                                    />
                                    {errors.content && (
                                        <p className="text-sm text-red-600">
                                            {errors.content}
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
                                        <Label htmlFor="author_name">
                                            Author Name
                                        </Label>
                                        <Input
                                            id="author_name"
                                            type="text"
                                            placeholder="Author name (optional)"
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
                                        />
                                        {errors.author_name && (
                                            <p className="text-sm text-red-600">
                                                {errors.author_name}
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
                                    <Tag className="h-5 w-5 text-green-600" />
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
                                        onKeyPress={handleKeyPress}
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

                        {/* Featured Image */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileImage className="h-5 w-5 text-purple-600" />
                                    Featured Image
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {featuredImagePreview ? (
                                    <div className="space-y-4">
                                        <div className="relative w-full max-w-md">
                                            <img
                                                src={featuredImagePreview}
                                                alt="Featured image preview"
                                                className="h-48 w-full rounded-md border object-cover"
                                            />
                                            {canManage && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={
                                                        removeFeaturedImage
                                                    }
                                                    className="absolute top-2 right-2"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-md border-2 border-dashed border-gray-300 p-6 dark:border-gray-600">
                                        <div className="text-center">
                                            <FileImage className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="mt-4">
                                                <Label
                                                    htmlFor="featured-image"
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                                                        <Upload className="h-4 w-4" />
                                                        Upload Featured Image
                                                    </div>
                                                    <Input
                                                        id="featured-image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={
                                                            handleFeaturedImageChange
                                                        }
                                                        className="hidden"
                                                        disabled={!canManage}
                                                    />
                                                </Label>
                                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                    JPG, PNG up to 5MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {errors.featured_image && (
                                    <p className="text-sm text-red-600">
                                        {errors.featured_image}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Attachments */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-orange-600" />
                                    Attachments
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Existing Attachments */}
                                {existingAttachments.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Current Attachments</Label>
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
                                                                        'noopener,noreferrer'
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
                                        Add New Files
                                    </Label>
                                    <Input
                                        id="new-attachments"
                                        type="file"
                                        multiple
                                        onChange={handleNewAttachmentsChange}
                                        disabled={!canManage}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                                    />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Supported: PDF, DOC, XLS, PPT, JPG, PNG
                                        up to 10MB each
                                    </p>
                                </div>

                                {/* New Attachments Preview */}
                                {newAttachments.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>New Files to Upload</Label>
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
                                    <Calendar className="h-5 w-5 text-indigo-600" />
                                    Publishing Options
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="publish_at">
                                            Publish Date *
                                        </Label>
                                        <Input
                                            id="publish_at"
                                            type="date"
                                            value={data.publish_at}
                                            onChange={(e) =>
                                                setData(
                                                    'publish_at',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.publish_at
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.publish_at && (
                                            <p className="text-sm text-red-600">
                                                {errors.publish_at}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="expires_at">
                                            Expiration Date
                                        </Label>
                                        <Input
                                            id="expires_at"
                                            type="date"
                                            value={data.expires_at}
                                            onChange={(e) =>
                                                setData(
                                                    'expires_at',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.expires_at
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.expires_at && (
                                            <p className="text-sm text-red-600">
                                                {errors.expires_at}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="is_published">
                                            Status
                                        </Label>
                                        <select
                                            id="is_published"
                                            value={
                                                data.is_published
                                                    ? 'true'
                                                    : 'false'
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'is_published',
                                                    e.target.value === 'true',
                                                )
                                            }
                                            className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ${
                                                errors.is_published
                                                    ? 'border-red-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            disabled={!canManage}
                                        >
                                            <option value="true">
                                                Published
                                            </option>
                                            <option value="false">Draft</option>
                                        </select>
                                        {errors.is_published && (
                                            <p className="text-sm text-red-600">
                                                {errors.is_published}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="is_pinned">
                                            Priority
                                        </Label>
                                        <select
                                            id="is_pinned"
                                            value={
                                                data.is_pinned
                                                    ? 'true'
                                                    : 'false'
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'is_pinned',
                                                    e.target.value === 'true',
                                                )
                                            }
                                            className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ${
                                                errors.is_pinned
                                                    ? 'border-red-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            disabled={!canManage}
                                        >
                                            <option value="false">
                                                Normal
                                            </option>
                                            <option value="true">Pinned</option>
                                        </select>
                                        {errors.is_pinned && (
                                            <p className="text-sm text-red-600">
                                                {errors.is_pinned}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Announcement Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div>
                                        <strong>Created:</strong>{' '}
                                        {new Date(
                                            announcement.created_at,
                                        ).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Last Updated:</strong>{' '}
                                        {new Date(
                                            announcement.updated_at,
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
                                    onClick={() => router.visit('/usg/admin')}
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
