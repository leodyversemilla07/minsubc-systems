import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import type { PaginatedData } from '@/types/sas';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    Filter,
    GraduationCap,
    Search,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface Scholarship {
    id: number;
    scholarship_code: string;
    scholarship_name: string;
    description: string | null;
    scholarship_type: string;
    provider: string | null;
    is_active: boolean;
}

interface Props {
    scholarships: PaginatedData<Scholarship>;
    types: string[];
    filters: {
        search?: string;
        type?: string;
    };
}

export default function ScholarshipsIndex({
    scholarships,
    types,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters?.search || '');
    const [showFilters, setShowFilters] = useState(false);

    // Safety check for scholarships data
    if (!scholarships || !scholarships.data) {
        return (
            <SASLayout>
                <Head title="Scholarships - SAS" />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Loading...</h2>
                        <p className="text-gray-600">
                            Please wait while we load the scholarships.
                        </p>
                    </div>
                </div>
            </SASLayout>
        );
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            sas.scholarships.index.url(),
            {
                search,
                type: filters?.type,
            },
            { preserveState: true },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            sas.scholarships.index.url(),
            { ...filters, [key]: value === 'all' ? undefined : value },
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        router.get(sas.scholarships.index.url(), {}, { preserveState: true });
    };

    const hasActiveFilters = filters?.search || filters?.type;

    return (
        <SASLayout>
            <Head title="Scholarships - SAS" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-white px-4 py-8 text-slate-900 sm:px-6 sm:py-16 lg:px-8 dark:from-slate-950 dark:via-green-950/20 dark:to-slate-950 dark:text-white">
                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.15] dark:opacity-[0.07]">
                    <svg
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="hero-pattern"
                                x="0"
                                y="0"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="1.5"
                                    fill="currentColor"
                                    className="text-green-600"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#hero-pattern)"
                        />
                    </svg>
                </div>

                {/* Animated Decorative Blobs */}
                <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-green-400/30 to-emerald-600/20 blur-3xl dark:from-green-600/20 dark:to-emerald-800/10" />
                <div className="pointer-events-none absolute top-1/2 left-0 h-72 w-72 animate-pulse rounded-full bg-gradient-to-tr from-green-300/20 to-emerald-500/30 blur-2xl dark:from-green-700/10 dark:to-emerald-900/20" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        <div className="group mb-6 inline-flex items-center gap-2 rounded-full border border-green-200/50 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:border-green-300 dark:border-green-800/50 dark:bg-slate-800/80">
                            <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-semibold text-green-900 dark:text-green-300">
                                Financial Assistance Programs
                            </span>
                        </div>

                        <h1 className="mb-6 bg-gradient-to-br from-slate-900 via-green-800 to-green-600 bg-clip-text text-4xl font-black text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-green-200 dark:to-green-400">
                            Scholarship Opportunities
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                            Explore a wide range of scholarships supported by
                            MinSU Bongabong Campus, including TES, TDP, and
                            private grants designed to support your academic
                            journey.
                        </p>

                        {/* Search Bar */}
                        <div className="mx-auto max-w-3xl">
                            <div className="relative rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200/50 dark:bg-slate-900 dark:ring-slate-800">
                                <form
                                    onSubmit={handleSearch}
                                    className="flex flex-col gap-2 sm:flex-row"
                                >
                                    <div className="relative flex-1">
                                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="text"
                                            placeholder="Search scholarships by name or provider..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="h-12 w-full rounded-xl border-0 bg-slate-50 pl-12 text-base text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-slate-800 dark:text-white"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="lg"
                                            className={`h-12 rounded-xl border-slate-200 px-4 text-slate-700 hover:bg-slate-50 hover:text-green-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 ${showFilters ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}`}
                                            onClick={() =>
                                                setShowFilters(!showFilters)
                                            }
                                        >
                                            <Filter className="h-5 w-5" />
                                            <span className="ml-2 hidden sm:inline">
                                                Filters
                                            </span>
                                        </Button>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-green-500/30"
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            {showFilters && (
                <section className="border-y border-slate-200 bg-slate-50/50 animate-in slide-in-from-top-2 dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                                Filter Options
                            </h3>
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                                >
                                    <X className="mr-1 h-3 w-3" /> Clear Filters
                                </Button>
                            )}
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Scholarship Type
                                </label>
                                <Select
                                    value={filters?.type || 'all'}
                                    onValueChange={(value) =>
                                        handleFilterChange('type', value)
                                    }
                                >
                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Types
                                        </SelectItem>
                                        {types.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Results Section */}
            <section className="min-h-[50vh] bg-slate-50/50 px-4 py-12 dark:bg-slate-900/50">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {hasActiveFilters
                                    ? 'Search Results'
                                    : 'Available Scholarships'}
                            </h2>
                            <p className="mt-1 text-slate-600 dark:text-slate-400">
                                Showing{' '}
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    {scholarships?.meta?.from || 0}
                                </span>{' '}
                                to{' '}
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    {scholarships?.meta?.to || 0}
                                </span>{' '}
                                of{' '}
                                <span className="font-semibold text-green-600 dark:text-green-400">
                                    {scholarships?.meta?.total || 0}
                                </span>{' '}
                                scholarships
                            </p>
                        </div>
                    </div>

                    {/* Scholarships Grid */}
                    {scholarships?.data && scholarships.data.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {scholarships.data.map((scholarship) => (
                                <Link
                                    key={scholarship.id}
                                    href={sas.scholarships.show.url({
                                        id: scholarship.id,
                                    })}
                                    className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700 dark:hover:shadow-green-900/20"
                                >
                                    {/* Green Top Border Gradient */}
                                    <div className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-gradient-to-r from-green-500 to-emerald-500 transition-transform duration-300 group-hover:scale-x-100"></div>

                                    <div className="mb-5 flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 dark:bg-green-900/20 dark:text-green-400">
                                            <Award className="h-6 w-6" />
                                        </div>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${scholarship.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'}`}
                                        >
                                            {scholarship.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <div className="mb-2 text-xs font-bold tracking-wider text-green-600 uppercase dark:text-green-400">
                                            {scholarship.scholarship_type}
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                                            {scholarship.scholarship_name}
                                        </h3>
                                        {scholarship.description && (
                                            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                                {scholarship.description}
                                            </p>
                                        )}
                                        {scholarship.provider && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                                                <span className="font-semibold">
                                                    Provider:
                                                </span>
                                                {scholarship.provider}
                                            </div>
                                        )}
                                    </div>

                                    {/* View Details Link */}
                                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-green-700 transition-all group-hover:gap-3 group-hover:text-green-800 dark:text-green-400 dark:group-hover:text-green-300">
                                        View Details
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
                                <Search className="h-8 w-8 text-slate-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                No scholarships found
                            </h3>
                            <p className="mb-6 max-w-md text-slate-600 dark:text-slate-400">
                                We couldn't find any scholarships matching your
                                criteria. Try adjusting your search or filters.
                            </p>
                            {hasActiveFilters && (
                                <Button
                                    onClick={clearFilters}
                                    variant="outline"
                                    className="border-slate-200 hover:bg-slate-50 dark:border-slate-700"
                                >
                                    Clear All Filters
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {scholarships?.data &&
                        scholarships.data.length > 0 &&
                        scholarships?.meta?.last_page &&
                        scholarships.meta.last_page > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                {scholarships?.links?.prev && (
                                    <Link href={scholarships.links.prev}>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl"
                                        >
                                            Previous
                                        </Button>
                                    </Link>
                                )}

                                <span className="px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Page{' '}
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {scholarships?.meta?.current_page || 1}
                                    </span>{' '}
                                    of {scholarships?.meta?.last_page || 1}
                                </span>

                                {scholarships?.links?.next && (
                                    <Link href={scholarships.links.next}>
                                        <Button
                                            variant="outline"
                                            className="rounded-xl"
                                        >
                                            Next
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                </div>
            </section>
        </SASLayout>
    );
}
