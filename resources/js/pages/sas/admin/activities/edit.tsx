import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Organization {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    activity_title: string;
    description: string | null;
    start_date: string;
    end_date: string;
    all_day: boolean;
    location: string | null;
    category: string | null;
    organizer: string | null;
    organization_id: number | null;
    color: string;
    is_recurring: boolean;
    recurrence_rule: string | null;
    target_participants: number | null;
    status: string;
}

interface Props {
    activity: Activity;
    organizations: Organization[];
}

export default function EditActivity({ activity, organizations }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        activity_title: activity.activity_title || '',
        description: activity.description || '',
        start_date: activity.start_date || '',
        end_date: activity.end_date || '',
        all_day: activity.all_day || false,
        location: activity.location || '',
        category: activity.category || '',
        organizer: activity.organizer || '',
        organization_id: activity.organization_id?.toString() || '',
        color: activity.color || '#3b82f6',
        is_recurring: activity.is_recurring || false,
        recurrence_rule: activity.recurrence_rule || '',
        target_participants: activity.target_participants?.toString() || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/sas/admin/activities/${activity.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Activity" />

            <div className="mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={sas.admin.activities.index.url()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Edit Activity
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Update activity details
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Update the core details for the activity
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="activity_title">
                                Activity Title *
                            </Label>
                            <Input
                                id="activity_title"
                                value={data.activity_title}
                                onChange={(e) =>
                                    setData('activity_title', e.target.value)
                                }
                                placeholder="e.g., Leadership Training Seminar"
                                required
                            />
                            {errors.activity_title && (
                                <p className="text-sm text-red-600">
                                    {errors.activity_title}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={data.category}
                                    onValueChange={(value) =>
                                        setData('category', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Seminar">
                                            Seminar
                                        </SelectItem>
                                        <SelectItem value="Workshop">
                                            Workshop
                                        </SelectItem>
                                        <SelectItem value="Training">
                                            Training
                                        </SelectItem>
                                        <SelectItem value="Sports">
                                            Sports
                                        </SelectItem>
                                        <SelectItem value="Cultural">
                                            Cultural
                                        </SelectItem>
                                        <SelectItem value="Social">
                                            Social
                                        </SelectItem>
                                        <SelectItem value="Leadership">
                                            Leadership
                                        </SelectItem>
                                        <SelectItem value="Community Service">
                                            Community Service
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.category && (
                                    <p className="text-sm text-red-600">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="organization_id">
                                    Organization (Optional)
                                </Label>
                                <Select
                                    value={data.organization_id.toString()}
                                    onValueChange={(value) =>
                                        setData('organization_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select organization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">
                                            None
                                        </SelectItem>
                                        {organizations.map((org) => (
                                            <SelectItem
                                                key={org.id}
                                                value={org.id.toString()}
                                            >
                                                {org.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.organization_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.organization_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Enter activity description..."
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule & Location */}
                <Card>
                    <CardHeader>
                        <CardTitle>Schedule & Location</CardTitle>
                        <CardDescription>
                            Update the date, time, and venue
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Start Date *</Label>
                                <Input
                                    id="start_date"
                                    type="datetime-local"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData('start_date', e.target.value)
                                    }
                                    required
                                />
                                {errors.start_date && (
                                    <p className="text-sm text-red-600">
                                        {errors.start_date}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end_date">End Date *</Label>
                                <Input
                                    id="end_date"
                                    type="datetime-local"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData('end_date', e.target.value)
                                    }
                                    required
                                />
                                {errors.end_date && (
                                    <p className="text-sm text-red-600">
                                        {errors.end_date}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) =>
                                    setData('location', e.target.value)
                                }
                                placeholder="e.g., Main Auditorium"
                            />
                            {errors.location && (
                                <p className="text-sm text-red-600">
                                    {errors.location}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="all_day"
                                checked={data.all_day}
                                onCheckedChange={(checked) =>
                                    setData('all_day', checked === true)
                                }
                            />
                            <Label
                                htmlFor="all_day"
                                className="cursor-pointer font-normal"
                            >
                                All day event
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Additional Details</CardTitle>
                        <CardDescription>
                            Update organizer and participant information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="organizer">Organizer</Label>
                                <Input
                                    id="organizer"
                                    value={data.organizer}
                                    onChange={(e) =>
                                        setData('organizer', e.target.value)
                                    }
                                    placeholder="e.g., Student Affairs Office"
                                />
                                {errors.organizer && (
                                    <p className="text-sm text-red-600">
                                        {errors.organizer}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="target_participants">
                                    Target Participants
                                </Label>
                                <Input
                                    id="target_participants"
                                    type="number"
                                    min="0"
                                    value={data.target_participants}
                                    onChange={(e) =>
                                        setData(
                                            'target_participants',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Expected number of attendees"
                                />
                                {errors.target_participants && (
                                    <p className="text-sm text-red-600">
                                        {errors.target_participants}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color">Calendar Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="color"
                                    type="color"
                                    value={data.color}
                                    onChange={(e) =>
                                        setData('color', e.target.value)
                                    }
                                    className="h-10 w-20"
                                />
                                <Input
                                    type="text"
                                    value={data.color}
                                    onChange={(e) =>
                                        setData('color', e.target.value)
                                    }
                                    placeholder="#3b82f6"
                                    className="flex-1"
                                />
                            </div>
                            {errors.color && (
                                <p className="text-sm text-red-600">
                                    {errors.color}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" asChild>
                        <Link href={sas.admin.activities.index.url()}>Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Updating...' : 'Update Activity'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
