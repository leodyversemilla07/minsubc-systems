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
    FileImage,
    FileText,
    Plus,
    Save,
    Tag,
    Trash2,
    Upload,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Props {
    categories: string[];
    canManage?: boolean;
}

export default function CreateAnnouncement({
    categories,
    canManage = true,
}: Props) {
    const [attachments, setAttachments] = useState<File[]>([]);
    const [featuredImagePreview, setFeaturedImagePreview] = useState<
        string | null
    >(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        wasSuccessful,
        recentlySuccessful,
    } = useForm({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: [] as string[],
        featured_image: null as File | null,
        attachments: [] as File[],
        is_published: true,
        is_pinned: false,
        publish_at: new Date().toISOString().split('T')[0],
        expires_at: '',
        author_name: '',
    });

    const [currentTag, setCurrentTag] = useState('');

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/usg/admin/announcements', {
            forceFormData: true,
            onSuccess: () => {
                router.visit('/usg/admin');
            },
        });
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

    const handleAttachmentsChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(e.target.files || []);
        setAttachments((prev) => [...prev, ...files]);
        setData('attachments', [...attachments, ...files]);
    };

    const removeAttachment = (index: number) => {
        const newAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(newAttachments);
        setData('attachments', newAttachments);
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

    return (
        <>
            <Head title="Create Announcement - USG Admin" />

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
                                        Create New Announcement
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Add a new announcement for the USG
                                        community
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
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
                                You don't have permission to create
                                announcements.
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
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This will be shown in announcement
                                        previews and listings
                                    </p>
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
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="attachments">
                                        Add Files
                                    </Label>
                                    <Input
                                        id="attachments"
                                        type="file"
                                        multiple
                                        onChange={handleAttachmentsChange}
                                        disabled={!canManage}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                                    />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Supported: PDF, DOC, XLS, PPT, JPG, PNG
                                        up to 10MB each
                                    </p>
                                </div>

                                {attachments.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Selected Files</Label>
                                        <div className="space-y-2">
                                            {attachments.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between rounded border p-2"
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
                                                                removeAttachment(
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {errors.attachments && (
                                    <p className="text-sm text-red-600">
                                        {errors.attachments}
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
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Leave empty if announcement doesn't
                                            expire
                                        </p>
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
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Pinned announcements appear first in
                                            listings
                                        </p>
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
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Create Announcement
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
