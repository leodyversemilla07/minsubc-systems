import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    FileText,
    Mail,
    Save,
    Upload,
    User,
    Users,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Props {
    departments: string[];
    positions: string[];
    canManage?: boolean;
}

export default function CreateOfficer({
    departments,
    positions,
    canManage = true,
}: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        bio: '',
        profile_image: null as File | null,
        is_active: true,
        term_start: '',
        term_end: '',
        order: 0,
        user_id: null as number | null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            const value = data[key as keyof typeof data];
            if (value !== null && value !== undefined) {
                if (key === 'profile_image' && value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === 'boolean') {
                    formData.append(key, value ? '1' : '0');
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        post('/usg/admin/officers', {
            forceFormData: true,
            onSuccess: () => {
                router.visit('/usg/admin/officers');
            },
        });
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

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const currentYear = new Date().getFullYear();

    return (
        <>
            <Head title="Add Officer - USG Admin" />

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
                                        Add New Officer
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Create a new USG officer profile
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
                                You don't have permission to add officers.
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Photo */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    Profile Photo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage
                                            src={imagePreview || undefined}
                                        />
                                        <AvatarFallback className="bg-blue-100 text-lg font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                                            {data.name ? (
                                                getInitials(data.name)
                                            ) : (
                                                <User className="h-8 w-8" />
                                            )}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="profile-image"
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                                                <Upload className="h-4 w-4" />
                                                Upload Photo
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
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            JPG, PNG up to 2MB
                                        </p>
                                    </div>
                                </div>
                                {errors.profile_image && (
                                    <p className="text-sm text-red-600">
                                        {errors.profile_image}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-green-600" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Full Name *
                                        </Label>
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
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="position">
                                            Position *
                                        </Label>
                                        <select
                                            id="position"
                                            value={data.position}
                                            onChange={(e) =>
                                                setData(
                                                    'position',
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ${
                                                errors.position
                                                    ? 'border-red-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            disabled={!canManage}
                                            required
                                        >
                                            <option value="">
                                                Select Position
                                            </option>
                                            {positions.map((position) => (
                                                <option
                                                    key={position}
                                                    value={position}
                                                >
                                                    {position}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.position && (
                                            <p className="text-sm text-red-600">
                                                {errors.position}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="department">
                                            Department
                                        </Label>
                                        <select
                                            id="department"
                                            value={data.department}
                                            onChange={(e) =>
                                                setData(
                                                    'department',
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ${
                                                errors.department
                                                    ? 'border-red-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            disabled={!canManage}
                                        >
                                            <option value="">
                                                Select Department
                                            </option>
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>
                                                    {dept}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.department && (
                                            <p className="text-sm text-red-600">
                                                {errors.department}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="order">
                                            Display Order
                                        </Label>
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
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            min="0"
                                        />
                                        {errors.order && (
                                            <p className="text-sm text-red-600">
                                                {errors.order}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Lower numbers appear first in
                                            listings
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-purple-600" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email Address *
                                        </Label>
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
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">
                                            Phone Number
                                        </Label>
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
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-600">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Term Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-orange-600" />
                                    Term Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="term_start">
                                            Term Start *
                                        </Label>
                                        <Input
                                            id="term_start"
                                            type="date"
                                            value={data.term_start}
                                            onChange={(e) =>
                                                setData(
                                                    'term_start',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.term_start
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.term_start && (
                                            <p className="text-sm text-red-600">
                                                {errors.term_start}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="term_end">
                                            Term End
                                        </Label>
                                        <Input
                                            id="term_end"
                                            type="date"
                                            value={data.term_end}
                                            onChange={(e) =>
                                                setData(
                                                    'term_end',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.term_end
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.term_end && (
                                            <p className="text-sm text-red-600">
                                                {errors.term_end}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="is_active">
                                            Status
                                        </Label>
                                        <select
                                            id="is_active"
                                            value={
                                                data.is_active
                                                    ? 'true'
                                                    : 'false'
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'is_active',
                                                    e.target.value === 'true',
                                                )
                                            }
                                            className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ${
                                                errors.is_active
                                                    ? 'border-red-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            disabled={!canManage}
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">
                                                Inactive
                                            </option>
                                        </select>
                                        {errors.is_active && (
                                            <p className="text-sm text-red-600">
                                                {errors.is_active}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Biography */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-red-600" />
                                    Biography
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bio">
                                        About the Officer
                                    </Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Enter a brief biography, background, and qualifications..."
                                        value={data.bio}
                                        onChange={(e) =>
                                            setData('bio', e.target.value)
                                        }
                                        rows={4}
                                        className={
                                            errors.bio ? 'border-red-500' : ''
                                        }
                                        disabled={!canManage}
                                    />
                                    {errors.bio && (
                                        <p className="text-sm text-red-600">
                                            {errors.bio}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        This will be displayed on the public
                                        officer profile
                                    </p>
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
                                        router.visit('/usg/admin/officers')
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
                                            Add Officer
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
