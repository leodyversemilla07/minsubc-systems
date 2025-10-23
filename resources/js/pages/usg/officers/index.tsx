import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OfficerCard from '@/components/usg/officer-card';
import SearchBar from '@/components/usg/search-bar';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import { Mail, Phone, Search } from 'lucide-react';
import { useState } from 'react';

interface Officer {
    id: number;
    name: string;
    position: string;
    department?: string;
    email?: string;
    phone?: string;
    photo?: string;
    bio?: string;
    is_active: boolean;
    term_start?: string;
    term_end?: string;
    order?: number;
}

interface Props {
    officers?: Officer[];
    departments?: string[];
    stats?: {
        total_officers: number;
        active_officers: number;
        departments_count: number;
    };
}

export default function OfficersIndex({
    officers = [],
    stats = {
        total_officers: 0,
        active_officers: 0,
        departments_count: 0,
    },
}: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<{
        positions?: string[];
        departments?: string[];
        statuses?: string[];
    }>({});

    // Extract unique positions from officers data
    const positions = Array.from(
        new Set(officers.map((officer) => officer.position)),
    ).filter(Boolean);

    const filteredOfficers = (officers || []).filter((officer) => {
        // Search filter
        const matchesSearch =
            searchQuery === '' ||
            officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            officer.position
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            (officer.department &&
                officer.department
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()));

        // Position filter
        const matchesPosition =
            !activeFilters.positions?.length ||
            activeFilters.positions.includes(officer.position);

        // Department filter
        const matchesDepartment =
            !activeFilters.departments?.length ||
            (officer.department &&
                activeFilters.departments.includes(officer.department));

        // Status filter
        const matchesStatus =
            !activeFilters.statuses?.length ||
            activeFilters.statuses.includes(
                officer.is_active ? 'active' : 'inactive',
            );

        return (
            matchesSearch &&
            matchesPosition &&
            matchesDepartment &&
            matchesStatus
        );
    });

    const activeOfficers = filteredOfficers.filter(
        (officer) => officer.is_active,
    );
    const inactiveOfficers = filteredOfficers.filter(
        (officer) => !officer.is_active,
    );

    return (
        <USGLayout>
            <Head title="USG Officers" />

            {/* Hero Section */}
            <section className="relative bg-[var(--usg-primary)] py-20 text-white">
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            USG Officers
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Meet the dedicated leaders serving our campus
                            community
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-[var(--usg-primary)]">
                                {stats.total_officers}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Officers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-[var(--usg-secondary)]">
                                {stats.active_officers}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Active Officers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-[var(--usg-accent)]">
                                {stats.departments_count}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Departments
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    {/* Search and Filters */}
                    <div className="mx-auto mb-8 max-w-7xl">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search officers by name, position, or department..."
                            showFilters
                            filters={{
                                categories: positions,
                                statuses: ['active', 'inactive'],
                            }}
                            activeFilters={{
                                categories: activeFilters.positions,
                                statuses: activeFilters.statuses,
                            }}
                            onFiltersChange={(filters) => {
                                setActiveFilters({
                                    positions: filters.categories,
                                    statuses: filters.statuses,
                                });
                            }}
                        />
                    </div>

                    {/* Results Summary */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {filteredOfficers.length} Officer
                                {filteredOfficers.length !== 1 ? 's' : ''}
                            </h2>
                            <div className="flex gap-2">
                                <Badge
                                    variant="default"
                                    className="bg-[var(--usg-light)] text-[var(--usg-primary)]"
                                >
                                    {activeOfficers.length} Active
                                </Badge>
                                {inactiveOfficers.length > 0 && (
                                    <Badge variant="secondary">
                                        {inactiveOfficers.length} Inactive
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredOfficers.length === 0 ? (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                            <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No officers found
                            </h3>
                            <p className="mx-auto max-w-md text-center text-gray-600 dark:text-gray-300">
                                {searchQuery ||
                                Object.values(activeFilters).some(
                                    (f) => f?.length,
                                )
                                    ? "Try adjusting your search terms or filters to find what you're looking for."
                                    : 'No officers are currently available.'}
                            </p>
                            {(searchQuery ||
                                Object.values(activeFilters).some(
                                    (f) => f?.length,
                                )) && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveFilters({});
                                    }}
                                    className="mt-4"
                                >
                                    Clear search and filters
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Active Officers */}
                            {activeOfficers.length > 0 && (
                                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                                    <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                        Current Officers
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {activeOfficers
                                            .sort(
                                                (a, b) =>
                                                    (a.order || 999) -
                                                    (b.order || 999),
                                            )
                                            .map((officer) => (
                                                <OfficerCard
                                                    key={officer.id}
                                                    officer={officer}
                                                />
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* Inactive Officers */}
                            {inactiveOfficers.length > 0 && (
                                <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                                    <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                        Past Officers
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {inactiveOfficers
                                            .sort(
                                                (a, b) =>
                                                    new Date(
                                                        b.term_end ||
                                                            '1970-01-01',
                                                    ).getTime() -
                                                    new Date(
                                                        a.term_end ||
                                                            '1970-01-01',
                                                    ).getTime(),
                                            )
                                            .map((officer) => (
                                                <OfficerCard
                                                    key={officer.id}
                                                    officer={officer}
                                                />
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            {activeOfficers.length > 0 && (
                <section className="bg-[var(--usg-primary)] py-16 text-white">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold">
                                Get in Touch
                            </h2>
                            <p className="mb-8 text-xl text-[var(--usg-hero-text)]">
                                Have questions or suggestions? Feel free to
                                reach out to any of our officers or contact the
                                USG office directly.
                            </p>
                            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg">
                                        usg@must.edu.ph
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg">
                                        (088) 856-1738
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </USGLayout>
    );
}
