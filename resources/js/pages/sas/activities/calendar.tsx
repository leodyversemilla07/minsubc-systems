import { Button } from '@/components/ui/button';
import SASLayout from '@/layouts/sas-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Download,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
    activities: SASActivity[];
    currentMonth: number;
    currentYear: number;
}

interface SASActivity {
    id: number;
    activity_title: string;
    start_date: string;
    end_date?: string;
    all_day: boolean;
    location: string;
    category: string;
    slug: string;
}

export default function ActivitiesCalendar({
    activities,
    currentMonth,
    currentYear,
}: Props) {
    const [displayDate] = useState(() => {
        return new Date(currentYear, currentMonth - 1, 1);
    });

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
        return displayDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });
    };

    const getDaysInMonth = () => {
        const year = displayDate.getFullYear();
        const month = displayDate.getMonth();
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
        const newDate = new Date(displayDate);
        newDate.setMonth(newDate.getMonth() - 1);
        const newYear = newDate.getFullYear();
        const newMonth = newDate.getMonth() + 1;

        window.location.href = `/sas/activities/calendar?year=${newYear}&month=${newMonth}`;
    };

    const nextMonth = () => {
        const newDate = new Date(displayDate);
        newDate.setMonth(newDate.getMonth() + 1);
        const newYear = newDate.getFullYear();
        const newMonth = newDate.getMonth() + 1;

        window.location.href = `/sas/activities/calendar?year=${newYear}&month=${newMonth}`;
    };

    const goToToday = () => {
        const today = new Date();
        const newYear = today.getFullYear();
        const newMonth = today.getMonth() + 1;

        window.location.href = `/sas/activities/calendar?year=${newYear}&month=${newMonth}`;
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth();
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();

    // Generate calendar days
    const calendarDays = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(
            <div
                key={`empty-${i}`}
                className="min-h-16 border-r border-b border-slate-200 bg-slate-50/50 last:border-r-0 sm:min-h-24 md:min-h-32 dark:border-slate-800 dark:bg-slate-900/50"
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
                className={`flex min-h-16 flex-col gap-0.5 border-r border-b border-slate-200 p-1 transition-colors hover:bg-slate-50 sm:min-h-24 sm:gap-1 sm:p-2 md:min-h-32 md:gap-2 md:p-3 dark:border-slate-800 dark:hover:bg-slate-800/80 ${
                    isToday
                        ? 'bg-green-50/30 dark:bg-green-900/10'
                        : 'bg-white dark:bg-slate-900'
                }`}
            >
                <div className="flex items-start justify-between">
                    <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold sm:h-6 sm:w-6 sm:text-xs md:h-7 md:w-7 md:text-sm ${
                            isToday
                                ? 'bg-green-600 text-white shadow-md shadow-green-500/30 sm:shadow-lg'
                                : 'text-slate-700 dark:text-slate-300'
                        }`}
                    >
                        {day}
                    </div>
                    {isToday && (
                        <span className="hidden text-[8px] font-bold text-green-600 uppercase sm:inline sm:text-[10px] dark:text-green-400">
                            Today
                        </span>
                    )}
                </div>

                {/* Mobile: Show dot indicators for events */}
                <div className="mt-0.5 flex flex-wrap gap-0.5 sm:hidden">
                    {dayActivities.slice(0, 3).map((activity) => (
                        <Link
                            key={activity.id}
                            href={`/sas/activities/${activity.slug}`}
                            className="block"
                        >
                            <div
                                className="h-1.5 w-1.5 rounded-full bg-green-500"
                                title={activity.activity_title}
                            />
                        </Link>
                    ))}
                    {dayActivities.length > 3 && (
                        <div
                            className="h-1.5 w-1.5 rounded-full bg-slate-400"
                            title={`+${dayActivities.length - 3} more`}
                        />
                    )}
                </div>

                {/* Desktop: Show activity cards */}
                <div className="mt-0.5 hidden space-y-1 sm:mt-1 sm:block sm:space-y-1.5">
                    {dayActivities.slice(0, 2).map((activity) => (
                        <Link
                            key={activity.id}
                            href={`/sas/activities/${activity.slug}`}
                            className="group block"
                        >
                            <div className="rounded-md border border-green-100 bg-green-50 px-1.5 py-1 transition-all hover:border-green-300 hover:bg-green-100 hover:shadow-sm sm:px-2 sm:py-1.5 dark:border-green-900/50 dark:bg-green-900/20 dark:hover:border-green-700">
                                <div className="truncate text-[10px] font-semibold text-green-900 sm:text-xs dark:text-green-100">
                                    {activity.activity_title}
                                </div>
                                {!activity.all_day && (
                                    <div className="mt-0.5 hidden items-center gap-1 text-[10px] text-green-700 md:flex dark:text-green-400">
                                        <Clock className="h-3 w-3" />
                                        {new Date(
                                            activity.start_date,
                                        ).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                    {dayActivities.length > 2 && (
                        <div className="pl-0.5 text-[9px] font-medium text-slate-500 sm:pl-1 sm:text-[10px] dark:text-slate-400">
                            +{dayActivities.length - 2} more
                        </div>
                    )}
                </div>
            </div>,
        );
    }

    return (
        <SASLayout>
            <Head title="Activities Calendar - SAS" />

            <main>
                {/* --- Header Section --- */}
                <section className="border-b border-slate-200 bg-white px-3 py-4 sm:px-4 sm:py-8 dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-4 sm:gap-6">
                            {/* Title & Navigation */}
                            <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                                <Link
                                    href="/sas/activities"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors hover:bg-green-100 sm:h-12 sm:w-12 sm:rounded-2xl dark:bg-green-900/20 dark:text-green-400"
                                >
                                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1 sm:h-6 sm:w-6" />
                                </Link>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl font-black text-slate-900 sm:text-2xl md:text-3xl dark:text-white">
                                        {getMonthYear()}
                                    </h1>
                                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-600 sm:text-base dark:text-slate-400">
                                        <CalendarIcon className="h-4 w-4 shrink-0" />
                                        <span className="truncate">
                                            Organization Schedules & Events
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end sm:gap-3">
                                <Link
                                    href="/sas/activities/yearly-timeline"
                                    className="order-2 sm:order-1"
                                >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 text-xs sm:text-sm"
                                    >
                                        <CalendarDays className="h-4 w-4" />
                                        <span className="xs:inline hidden">
                                            Yearly
                                        </span>
                                        <span className="xs:hidden">Year</span>
                                    </Button>
                                </Link>

                                <div className="order-1 flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm sm:order-2 sm:rounded-xl sm:p-1 dark:border-slate-800 dark:bg-slate-950">
                                    <button
                                        onClick={previousMonth}
                                        className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:rounded-lg sm:p-2 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    >
                                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                    <button
                                        onClick={goToToday}
                                        className="px-2 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 sm:px-4 sm:py-2 sm:text-sm dark:text-slate-300 dark:hover:text-white"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={nextMonth}
                                        className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:rounded-lg sm:p-2 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    >
                                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                </div>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="order-3 hidden sm:flex"
                                    title="Download Schedule"
                                >
                                    <Download className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Calendar Grid Section --- */}
                <section className="min-h-[60vh] bg-slate-50 px-2 py-4 sm:px-4 sm:py-8 md:px-6 lg:px-8 dark:bg-slate-950">
                    <div className="mx-auto max-w-7xl">
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg sm:rounded-2xl sm:shadow-xl md:rounded-3xl dark:border-slate-800 dark:bg-slate-900">
                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(
                                    (day, index) => (
                                        <div
                                            key={index}
                                            className="py-2 text-center text-[10px] font-bold tracking-wider text-slate-500 uppercase sm:py-4 sm:text-xs dark:text-slate-400"
                                        >
                                            <span className="sm:hidden">
                                                {day}
                                            </span>
                                            <span className="hidden sm:inline">
                                                {
                                                    [
                                                        'Sun',
                                                        'Mon',
                                                        'Tue',
                                                        'Wed',
                                                        'Thu',
                                                        'Fri',
                                                        'Sat',
                                                    ][index]
                                                }
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>

                            {/* Days */}
                            <div className="grid grid-cols-7">
                                {calendarDays}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 sm:mt-8 sm:gap-6 sm:text-sm dark:text-slate-400">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50 sm:h-3 sm:w-3"></div>
                                <span className="font-medium">Today</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="h-2 w-2 rounded-full border border-green-200 bg-green-100 sm:h-3 sm:w-3"></div>
                                <span>Activity</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="h-2 w-2 rounded-full border border-slate-300 bg-white sm:h-3 sm:w-3"></div>
                                <span>No Events</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </SASLayout>
    );
}
