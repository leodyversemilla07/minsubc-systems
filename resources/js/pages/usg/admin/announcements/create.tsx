import AnnouncementController from '@/actions/App/Modules/USG/Http/Controllers/Admin/AnnouncementController';
import { DatePicker } from '@/components/date-picker';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/usg/admin/announcements';
import { Form, Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    FileImage,
    FileText,
    Image as ImageIcon,
    Plus,
    Save,
    Tag,
    Upload,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    categories: string[];
    canManage?: boolean;
}

interface AttachmentFile {
    file: File;
    id: string;
}

export default function CreateAnnouncement({
    categories,
    canManage = true,
}: Props) {
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [featuredImagePreview, setFeaturedImagePreview] = useState<
        string | null
    >(null);
    const [category, setCategory] = useState('');
    const [isPublished, setIsPublished] = useState(true);
    const [isPinned, setIsPinned] = useState(false);
    const [publishAt, setPublishAt] = useState<Date>(new Date());
    const [expiresAt, setExpiresAt] = useState<Date | undefined>();
    const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const MAX_TITLE_LENGTH = 255;
    const MAX_EXCERPT_LENGTH = 500;

    // Track unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () =>
            window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    // Mark form as changed when any field is modified
    useEffect(() => {
        if (
            title ||
            excerpt ||
            content ||
            tags.length > 0 ||
            category ||
            featuredImagePreview ||
            attachments.length > 0
        ) {
            setHasUnsavedChanges(true);
        }
    }, [
        title,
        excerpt,
        content,
        tags,
        category,
        featuredImagePreview,
        attachments,
    ]);

    const handleFeaturedImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            processImageFile(file);
        }
    };

    const processImageFile = (file: File) => {
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Featured image must be less than 5MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setFeaturedImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            processImageFile(file);

            // Update the hidden file input
            const fileInput = document.querySelector<HTMLInputElement>(
                'input[name="featured_image"]',
            );
            if (fileInput) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInput.files = dataTransfer.files;
            }
        } else {
            alert('Please drop an image file');
        }
    };

    const handleAttachmentsChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(e.target.files || []);
        const newAttachments: AttachmentFile[] = files.map((file) => ({
            file,
            id: Math.random().toString(36).substring(7),
        }));
        setAttachments([...attachments, ...newAttachments]);
    };

    const removeAttachment = (id: string) => {
        setAttachments(attachments.filter((att) => att.id !== id));

        // Update the file input
        const fileInput = document.querySelector<HTMLInputElement>(
            'input[name="attachments[]"]',
        );
        if (fileInput) {
            const dataTransfer = new DataTransfer();
            attachments
                .filter((att) => att.id !== id)
                .forEach((att) => dataTransfer.items.add(att.file));
            fileInput.files = dataTransfer.files;
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
        );
    };

    const handleCancel = () => {
        if (hasUnsavedChanges) {
            if (
                confirm(
                    'You have unsaved changes. Are you sure you want to leave?',
                )
            ) {
                router.visit(index());
            }
        } else {
            router.visit(index());
        }
    };

    const getCharacterCountColor = (current: number, max: number): string => {
        const percentage = (current / max) * 100;
        if (percentage >= 100) return 'text-red-600';
        if (percentage >= 90) return 'text-orange-600';
        if (percentage >= 75) return 'text-yellow-600';
        return 'text-muted-foreground';
    };

    const removeFeaturedImage = () => {
        setFeaturedImagePreview(null);
        // Clear the file input
        const fileInput = document.querySelector<HTMLInputElement>(
            'input[name="featured_image"]',
        );
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const addTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Announcements', href: index().url },
                { title: 'Create', href: '#' },
            ]}
        >
            <Head title="Create Announcement - USG Admin" />

            <div className="mx-auto max-w-5xl space-y-6 p-6 sm:space-y-8 md:p-8 lg:p-10">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Create New Announcement
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Add a new announcement for the USG community
                    </p>
                </div>

                {!canManage && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            You don't have permission to create announcements.
                        </AlertDescription>
                    </Alert>
                )}

                <Form
                    {...AnnouncementController.store.form()}
                    options={{
                        preserveScroll: false,
                    }}
                    className="space-y-8"
                >
                    {({ processing, errors, hasErrors }) => (
                        <div className="space-y-8">
                            {/* Error Messages */}
                            {hasErrors && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Please fix the errors below before
                                        saving.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Hidden input for tags */}
                            <input
                                type="hidden"
                                name="tags"
                                value={JSON.stringify(tags)}
                            />

                            {/* Hidden inputs for boolean values */}
                            <input
                                type="hidden"
                                name="is_published"
                                value={isPublished ? '1' : '0'}
                            />
                            <input
                                type="hidden"
                                name="is_pinned"
                                value={isPinned ? '1' : '0'}
                            />

                            {/* Basic Information */}
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                        <FileText className="h-4 w-4 shrink-0 text-blue-600 sm:h-5 sm:w-5" />
                                        Basic Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <Field>
                                        <div className="flex items-center justify-between gap-2">
                                            <FieldLabel htmlFor="title">
                                                Title *
                                            </FieldLabel>
                                            <span
                                                className={`shrink-0 text-xs font-medium ${getCharacterCountColor(title.length, MAX_TITLE_LENGTH)}`}
                                            >
                                                {title.length}/
                                                {MAX_TITLE_LENGTH}
                                            </span>
                                        </div>
                                        <Input
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(
                                                    e.target.value.slice(
                                                        0,
                                                        MAX_TITLE_LENGTH,
                                                    ),
                                                )
                                            }
                                            placeholder="Enter announcement title"
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
                                    </Field>

                                    <Field>
                                        <div className="flex items-center justify-between gap-2">
                                            <FieldLabel htmlFor="excerpt">
                                                Excerpt
                                            </FieldLabel>
                                            <span
                                                className={`shrink-0 text-xs font-medium ${getCharacterCountColor(excerpt.length, MAX_EXCERPT_LENGTH)}`}
                                            >
                                                {excerpt.length}/
                                                {MAX_EXCERPT_LENGTH}
                                            </span>
                                        </div>
                                        <Textarea
                                            id="excerpt"
                                            name="excerpt"
                                            value={excerpt}
                                            onChange={(e) =>
                                                setExcerpt(
                                                    e.target.value.slice(
                                                        0,
                                                        MAX_EXCERPT_LENGTH,
                                                    ),
                                                )
                                            }
                                            placeholder="Brief summary of the announcement..."
                                            rows={2}
                                            className={
                                                errors.excerpt
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        <FieldDescription>
                                            This will be shown in announcement
                                            previews and listings
                                        </FieldDescription>
                                        {errors.excerpt && (
                                            <p className="text-sm text-red-600">
                                                {errors.excerpt}
                                            </p>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="content">
                                            Content *
                                        </FieldLabel>
                                        <Textarea
                                            id="content"
                                            name="content"
                                            value={content}
                                            onChange={(e) =>
                                                setContent(e.target.value)
                                            }
                                            placeholder="Enter the full announcement content..."
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
                                    </Field>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="category">
                                                Category
                                            </FieldLabel>
                                            <Select
                                                value={category}
                                                onValueChange={setCategory}
                                                disabled={!canManage}
                                                name="category"
                                            >
                                                <SelectTrigger
                                                    className={
                                                        errors.category
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                >
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={category}
                                                                value={category}
                                                            >
                                                                {category}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.category && (
                                                <p className="text-sm text-red-600">
                                                    {errors.category}
                                                </p>
                                            )}
                                        </Field>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tags */}
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                        <Tag className="h-4 w-4 shrink-0 text-green-600 sm:h-5 sm:w-5" />
                                        Tags
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Field>
                                        <FieldLabel>Add Tags</FieldLabel>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="text"
                                                placeholder="Add a tag..."
                                                value={currentTag}
                                                onChange={(e) =>
                                                    setCurrentTag(
                                                        e.target.value,
                                                    )
                                                }
                                                onKeyPress={handleKeyPress}
                                                disabled={!canManage}
                                                className="flex-1"
                                            />
                                            <Button
                                                type="button"
                                                onClick={addTag}
                                                disabled={
                                                    !currentTag.trim() ||
                                                    !canManage
                                                }
                                                variant="outline"
                                                size="sm"
                                                className="shrink-0"
                                            >
                                                <Plus className="h-4 w-4 sm:mr-2" />
                                                <span className="hidden sm:inline">
                                                    Add
                                                </span>
                                            </Button>
                                        </div>
                                    </Field>

                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag, index) => (
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
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                        <FileImage className="h-4 w-4 shrink-0 text-purple-600 sm:h-5 sm:w-5" />
                                        Featured Image
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {featuredImagePreview ? (
                                        <div className="space-y-4">
                                            <div className="group relative overflow-hidden rounded-lg border bg-muted/50">
                                                <img
                                                    src={featuredImagePreview}
                                                    alt="Featured image preview"
                                                    className="h-48 w-full object-cover transition-transform group-hover:scale-105 sm:h-56 md:h-64"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                                {canManage && (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={
                                                            removeFeaturedImage
                                                        }
                                                        className="absolute top-3 right-3 shadow-lg"
                                                    >
                                                        <X className="mr-1 h-4 w-4" />
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                                                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground">
                                                    Featured image uploaded
                                                    successfully
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <Field>
                                            <FieldLabel>
                                                Featured Image
                                            </FieldLabel>
                                            <label
                                                htmlFor="featured-image"
                                                className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 transition-all sm:px-6 sm:py-10 ${
                                                    isDragging
                                                        ? 'scale-[1.02] border-primary bg-primary/10'
                                                        : 'border-muted-foreground/25 bg-muted/50 hover:border-primary/50 hover:bg-muted'
                                                }`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <div className="flex flex-col items-center gap-3 text-center">
                                                    <div
                                                        className={`rounded-full p-3 transition-all sm:p-4 ${
                                                            isDragging
                                                                ? 'scale-110 bg-primary/20'
                                                                : 'bg-primary/10 group-hover:scale-110'
                                                        }`}
                                                    >
                                                        <Upload
                                                            className={`h-6 w-6 transition-colors sm:h-8 sm:w-8 ${
                                                                isDragging
                                                                    ? 'animate-bounce text-primary'
                                                                    : 'text-primary'
                                                            }`}
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-medium sm:text-sm">
                                                            {isDragging
                                                                ? 'Drop image here'
                                                                : 'Click to upload or drag and drop'}
                                                        </p>
                                                        <FieldDescription>
                                                            JPG, PNG, WebP up to
                                                            5MB
                                                        </FieldDescription>
                                                    </div>
                                                    {!isDragging && (
                                                        <div className="hidden items-center gap-2 sm:flex">
                                                            <div className="h-px w-12 bg-border" />
                                                            <span className="text-xs text-muted-foreground">
                                                                Supports drag
                                                                and drop
                                                            </span>
                                                            <div className="h-px w-12 bg-border" />
                                                        </div>
                                                    )}
                                                </div>
                                                <Input
                                                    id="featured-image"
                                                    type="file"
                                                    name="featured_image"
                                                    accept="image/*"
                                                    onChange={
                                                        handleFeaturedImageChange
                                                    }
                                                    className="hidden"
                                                    disabled={!canManage}
                                                />
                                            </label>
                                        </Field>
                                    )}
                                    {errors.featured_image && (
                                        <p className="text-sm text-red-600">
                                            {errors.featured_image}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Attachments */}
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex flex-wrap items-center gap-2 text-base sm:text-lg">
                                        <Upload className="h-4 w-4 shrink-0 text-orange-600 sm:h-5 sm:w-5" />
                                        <span>Attachments</span>
                                        {attachments.length > 0 && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {attachments.length}{' '}
                                                {attachments.length === 1
                                                    ? 'file'
                                                    : 'files'}
                                            </Badge>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Field>
                                        <FieldLabel htmlFor="attachments">
                                            Add Files
                                        </FieldLabel>
                                        <Input
                                            id="attachments"
                                            type="file"
                                            name="attachments[]"
                                            multiple
                                            disabled={!canManage}
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                                            onChange={handleAttachmentsChange}
                                        />
                                        <FieldDescription>
                                            Supported: PDF, DOC, XLS, PPT, JPG,
                                            PNG up to 10MB each
                                        </FieldDescription>
                                    </Field>

                                    {/* Attachment List */}
                                    {attachments.length > 0 && (
                                        <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
                                            <p className="mb-3 text-sm font-medium text-muted-foreground">
                                                Attached Files
                                            </p>
                                            <div className="space-y-2">
                                                {attachments.map(
                                                    (attachment) => (
                                                        <div
                                                            key={attachment.id}
                                                            className="flex items-center justify-between rounded-md border bg-background p-3 shadow-sm"
                                                        >
                                                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                                                <div className="rounded-md bg-primary/10 p-2">
                                                                    <FileText className="h-4 w-4 text-primary" />
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="truncate text-sm font-medium">
                                                                        {
                                                                            attachment
                                                                                .file
                                                                                .name
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {formatFileSize(
                                                                            attachment
                                                                                .file
                                                                                .size,
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {canManage && (
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        removeAttachment(
                                                                            attachment.id,
                                                                        )
                                                                    }
                                                                    className="ml-2 text-muted-foreground hover:text-red-600"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ),
                                                )}
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
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                        <Calendar className="h-4 w-4 shrink-0 text-indigo-600 sm:h-5 sm:w-5" />
                                        Publishing Options
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="publish_at">
                                                Publish Date *
                                            </FieldLabel>
                                            <DatePicker
                                                date={publishAt}
                                                onDateChange={(date) =>
                                                    setPublishAt(
                                                        date || new Date(),
                                                    )
                                                }
                                                name="publish_at"
                                                placeholder="Select publish date"
                                                disabled={!canManage}
                                                showClearButton={false}
                                            />
                                            {errors.publish_at && (
                                                <p className="text-sm text-red-600">
                                                    {errors.publish_at}
                                                </p>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="expires_at">
                                                Expiration Date
                                            </FieldLabel>
                                            <DatePicker
                                                date={expiresAt}
                                                onDateChange={setExpiresAt}
                                                name="expires_at"
                                                placeholder="Select expiration date (optional)"
                                                disabled={!canManage}
                                                minDate={publishAt}
                                                showClearButton={true}
                                            />
                                            <FieldDescription>
                                                Leave empty if announcement
                                                doesn't expire
                                            </FieldDescription>
                                            {errors.expires_at && (
                                                <p className="text-sm text-red-600">
                                                    {errors.expires_at}
                                                </p>
                                            )}
                                        </Field>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="is_published">
                                                Status
                                            </FieldLabel>
                                            <Select
                                                value={
                                                    isPublished
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                onValueChange={(value) =>
                                                    setIsPublished(
                                                        value === 'true',
                                                    )
                                                }
                                                disabled={!canManage}
                                            >
                                                <SelectTrigger
                                                    className={
                                                        errors.is_published
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                >
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">
                                                        Published
                                                    </SelectItem>
                                                    <SelectItem value="false">
                                                        Draft
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.is_published && (
                                                <p className="text-sm text-red-600">
                                                    {errors.is_published}
                                                </p>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="is_pinned">
                                                Priority
                                            </FieldLabel>
                                            <Select
                                                value={
                                                    isPinned ? 'true' : 'false'
                                                }
                                                onValueChange={(value) =>
                                                    setIsPinned(
                                                        value === 'true',
                                                    )
                                                }
                                                disabled={!canManage}
                                            >
                                                <SelectTrigger
                                                    className={
                                                        errors.is_pinned
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                >
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="false">
                                                        Normal
                                                    </SelectItem>
                                                    <SelectItem value="true">
                                                        Pinned
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FieldDescription>
                                                Pinned announcements appear
                                                first in listings
                                            </FieldDescription>
                                            {errors.is_pinned && (
                                                <p className="text-sm text-red-600">
                                                    {errors.is_pinned}
                                                </p>
                                            )}
                                        </Field>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            {canManage && (
                                <div className="flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={processing}
                                        className="w-full sm:w-auto"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto sm:min-w-[120px]"
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
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
