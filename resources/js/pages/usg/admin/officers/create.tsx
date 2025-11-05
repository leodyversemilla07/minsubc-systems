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
import { Form, Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    FileText,
    Mail,
    Save,
    Upload,
    User,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    departments: string[];
    positions: string[];
    canManage?: boolean;
}

export default function CreateOfficer({
    departments,
    positions,
    canManage = true,
    breadcrumbs,
}: Props & { breadcrumbs?: BreadcrumbItem[] }) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [isActive, setIsActive] = useState(true);
    const [termStart, setTermStart] = useState('');
    const [termEnd, setTermEnd] = useState('');
    const [order, setOrder] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userId, setUserId] = useState<number | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
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
        { title: 'Add New Officer', href: OfficerController.create().url },
    ];

    const pageBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

    return (
        <AppLayout breadcrumbs={pageBreadcrumbs}>
            <Head title="Add Officer - USG Admin" />
            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Add New Officer
                    </h1>

                    {!canManage && (
                        <Alert variant="destructive" className="mb-4 sm:mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                You don't have permission to add officers.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Form
                        {...OfficerController.store.form()}
                        className="space-y-8"
                    >
                        {({ errors, processing, hasErrors }) => (
                            <div className="space-y-8">
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

                                {/* Hidden inputs for computed values */}
                                <input
                                    type="hidden"
                                    name="is_active"
                                    value={isActive ? '1' : '0'}
                                />
                                <input
                                    type="hidden"
                                    name="order"
                                    value={order}
                                />
                                {termStart && (
                                    <input
                                        type="hidden"
                                        name="term_start"
                                        value={termStart}
                                    />
                                )}
                                {termEnd && (
                                    <input
                                        type="hidden"
                                        name="term_end"
                                        value={termEnd}
                                    />
                                )}
                                {userId && (
                                    <input
                                        type="hidden"
                                        name="user_id"
                                        value={userId}
                                    />
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
                                                    {name ? (
                                                        getInitials(name)
                                                    ) : (
                                                        <User className="h-6 w-6 sm:h-8 sm:w-8" />
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-center gap-2 sm:items-start">
                                                <Label
                                                    htmlFor="profile-image"
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2 rounded-md border border-input px-4 py-2 transition-colors hover:bg-accent">
                                                        <Upload className="h-4 w-4" />
                                                        Upload Photo
                                                    </div>
                                                    <Input
                                                        id="profile-image"
                                                        type="file"
                                                        name="profile_image"
                                                        accept="image/*"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        className="hidden"
                                                        disabled={!canManage}
                                                    />
                                                </Label>
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
                                                    name="name"
                                                    placeholder="Enter full name"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
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
                                                    value={position}
                                                    onValueChange={(value) =>
                                                        setPosition(value)
                                                    }
                                                    disabled={!canManage}
                                                    name="position"
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
                                                    value={department}
                                                    onValueChange={(value) =>
                                                        setDepartment(value)
                                                    }
                                                    disabled={!canManage}
                                                    name="department"
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
                                                    type="number"
                                                    placeholder="0"
                                                    value={order}
                                                    onChange={(e) =>
                                                        setOrder(
                                                            parseInt(
                                                                e.target.value,
                                                            ) || 0,
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
                                                    type="email"
                                                    name="email"
                                                    placeholder="officer@minsubc.edu.ph"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
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
                                                    name="phone"
                                                    placeholder="+63 9XX XXX XXXX"
                                                    value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
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
                                                        termStart
                                                            ? new Date(
                                                                  termStart,
                                                              )
                                                            : undefined
                                                    }
                                                    onDateChange={(date) =>
                                                        setTermStart(
                                                            date
                                                                ? date
                                                                      .toISOString()
                                                                      .split(
                                                                          'T',
                                                                      )[0]
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
                                                        termEnd
                                                            ? new Date(termEnd)
                                                            : undefined
                                                    }
                                                    onDateChange={(date) =>
                                                        setTermEnd(
                                                            date
                                                                ? date
                                                                      .toISOString()
                                                                      .split(
                                                                          'T',
                                                                      )[0]
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
                                                value={bio}
                                                onChange={(e) =>
                                                    setBio(e.target.value)
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
                                {/* Action Buttons */}
                                {canManage && (
                                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4 pt-6">
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
                                                    Add Officer
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
