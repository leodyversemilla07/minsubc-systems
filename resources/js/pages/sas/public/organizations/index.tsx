import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OrganizationCard } from '@/components/sas';
import SASLayout from '@/layouts/sas-layout';
import type { Organization, PaginatedData } from '@/types/sas';
import { Head, Link, router } from '@inertiajs/react';
import { Search, SlidersHorizontal, Users } from 'lucide-react';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
                        <p className="text-gray-600">Please wait while we load the organizations.</p>
                    </div>
                </div>
            </SASLayout>
        );
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/sas/organizations',
            { search, type: filters?.type, status: filters?.status, category: filters?.category },
            { preserveState: true },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            '/sas/organizations',
            { ...filters, [key]: value === 'all' ? undefined : value },
            { preserveState: true },
        );
    };

    const clearFilters = () => {
        setSearch('');
        router.get('/sas/organizations', {}, { preserveState: true });
    };

    const hasActiveFilters =
        filters?.search || filters?.type || filters?.status || filters?.category;

    return (
        <SASLayout>
            <Head title="Student Organizations - SAS" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900 px-4 py-16 text-white sm:px-6 lg:px-8">
                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-10">
                    <svg
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="org-pattern"
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
                            fill="url(#org-pattern)"
                        />
                    </svg>
                </div>

                <div className="relative mx-auto max-w-7xl">
                    <div className="text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <Users className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                                Discover Campus Organizations
                            </span>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
                            Student Organizations
                        </h1>

                        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100 sm:text-xl">
                            Explore and connect with the diverse student
                            organizations at MinSU Bongabong Campus
                        </p>

                        {/* Search Bar */}
                        <form
                            onSubmit={handleSearch}
                            className="mx-auto max-w-2xl"
                        >
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search organizations..."
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
                                    className="bg-white text-blue-700 hover:bg-blue-50"
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

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Organization Type
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
                                        <SelectItem value="Minor">
                                            Minor
                                        </SelectItem>
                                        <SelectItem value="Major">
                                            Major
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status
                                </label>
                                <Select
                                    value={filters?.status || 'all'}
                                    onValueChange={(value) =>
                                        handleFilterChange('status', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Status
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

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Category
                                </label>
                                <Select
                                    value={filters?.category || 'all'}
                                    onValueChange={(value) =>
                                        handleFilterChange('category', value)
                                    }
                                >
                                    <SelectTrigger>
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
                                    : 'All Organizations'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Showing {organizations?.meta?.from || 0} to{' '}
                                {organizations?.meta?.to || 0} of{' '}
                                {organizations?.meta?.total || 0} organizations
                            </p>
                        </div>
                    </div>

                    {/* Organizations Grid */}
                    {organizations?.data && organizations.data.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {organizations.data.map((organization) => (
                                <OrganizationCard
                                    key={organization.id}
                                    organization={organization}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Users className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No organizations found
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
                    {organizations?.data && organizations.data.length > 0 &&
                        organizations?.meta?.last_page && organizations.meta.last_page > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                {organizations?.links?.prev && (
                                    <Link href={organizations.links.prev}>
                                        <Button variant="outline">
                                            Previous
                                        </Button>
                                    </Link>
                                )}

                                <span className="px-4 text-sm text-gray-600 dark:text-gray-400">
                                    Page {organizations?.meta?.current_page || 1} of{' '}
                                    {organizations?.meta?.last_page || 1}
                                </span>

                                {organizations?.links?.next && (
                                    <Link href={organizations.links.next}>
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
