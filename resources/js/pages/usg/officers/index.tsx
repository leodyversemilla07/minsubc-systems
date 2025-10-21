import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OfficerCard from '@/components/usg/officer-card';
import SearchBar from '@/components/usg/search-bar';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import { Mail, Phone, Search, Users } from 'lucide-react';
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
            <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 text-white py-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-6 inline-flex animate-pulse items-center justify-center rounded-full bg-white/20 backdrop-blur-sm p-4">
                            <Users className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            USG Officers
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-100">
                            Meet the dedicated leaders serving our campus community
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                {stats.total_officers}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total Officers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                {stats.active_officers}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Active Officers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
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
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    {/* Search and Filters */}
                    <div className="mb-8 max-w-7xl mx-auto">
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
                                    className="bg-green-100 text-green-700"
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
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-12 text-center">
                            <Search className="mb-4 h-12 w-12 text-gray-400 mx-auto" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No officers found
                            </h3>
                            <p className="max-w-md mx-auto text-center text-gray-600 dark:text-gray-300">
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
                                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
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
                                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
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
                <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                            <p className="text-xl mb-8 text-purple-100">
                                Have questions or suggestions? Feel free to reach out to any of our officers or contact the USG office directly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-white/20 rounded-full">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg">usg@must.edu.ph</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-white/20 rounded-full">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg">(088) 856-1738</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </USGLayout>
    );
}
