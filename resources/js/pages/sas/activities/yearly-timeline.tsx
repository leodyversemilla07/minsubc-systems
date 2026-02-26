import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import SASLayout from '@/layouts/sas-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Filter,
    MapPin,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface USGEvent {
    id: number;
    title: string;
    slug: string;
    description?: string;
    location?: string;
    start_date: string;
    end_date?: string;
    all_day: boolean;
    category?: string;
    color?: string;
    organizer?: string;
    status: string;
    image_path?: string;
}

interface MonthData {
    month: number;
    month_name: string;
    month_short: string;
    events: USGEvent[];
    event_count: number;
}

interface Props {
    yearlyData: MonthData[];
    categories: string[];
    currentYear: number;
    filters: {
        year: number;
        category?: string;
    };
}

const MONTH_COLORS = [
    'from-blue-500 to-blue-600', // January
    'from-pink-500 to-pink-600', // February
    'from-green-500 to-green-600', // March
    'from-yellow-500 to-yellow-600', // April
    'from-purple-500 to-purple-600', // May
    'from-orange-500 to-orange-600', // June
    'from-red-500 to-red-600', // July
    'from-teal-500 to-teal-600', // August
    'from-indigo-500 to-indigo-600', // September
    'from-amber-500 to-amber-600', // October
    'from-cyan-500 to-cyan-600', // November
    'from-emerald-500 to-emerald-600', // December
];

const CATEGORY_COLORS: Record<string, string> = {
    Academic:
        'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
    Cultural:
        'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
    Sports: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
    Social: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700',
    Religious:
        'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
    default:
        'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700',
};

