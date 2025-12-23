import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';
import { useState } from 'react';

interface DigitalizedDocument {
    id: number;
    document_title: string;
    document_category: string;
    document_type: string | null;
    file_path: string;
    file_name: string;
    file_size: number;
    reference_number: string | null;
    original_date: string | null;
    academic_year: string | null;
    related_entity_type: string | null;
    related_entity_id: number | null;
    physical_location: string | null;
    is_public: boolean;
}

interface Props {
    document: DigitalizedDocument;
}

export default function EditDocument({ document }: Props) {
    const { data, setData, post, processing, errors, progress } = useForm({
        _method: 'PUT',
        document_title: document.document_title,
        document_category: document.document_category,
        document_type: document.document_type || '',
        file: null as File | null,
        reference_number: document.reference_number || '',
        original_date: document.original_date ? document.original_date.split('T')[0] : '',
        academic_year: document.academic_year || '',
        related_entity_type: document.related_entity_type || '',
        related_entity_id: document.related_entity_id?.toString() || '',
        physical_location: document.physical_location || '',
        is_public: document.is_public,
    });

    const [fileName, setFileName] = useState(document.file_name);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('file', file);
            setFileName(file.name);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use post with _method: 'PUT' for multipart support
        post(sas.admin.documents.update.url(document.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: sas.admin.dashboard.url() },
                { title: 'Documents', href: sas.admin.documents.index.url() },
                { title: `Edit: ${document.document_title}`, href: sas.admin.documents.edit.url(document.id) },
            ]}
        >
            <Head title={`Edit Document: ${document.document_title}`} />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                            Edit Document
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Update document details and file
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* File Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle>File Information</CardTitle>
                            <CardDescription>
                                Current file: <span className="font-semibold text-foreground">{document.file_name}</span>.
                                Upload a new file only if you want to replace it.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="file">Replace Document File (Optional)</Label>
                                <div className="flex items-center gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            window.document.getElementById('file')?.click()
                                        }
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Choose New File
                                    </Button>
                                    <span className="text-sm text-gray-600">
                                        {fileName}
                                    </span>
                                </div>
                                <Input
                                    id="file"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                    className="hidden"
                                />
                                {errors.file && (
                                    <p className="text-sm text-red-600">
                                        {errors.file}
                                    </p>
                                )}
                                {progress && (
                                    <div className="mt-2">
                                        <div className="mb-1 flex justify-between text-sm">
                                            <span>Uploading...</span>
                                            <span>{progress.percentage}%</span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-full bg-blue-600 transition-all"
                                                style={{
                                                    width: `${progress.percentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Document Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Document Information</CardTitle>
                            <CardDescription>
                                Basic details about the document
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="document_title">
                                    Document Title *
                                </Label>
                                <Input
                                    id="document_title"
                                    value={data.document_title}
                                    onChange={(e) =>
                                        setData('document_title', e.target.value)
                                    }
                                    placeholder="e.g., Scholarship Agreement 2024-2025"
                                    required
                                />
                                {errors.document_title && (
                                    <p className="text-sm text-red-600">
                                        {errors.document_title}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="document_category">
                                        Category *
                                    </Label>
                                    <Select
                                        value={data.document_category}
                                        onValueChange={(value) =>
                                            setData('document_category', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Scholarship">
                                                Scholarship
                                            </SelectItem>
                                            <SelectItem value="Insurance">
                                                Insurance
                                            </SelectItem>
                                            <SelectItem value="Organization">
                                                Organization
                                            </SelectItem>
                                            <SelectItem value="Activity">
                                                Activity
                                            </SelectItem>
                                            <SelectItem value="Administrative">
                                                Administrative
                                            </SelectItem>
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.document_category && (
                                        <p className="text-sm text-red-600">
                                            {errors.document_category}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="document_type">
                                        Document Type
                                    </Label>
                                    <Input
                                        id="document_type"
                                        value={data.document_type}
                                        onChange={(e) =>
                                            setData('document_type', e.target.value)
                                        }
                                        placeholder="e.g., Agreement, Report, Form"
                                    />
                                    {errors.document_type && (
                                        <p className="text-sm text-red-600">
                                            {errors.document_type}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="reference_number">
                                        Reference Number
                                    </Label>
                                    <Input
                                        id="reference_number"
                                        value={data.reference_number}
                                        onChange={(e) =>
                                            setData(
                                                'reference_number',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g., REF-2024-001"
                                    />
                                    {errors.reference_number && (
                                        <p className="text-sm text-red-600">
                                            {errors.reference_number}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="original_date">
                                        Original Date
                                    </Label>
                                    <Input
                                        id="original_date"
                                        type="date"
                                        value={data.original_date}
                                        onChange={(e) =>
                                            setData('original_date', e.target.value)
                                        }
                                    />
                                    {errors.original_date && (
                                        <p className="text-sm text-red-600">
                                            {errors.original_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="academic_year">Academic Year</Label>
                                <Input
                                    id="academic_year"
                                    value={data.academic_year}
                                    onChange={(e) =>
                                        setData('academic_year', e.target.value)
                                    }
                                    placeholder="e.g., 2024-2025"
                                />
                                {errors.academic_year && (
                                    <p className="text-sm text-red-600">
                                        {errors.academic_year}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Details</CardTitle>
                            <CardDescription>
                                Optional metadata and storage information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="related_entity_type">
                                        Related Entity Type
                                    </Label>
                                    <Input
                                        id="related_entity_type"
                                        value={data.related_entity_type}
                                        onChange={(e) =>
                                            setData(
                                                'related_entity_type',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g., Scholarship, Student"
                                    />
                                    {errors.related_entity_type && (
                                        <p className="text-sm text-red-600">
                                            {errors.related_entity_type}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="related_entity_id">
                                        Related Entity ID
                                    </Label>
                                    <Input
                                        id="related_entity_id"
                                        type="number"
                                        value={data.related_entity_id}
                                        onChange={(e) =>
                                            setData(
                                                'related_entity_id',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g., 123"
                                    />
                                    {errors.related_entity_id && (
                                        <p className="text-sm text-red-600">
                                            {errors.related_entity_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="physical_location">
                                    Physical Location
                                </Label>
                                <Input
                                    id="physical_location"
                                    value={data.physical_location}
                                    onChange={(e) =>
                                        setData('physical_location', e.target.value)
                                    }
                                    placeholder="e.g., Cabinet A, Shelf 3, Box 12"
                                />
                                {errors.physical_location && (
                                    <p className="text-sm text-red-600">
                                        {errors.physical_location}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500">
                                    Where the physical copy is stored (if
                                    applicable)
                                </p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_public"
                                    checked={data.is_public}
                                    onCheckedChange={(checked) =>
                                        setData('is_public', checked === true)
                                    }
                                />
                                <Label
                                    htmlFor="is_public"
                                    className="cursor-pointer font-normal"
                                >
                                    Make this document publicly accessible
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href={sas.admin.documents.index.url()}>
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
