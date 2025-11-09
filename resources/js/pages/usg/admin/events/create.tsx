import EventController from '@/actions/Modules/USG/Http/Controllers/Admin/EventController';
import { DatePicker } from '@/components/date-picker';
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
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { Spinner } from '@/components/ui/spinner';
import { FileUpload } from '@/components/file-upload';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/usg/admin';
import { Form, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    AlertCircle,
    Calendar,
    Clock,
    FileImage,
    MapPin,
    Save,
} from 'lucide-react';
import { format } from 'date-fns';

interface Props {
    categories: string[];
    canManage?: boolean;
}

export default function CreateEvent({ categories, canManage = true }: Props) {
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('');
    const [eventTime, setEventTime] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [venueDetails, setVenueDetails] = useState<string>('');

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: dashboard().url },
                { title: 'Events', href: '/usg/admin/events' },
                { title: 'Create Event', href: '/usg/admin/events/create' },
            ]}
        >
            <Head title="Create Event - USG Admin" />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Page Header */}
                <PageHeader
                    title="Create New Event"
                    description="Schedule and manage upcoming USG events"
                    icon={Calendar}
                />

                <Form
                    {...EventController.store.form()}
                    options={{
                        preserveScroll: false,
                    }}
                    className="space-y-8"
                >
                    {({ errors, hasErrors, processing, progress }) => (
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
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
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
                                        <Label htmlFor="description">
                                            Description *
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Enter the event description..."
                                            rows={6}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
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
                                            // Select is a custom component; keep UI driven by state
                                            value={category}
                                            onValueChange={(value) => setCategory(value)}
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
                                        {/* Hidden native input so Inertia's Form submits the value */}
                                        <input type="hidden" name="category" value={category} />
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
                                                date={eventDate ? new Date(eventDate) : undefined}
                                                onDateChange={(date) => setEventDate(date ? format(date, 'yyyy-MM-dd') : '')}
                                                name="event_date_picker"
                                                placeholder="Select event date"
                                                disabled={!canManage}
                                                showClearButton={false}
                                            />
                                            <input type="hidden" name="event_date" value={eventDate} />
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
                                                onChange={(value) => setEventTime(value ? value.substring(0, 5) : '')}
                                                error={errors.event_time}
                                                disabled={!canManage}
                                                required
                                            />
                                            <input type="hidden" name="event_time" value={eventTime} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="end_date">
                                                End Date
                                            </Label>
                                            <DatePicker
                                                date={endDate ? new Date(endDate) : undefined}
                                                onDateChange={(date) => setEndDate(date ? format(date, 'yyyy-MM-dd') : '')}
                                                name="end_date_picker"
                                                placeholder="Select end date (optional)"
                                                disabled={!canManage}
                                                minDate={eventDate ? new Date(eventDate) : undefined}
                                                showClearButton={true}
                                            />
                                            <input type="hidden" name="end_date" value={endDate} />
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
                                                onChange={(value) => setEndTime(value ? value.substring(0, 5) : '')}
                                                error={errors.end_time}
                                                disabled={!canManage}
                                            />
                                            <input type="hidden" name="end_time" value={endTime} />
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
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
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
                                            value={venueDetails}
                                            onChange={(e) => setVenueDetails(e.target.value)}
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
                                    <FileUpload
                                        file={featuredImage}
                                        onFileChange={setFeaturedImage}
                                        label="Upload Featured Image"
                                        description="JPG, PNG up to 5MB. This image will be displayed prominently for the event."
                                        error={errors.featured_image}
                                        accept="image/*"
                                        allowedTypes={['image/jpeg', 'image/png', 'image/jpg', 'image/webp']}
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
                                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4 pt-6">
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
