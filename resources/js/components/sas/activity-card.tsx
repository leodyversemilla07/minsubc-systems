import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SASActivity } from '@/types/sas';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface ActivityCardProps {
    activity: SASActivity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
    const getStatusColor = (status: SASActivity['activity_status']) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'ongoing':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'completed':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category: string | null) => {
        if (!category) return 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-400';
        
        const lower = category.toLowerCase();
        if (lower.includes('workshop') || lower.includes('training')) {
            return 'border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-400';
        }
        if (lower.includes('seminar') || lower.includes('conference')) {
            return 'border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-400';
        }
        if (lower.includes('competition') || lower.includes('sports')) {
            return 'border-red-300 text-red-700 dark:border-red-600 dark:text-red-400';
        }
        if (lower.includes('social') || lower.includes('cultural')) {
            return 'border-pink-300 text-pink-700 dark:border-pink-600 dark:text-pink-400';
        }
        if (lower.includes('community') || lower.includes('service')) {
            return 'border-green-300 text-green-700 dark:border-green-600 dark:text-green-400';
        }
        return 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-400';
    };

    const formatDate = (date: string) => {
        try {
            return new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch {
            return 'TBA';
        }
    };

    const formatTime = (date: string) => {
        try {
            return new Date(date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return '';
        }
    };

    return (
        <Link href={`/sas/activities/${activity.slug}`}>
            <Card className="group h-full border-0 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
                <CardContent className="p-6">
                    {/* Status & Category */}
                    <div className="mb-4 flex items-start justify-between gap-2">
                        {activity.category && (
                            <Badge
                                variant="outline"
                                className={`text-xs ${getCategoryColor(activity.category)}`}
                            >
                                {activity.category}
                            </Badge>
                        )}
                        <Badge className={`text-xs ${getStatusColor(activity.activity_status)}`}>
                            {activity.activity_status}
                        </Badge>
                    </div>

                    {/* Activity Title */}
                    <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                        {activity.activity_title}
                    </h3>

                    {/* Description */}
                    {activity.description && (
                        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                            {activity.description}
                        </p>
                    )}

                    {/* Details */}
                    <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 shrink-0 text-blue-500" />
                            <span>{formatDate(activity.start_date)}</span>
                        </div>

                        {!activity.all_day && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="h-4 w-4 shrink-0 text-blue-500" />
                                <span>
                                    {formatTime(activity.start_date)}
                                    {activity.end_date && ` - ${formatTime(activity.end_date)}`}
                                </span>
                            </div>
                        )}

                        {activity.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="h-4 w-4 shrink-0 text-blue-500" />
                                <span className="truncate">{activity.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Organizer */}
                    {activity.organizer && (
                        <div className="mt-4 border-t border-gray-200 pt-3 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Organized by{' '}
                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                    {activity.organizer}
                                </span>
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
