import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import type { SASActivity } from '@/types/sas';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Download,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    activities: SASActivity[];
    startDate: string;
}

export default function ActivitiesCalendar({ activities, startDate }: Props) {
    const [currentDate, setCurrentDate] = useState(new Date(startDate));

    // Safety check
    if (!activities) {
        return (
            <SASLayout>
                <Head title="Activities Calendar - SAS" />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Loading...</h2>
                        <p className="text-gray-600">
                            Please wait while we load the calendar.
                        </p>
                    </div>
                </div>
            </SASLayout>
        );
    }

    const getMonthYear = () => {
        return currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });
    };

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const getActivitiesForDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        return activities.filter((activity) => {
            const activityDate = new Date(activity.start_date)
                .toISOString()
                .split('T')[0];
            return activityDate === dateStr;
        });
    };

    const previousMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);

        // Reload data for new month
        window.location.href = `/sas/activities/calendar?start_date=${newDate.toISOString().split('T')[0]}`;
    };

    const nextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);

        // Reload data for new month
        window.location.href = `/sas/activities/calendar?start_date=${newDate.toISOString().split('T')[0]}`;
    };

    const today = () => {
        const newDate = new Date();
        setCurrentDate(newDate);
        window.location.href = `/sas/activities/calendar`;
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Generate calendar days
    const calendarDays = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(
            <div
                key={`empty-${i}`}
                className="min-h-24 border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
            ></div>,
        );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayActivities = getActivitiesForDate(date);
        const isToday = new Date().toDateString() === date.toDateString();

        calendarDays.push(
            <div
                key={day}
                className={`min-h-24 border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                }`}
            >
                <div
                    className={`mb-1 text-sm font-semibold ${isToday ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}
                >
                    {day}
                </div>
                <div className="space-y-1">
                    {dayActivities.slice(0, 3).map((activity) => (
                        <Link
                            key={activity.id}
                            href={`/sas/activities/${activity.slug}`}
                            className="block"
                        >
                            <div className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-900 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800">
                                <div className="truncate">
                                    {activity.activity_title}
                                </div>
                                {!activity.all_day && (
                                    <div className="text-xs opacity-75">
                                        {new Date(
                                            activity.start_date,
                                        ).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                    {dayActivities.length > 3 && (
                        <div className="text-xs text-gray-500">
                            +{dayActivities.length - 3} more
                        </div>
                    )}
                </div>
            </div>,
        );
    }

    return (
        <SASLayout>
            <Head title="Activities Calendar - SAS" />

            {/* Header */}
            <section className="border-b bg-white px-4 py-6 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    <Link href={sas.activities.index.url()}>
                        <Button variant="ghost" size="sm" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to List View
                        </Button>
                    </Link>

                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                                <CalendarIcon className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {getMonthYear()}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {activities.length} activities this month
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={previousMonth}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={today}>
                                Today
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={nextMonth}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <a
                                href={`/sas/activities/export?year=${currentDate.getFullYear()}&month=${currentDate.getMonth() + 1}`}
                                download
                            >
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Month
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calendar */}
            <section className="bg-gray-50 px-4 py-8 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl">
                    <Card>
                        <CardContent className="p-4">
                            {/* Weekday Headers */}
                            <div className="mb-2 grid grid-cols-7 gap-px">
                                {[
                                    'Sun',
                                    'Mon',
                                    'Tue',
                                    'Wed',
                                    'Thu',
                                    'Fri',
                                    'Sat',
                                ].map((day) => (
                                    <div
                                        key={day}
                                        className="py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
                                {calendarDays}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Legend */}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Activity
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full border-2 border-blue-500"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Today
                            </span>
                        </div>
                    </div>

                    {/* Upcoming Activities List */}
                    {activities.length > 0 && (
                        <div className="mt-8">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                All Activities This Month
                            </h2>
                            <div className="space-y-3">
                                {activities.map((activity) => (
                                    <Link
                                        key={activity.id}
                                        href={`/sas/activities/${activity.slug}`}
                                    >
                                        <Card className="transition-all hover:-translate-y-0.5 hover:shadow-lg">
                                            <CardContent className="flex items-start gap-4 p-4">
                                                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                                                    <div className="text-xs font-medium text-blue-700 dark:text-blue-300">
                                                        {new Date(
                                                            activity.start_date,
                                                        ).toLocaleDateString(
                                                            'en-US',
                                                            { month: 'short' },
                                                        )}
                                                    </div>
                                                    <div className="text-xl font-bold text-blue-900 dark:text-blue-100">
                                                        {new Date(
                                                            activity.start_date,
                                                        ).getDate()}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="mb-1 flex items-start justify-between gap-2">
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {
                                                                activity.activity_title
                                                            }
                                                        </h3>
                                                        {activity.category && (
                                                            <Badge
                                                                variant="outline"
                                                                className="shrink-0"
                                                            >
                                                                {
                                                                    activity.category
                                                                }
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    {activity.description && (
                                                        <p className="mb-2 line-clamp-1 text-sm text-gray-600 dark:text-gray-400">
                                                            {
                                                                activity.description
                                                            }
                                                        </p>
                                                    )}
                                                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                        {!activity.all_day && (
                                                            <span>
                                                                ⏰{' '}
                                                                {new Date(
                                                                    activity.start_date,
                                                                ).toLocaleTimeString(
                                                                    'en-US',
                                                                    {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    },
                                                                )}
                                                            </span>
                                                        )}
                                                        {activity.all_day && (
                                                            <span>
                                                                ⏰ All Day
                                                            </span>
                                                        )}
                                                        {activity.location && (
                                                            <span>
                                                                📍{' '}
                                                                {
                                                                    activity.location
                                                                }
                                                            </span>
                                                        )}
                                                        {activity.organizer && (
                                                            <span>
                                                                👤{' '}
                                                                {
                                                                    activity.organizer
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </SASLayout>
    );
}
