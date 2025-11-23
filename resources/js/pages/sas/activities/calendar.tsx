import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import SASLayout from '@/layouts/sas-layout';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Calendar as CalendarIcon, 
    ChevronLeft, 
    ChevronRight, 
    Download, 
    Clock
} from 'lucide-react';

interface Props {
    activities: SASActivity[];
    startDate: string;
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

export default function ActivitiesCalendar({ activities, startDate }: Props) {
    const [currentDate, setCurrentDate] = useState(() => {
        const date = new Date(startDate);
        return isNaN(date.getTime()) ? new Date() : date;
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
                className="min-h-32 bg-slate-50/50 dark:bg-slate-900/50 border-b border-r border-slate-200 dark:border-slate-800 last:border-r-0"
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
                className={`min-h-32 p-3 border-b border-r border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80 flex flex-col gap-2 ${
                    isToday ? 'bg-green-50/30 dark:bg-green-900/10' : 'bg-white dark:bg-slate-900'
                }`}
            >
                <div className="flex justify-between items-start">
                    <div
                        className={`text-sm font-bold h-7 w-7 flex items-center justify-center rounded-full ${
                            isToday 
                                ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' 
                                : 'text-slate-700 dark:text-slate-300'
                        }`}
                    >
                        {day}
                    </div>
                    {isToday && <span className="text-[10px] font-bold uppercase text-green-600 dark:text-green-400">Today</span>}
                </div>
                
                <div className="space-y-1.5 mt-1">
                    {dayActivities.slice(0, 3).map((activity) => (
                        <Link
                            key={activity.id}
                            href={`/sas/activities/${activity.slug}`}
                            className="group block"
                        >
                            <div className="rounded-md border border-green-100 bg-green-50 px-2 py-1.5 transition-all hover:border-green-300 hover:bg-green-100 hover:shadow-sm dark:border-green-900/50 dark:bg-green-900/20 dark:hover:border-green-700">
                                <div className="truncate text-xs font-semibold text-green-900 dark:text-green-100">
                                    {activity.activity_title}
                                </div>
                                {!activity.all_day && (
                                    <div className="mt-0.5 flex items-center gap-1 text-[10px] text-green-700 dark:text-green-400">
                                        <Clock className="h-3 w-3" />
                                        {new Date(activity.start_date).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                    {dayActivities.length > 3 && (
                        <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 pl-1">
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
            
            <main>
                {/* --- Header Section --- */}
                <section className="bg-white px-4 py-8 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            {/* Title & Navigation */}
                            <div className="flex items-center gap-4">
                                <Link href="/sas/activities" className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">
                                    <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
                                </Link>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                                            {getMonthYear()}
                                        </h1>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2 mt-1">
                                        <CalendarIcon className="h-4 w-4" />
                                        Organization Schedules & Events
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                                    <button
                                        onClick={previousMonth}
                                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={today}
                                        className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={nextMonth}
                                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                                
                                <Button variant="outline" size="icon" className="hidden sm:flex" title="Download Schedule">
                                    <Download className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Calendar Grid Section --- */}
                <section className="px-4 py-8 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 min-h-[60vh]">
                    <div className="mx-auto max-w-7xl">
                        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div
                                        key={day}
                                        className="py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Days */}
                            <div className="grid grid-cols-7">
                                {calendarDays}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
                                <span className="font-medium">Today</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-100 border border-green-200"></div>
                                <span>Scheduled Activity</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-white border border-slate-300"></div>
                                <span>No Events</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </SASLayout>
    );
}
