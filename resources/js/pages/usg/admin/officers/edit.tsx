import { DatePicker } from '@/components/date-picker';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import officerRoutes from '@/routes/usg/admin/officers';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    Eye,
    FileText,
    Mail,
    Save,
    Trash2,
    Upload,
    User,
    Users,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Officer {
    id: number;
    name: string;
    position: string;
    department?: string;
    email: string;
    phone?: string;
    bio?: string;
    profile_image?: string;
    is_active: boolean;
    term_start: string;
    term_end?: string;
    order: number;
    user_id?: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    officer: Officer;
    departments?: string[];
    positions?: string[];
    canManage?: boolean;
    breadcrumbs?: BreadcrumbItem[];
}

export default function EditOfficer({
    officer,
    departments = [],
    positions = [],
    canManage = true,
    breadcrumbs,
}: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(
        officer.profile_image || null,
    );

    const { data, setData, put, post, processing, errors } = useForm({
        name: officer.name,
        position: officer.position,
        department: officer.department || '',
        email: officer.email,
        phone: officer.phone || '',
        bio: officer.bio || '',
        profile_image: null as File | null,
        is_active: officer.is_active,
        term_start: officer.term_start,
        term_end: officer.term_end || '',
        order: officer.order,
        user_id: officer.user_id || null,
        _method: 'PUT',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.profile_image) {
            // Use POST with _method for file uploads
            post(`/usg/admin/officers/${officer.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    router.visit('/usg/admin/officers');
                },
            });
        } else {
            // Regular PUT for text-only updates
            put(`/usg/admin/officers/${officer.id}`, {
                onSuccess: () => {
                    // Don't redirect, stay on page to show success message
                },
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('profile_image', file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setImagePreview(null);
        setData('profile_image', null);
        // You might want to add a separate API call to delete the existing image
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const defaultBreadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/usg/admin' },
        { title: 'Officers', href: officerRoutes.index().url },
        {
            title: `Edit ${officer.name}`,
            href: officerRoutes.edit(officer.id).url,
        },
    ];

    const pageBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

    return (
        <AppLayout breadcrumbs={pageBreadcrumbs}>
            <Head title={`Edit ${officer.name} - USG Admin`} />
            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    {/* Error Messages */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="mb-4 sm:mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Please fix the errors below before saving.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!canManage && (
                        <Alert variant="destructive" className="mb-4 sm:mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                You don't have permission to edit officers.
                            </AlertDescription>
                        </Alert>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 sm:space-y-8"
                    >
                        {/* Profile Photo */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Profile Photo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                                    <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                                        <AvatarImage
                                            src={imagePreview || undefined}
                                        />
                                        <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary dark:bg-primary dark:text-primary-foreground">
                                            {getInitials(data.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-center gap-2 sm:items-start">
                                        <div className="flex items-center gap-2">
                                            <Label
                                                htmlFor="profile-image"
                                                className="cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2 rounded-md border border-input px-4 py-2 transition-colors hover:bg-accent">
                                                    <Upload className="h-4 w-4" />
                                                    {imagePreview
                                                        ? 'Change Photo'
                                                        : 'Upload Photo'}
                                                </div>
                                                <Input
                                                    id="profile-image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                    disabled={!canManage}
                                                />
                                            </Label>

                                            {imagePreview && canManage && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleDeleteImage}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-center text-sm text-muted-foreground sm:text-left">
                                            JPG, PNG up to 2MB
                                        </p>
                                    </div>
                                </div>
                                {errors.profile_image && (
                                    <p className="text-sm text-destructive">
                                        {errors.profile_image}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-success" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 sm:space-y-6">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="name">
                                            Full Name *
                                        </FieldLabel>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter full name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className={
                                                errors.name
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.name && (
                                            <FieldError>
                                                {errors.name}
                                            </FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="position">
                                            Position *
                                        </FieldLabel>
                                        <Select
                                            value={data.position}
                                            onValueChange={(value) =>
                                                setData('position', value)
                                            }
                                            disabled={!canManage}
                                            required
                                        >
                                            <SelectTrigger
                                                className={
                                                    errors.position
                                                        ? 'border-destructive'
                                                        : ''
                                                }
                                            >
                                                <SelectValue placeholder="Select Position" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {positions.map((position) => (
                                                    <SelectItem
                                                        key={position}
                                                        value={position}
                                                    >
                                                        {position}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.position && (
                                            <FieldError>
                                                {errors.position}
                                            </FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="department">
                                            Department
                                        </FieldLabel>
                                        <Select
                                            value={data.department}
                                            onValueChange={(value) =>
                                                setData('department', value)
                                            }
                                            disabled={!canManage}
                                        >
                                            <SelectTrigger
                                                className={
                                                    errors.department
                                                        ? 'border-destructive'
                                                        : ''
                                                }
                                            >
                                                <SelectValue placeholder="Select Department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departments.map((dept) => (
                                                    <SelectItem
                                                        key={dept}
                                                        value={dept}
                                                    >
                                                        {dept}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.department && (
                                            <FieldError>
                                                {errors.department}
                                            </FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="order">
                                            Display Order
                                        </FieldLabel>
                                        <Input
                                            id="order"
                                            type="number"
                                            placeholder="0"
                                            value={data.order}
                                            onChange={(e) =>
                                                setData(
                                                    'order',
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className={
                                                errors.order
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            min="0"
                                        />
                                        {errors.order && (
                                            <FieldError>
                                                {errors.order}
                                            </FieldError>
                                        )}
                                        <FieldDescription>
                                            Lower numbers appear first in
                                            listings
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-chart-2" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 sm:space-y-6">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email Address *
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="officer@minsubc.edu.ph"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className={
                                                errors.email
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.email && (
                                            <FieldError>
                                                {errors.email}
                                            </FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="phone">
                                            Phone Number
                                        </FieldLabel>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+63 9XX XXX XXXX"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            className={
                                                errors.phone
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.phone && (
                                            <FieldError>
                                                {errors.phone}
                                            </FieldError>
                                        )}
                                    </Field>
                                </FieldGroup>
                            </CardContent>
                        </Card>

                        {/* Term Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-chart-4" />
                                    Term Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                                    <Field>
                                        <FieldLabel htmlFor="term_start">
                                            Term Start *
                                        </FieldLabel>
                                        <DatePicker
                                            date={
                                                data.term_start
                                                    ? new Date(data.term_start)
                                                    : undefined
                                            }
                                            onDateChange={(date) =>
                                                setData(
                                                    'term_start',
                                                    date
                                                        ? date
                                                              .toISOString()
                                                              .split('T')[0]
                                                        : '',
                                                )
                                            }
                                            placeholder="Select term start date"
                                            disabled={!canManage}
                                            className={
                                                errors.term_start
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        />
                                        {errors.term_start && (
                                            <FieldError>
                                                {errors.term_start}
                                            </FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="term_end">
                                            Term End
                                        </FieldLabel>
                                        <DatePicker
                                            date={
                                                data.term_end
                                                    ? new Date(data.term_end)
                                                    : undefined
                                            }
                                            onDateChange={(date) =>
                                                setData(
                                                    'term_end',
                                                    date
                                                        ? date
                                                              .toISOString()
                                                              .split('T')[0]
                                                        : '',
                                                )
                                            }
                                            placeholder="Select term end date"
                                            disabled={!canManage}
                                            className={
                                                errors.term_end
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        />
                                        {errors.term_end && (
                                            <FieldError>
                                                {errors.term_end}
                                            </FieldError>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="is_active">
                                            Status
                                        </FieldLabel>
                                        <Select
                                            value={
                                                data.is_active
                                                    ? 'true'
                                                    : 'false'
                                            }
                                            onValueChange={(value) =>
                                                setData(
                                                    'is_active',
                                                    value === 'true',
                                                )
                                            }
                                            disabled={!canManage}
                                        >
                                            <SelectTrigger
                                                className={
                                                    errors.is_active
                                                        ? 'border-destructive'
                                                        : ''
                                                }
                                            >
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="false">
                                                    Inactive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.is_active && (
                                            <FieldError>
                                                {errors.is_active}
                                            </FieldError>
                                        )}
                                    </Field>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Biography */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-destructive" />
                                    Biography
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 sm:space-y-4">
                                <Field>
                                    <FieldLabel htmlFor="bio">
                                        About the Officer
                                    </FieldLabel>
                                    <Textarea
                                        id="bio"
                                        placeholder="Enter a brief biography, background, and qualifications..."
                                        value={data.bio}
                                        onChange={(e) =>
                                            setData('bio', e.target.value)
                                        }
                                        rows={4}
                                        className={
                                            errors.bio
                                                ? 'border-destructive'
                                                : ''
                                        }
                                        disabled={!canManage}
                                    />
                                    {errors.bio && (
                                        <FieldError>{errors.bio}</FieldError>
                                    )}
                                    <FieldDescription>
                                        This will be displayed on the public
                                        officer profile
                                    </FieldDescription>
                                </Field>
                            </CardContent>
                        </Card>

                        {/* Officer Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Officer Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                    <div>
                                        <strong>Created:</strong>{' '}
                                        {new Date(
                                            officer.created_at,
                                        ).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Last Updated:</strong>{' '}
                                        {new Date(
                                            officer.updated_at,
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        {canManage && (
                            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6">
                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            router.visit(
                                                officerRoutes.index().url,
                                            )
                                        }
                                        disabled={processing}
                                        className="w-full sm:w-auto"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            router.visit(
                                                `/usg/officers#officer-${officer.id}`,
                                            )
                                        }
                                        className="w-full sm:w-auto"
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Public Profile
                                    </Button>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full min-w-[120px] sm:w-auto"
                                >
                                    {processing ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
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
        </AppLayout>
    );
}