export default function YearlyTimeline({
    yearlyData,
    categories,
    currentYear,
    filters,
}: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>(
        filters.category || 'all',
    );
    const [expandedMonths, setExpandedMonths] = useState<number[]>([]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const handleYearChange = (direction: 'prev' | 'next') => {
        const newYear =
            direction === 'prev' ? currentYear - 1 : currentYear + 1;
        router.get(
            `/sas/activities/yearly-timeline`,
            {
                year: newYear,
                category:
                    selectedCategory !== 'all' ? selectedCategory : undefined,
            },
            { preserveState: true },
        );
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        router.get(
            `/sas/activities/yearly-timeline`,
            {
                year: currentYear,
                category: value !== 'all' ? value : undefined,
            },
            { preserveState: true },
        );
    };

    const handleGoToToday = () => {
        const today = new Date();
        router.get(
            `/sas/activities/yearly-timeline`,
            {
                year: today.getFullYear(),
                category:
                    selectedCategory !== 'all' ? selectedCategory : undefined,
            },
            { preserveState: true },
        );
    };

    const toggleMonthExpand = (month: number) => {
        setExpandedMonths((prev) =>
            prev.includes(month)
                ? prev.filter((m) => m !== month)
                : [...prev, month],
        );
    };

    const getCategoryColor = (category?: string) => {
        return CATEGORY_COLORS[category || ''] || CATEGORY_COLORS.default;
    };

    const totalEvents = yearlyData.reduce(
        (sum, month) => sum + month.event_count,
        0,
    );
    const currentMonth = new Date().getMonth() + 1;
    const isCurrentYear = currentYear === new Date().getFullYear();

    return (
        <SASLayout>
            <Head title={`USG Events Timeline ${currentYear} - SAS`} />

            <main>
                {/* --- Header Section --- */}
                <section className="border-b border-slate-200 bg-white px-4 py-6 sm:py-8 dark:border-slate-800 dark:bg-slate-900">
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
                                        {currentYear} Events Timeline
                                    </h1>
                                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-600 sm:text-base dark:text-slate-400">
                                        <CalendarDays className="h-4 w-4 shrink-0" />
                                        <span className="truncate">
                                            USG Activities & Events •{' '}
                                            {totalEvents}{' '}
                                            {totalEvents === 1
                                                ? 'event'
                                                : 'events'}{' '}
                                            this year
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                                {/* Category Filter */}
                                <div className="flex w-full items-center gap-2 sm:w-auto">
                                    <Filter className="hidden h-4 w-4 shrink-0 text-slate-500 sm:block" />
                                    <Select
                                        value={selectedCategory}
                                        onValueChange={handleCategoryChange}
                                    >
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="All Categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Categories
                                            </SelectItem>
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
                                    {selectedCategory !== 'all' && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleCategoryChange('all')
                                            }
                                            className="h-8 w-8 shrink-0"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                {/* Year Navigation */}
                                <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                                    <button
                                        onClick={() => handleYearChange('prev')}
                                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={handleGoToToday}
                                        className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 sm:px-4 dark:text-slate-300 dark:hover:text-white"
                                    >
                                        {isCurrentYear ? 'This Year' : 'Today'}
                                    </button>
                                    <button
                                        onClick={() => handleYearChange('next')}
                                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Year Overview Section --- */}
                <section className="border-b border-slate-200 bg-slate-50 px-3 py-4 sm:px-4 sm:py-6 dark:border-slate-800 dark:bg-slate-950">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 sm:gap-2 md:grid-cols-12">
                            {yearlyData.map((month) => (
                                <button
                                    key={month.month}
                                    onClick={() => {
                                        const element = document.getElementById(
                                            `month-${month.month}`,
                                        );
                                        element?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                        });
                                    }}
                                    className={`relative rounded-lg border p-2 text-center transition-all sm:rounded-xl sm:p-3 ${
                                        isCurrentYear &&
                                        month.month === currentMonth
                                            ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20 dark:bg-green-900/20'
                                            : 'border-slate-200 bg-white hover:border-green-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700'
                                    }`}
                                >
                                    <div className="text-[10px] font-bold text-slate-500 uppercase sm:text-xs dark:text-slate-400">
                                        {month.month_short}
                                    </div>
                                    <div
                                        className={`text-base font-black sm:text-lg ${
                                            month.event_count > 0
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-slate-300 dark:text-slate-600'
                                        }`}
                                    >
                                        {month.event_count}
                                    </div>
                                    {isCurrentYear &&
                                        month.month === currentMonth && (
                                            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-pulse rounded-full bg-green-500 sm:-top-1 sm:-right-1 sm:h-3 sm:w-3" />
                                        )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Timeline Section --- */}
                <section className="min-h-[60vh] bg-white px-3 py-6 sm:px-4 sm:py-8 md:px-6 lg:px-8 dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl">
                        {/* Timeline */}
                        <div className="relative">
                            {/* Vertical line - hidden on mobile for cleaner look */}
                            <div className="absolute top-0 bottom-0 left-4 hidden w-0.5 bg-gradient-to-b from-green-500 via-green-400 to-green-300 sm:block md:left-1/2 md:-translate-x-px dark:from-green-600 dark:via-green-500 dark:to-green-400" />

                            {yearlyData.map((month, index) => {
                                const isExpanded = expandedMonths.includes(
                                    month.month,
                                );
                                const displayEvents = isExpanded
                                    ? month.events
                                    : month.events.slice(0, 3);
                                const hasMoreEvents = month.events.length > 3;
                                const isEven = index % 2 === 0;
                                const isCurrentMonthYear =
                                    isCurrentYear &&
                                    month.month === currentMonth;

                                return (
                                    <div
                                        key={month.month}
                                        id={`month-${month.month}`}
                                        className="relative mb-4 scroll-mt-20 sm:mb-8 sm:scroll-mt-24"
                                    >
                                        {/* Month marker - different positioning for mobile */}
                                        <div className="absolute left-4 z-10 hidden -translate-x-1/2 sm:block md:left-1/2 md:-translate-x-1/2">
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${MONTH_COLORS[index]} font-bold text-white shadow-lg ${
                                                    isCurrentMonthYear
                                                        ? 'animate-pulse ring-4 ring-green-500/30'
                                                        : ''
                                                }`}
                                            >
                                                {month.month}
                                            </div>
                                        </div>

                                        {/* Content - full width on mobile, alternating on desktop */}
                                        <div
                                            className={`sm:ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                                        >
                                            <div
                                                className={`overflow-hidden rounded-xl border shadow-sm sm:rounded-2xl ${
                                                    isCurrentMonthYear
                                                        ? 'border-green-300 bg-green-50/50 dark:border-green-700 dark:bg-green-900/10'
                                                        : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                                                }`}
                                            >
                                                {/* Month header */}
                                                <div
                                                    className={`border-b px-3 py-3 sm:px-5 sm:py-4 ${
                                                        isCurrentMonthYear
                                                            ? 'border-green-200 bg-green-100/50 dark:border-green-800 dark:bg-green-900/20'
                                                            : 'border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                                                            {/* Mobile month indicator */}
                                                            <div
                                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br sm:hidden ${MONTH_COLORS[index]} text-sm font-bold text-white shadow ${
                                                                    isCurrentMonthYear
                                                                        ? 'ring-2 ring-green-500/30'
                                                                        : ''
                                                                }`}
                                                            >
                                                                {month.month}
                                                            </div>
                                                            <h3 className="truncate text-base font-bold text-slate-900 sm:text-xl dark:text-white">
                                                                {
                                                                    month.month_name
                                                                }
                                                            </h3>
                                                            {isCurrentMonthYear && (
                                                                <Badge
                                                                    variant="default"
                                                                    className="hidden bg-green-600 sm:inline-flex"
                                                                >
                                                                    Current
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <Badge
                                                            variant="secondary"
                                                            className="shrink-0 font-mono text-xs sm:text-sm"
                                                        >
                                                            {month.event_count}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                {/* Events list */}
                                                <div className="p-3 sm:p-4">
                                                    {month.events.length ===
                                                    0 ? (
                                                        <div className="py-6 text-center text-slate-500 sm:py-8 dark:text-slate-400">
                                                            <CalendarIcon className="mx-auto mb-2 h-8 w-8 opacity-30 sm:mb-3 sm:h-10 sm:w-10" />
                                                            <p className="text-xs sm:text-sm">
                                                                No events
                                                                scheduled
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2 sm:space-y-3">
                                                            {displayEvents.map(
                                                                (event) => (
                                                                    <Link
                                                                        key={
                                                                            event.id
                                                                        }
                                                                        href={`/usg/events/${event.slug}`}
                                                                        className="group block"
                                                                    >
                                                                        <div className="rounded-lg border border-slate-100 bg-white p-3 transition-all hover:border-green-300 hover:shadow-md sm:rounded-xl sm:p-4 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700">
                                                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                                                                                <div className="min-w-0 flex-1">
                                                                                    <h4 className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-green-600 sm:truncate sm:text-base dark:text-white dark:group-hover:text-green-400">
                                                                                        {
                                                                                            event.title
                                                                                        }
                                                                                    </h4>
                                                                                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:mt-2 sm:gap-3 sm:text-sm dark:text-slate-400">
                                                                                        <span className="flex items-center gap-1">
                                                                                            <CalendarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                                                            {formatDate(
                                                                                                event.start_date,
                                                                                            )}
                                                                                        </span>
                                                                                        {!event.all_day && (
                                                                                            <span className="flex items-center gap-1">
                                                                                                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                                                                {formatTime(
                                                                                                    event.start_date,
                                                                                                )}
                                                                                            </span>
                                                                                        )}
                                                                                        {event.location && (
                                                                                            <span className="flex items-center gap-1">
                                                                                                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                                                                <span className="max-w-[120px] truncate sm:max-w-[150px]">
                                                                                                    {
                                                                                                        event.location
                                                                                                    }
                                                                                                </span>
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                {event.category && (
                                                                                    <Badge
                                                                                        variant="outline"
                                                                                        className={`shrink-0 self-start text-xs ${getCategoryColor(event.category)}`}
                                                                                    >
                                                                                        {
                                                                                            event.category
                                                                                        }
                                                                                    </Badge>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                ),
                                                            )}

                                                            {/* Show more/less button */}
                                                            {hasMoreEvents && (
                                                                <button
                                                                    onClick={() =>
                                                                        toggleMonthExpand(
                                                                            month.month,
                                                                        )
                                                                    }
                                                                    className="w-full py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                                                >
                                                                    {isExpanded
                                                                        ? 'Show less'
                                                                        : `Show ${month.events.length - 3} more events`}
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend - hidden on mobile */}
                        <div className="mt-8 hidden flex-wrap items-center justify-center gap-4 text-xs text-slate-600 sm:mt-12 sm:flex sm:gap-6 sm:text-sm dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500 shadow-sm shadow-green-500/50 sm:h-3 sm:w-3"></div>
                                <span className="font-medium">
                                    Current Month
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 sm:h-3 sm:w-3"></div>
                                <span>Month Marker</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 rounded-full border border-slate-300 bg-white sm:h-3 sm:w-3 dark:border-slate-600 dark:bg-slate-800"></div>
                                <span>Scheduled Event</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-6 flex flex-col justify-center gap-2 sm:mt-8 sm:flex-row sm:gap-4">
                            <Link
                                href="/sas/activities/calendar"
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    variant="outline"
                                    className="w-full gap-2 sm:w-auto"
                                >
                                    <CalendarIcon className="h-4 w-4" />
                                    Monthly Calendar
                                </Button>
                            </Link>
                            <Link
                                href="/sas/activities"
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    variant="outline"
                                    className="w-full gap-2 sm:w-auto"
                                >
                                    <CalendarDays className="h-4 w-4" />
                                    All Activities
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </SASLayout>
    );
}
