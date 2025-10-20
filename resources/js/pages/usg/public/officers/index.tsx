import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import OfficerCard from '@/components/usg/officer-card';
import SearchBar from '@/components/usg/search-bar';
import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Mail, Phone, Search, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    const [isVisible, setIsVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState<{
        positions?: string[];
        departments?: string[];
        statuses?: string[];
    }>({});

    useEffect(() => {
        setIsVisible(true);
    }, []);

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
        <PublicLayout>
            <Head title="USG Officers - Mindanao University of Science and Technology" />

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Animated background elements */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-purple-400/10"></div>
                    <div className="animation-delay-1000 absolute top-1/2 -left-40 h-96 w-96 animate-pulse rounded-full bg-blue-400/10"></div>
                    <div className="animation-delay-2000 absolute right-1/4 bottom-20 h-60 w-60 animate-pulse rounded-full bg-green-400/10"></div>
                </div>

                {/* Animated Header */}
                <div
                    className={`relative border-b bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm dark:from-gray-800/80 dark:to-gray-900/80 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000`}
                >
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6">
                                <div className="mb-4 inline-flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-4">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="mb-4 flex items-center justify-center gap-3">
                                <h1 className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                                    USG Officers
                                </h1>
                            </div>
                            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
                                Meet the dedicated leaders of the University
                                Student Government who serve our campus
                                community with passion, commitment, and
                                unwavering dedication.
                            </p>

                            {/* Stats Cards */}
                            <div
                                className={`mx-auto mt-8 grid max-w-4xl transform grid-cols-1 gap-6 transition-all duration-1000 md:grid-cols-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: '200ms' }}
                            >
                                <Card className="group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <div className="mb-2 text-3xl font-bold text-purple-600 transition-transform duration-300 group-hover:scale-110">
                                            {stats.total_officers}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Total Officers
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <div className="mb-2 text-3xl font-bold text-green-600 transition-transform duration-300 group-hover:scale-110">
                                            {stats.active_officers}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Active Officers
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <div className="mb-2 text-3xl font-bold text-blue-600 transition-transform duration-300 group-hover:scale-110">
                                            {stats.departments_count}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Departments
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Search and Filters */}
                    <div
                        className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
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
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Search className="mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    No officers found
                                </h3>
                                <p className="max-w-md text-center text-gray-600 dark:text-gray-300">
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
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-8">
                            {/* Active Officers */}
                            {activeOfficers.length > 0 && (
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
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
                                <div>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
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

                    {/* Contact Section */}
                    {activeOfficers.length > 0 && (
                        <div className="mt-12 border-t pt-8">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Get in Touch
                                    </h3>
                                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                                        Have questions or suggestions? Feel free
                                        to reach out to any of our officers or
                                        contact the USG office directly.
                                    </p>
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Mail className="h-4 w-4" />
                                            usg@must.edu.ph
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Phone className="h-4 w-4" />
                                            (088) 856-1738
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
