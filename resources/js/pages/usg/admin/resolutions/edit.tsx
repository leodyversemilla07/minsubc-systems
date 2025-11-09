import ResolutionController from '@/actions/Modules/USG/Http/Controllers/Admin/ResolutionController';
import { FileUpload } from '@/components/file-upload';
import { PageHeader } from '@/components/page-header';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes/usg/admin';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    AlertCircle,
    CalendarIcon,
    Download,
    Gavel,
    Save,
    Upload,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Resolution {
    id: number;
    title: string;
    resolution_number?: string;
    description: string;
    category?: string;
    status: string;
    date_passed?: string;
    file_path?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    resolution: Resolution;
    categories: string[];
    statuses: string[];
    canManage?: boolean;
    breadcrumbs?: BreadcrumbItem[];
}

export default function EditResolution({
    resolution,
    categories,
    statuses,
    canManage = true,
    breadcrumbs,
}: Props) {
    // Ensure arrays have defaults
    const safeCategories = categories || [];
    const safeStatuses = statuses || [];

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        resolution?.date_passed ? new Date(resolution.date_passed) : undefined,
    );
    const [selectedCategory, setSelectedCategory] = useState<string>(
        resolution?.category_id?.toString() || '',
    );
    const [selectedStatus, setSelectedStatus] = useState<string>(
        resolution?.status || 'published',
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDownload = () => {
        if (resolution.file_path) {
            window.open(`/storage/${resolution.file_path}`, '_blank');
        }
    };

    const defaultBreadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Resolutions', href: ResolutionController.index().url },
        {
            title: resolution.title,
            href: ResolutionController.show(resolution.id).url,
        },
        { title: 'Edit', href: ResolutionController.edit(resolution.id).url },
    ];

    const pageBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

    return (
        <AppLayout breadcrumbs={pageBreadcrumbs}>
            <Head title={`Edit ${resolution.title} - USG Admin`} />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page Header */}
                <PageHeader
                    title="Edit Resolution"
                    description="Update resolution information and document"
                    icon={Gavel}
                />

                {!canManage && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            You don't have permission to create resolutions.
                        </AlertDescription>
                    </Alert>
                )}

                <Form
                    action={ResolutionController.update(resolution.id).url}
                    method="post"
                    resetOnSuccess={false}
                    transform={(data) => ({
                        ...data,
                        _method: 'PUT',
                    })}
                >
                    {({
                        errors,
                        processing,
                        hasErrors,
                        progress,
                        recentlySuccessful,
                    }) => {
                        // Show toast on success
                        if (recentlySuccessful) {
                            toast.success('Resolution updated successfully!');
                        }

                        return (
                            <div className="space-y-8">
                                {/* Error Messages */}
                                {hasErrors && (
                                    <Alert variant="destructive" className="mb-6">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Please fix the errors below before
                                            saving.
                                        </AlertDescription>
                                    </Alert>
                                )}

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
                                        <Field>
                                            <FieldLabel htmlFor="title">
                                                Resolution Title *
                                            </FieldLabel>
                                            <Input
                                                id="title"
                                                type="text"
                                                name="title"
                                                placeholder="Enter resolution title"
                                                defaultValue={resolution.title}
                                                className={
                                                    errors.title
                                                        ? 'border-destructive'
                                                        : ''
                                                }
                                                disabled={!canManage}
                                                required
                                            />
                                            {errors.title && (
                                                <FieldError>
                                                    {errors.title}
                                                </FieldError>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="resolution_number">
                                                Resolution Number
                                            </FieldLabel>
                                            <Input
                                                id="resolution_number"
                                                type="text"
                                                name="resolution_number"
                                                placeholder="e.g., USG-2024-001"
                                                defaultValue={
                                                    resolution.resolution_number ||
                                                    ''
                                                }
                                                className={
                                                    errors.resolution_number
                                                        ? 'border-destructive'
                                                        : ''
                                                }
                                                disabled={!canManage}
                                            />
                                            {errors.resolution_number && (
                                                <FieldError>
                                                    {errors.resolution_number}
                                                </FieldError>
                                            )}
                                            <FieldDescription>
                                                Will be auto-generated if left
                                                empty
                                            </FieldDescription>
                                        </Field>
                                    </div>

                                    <Field>
                                        <FieldLabel htmlFor="description">
                                            Brief Description *
                                        </FieldLabel>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Brief summary of what this resolution addresses..."
                                            defaultValue={
                                                resolution.description
                                            }
                                            rows={2}
                                            className={
                                                errors.description
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.description && (
                                            <FieldError>
                                                {errors.description}
                                            </FieldError>
                                        )}
                                    </Field>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="date_passed">
                                                Date Passed *
                                            </FieldLabel>
                                            <input
                                                type="hidden"
                                                name="date_passed"
                                                value={
                                                    selectedDate
                                                        ? format(
                                                              selectedDate,
                                                              'yyyy-MM-dd',
                                                          )
                                                        : ''
                                                }
                                            />
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal',
                                                            !selectedDate &&
                                                                'text-muted-foreground',
                                                            errors.date_passed &&
                                                                'border-destructive',
                                                        )}
                                                        disabled={!canManage}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {selectedDate ? (
                                                            format(
                                                                selectedDate,
                                                                'PPP',
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={selectedDate}
                                                        onSelect={
                                                            setSelectedDate
                                                        }
                                                        disabled={(date) =>
                                                            date > new Date() ||
                                                            date <
                                                                new Date(
                                                                    '1900-01-01',
                                                                )
                                                        }
                                                        initialFocus
                                                        captionLayout="dropdown-months"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {errors.date_passed && (
                                                <FieldError>
                                                    {errors.date_passed}
                                                </FieldError>
                                            )}
                                            <FieldDescription>
                                                Date when this resolution was
                                                officially passed
                                            </FieldDescription>
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="category">
                                                Category
                                            </FieldLabel>
                                            <input
                                                type="hidden"
                                                name="category"
                                                value={selectedCategory}
                                            />
                                            <Select
                                                value={selectedCategory}
                                                onValueChange={
                                                    setSelectedCategory
                                                }
                                                disabled={!canManage}
                                            >
                                                <SelectTrigger
                                                    className={
                                                        errors.category
                                                            ? 'border-destructive'
                                                            : ''
                                                    }
                                                >
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {safeCategories.map(
                                                        (cat) => (
                                                            <SelectItem
                                                                key={cat}
                                                                value={cat}
                                                            >
                                                                {cat}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.category && (
                                                <FieldError>
                                                    {errors.category}
                                                </FieldError>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="status">
                                                Status
                                            </FieldLabel>
                                            <input
                                                type="hidden"
                                                name="status"
                                                value={selectedStatus}
                                            />
                                            <Select
                                                value={selectedStatus}
                                                onValueChange={
                                                    setSelectedStatus
                                                }
                                                disabled={!canManage}
                                            >
                                                <SelectTrigger
                                                    className={
                                                        errors.status
                                                            ? 'border-destructive'
                                                            : ''
                                                    }
                                                >
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {safeStatuses.map(
                                                        (stat) => (
                                                            <SelectItem
                                                                key={stat}
                                                                value={stat}
                                                            >
                                                                {stat
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    stat.slice(
                                                                        1,
                                                                    )}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.status && (
                                                <FieldError>
                                                    {errors.status}
                                                </FieldError>
                                            )}
                                        </Field>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Resolution Document */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Upload className="h-5 w-5 text-red-600" />
                                        Resolution Document (PDF)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Current Document */}
                                    {resolution.file_path && (
                                        <div className="rounded-md border border-border bg-muted/50 p-4">
                                            <Label className="mb-2 block text-sm font-medium">
                                                Current Document
                                            </Label>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded bg-red-100 p-2 dark:bg-red-900/20">
                                                        <svg
                                                            className="h-5 w-5 text-red-600 dark:text-red-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        Resolution Document.pdf
                                                    </span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleDownload}
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    <FileUpload
                                        file={selectedFile}
                                        onFileChange={setSelectedFile}
                                        label="Upload New Resolution Document (Optional)"
                                        description="Upload a new PDF to replace the existing document. The current file will be permanently deleted."
                                        error={errors.file}
                                        accept=".pdf"
                                        allowedTypes={['application/pdf']}
                                        maxSizeMB={10}
                                        required={false}
                                        disabled={!canManage}
                                        name="file"
                                    />

                                    {progress && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Uploading document...
                                                </span>
                                                <span className="font-medium">
                                                    {progress.percentage}%
                                                </span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                                <div
                                                    className="h-full bg-primary transition-all duration-300"
                                                    style={{
                                                        width: `${progress.percentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            {canManage && (
                                <div className="flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:justify-end sm:gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            router.visit(
                                                ResolutionController.index()
                                                    .url,
                                            )
                                        }
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
                                                <Spinner className="mr-2" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Update Resolution
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                        );
                    }}
                </Form>
            </div>
        </AppLayout>
    );
}
