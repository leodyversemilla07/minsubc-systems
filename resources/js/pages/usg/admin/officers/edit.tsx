import OfficerController from '@/actions/Modules/USG/Http/Controllers/Admin/OfficerController';
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
import { type BreadcrumbItem } from '@/types';
import { Form, Head, router, usePage } from '@inertiajs/react';
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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Officer {
    id: number;
    name: string;
    position: string;
    department?: string;
    email: string;
    phone?: string;
    bio?: string;
    photo?: string;
    photo_url?: string;
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
    const { props } = usePage<{
        flash?: { success?: string; error?: string };
    }>();

    const [imagePreview, setImagePreview] = useState<string | null>(
        officer.photo_url || officer.photo || null,
    );
    const [termStart, setTermStart] = useState<Date | undefined>(
        officer.term_start ? new Date(officer.term_start) : undefined,
    );
    const [termEnd, setTermEnd] = useState<Date | undefined>(
        officer.term_end ? new Date(officer.term_end) : undefined,
    );
    const [isActive, setIsActive] = useState<boolean>(officer.is_active);

    // Show toast notifications from flash messages
    useEffect(() => {
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }
        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);

    // Update image preview when officer data changes (after save)
    useEffect(() => {
        if (officer.photo_url || officer.photo) {
            setImagePreview(officer.photo_url || officer.photo || null);
        }
    }, [officer.photo_url, officer.photo]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
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
        const input = document.getElementById('photo') as HTMLInputElement;
        if (input) input.value = '';
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
        { title: 'Officers', href: OfficerController.index().url },
        {
            title: `Edit ${officer.name}`,
            href: OfficerController.edit(officer.id).url,
        },
    ];

    const pageBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

    return (
        <AppLayout breadcrumbs={pageBreadcrumbs}>
            <Head title={`Edit ${officer.name} - USG Admin`} />
            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {!canManage && (
                        <Alert variant="destructive" className="mb-4 sm:mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                You don't have permission to edit officers.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Form
                        {...OfficerController.update.form(officer.id)}
                        options={{
                            preserveScroll: true,
                        }}
                    >
                        {({
                            errors,
                            hasErrors,
                            processing,
                            recentlySuccessful,
                            progress,
                        }) => (
                            <div className="space-y-6 sm:space-y-8">
                                {/* Error Messages */}
                                {hasErrors && (
                                    <Alert
                                        variant="destructive"
                                        className="mb-4 sm:mb-6"
                                    >
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Please fix the errors below before
                                            saving.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {recentlySuccessful && (
                                    <Alert className="mb-4 sm:mb-6">
                                        <AlertDescription>
                                            Officer updated successfully!
                                        </AlertDescription>
                                    </Alert>
                                )}

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
                                                    src={
                                                        imagePreview ||
                                                        undefined
                                                    }
                                                />
                                                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary dark:bg-primary dark:text-primary-foreground">
                                                    {getInitials(officer.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-center gap-2 sm:items-start">
                                                <div className="flex items-center gap-2">
                                                    <Label
                                                        htmlFor="photo"
                                                        className="cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-2 rounded-md border border-input px-4 py-2 transition-colors hover:bg-accent">
                                                            <Upload className="h-4 w-4" />
                                                            {imagePreview
                                                                ? 'Change Photo'
                                                                : 'Upload Photo'}
                                                        </div>
                                                        <Input
                                                            id="photo"
                                                            name="photo"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={
                                                                handleImageChange
                                                            }
                                                            className="hidden"
                                                            disabled={
                                                                !canManage
                                                            }
                                                        />
                                                    </Label>

                                                    {imagePreview &&
                                                        canManage && (
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={
                                                                    handleDeleteImage
                                                                }
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
                                        {errors.photo && (
                                            <p className="text-sm text-destructive">
                                                {errors.photo}
                                            </p>
                                        )}
                                        {progress && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Uploading photo...
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
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter full name"
                                                    defaultValue={officer.name}
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
                                                    name="position"
                                                    defaultValue={
                                                        officer.position
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
                                                        {positions.map(
                                                            (position) => (
                                                                <SelectItem
                                                                    key={
                                                                        position
                                                                    }
                                                                    value={
                                                                        position
                                                                    }
                                                                >
                                                                    {position}
                                                                </SelectItem>
                                                            ),
                                                        )}
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
                                                    name="department"
                                                    defaultValue={
                                                        officer.department
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
                                                        {departments.map(
                                                            (dept) => (
                                                                <SelectItem
                                                                    key={dept}
                                                                    value={dept}
                                                                >
                                                                    {dept}
                                                                </SelectItem>
                                                            ),
                                                        )}
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
                                                    name="order"
                                                    type="number"
                                                    placeholder="0"
                                                    defaultValue={officer.order}
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
                                                    Lower numbers appear first
                                                    in listings
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
                                                    name="email"
                                                    type="email"
                                                    placeholder="officer@minsubc.edu.ph"
                                                    defaultValue={officer.email}
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
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="+63 9XX XXX XXXX"
                                                    defaultValue={officer.phone}
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
                                                    date={termStart}
                                                    onDateChange={(date) =>
                                                        setTermStart(date)
                                                    }
                                                    placeholder="Select term start date"
                                                    disabled={!canManage}
                                                    className={
                                                        errors.term_start
                                                            ? 'border-destructive'
                                                            : ''
                                                    }
                                                />
                                                {/* Hidden input for form submission */}
                                                <input
                                                    type="hidden"
                                                    name="term_start"
                                                    value={
                                                        termStart
                                                            ? termStart
                                                                  .toISOString()
                                                                  .split('T')[0]
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
                                                    date={termEnd}
                                                    onDateChange={(date) =>
                                                        setTermEnd(date)
                                                    }
                                                    placeholder="Select term end date"
                                                    disabled={!canManage}
                                                    className={
                                                        errors.term_end
                                                            ? 'border-destructive'
                                                            : ''
                                                    }
                                                />
                                                {/* Hidden input for form submission */}
                                                <input
                                                    type="hidden"
                                                    name="term_end"
                                                    value={
                                                        termEnd
                                                            ? termEnd
                                                                  .toISOString()
                                                                  .split('T')[0]
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
                                                        isActive
                                                            ? 'true'
                                                            : 'false'
                                                    }
                                                    onValueChange={(value) =>
                                                        setIsActive(
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
                                                {/* Hidden input for form submission with boolean value */}
                                                <input
                                                    type="hidden"
                                                    name="is_active"
                                                    value={isActive ? '1' : '0'}
                                                />
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
                                                name="bio"
                                                placeholder="Enter a brief biography, background, and qualifications..."
                                                defaultValue={officer.bio}
                                                rows={4}
                                                className={
                                                    errors.bio
                                                        ? 'border-destructive'
                                                        : ''
                                                }
                                                disabled={!canManage}
                                            />
                                            {errors.bio && (
                                                <FieldError>
                                                    {errors.bio}
                                                </FieldError>
                                            )}
                                            <FieldDescription>
                                                This will be displayed on the
                                                public officer profile
                                            </FieldDescription>
                                        </Field>
                                    </CardContent>
                                </Card>

                                {/* Officer Metadata */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Officer Information
                                        </CardTitle>
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
                                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:gap-4 pt-6">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    router.visit(
                                                        OfficerController.index()
                                                            .url,
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
                                            className="w-full sm:w-auto sm:min-w-[120px]"
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
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
