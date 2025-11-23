import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import type { SASActivity } from '@/types/sas';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Download,
    MapPin,
    Share2,
    User,
    FileText,
    CheckCircle,
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
                        <Link href={sas.activities.index.url()}>
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
                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
            ongoing:
                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
            completed:
                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
            cancelled:
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        };
        return colors[status as keyof typeof colors] || colors.upcoming;
    };

    const getCategoryColor = (category: string | null) => {
        if (!category)
            return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';

        const lower = category.toLowerCase();
        if (lower.includes('workshop') || lower.includes('training')) {
            return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
        }
        if (lower.includes('seminar') || lower.includes('conference')) {
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
        }
        if (lower.includes('competition') || lower.includes('sports')) {
            return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
        }
        if (lower.includes('social') || lower.includes('cultural')) {
            return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
        }
        if (lower.includes('community') || lower.includes('service')) {
            return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
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

            {/* --- Hero / Header Section --- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-white pt-12 pb-12 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-green-950/20 dark:to-slate-950 border-b border-green-100 dark:border-slate-800">

                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.15] dark:opacity-[0.07]">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-green-600" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                    </svg>
                </div>

                <div className="relative mx-auto max-w-7xl px-4">
                    {/* Back Link */}
                    <Link href={sas.activities.index.url()} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-green-700 dark:text-slate-400 dark:hover:text-green-400">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Activities
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 lg:gap-8">
                        {/* Icon Box */}
                        <div className="flex-shrink-0">
                            <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-xl dark:from-green-900 dark:to-green-800">
                                <Calendar className="h-10 w-10 md:h-12 md:w-12 text-green-700 dark:text-green-300" />
                            </div>
                        </div>

                        {/* Title & Meta */}
                        <div className="flex-1">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <Badge className={getStatusColor(activity.activity_status)}>
                                    {activity.activity_status}
                                </Badge>
                                {activity.category && (
                                    <Badge className={getCategoryColor(activity.category)}>
                                        {activity.category}
                                    </Badge>
                                )}
                                {activity.organizer && (
                                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                        <User className="mr-1 h-3 w-3" />
                                        {activity.organizer}
                                    </span>
                                )}
                            </div>

                            <h1 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl dark:text-white tracking-tight">
                                {activity.activity_title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="font-semibold">{formatDate(activity.start_date)}</span>
                                </div>
                                {!activity.all_day && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        <span>{formatTime(activity.start_date)} - {formatTime(activity.end_date || '')}</span>
                                    </div>
                                )}
                                {activity.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        <span>{activity.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Content Section --- */}
            <section className="px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-3">

                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Description Card */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-4 dark:border-slate-800">
                                    <div className="p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                        <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    About This Activity
                                </h2>
                                <div className="prose prose-slate max-w-none dark:prose-invert text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                                    {activity.description ? activity.description : 'No description available.'}
                                </div>
                            </div>

                            {/* Participants Card (if applicable) */}
                            {activity.target_participants && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                    <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-4 dark:border-slate-800">
                                        <div className="p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        Participants
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Target Participants</span>
                                            <span className="text-slate-600 dark:text-slate-400">{activity.target_participants}</span>
                                        </div>
                                        {activity.actual_participants !== undefined && (
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-semibold text-slate-900 dark:text-white">Expected / Actual Count</span>
                                                <span className="text-slate-600 dark:text-slate-400">{activity.actual_participants}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Completion Report (if completed) */}
                            {activity.activity_status === 'completed' && activity.completion_report && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                    <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-4 dark:border-slate-800">
                                        <div className="p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        Completion Report
                                    </h2>
                                    <div className="prose prose-slate max-w-none dark:prose-invert text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                                        {activity.completion_report}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">

                                {/* Event Details Card */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Event Details
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="mt-0.5 h-5 w-5 text-slate-400" />
                                            <div>
                                                <div className="text-sm font-bold text-slate-900 dark:text-white">Date</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                                    {formatDate(activity.start_date)}
                                                    {activity.end_date && activity.start_date.split('T')[0] !== activity.end_date.split('T')[0] &&
                                                        ` - ${formatDate(activity.end_date)}`
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {!activity.all_day && (
                                            <div className="flex items-start gap-3">
                                                <Clock className="mt-0.5 h-5 w-5 text-slate-400" />
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900 dark:text-white">Time</div>
                                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                                        {formatTime(activity.start_date)} - {formatTime(activity.end_date || '')}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
                                            <div>
                                                <div className="text-sm font-bold text-slate-900 dark:text-white">Venue</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{activity.location || 'TBD'}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <User className="mt-0.5 h-5 w-5 text-slate-400" />
                                            <div>
                                                <div className="text-sm font-bold text-slate-900 dark:text-white">Organizer</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{activity.organizer || 'TBD'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Card */}
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Actions
                                    </h3>
                                    <div className="grid gap-3">
                                        <a href={`/sas/activities/${activity.slug}/export`} download className="inline-block w-full">
                                            <Button variant="outline" className="w-full justify-start bg-white dark:bg-slate-900">
                                                <Download className="mr-2 h-4 w-4" /> Add to Calendar
                                            </Button>
                                        </a>
                                        <Button variant="outline" className="w-full justify-start bg-white dark:bg-slate-900" onClick={shareActivity}>
                                            <Share2 className="mr-2 h-4 w-4" /> Share Event
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </SASLayout>
    );
}
