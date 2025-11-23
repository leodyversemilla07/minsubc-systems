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
import type { Organization, PaginatedData } from '@/types/sas';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Filter, Users, ArrowRight, X, Activity } from 'lucide-react';
import { useState } from 'react';

interface Props {
    organizations: PaginatedData<Organization>;
    filters: {
        search?: string;
        type?: string;
        status?: string;
        category?: string;
    };
}

export default function OrganizationsIndex({ organizations, filters }: Props) {
    const [search, setSearch] = useState(filters?.search || '');
    const [showFilters, setShowFilters] = useState(false);

    // Safety check for organizations data
    if (!organizations || !organizations.data) {
        return (
            <SASLayout>
                <Head title="Student Organizations - SAS" />
                <div className="flex min-h-screen items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Loading...</h2>
                        <p className="text-gray-600">
                            Please wait while we load the organizations.
                        </p>
                    </div>
                </div>
            </SASLayout>
        );
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            sas.organizations.index.url(),
            {
                search,
                type: filters?.type,
                status: filters?.status,
                category: filters?.category,
            },
            { preserveState: true },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            sas.organizations.index.url(),
            { ...filters, [key]: value === 'all' ? undefined : value },
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        router.get(sas.organizations.index.url(), {}, { preserveState: true });
    };

    const hasActiveFilters =
        filters?.search ||
        filters?.type ||
        filters?.status ||
        filters?.category;

    return (
        <SASLayout>
            <Head title="Student Organizations - SAS" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-white px-4 py-8 sm:py-16 text-slate-900 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-green-950/20 dark:to-slate-950 dark:text-white">
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
                        {/* Badge */}
                        <div className="group mb-6 inline-flex items-center gap-2 rounded-full border border-green-200/50 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all hover:border-green-300 dark:border-green-800/50 dark:bg-slate-800/80">
                            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-semibold text-green-900 dark:text-green-300">
                                Discover Campus Organizations
                            </span>
                        </div>

                        <h1 className="mb-6 bg-gradient-to-br from-slate-900 via-green-800 to-green-600 bg-clip-text text-4xl font-black text-transparent sm:text-5xl lg:text-6xl dark:from-white dark:via-green-200 dark:to-green-400">
                            Student Organizations
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                            Connect, collaborate, and grow. Explore the diverse student organizations at MinSU Bongabong Campus and find your community.
                        </p>

                        {/* Search Bar Container */}
                        <div className="mx-auto max-w-3xl">
                            <div className="relative rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200/50 dark:bg-slate-900 dark:ring-slate-800">
                                <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
                                    <div className="relative flex-1">
                                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="text"
                                            placeholder="Search organizations..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="h-12 w-full rounded-xl border-0 bg-slate-50 pl-12 text-base text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-slate-800 dark:text-white"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="lg"
                                            className={`h-12 rounded-xl border-slate-200 px-4 text-slate-700 hover:bg-slate-50 hover:text-green-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 ${showFilters ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' : ''}`}
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
                </div>
            </section>

            {/* Filters Section */}
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
                            {/* Organization Type Filter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Organization Type
                                </label>
                                <Select
                                    value={filters?.type || 'all'}
                                    onValueChange={(value) =>
                                        handleFilterChange('type', value)
                                    }
                                >
                                    <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white px-3 text-slate-900 focus:border-green-500 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Types
                                        </SelectItem>
                                        <SelectItem value="Minor">
                                            Minor
                                        </SelectItem>
                                        <SelectItem value="Major">
                                            Major
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Category Filter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Category
                                </label>
                                <Select
                                    value={filters?.category || 'all'}
                                    onValueChange={(value) =>
                                        handleFilterChange('category', value)
                                    }
                                >
                                    <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white px-3 text-slate-900 focus:border-green-500 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Categories
                                        </SelectItem>
                                        <SelectItem value="Academic">
                                            Academic
                                        </SelectItem>
                                        <SelectItem value="Sports">
                                            Sports
                                        </SelectItem>
                                        <SelectItem value="Cultural">
                                            Cultural
                                        </SelectItem>
                                        <SelectItem value="Religious">
                                            Religious
                                        </SelectItem>
                                        <SelectItem value="Service">
                                            Service
                                        </SelectItem>
                                        <SelectItem value="Other">
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Status Filter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Status
                                </label>
                                <Select
                                    value={filters?.status || 'all'}
                                    onValueChange={(value) =>
                                        handleFilterChange('status', value)
                                    }
                                >
                                    <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white px-3 text-slate-900 focus:border-green-500 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Statuses
                                        </SelectItem>
                                        <SelectItem value="Active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="Inactive">
                                            Inactive
                                        </SelectItem>
                                        <SelectItem value="Suspended">
                                            Suspended
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Results Section */}
            <section className="px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50 min-h-[50vh]">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {hasActiveFilters ? 'Search Results' : 'All Organizations'}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Found <span className="font-semibold text-green-600 dark:text-green-400">{organizations?.meta?.total || 0}</span> student organizations
                        </p>
                    </div>

                    {organizations?.data && organizations.data.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {organizations.data.map((organization) => (
                                <div
                                    key={organization.id}
                                    className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-green-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700 dark:hover:shadow-green-900/20"
                                >
                                    {/* Green Top Border Gradient */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                                    {/* Header */}
                                    <div className="mb-5 flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 dark:bg-green-900/20 dark:text-green-400">
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${organization.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'}`}>
                                                {organization.status === 'Active' && <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                                                {organization.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                                                {organization.organization_type}
                                            </span>
                                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                • {organization.category}
                                            </span>
                                        </div>

                                        <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400 line-clamp-2">
                                            {organization.organization_name}
                                        </h3>

                                        <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {organization.mission || 'No mission statement available.'}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">{organization.members_count || 0}</span> Members
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Activity className="h-3 w-3" />
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">High</span> Activity
                                            </div>
                                        </div>
                                    </div>

                                    {/* View Details Link */}
                                    <Link
                                        href={sas.organizations.show.url(organization.organization_code)}
                                        className="mt-6 flex items-center gap-2 text-sm font-bold text-green-700 transition-all hover:gap-3 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                    >
                                        View Details
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 px-4 text-center dark:border-slate-700 dark:bg-slate-900">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
                                <Users className="h-8 w-8 text-slate-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                No organizations found
                            </h3>
                            <p className="mb-6 max-w-md text-slate-600 dark:text-slate-400">
                                We couldn't find any organizations matching your criteria. Try adjusting your search or filters.
                            </p>
                            {hasActiveFilters && (
                                <Button onClick={clearFilters} variant="outline" className="border-slate-200 hover:bg-slate-50 dark:border-slate-700">
                                    Clear All Filters
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {organizations?.data &&
                        organizations.data.length > 0 &&
                        organizations?.meta?.last_page &&
                        organizations.meta.last_page > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                {organizations?.links?.prev && (
                                    <Link href={organizations.links.prev}>
                                        <Button variant="outline" className="rounded-xl">
                                            Previous
                                        </Button>
                                    </Link>
                                )}

                                <span className="px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Page <span className="text-slate-900 dark:text-white font-bold">{organizations?.meta?.current_page || 1}</span> of {organizations?.meta?.last_page || 1}
                                </span>

                                {organizations?.links?.next && (
                                    <Link href={organizations.links.next}>
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
