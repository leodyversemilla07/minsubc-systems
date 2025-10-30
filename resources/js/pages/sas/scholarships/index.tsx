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
import type { PaginatedData } from '@/types/sas';
import { Head, Link, router } from '@inertiajs/react';
import {
    GraduationCap,
    Search,
    SlidersHorizontal,
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
            '/sas/scholarships',
            {
                search,
                type: filters?.type,
            },
            { preserveState: true },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            '/sas/scholarships',
            { ...filters, [key]: value === 'all' ? undefined : value },
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        router.get('/sas/scholarships', {}, { preserveState: true });
    };

    const hasActiveFilters = filters?.search || filters?.type;

    return (
        <SASLayout>
            <Head title="Scholarships - SAS" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-700 to-green-900 px-4 py-16 text-white sm:px-6 lg:px-8">
                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-10">
                    <svg
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="scholarship-pattern"
                                x="0"
                                y="0"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="1"
                                    fill="currentColor"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#scholarship-pattern)"
                        />
                    </svg>
                </div>

                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <GraduationCap className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                                Financial Assistance Programs
                            </span>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
                            Scholarships
                        </h1>

                        <p className="mx-auto mb-8 max-w-2xl text-lg text-green-100 sm:text-xl">
                            Discover scholarship opportunities to support your
                            education at MinSU Bongabong Campus
                        </p>

                        {/* Search Bar */}
                        <form
                            onSubmit={handleSearch}
                            className="mx-auto max-w-2xl"
                        >
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search scholarships..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="h-12 bg-white pl-10 text-gray-900 dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="bg-white text-green-700 hover:bg-green-50"
                                >
                                    Search
                                </Button>
                                <Button
                                    type="button"
                                    size="lg"
                                    variant="outline"
                                    className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <SlidersHorizontal className="h-5 w-5" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            {showFilters && (
                <section className="border-b bg-gray-50 px-4 py-6 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Filters
                            </h3>
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                >
                                    Clear All
                                </Button>
                            )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Scholarship Type
                                </label>
                                <Select
                                    value={filters?.type || 'all'}
                                    onValueChange={(value) =>
                                        handleFilterChange('type', value)
                                    }
                                >
                                    <SelectTrigger>
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
            <section className="bg-white px-4 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    {/* Results Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {hasActiveFilters
                                    ? 'Search Results'
                                    : 'All Scholarships'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Showing {scholarships?.meta?.from || 0} to{' '}
                                {scholarships?.meta?.to || 0} of{' '}
                                {scholarships?.meta?.total || 0} scholarships
                            </p>
                        </div>
                    </div>

                    {/* Scholarships Grid */}
                    {scholarships?.data && scholarships.data.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {scholarships.data.map((scholarship) => (
                                <Link
                                    key={scholarship.id}
                                    href={`/sas/scholarships/${scholarship.id}`}
                                    className="group block"
                                >
                                    <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                                <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                                {scholarship.scholarship_type}
                                            </span>
                                        </div>

                                        <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
                                            {scholarship.scholarship_name}
                                        </h3>

                                        {scholarship.description && (
                                            <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                                {scholarship.description}
                                            </p>
                                        )}

                                        {scholarship.provider && (
                                            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">
                                                        Provider:
                                                    </span>
                                                    <span>
                                                        {scholarship.provider}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <GraduationCap className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No scholarships found
                            </h3>
                            <p className="mb-6 text-gray-600 dark:text-gray-400">
                                Try adjusting your search or filters
                            </p>
                            {hasActiveFilters && (
                                <Button onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {scholarships?.data &&
                        scholarships.data.length > 0 &&
                        scholarships?.meta?.last_page &&
                        scholarships.meta.last_page > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                {scholarships?.links?.prev && (
                                    <Link href={scholarships.links.prev}>
                                        <Button variant="outline">
                                            Previous
                                        </Button>
                                    </Link>
                                )}

                                <span className="px-4 text-sm text-gray-600 dark:text-gray-400">
                                    Page{' '}
                                    {scholarships?.meta?.current_page || 1} of{' '}
                                    {scholarships?.meta?.last_page || 1}
                                </span>

                                {scholarships?.links?.next && (
                                    <Link href={scholarships.links.next}>
                                        <Button variant="outline">Next</Button>
                                    </Link>
                                )}
                            </div>
                        )}
                </div>
            </section>
        </SASLayout>
    );
}
