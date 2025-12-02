import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { PaginatedData, SASActivity } from '@/types/sas';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, CalendarDays, Download, Search, Filter, ArrowRight, X, MapPin } from 'lucide-react';
import { useState } from 'react';
import SASLayout from '@/layouts/sas-layout';
import { calendar, exportMethod, index, show } from '@/routes/sas/activities';

interface Props {
    activities: PaginatedData<SASActivity>;
    filters: {
        search?: string;
        type?: string;
        status?: string;
    };
}

const formatDateTimeRange = (startDate: string, endDate: string, allDay: boolean) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startDateStr = start.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    if (allDay) {
        if (start.toDateString() === end.toDateString()) {
            return startDateStr;
        } else {
            const endDateStr = end.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: start.getFullYear() !== end.getFullYear() ? 'numeric' : undefined
            });
            return `${startDateStr} - ${endDateStr}`;
        }
    } else {
        const startTime = start.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
        const endTime = end.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
        
        if (start.toDateString() === end.toDateString()) {
            return `${startDateStr} at ${startTime} - ${endTime}`;
        } else {
            const endDateStr = end.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric',
                year: start.getFullYear() !== end.getFullYear() ? 'numeric' : undefined
            });
            return `${startDateStr} ${startTime} - ${endDateStr} ${endTime}`;
        }
    }
};

const ACTIVITY_TYPES = ['Event', 'Meeting', 'Training', 'Seminar', 'Workshop'];
const ACTIVITY_STATUSES = ['upcoming', 'ongoing', 'completed', 'cancelled'];

