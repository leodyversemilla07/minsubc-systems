import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SASLayout from '@/layouts/sas-layout';
import type { SASActivity } from '@/types/sas';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    User,
    Users,
    Share2,
    Building2,
} from 'lucide-react';

interface Props {
    activity: SASActivity;
}

export default function ActivityShow({ activity }: Props) {
    // Safety check
    if (!activity) {
        return (
            <SASLayout>
                <Head title="Activity Details - SAS" />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">
                            Activity Not Found
                        </h2>
                        <p className="mb-4 text-gray-600">
                            The activity you're looking for doesn't exist.
                        </p>
                        <Link href="/sas/activities">
                            <Button>Back to Activities</Button>
                        </Link>
                    </div>
                </div>
            </SASLayout>
        );
    }

    const getStatusColor = (status: string) => {
        const colors = {
            upcoming:
                'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            ongoing:
                'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            completed:
                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
            cancelled:
                'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        };
        return colors[status as keyof typeof colors] || colors.upcoming;
    };

    const getCategoryColor = (category: string | null) => {
        if (!category) return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        
        const lower = category.toLowerCase();
        if (lower.includes('workshop') || lower.includes('training')) {
            return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
        }
        if (lower.includes('seminar') || lower.includes('conference')) {
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
        }
        if (lower.includes('competition') || lower.includes('sports')) {
            return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
        }
        if (lower.includes('social') || lower.includes('cultural')) {
            return 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300';
        }
        if (lower.includes('community') || lower.includes('service')) {
            return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
        }
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return 'TBA';
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return '';
        }
    };

    const shareActivity = () => {
        if (navigator.share) {
            navigator.share({
                title: activity.activity_title,
                text: activity.description || '',
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <SASLayout>
            <Head title={`${activity.activity_title} - SAS`} />

            {/* Header */}
            <section className="border-b bg-white px-4 py-6 dark:bg-gray-900">
                <div className="mx-auto max-w-5xl">
                    <Link href="/sas/activities">
                        <Button variant="ghost" size="sm" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Activities
                        </Button>
                    </Link>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                            <div className="mb-3 flex flex-wrap gap-2">
                                <Badge
                                    className={getStatusColor(
                                        activity.activity_status,
                                    )}
                                >
                                    {activity.activity_status}
                                </Badge>
                                {activity.category && (
                                    <Badge
                                        className={getCategoryColor(
                                            activity.category,
                                        )}
                                    >
                                        {activity.category}
                                    </Badge>
                                )}
                            </div>
                            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                                {activity.activity_title}
                            </h1>
                            {activity.organization && (
                                <Link
                                    href={`/sas/organizations/${activity.organization.org_slug}`}
                                    className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <Building2 className="h-4 w-4" />
                                    {activity.organization.org_name}
                                </Link>
                            )}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={shareActivity}
                        >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-gray-50 px-4 py-8 dark:bg-gray-800">
                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Description */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>About This Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {activity.description ? (
                                        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                            {activity.description}
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">
                                            No description available.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Completion Report */}
                            {activity.completion_report && activity.activity_status === 'completed' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Completion Report</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                            {activity.completion_report}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Event Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Date */}
                                    <div className="flex items-start gap-3">
                                        <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                Date
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(activity.start_date)}
                                                {activity.end_date &&
                                                    activity.start_date !==
                                                        activity.end_date &&
                                                    ` - ${formatDate(activity.end_date)}`}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    {!activity.all_day && (
                                        <div className="flex items-start gap-3">
                                            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Time
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatTime(
                                                        activity.start_date,
                                                    )}{' '}
                                                    -{' '}
                                                    {formatTime(
                                                        activity.end_date,
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activity.all_day && (
                                        <div className="flex items-start gap-3">
                                            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Time
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    All Day Event
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Location */}
                                    {activity.location && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Location
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {activity.location}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Organizer */}
                                    {activity.organizer && (
                                        <div className="flex items-start gap-3">
                                            <User className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Organizer
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {activity.organizer}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Attendance */}
                            {activity.target_participants && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Participants</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                Target Participants
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {activity.target_participants}
                                            </div>
                                        </div>
                                        {activity.actual_participants && (
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Actual Participants
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {activity.actual_participants}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </SASLayout>
    );
}
