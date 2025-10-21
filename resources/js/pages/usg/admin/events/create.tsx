import EventController from '@/actions/App/Modules/USG/Http/Controllers/Admin/EventController';
import { DatePicker } from '@/components/date-picker';
import { TimePicker } from '@/components/time-picker';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
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
import { Form, Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    Clock,
    DollarSign,
    FileImage,
    Image as ImageIcon,
    MapPin,
    Save,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    categories: string[];
    canManage?: boolean;
}

export default function CreateEvent({ categories, canManage = true }: Props) {
    // Form state for components that need custom handling
    const [eventDate, setEventDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [eventTime, setEventTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isPublished, setIsPublished] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [requiresRegistration, setRequiresRegistration] = useState(false);
    const [isFree, setIsFree] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [featuredImagePreview, setFeaturedImagePreview] = useState<
        string | null
    >(null);

    const processImageFile = (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

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

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            processImageFile(files[0]);
        }
    };

    const removeFeaturedImage = () => {
        setFeaturedImagePreview(null);
        const fileInput = document.getElementById(
            'featured-image',
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Events', href: '/usg/admin/events' },
                { title: 'Create Event', href: '/usg/admin/events/create' },
            ]}
        >
            <Head title="Create Event - USG Admin" />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <Form
                    {...EventController.store.form()}
                    options={{
                        preserveScroll: false,
                    }}
                    className="space-y-8"
                >
                    {({ errors, processing }) => (
                        <div className="space-y-8">
                            {/* Error Messages */}
                            {Object.keys(errors).length > 0 && (
                                <Alert variant="destructive" className="mb-6">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Please fix the errors below before
                                        saving.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {!canManage && (
                                <Alert variant="destructive" className="mb-6">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        You don't have permission to create
                                        events.
                                    </AlertDescription>
                                </Alert>
                            )}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        Event Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Event Title *
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Enter event title"
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
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="short_description">
                                            Short Description
                                        </Label>
                                        <Textarea
                                            id="short_description"
                                            name="short_description"
                                            placeholder="Brief summary of the event..."
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
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            This will be shown in event previews
                                            and calendar
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Full Description *
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Enter the full event description..."
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
                                        <Label htmlFor="category">
                                            Category
                                        </Label>
                                        <Select
                                            name="category"
                                            value={selectedCategory}
                                            onValueChange={setSelectedCategory}
                                            disabled={!canManage}
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
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                            <DatePicker
                                                date={eventDate}
                                                onDateChange={setEventDate}
                                                name="event_date"
                                                placeholder="Select event date"
                                                disabled={!canManage}
                                                showClearButton={false}
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
                                            <TimePicker
                                                id="event_time"
                                                label=""
                                                value={eventTime}
                                                onChange={setEventTime}
                                                error={errors.event_time}
                                                disabled={!canManage}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="end_date">
                                                End Date
                                            </Label>
                                            <DatePicker
                                                date={endDate}
                                                onDateChange={setEndDate}
                                                name="end_date"
                                                placeholder="Select end date (optional)"
                                                disabled={!canManage}
                                                minDate={eventDate}
                                                showClearButton={true}
                                            />
                                            {errors.end_date && (
                                                <p className="text-sm text-red-600">
                                                    {errors.end_date}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Leave empty for single-day
                                                events
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="end_time">
                                                End Time
                                            </Label>
                                            <TimePicker
                                                id="end_time"
                                                label=""
                                                value={endTime}
                                                onChange={setEndTime}
                                                error={errors.end_time}
                                                disabled={!canManage}
                                            />
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
                                        <Label htmlFor="location">
                                            Location *
                                        </Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            type="text"
                                            placeholder="e.g., MSU-Buug Campus Auditorium"
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
                                            name="venue_details"
                                            placeholder="Additional venue information, directions, parking details..."
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
                                            name="organizer"
                                            type="text"
                                            placeholder="e.g., USG Academic Committee"
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
                                                name="contact_email"
                                                type="email"
                                                placeholder="contact@minsubc.edu.ph"
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
                                                name="contact_phone"
                                                type="tel"
                                                placeholder="+63 9XX XXX XXXX"
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
                                                <Checkbox
                                                    id="requires_registration"
                                                    name="requires_registration"
                                                    checked={
                                                        requiresRegistration
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setRequiresRegistration(
                                                            checked === true,
                                                        )
                                                    }
                                                    disabled={!canManage}
                                                />
                                                <Label htmlFor="requires_registration">
                                                    Requires Registration
                                                </Label>
                                            </div>

                                            {requiresRegistration && (
                                                <div className="space-y-2">
                                                    <Label htmlFor="registration_url">
                                                        Registration URL
                                                    </Label>
                                                    <Input
                                                        id="registration_url"
                                                        name="registration_url"
                                                        type="url"
                                                        placeholder="https://forms.google.com/..."
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
                                                <Checkbox
                                                    id="is_free"
                                                    name="is_free"
                                                    checked={isFree}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setIsFree(
                                                            checked === true,
                                                        )
                                                    }
                                                    disabled={!canManage}
                                                />
                                                <Label htmlFor="is_free">
                                                    Free Event
                                                </Label>
                                            </div>

                                            {!isFree && (
                                                <div className="space-y-2">
                                                    <Label htmlFor="registration_fee">
                                                        Registration Fee (₱)
                                                    </Label>
                                                    <Input
                                                        id="registration_fee"
                                                        name="registration_fee"
                                                        type="number"
                                                        placeholder="0.00"
                                                        step="0.01"
                                                        min="0"
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
                                            name="max_attendees"
                                            type="number"
                                            placeholder="Leave empty for unlimited"
                                            min="1"
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
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Field>
                                            <FieldLabel>
                                                Upload Featured Image
                                            </FieldLabel>
                                            <div
                                                className={`relative rounded-lg border-2 border-dashed transition-colors ${
                                                    isDragging
                                                        ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20'
                                                        : 'border-gray-300 dark:border-gray-600'
                                                }`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <div className="flex flex-col items-center justify-center p-8 text-center">
                                                    <div
                                                        className={`mb-4 transition-colors ${
                                                            isDragging
                                                                ? 'text-blue-500'
                                                                : 'text-gray-400'
                                                        }`}
                                                    >
                                                        <ImageIcon className="mx-auto h-12 w-12" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {isDragging
                                                                ? 'Drop your image here'
                                                                : 'Drag & drop your image here'}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            or click to browse
                                                            files
                                                        </p>
                                                    </div>
                                                    <Input
                                                        id="featured-image"
                                                        name="featured_image"
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                        disabled={!canManage}
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files?.[0];
                                                            if (file) {
                                                                processImageFile(
                                                                    file,
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <FieldDescription>
                                                JPG, PNG up to 5MB. This image
                                                will be displayed prominently
                                                for the event.
                                            </FieldDescription>
                                        </Field>
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
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="is_featured">
                                                Featured Event
                                            </Label>
                                            <Select
                                                value={
                                                    isFeatured
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                onValueChange={(value) =>
                                                    setIsFeatured(
                                                        value === 'true',
                                                    )
                                                }
                                                disabled={!canManage}
                                            >
                                                <SelectTrigger
                                                    className={
                                                        errors.is_featured
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
                                                        Featured
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.is_featured && (
                                                <p className="text-sm text-red-600">
                                                    {errors.is_featured}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Featured events appear
                                                prominently on the homepage
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
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Create Event
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
