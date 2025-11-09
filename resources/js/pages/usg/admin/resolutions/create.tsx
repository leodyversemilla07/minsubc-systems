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
import { AlertCircle, CalendarIcon, Gavel, Save, Upload } from 'lucide-react';
import { useState } from 'react';

interface Props {
    categories: string[];
    statuses: string[];
    canManage?: boolean;
    breadcrumbs?: BreadcrumbItem[];
}

export default function CreateResolution({
    categories,
    statuses,
    canManage = true,
    breadcrumbs,
}: Props) {
    // Ensure arrays have defaults
    const safeCategories = categories || [];
    const safeStatuses = statuses || [];

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        undefined,
    );
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('published');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const defaultBreadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Resolutions', href: ResolutionController.index().url },
        { title: 'Create Resolution', href: ResolutionController.create().url },
    ];

    const pageBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

    return (
        <AppLayout breadcrumbs={pageBreadcrumbs}>
            <Head title="Create Resolution - USG Admin" />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page Header */}
                <PageHeader
                    title="Create New Resolution"
                    description="Draft a new resolution for USG consideration"
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
                    {...ResolutionController.store.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-8"
                >
                    {({
                        errors,
                        hasErrors,
                        processing,
                        progress,
                        recentlySuccessful,
                    }) => (
                        <div className="space-y-8">
                            {/* Success Message */}
                            {recentlySuccessful && (
                                <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Resolution created successfully!
                                    </AlertDescription>
                                </Alert>
                            )}

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
                                                defaultValue=""
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
                                                defaultValue=""
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
                                            defaultValue=""
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
                                        Resolution Document (PDF) *
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FileUpload
                                        file={selectedFile}
                                        onFileChange={setSelectedFile}
                                        label="Upload Approved Resolution"
                                        description="Upload the approved resolution PDF document for publication"
                                        error={errors.file}
                                        accept=".pdf"
                                        allowedTypes={['application/pdf']}
                                        maxSizeMB={10}
                                        required
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
                                                Publishing...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Publish Resolution
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
