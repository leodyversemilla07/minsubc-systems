import EventController from '@/actions/Modules/USG/Http/Controllers/Admin/EventController';
import { DatePicker } from '@/components/date-picker';
import { FileUpload } from '@/components/file-upload';
import { PageHeader } from '@/components/page-header';
import { TimePicker } from '@/components/time-picker';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Head, router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    AlertCircle,
    Calendar,
    Clock,
    FileImage,
    MapPin,
    Save,
} from 'lucide-react';

interface Event {
    id: number;
    title: string;
    description: string;
    category?: string;
    event_date: string;
    event_time: string;
    end_date?: string;
    end_time?: string;
    location: string;
    venue_details?: string;
    featured_image?: string;
    image_path?: string;
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
    const { data, setData, post, processing, errors, progress } = useForm({
        title: event.title || '',
        description: event.description || '',
        category: event.category || '',
        event_date: event.event_date || '',
        event_time: event.event_time ? event.event_time.substring(0, 5) : '',
        end_date: event.end_date || '',
        end_time: event.end_time ? event.end_time.substring(0, 5) : '',
        location: event.location || '',
        venue_details: event.venue_details || '',
        featured_image: null as File | null,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(EventController.update(event.id).url, {
            preserveScroll: false,
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Events', href: '/usg/admin/events' },
                {
                    title: 'Edit Event',
                    href: `/usg/admin/events/${event.id}/edit`,
                },
            ]}
        >
            <Head title={`Edit ${event.title} - USG Admin`} />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page Header */}
                <PageHeader
                    title="Edit Event"
                    description="Update event details and information"
                    icon={Calendar}
                />

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-8">
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

                        {/* Event Information */}
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
                                        name="title"
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
                                    <Label htmlFor="description">
                                        Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Enter the event description..."
                                        rows={6}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
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
                                    <Select
                                        name="category"
                                        value={data.category}
                                        onValueChange={(value) =>
                                            setData('category', value)
                                        }
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
                                            date={
                                                data.event_date
                                                    ? new Date(data.event_date)
                                                    : undefined
                                            }
                                            onDateChange={(date) =>
                                                setData(
                                                    'event_date',
                                                    date
                                                        ? format(
                                                              date,
                                                              'yyyy-MM-dd',
                                                          )
                                                        : '',
                                                )
                                            }
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
                                            value={data.event_time}
                                            onChange={(value) =>
                                                setData(
                                                    'event_time',
                                                    value
                                                        ? value.substring(0, 5)
                                                        : '',
                                                )
                                            }
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
                                            date={
                                                data.end_date
                                                    ? new Date(data.end_date)
                                                    : undefined
                                            }
                                            onDateChange={(date) =>
                                                setData(
                                                    'end_date',
                                                    date
                                                        ? format(
                                                              date,
                                                              'yyyy-MM-dd',
                                                          )
                                                        : '',
                                                )
                                            }
                                            name="end_date"
                                            placeholder="Select end date (optional)"
                                            disabled={!canManage}
                                            minDate={
                                                data.event_date
                                                    ? new Date(data.event_date)
                                                    : undefined
                                            }
                                            showClearButton={true}
                                        />
                                        {errors.end_date && (
                                            <p className="text-sm text-red-600">
                                                {errors.end_date}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Leave empty for single-day events
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="end_time">
                                            End Time
                                        </Label>
                                        <TimePicker
                                            id="end_time"
                                            label=""
                                            value={data.end_time}
                                            onChange={(value) =>
                                                setData(
                                                    'end_time',
                                                    value
                                                        ? value.substring(0, 5)
                                                        : '',
                                                )
                                            }
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
                                    <Label htmlFor="location">Location *</Label>
                                    <Input
                                        id="location"
                                        name="location"
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
                                        name="venue_details"
                                        placeholder="Additional venue information, directions, parking details..."
                                        rows={3}
                                        value={data.venue_details}
                                        onChange={(e) =>
                                            setData(
                                                'venue_details',
                                                e.target.value,
                                            )
                                        }
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

                        {/* Featured Image */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileImage className="h-5 w-5 text-indigo-600" />
                                    Featured Image
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Show existing image if no new file is selected */}
                                {!data.featured_image && event.image_path && (
                                    <div className="space-y-2">
                                        <Label>Current featured image</Label>
                                        <div className="flex justify-center">
                                            <div className="relative w-full max-w-md">
                                                <img
                                                    src={event.image_path}
                                                    alt="Current featured image"
                                                    className="h-48 w-full rounded-md border object-cover"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Upload a new image to replace the
                                            current one
                                        </p>
                                    </div>
                                )}

                                <FileUpload
                                    file={data.featured_image}
                                    onFileChange={(file) =>
                                        setData('featured_image', file)
                                    }
                                    label={
                                        data.featured_image || !event.image_path
                                            ? 'Upload Featured Image'
                                            : 'Replace Featured Image'
                                    }
                                    description="JPG, PNG up to 5MB. This image will be displayed prominently for the event."
                                    error={errors.featured_image}
                                    accept="image/*"
                                    allowedTypes={[
                                        'image/jpeg',
                                        'image/png',
                                        'image/jpg',
                                        'image/webp',
                                    ]}
                                    maxSizeMB={5}
                                    required={false}
                                    disabled={!canManage}
                                    name="featured_image"
                                    uploadText="Click to upload image"
                                    hintText="JPG, PNG, or WebP (Max 5MB)"
                                />

                                {progress && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Uploading image...
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
                                        router.visit('/usg/admin/events')
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
                </form>
            </div>
        </AppLayout>
    );
}