export default function ActivitiesIndex({ activities, filters }: Props) {
    const [search, setSearch] = useState(filters?.search || '');
    const [typeFilter, setTypeFilter] = useState(filters?.type || 'all');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
    const [showFilters, setShowFilters] = useState(false);

    // Safety check for activities data
    if (!activities || !activities.data) {
        return (
            <SASLayout>
                <Head title="Activities & Events - SAS" />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Loading...</h2>
                        <p className="text-gray-600">
                            Please wait while we load the activities.
                        </p>
                    </div>
                </div>
            </SASLayout>
        );
    }

    // Filtering logic
    const filteredActivities = activities.data.filter(activity => {
        const matchesSearch = activity.activity_title.toLowerCase().includes(search.toLowerCase()) ||
                              (activity.description?.toLowerCase() || '').includes(search.toLowerCase());
        const matchesType = typeFilter === 'all' || (activity.category || '') === typeFilter;
        const matchesStatus = statusFilter === 'all' || activity.activity_status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(index({ query: { search, type: typeFilter, status: statusFilter } }), { preserveState: true });
    };

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value === 'all' ? undefined : value };
        router.get(
            index({ query: newFilters }),
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        setTypeFilter('all');
        setStatusFilter('all');
        router.get(index(), { preserveState: true });
    };

    const hasActiveFilters = search !== '' || typeFilter !== 'all' || statusFilter !== 'all';

    const getStatusVariant = (status: string) => {
        switch(status) {
            case 'upcoming': return 'secondary';
            case 'ongoing': return 'default';
            case 'completed': return 'outline';
            case 'cancelled': return 'destructive';
            default: return 'default';
        }
    };

    return (
        <SASLayout>
            <Head title="Activities & Events - SAS" />

            {/* --- Hero Section --- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-white px-4 py-8 sm:py-16 text-slate-900 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-green-950/20 dark:to-slate-950 dark:text-white">

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

                    {/* Animated Decorative Blobs */}
                    <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-green-400/30 to-emerald-600/20 blur-3xl dark:from-green-600/20 dark:to-emerald-800/10" />
                    <div className="pointer-events-none absolute top-1/2 left-0 h-72 w-72 animate-pulse rounded-full bg-gradient-to-tr from-green-300/20 to-emerald-500/30 blur-2xl dark:from-green-700/10 dark:to-emerald-900/20" />

                    <div className="relative mx-auto max-w-7xl px-4 text-center">
                        {/* Badge */}
                        <div className="group mb-6 inline-flex items-center gap-2 rounded-full border border-green-200/50 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:border-green-300 dark:border-green-800/50 dark:bg-slate-800/80">
                            <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-semibold text-green-900 dark:text-green-300">
                                Stay Connected
                            </span>
                        </div>

                        <h1 className="mb-6 bg-gradient-to-br from-slate-900 via-green-800 to-green-600 bg-clip-text text-4xl font-black text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-green-200 dark:to-green-400">
                            Activities & Events
                        </h1>

                        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                            Discover upcoming events, meetings, and activities organized by Student Affairs and various student organizations.
                        </p>

                        {/* Quick Actions */}
                        <div className="mb-10 flex flex-wrap justify-center gap-4">
                            <Link href={calendar()}>
                                <Button variant="secondary" size="lg" className="gap-2">
                                    <Calendar className="h-5 w-5" /> Monthly Calendar
                                </Button>
                            </Link>
                            <Link href="/sas/activities/yearly-timeline">
                                <Button variant="secondary" size="lg" className="gap-2">
                                    <CalendarDays className="h-5 w-5" /> Yearly Timeline
                                </Button>
                            </Link>
                            <a href={exportMethod().url} download className="inline-flex">
                                <Button variant="outline" size="lg" className="gap-2 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800">
                                    <Download className="h-5 w-5" /> Export Schedule
                                </Button>
                            </a>
                        </div>

                        {/* Search Bar Container */}
                        <div className="mx-auto max-w-3xl">
                            <div className="relative rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200/50 dark:bg-slate-900 dark:ring-slate-800">
                                <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
                                    <div className="relative flex-1">
                                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="text"
                                            placeholder="Search activities..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="h-12 w-full rounded-xl border-0 bg-slate-50 pl-12 text-base text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-slate-800 dark:text-white"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="lg"
                                            className={`h-12 px-4 border-0 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 ${showFilters ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}`}
                                            onClick={() => setShowFilters(!showFilters)}
                                        >
                                            <Filter className="h-5 w-5" />
                                            <span className="ml-2 hidden sm:inline">Filters</span>
                                        </Button>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 font-semibold text-white shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-200"
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Filters Section --- */}
                {showFilters && (
                    <section className="animate-in slide-in-from-top-2 bg-slate-50/50 border-y border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Refine Results
                                </h3>
                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 h-8"
                                    >
                                        <X className="mr-1 h-3 w-3" /> Clear All
                                    </Button>
                                )}
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {/* Activity Type Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Activity Type
                                    </label>
                                    <Select
                                        value={typeFilter}
                                        onValueChange={(value) => handleFilterChange('type', value)}
                                    >
                                        <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white px-3 text-slate-900 focus:border-green-500 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                            <SelectValue placeholder="All Types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Types</SelectItem>
                                            {ACTIVITY_TYPES.map((type) => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Status Filter */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Status
                                    </label>
                                    <Select
                                        value={statusFilter}
                                        onValueChange={(value) => handleFilterChange('status', value)}
                                    >
                                        <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white px-3 text-slate-900 focus:border-green-500 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                            <SelectValue placeholder="All Statuses" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            {ACTIVITY_STATUSES.map((status) => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* --- Results Section --- */}
                <section className="px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50 min-h-[50vh]">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {hasActiveFilters ? 'Search Results' : 'Upcoming & Recent Activities'}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                                Found <span className="font-semibold text-green-600 dark:text-green-400">{filteredActivities.length}</span> activities
                            </p>
                        </div>

                        {filteredActivities.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700 dark:hover:shadow-green-900/20 cursor-pointer"
                                    >
                                        {/* Green Top Border Gradient */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                        {/* Header */}
                                        <div className="mb-5 flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 dark:bg-green-900/20 dark:text-green-400">
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <Badge variant={getStatusVariant(activity.activity_status)}>
                                                    {activity.activity_status === 'ongoing' && <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                                                    {activity.activity_status}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                                                    {activity.category || 'Event'}
                                                </Badge>
                                            </div>

                                            <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400 line-clamp-2">
                                                {activity.activity_title}
                                            </h3>

                                            <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {activity.description}
                                            </p>

                                            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                    <Calendar className="h-3 w-3 text-green-600" />
                                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                                        {formatDateTimeRange(activity.start_date, activity.end_date, activity.all_day)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                    <MapPin className="h-3 w-3 text-green-600" />
                                                    <span>{activity.location || 'TBD'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* View Details Link */}
                                        <Link href={show(activity.slug)} className="mt-6 flex items-center gap-2 text-sm font-bold text-green-700 transition-all group-hover:gap-3 group-hover:text-green-800 dark:text-green-400 dark:group-hover:text-green-300">
                                            View Details
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 px-4 text-center dark:border-slate-700 dark:bg-slate-900">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
                                    <Calendar className="h-8 w-8 text-slate-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    No activities found
                                </h3>
                                <p className="mb-6 max-w-md text-slate-600 dark:text-slate-400">
                                    We couldn't find any activities matching your criteria. Try adjusting your search or filters.
                                </p>
                                {hasActiveFilters && (
                                    <Button onClick={clearFilters} variant="secondary">
                                        Clear All Filters
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* --- Pagination --- */}
                        {filteredActivities.length > 0 && activities?.meta?.last_page && activities.meta.last_page > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                {activities?.links?.prev && (
                                    <Link href={activities.links.prev}>
                                        <Button variant="outline" className="rounded-xl">
                                            Previous
                                        </Button>
                                    </Link>
                                )}

                                <span className="px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Page {activities?.meta?.current_page || 1} of {activities?.meta?.last_page || 1}
                                </span>

                                {activities?.links?.next && (
                                    <Link href={activities.links.next}>
                                        <Button variant="outline" className="rounded-xl">Next</Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </section>
        </SASLayout>
    );
}
