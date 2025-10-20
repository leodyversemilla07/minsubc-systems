import { Alert, AlertDescription } from '@/components/ui/alert';
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
    Clock,
    DollarSign,
    Eye,
    FileImage,
    MapPin,
    Save,
    Trash2,
    Upload,
    Users,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    short_description?: string;
    category?: string;
    event_date: string;
    event_time: string;
    end_date?: string;
    end_time?: string;
    location: string;
    venue_details?: string;
    organizer: string;
    contact_email?: string;
    contact_phone?: string;
    registration_url?: string;
    registration_fee?: number;
    max_attendees?: number;
    featured_image?: string;
    is_published: boolean;
    is_featured: boolean;
    requires_registration: boolean;
    is_free: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    event: Event;
    categories: string[];
    canManage?: boolean;
}

export default function EditEvent({
    event,
    categories,
    canManage = true,
}: Props) {
    const [featuredImagePreview, setFeaturedImagePreview] = useState<
        string | null
    >(event.featured_image || null);

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
        title: event.title,
        description: event.description,
        short_description: event.short_description || '',
        category: event.category || '',
        event_date: event.event_date,
        event_time: event.event_time,
        end_date: event.end_date || '',
        end_time: event.end_time || '',
        location: event.location,
        venue_details: event.venue_details || '',
        organizer: event.organizer,
        contact_email: event.contact_email || '',
        contact_phone: event.contact_phone || '',
        registration_url: event.registration_url || '',
        registration_fee: event.registration_fee?.toString() || '',
        max_attendees: event.max_attendees?.toString() || '',
        featured_image: null as File | null,
        is_published: event.is_published,
        is_featured: event.is_featured,
        requires_registration: event.requires_registration,
        is_free: event.is_free,
        _method: 'PUT',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.featured_image) {
            // Use POST with _method for file uploads
            post(`/usg/admin/events/${event.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    router.visit('/usg/admin/events');
                },
            });
        } else {
            // Regular PUT for text-only updates
            put(`/usg/admin/events/${event.id}`, {
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

    const removeFeaturedImage = () => {
        setFeaturedImagePreview(null);
        setData('featured_image', null);
    };

    const formatDateTime = (date: string, time: string) => {
        if (!date || !time) return 'Not set';
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleString();
    };

    return (
        <>
            <Head title={`Edit ${event.title} - USG Admin`} />

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
                                        Edit Event
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Update event information
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.visit(`/usg/events/${event.id}`)
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
                                Event has been updated successfully!
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
                                You don't have permission to edit events.
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                    Event Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Event Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Enter event title"
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
                                    <Label htmlFor="short_description">
                                        Short Description
                                    </Label>
                                    <Textarea
                                        id="short_description"
                                        placeholder="Brief summary of the event..."
                                        value={data.short_description}
                                        onChange={(e) =>
                                            setData(
                                                'short_description',
                                                e.target.value,
                                            )
                                        }
                                        rows={2}
                                        className={
                                            errors.short_description
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                    />
                                    {errors.short_description && (
                                        <p className="text-sm text-red-600">
                                            {errors.short_description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Full Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Enter the full event description..."
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        rows={6}
                                        className={
                                            errors.description
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                        required
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData('category', e.target.value)
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
                            </CardContent>
                        </Card>

                        {/* Date & Time */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-green-600" />
                                    Date & Time
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="event_date">
                                            Event Date *
                                        </Label>
                                        <Input
                                            id="event_date"
                                            type="date"
                                            value={data.event_date}
                                            onChange={(e) =>
                                                setData(
                                                    'event_date',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.event_date
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.event_date && (
                                            <p className="text-sm text-red-600">
                                                {errors.event_date}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="event_time">
                                            Event Time *
                                        </Label>
                                        <Input
                                            id="event_time"
                                            type="time"
                                            value={data.event_time}
                                            onChange={(e) =>
                                                setData(
                                                    'event_time',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.event_time
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                            required
                                        />
                                        {errors.event_time && (
                                            <p className="text-sm text-red-600">
                                                {errors.event_time}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="end_date">
                                            End Date
                                        </Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) =>
                                                setData(
                                                    'end_date',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.end_date
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.end_date && (
                                            <p className="text-sm text-red-600">
                                                {errors.end_date}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="end_time">
                                            End Time
                                        </Label>
                                        <Input
                                            id="end_time"
                                            type="time"
                                            value={data.end_time}
                                            onChange={(e) =>
                                                setData(
                                                    'end_time',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.end_time
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.end_time && (
                                            <p className="text-sm text-red-600">
                                                {errors.end_time}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
                                    <Label className="font-medium">
                                        Current Schedule
                                    </Label>
                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div>
                                            <strong>Start:</strong>{' '}
                                            {formatDateTime(
                                                event.event_date,
                                                event.event_time,
                                            )}
                                        </div>
                                        {event.end_date && event.end_time && (
                                            <div>
                                                <strong>End:</strong>{' '}
                                                {formatDateTime(
                                                    event.end_date,
                                                    event.end_time,
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-red-600" />
                                    Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location *</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        placeholder="e.g., MSU-Buug Campus Auditorium"
                                        value={data.location}
                                        onChange={(e) =>
                                            setData('location', e.target.value)
                                        }
                                        className={
                                            errors.location
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                        required
                                    />
                                    {errors.location && (
                                        <p className="text-sm text-red-600">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="venue_details">
                                        Venue Details
                                    </Label>
                                    <Textarea
                                        id="venue_details"
                                        placeholder="Additional venue information, directions, parking details..."
                                        value={data.venue_details}
                                        onChange={(e) =>
                                            setData(
                                                'venue_details',
                                                e.target.value,
                                            )
                                        }
                                        rows={3}
                                        className={
                                            errors.venue_details
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                    />
                                    {errors.venue_details && (
                                        <p className="text-sm text-red-600">
                                            {errors.venue_details}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Organizer & Contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-purple-600" />
                                    Organizer & Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="organizer">
                                        Organizer *
                                    </Label>
                                    <Input
                                        id="organizer"
                                        type="text"
                                        placeholder="e.g., USG Academic Committee"
                                        value={data.organizer}
                                        onChange={(e) =>
                                            setData('organizer', e.target.value)
                                        }
                                        className={
                                            errors.organizer
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                        required
                                    />
                                    {errors.organizer && (
                                        <p className="text-sm text-red-600">
                                            {errors.organizer}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_email">
                                            Contact Email
                                        </Label>
                                        <Input
                                            id="contact_email"
                                            type="email"
                                            placeholder="contact@minsubc.edu.ph"
                                            value={data.contact_email}
                                            onChange={(e) =>
                                                setData(
                                                    'contact_email',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.contact_email
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.contact_email && (
                                            <p className="text-sm text-red-600">
                                                {errors.contact_email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="contact_phone">
                                            Contact Phone
                                        </Label>
                                        <Input
                                            id="contact_phone"
                                            type="tel"
                                            placeholder="+63 9XX XXX XXXX"
                                            value={data.contact_phone}
                                            onChange={(e) =>
                                                setData(
                                                    'contact_phone',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.contact_phone
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canManage}
                                        />
                                        {errors.contact_phone && (
                                            <p className="text-sm text-red-600">
                                                {errors.contact_phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Registration & Pricing */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-orange-600" />
                                    Registration & Pricing
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                id="requires_registration"
                                                type="checkbox"
                                                checked={
                                                    data.requires_registration
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'requires_registration',
                                                        e.target.checked,
                                                    )
                                                }
                                                disabled={!canManage}
                                                className="rounded border-gray-300"
                                            />
                                            <Label htmlFor="requires_registration">
                                                Requires Registration
                                            </Label>
                                        </div>

                                        {data.requires_registration && (
                                            <div className="space-y-2">
                                                <Label htmlFor="registration_url">
                                                    Registration URL
                                                </Label>
                                                <Input
                                                    id="registration_url"
                                                    type="url"
                                                    placeholder="https://forms.google.com/..."
                                                    value={
                                                        data.registration_url
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'registration_url',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={
                                                        errors.registration_url
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                    disabled={!canManage}
                                                />
                                                {errors.registration_url && (
                                                    <p className="text-sm text-red-600">
                                                        {
                                                            errors.registration_url
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                id="is_free"
                                                type="checkbox"
                                                checked={data.is_free}
                                                onChange={(e) =>
                                                    setData(
                                                        'is_free',
                                                        e.target.checked,
                                                    )
                                                }
                                                disabled={!canManage}
                                                className="rounded border-gray-300"
                                            />
                                            <Label htmlFor="is_free">
                                                Free Event
                                            </Label>
                                        </div>

                                        {!data.is_free && (
                                            <div className="space-y-2">
                                                <Label htmlFor="registration_fee">
                                                    Registration Fee (₱)
                                                </Label>
                                                <Input
                                                    id="registration_fee"
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    min="0"
                                                    value={
                                                        data.registration_fee
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'registration_fee',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={
                                                        errors.registration_fee
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                    disabled={!canManage}
                                                />
                                                {errors.registration_fee && (
                                                    <p className="text-sm text-red-600">
                                                        {
                                                            errors.registration_fee
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="max_attendees">
                                        Maximum Attendees
                                    </Label>
                                    <Input
                                        id="max_attendees"
                                        type="number"
                                        placeholder="Leave empty for unlimited"
                                        min="1"
                                        value={data.max_attendees}
                                        onChange={(e) =>
                                            setData(
                                                'max_attendees',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.max_attendees
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={!canManage}
                                    />
                                    {errors.max_attendees && (
                                        <p className="text-sm text-red-600">
                                            {errors.max_attendees}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Image */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileImage className="h-5 w-5 text-indigo-600" />
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

                        {/* Publishing Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Publishing Options</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
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
                                        <Label htmlFor="is_featured">
                                            Featured Event
                                        </Label>
                                        <select
                                            id="is_featured"
                                            value={
                                                data.is_featured
                                                    ? 'true'
                                                    : 'false'
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'is_featured',
                                                    e.target.value === 'true',
                                                )
                                            }
                                            className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100 ${
                                                errors.is_featured
                                                    ? 'border-red-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            disabled={!canManage}
                                        >
                                            <option value="false">
                                                Normal
                                            </option>
                                            <option value="true">
                                                Featured
                                            </option>
                                        </select>
                                        {errors.is_featured && (
                                            <p className="text-sm text-red-600">
                                                {errors.is_featured}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Event Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Event Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div>
                                        <strong>Created:</strong>{' '}
                                        {new Date(
                                            event.created_at,
                                        ).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <strong>Last Updated:</strong>{' '}
                                        {new Date(
                                            event.updated_at,
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
                                    onClick={() =>
                                        router.visit('/usg/admin/events')
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
