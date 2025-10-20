import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/usg/search-bar';
import { Head, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Edit,
    Mail,
    MapPin,
    Phone,
    Plus,
    Trash2,
    User,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Officer {
    id: number;
    name: string;
    position: string;
    department?: string;
    email: string;
    phone?: string;
    bio?: string;
    profile_image?: string;
    is_active: boolean;
    term_start: string;
    term_end?: string;
    created_at: string;
}

interface Props {
    officers?: Officer[] | { data: Officer[] };
    filters?: {
        search?: string;
        department?: string;
        status?: string;
    };
    departments?: string[];
    canManage?: boolean;
}

export default function OfficersManagement({
    officers,
    filters,
    departments,
    canManage = true,
}: Props) {
    // Ensure officers is always an array
    const safeOfficers: Officer[] = Array.isArray(officers)
        ? officers
        : officers?.data && Array.isArray(officers.data)
          ? officers.data
          : []; // Ensure departments is always an array
    const safeDepartments: string[] = Array.isArray(departments)
        ? departments
        : [];

    // Ensure filters is always an object
    const safeFilters = filters || {};

    const [searchQuery, setSearchQuery] = useState(safeFilters.search || '');
    const [selectedDepartment, setSelectedDepartment] = useState(
        safeFilters.department || '',
    );
    const [selectedStatus, setSelectedStatus] = useState(
        safeFilters.status || '',
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        router.get(
            '/usg/admin/officers',
            {
                search: query,
                department: selectedDepartment,
                status: selectedStatus,
            },
            { preserveState: true },
        );
    };

    const handleDepartmentFilter = (department: string) => {
        setSelectedDepartment(department);
        router.get(
            '/usg/admin/officers',
            {
                search: searchQuery,
                department: department,
                status: selectedStatus,
            },
            { preserveState: true },
        );
    };

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status);
        router.get(
            '/usg/admin/officers',
            {
                search: searchQuery,
                department: selectedDepartment,
                status: status,
            },
            { preserveState: true },
        );
    };

    const handleDelete = (officer: Officer) => {
        if (confirm(`Are you sure you want to delete ${officer.name}?`)) {
            router.delete(`/usg/admin/officers/${officer.id}`);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
        });
    };

    const getStatusColor = (isActive: boolean) => {
        return isActive
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    };

    return (
        <>
            <Head title="Officers Management - USG Admin" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.visit('/usg/admin')}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Dashboard
                                </Button>
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Officers Management
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Manage USG officer profiles and
                                        information
                                    </p>
                                </div>
                            </div>

                            {canManage && (
                                <Button
                                    onClick={() =>
                                        router.visit(
                                            '/usg/admin/officers/create',
                                        )
                                    }
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Officer
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Stats */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {safeOfficers.length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Total Officers
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
                                        <User className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {
                                                safeOfficers.filter(
                                                    (o) => o.is_active,
                                                ).length
                                            }
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Active Officers
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
                                        <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {safeDepartments.length}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Departments
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <div className="md:col-span-2">
                                    <SearchBar
                                        placeholder="Search officers by name, position, or department..."
                                        value={searchQuery}
                                        onChange={(query) => {
                                            setSearchQuery(query);
                                            handleSearch(query);
                                        }}
                                    />
                                </div>

                                <div>
                                    <select
                                        value={selectedDepartment}
                                        onChange={(e) =>
                                            handleDepartmentFilter(
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        <option value="">
                                            All Departments
                                        </option>
                                        {safeDepartments.map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) =>
                                            handleStatusFilter(e.target.value)
                                        }
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                                    >
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Officers List */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {safeOfficers.length > 0 ? (
                            safeOfficers.map((officer) => (
                                <Card
                                    key={officer.id}
                                    className="transition-shadow hover:shadow-lg"
                                >
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-16 w-16">
                                                    <AvatarImage
                                                        src={
                                                            officer.profile_image
                                                        }
                                                    />
                                                    <AvatarFallback className="bg-blue-100 font-semibold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                                                        {getInitials(
                                                            officer.name,
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {officer.name}
                                                        </h3>
                                                        <Badge
                                                            variant="secondary"
                                                            className={getStatusColor(
                                                                officer.is_active,
                                                            )}
                                                        >
                                                            {officer.is_active
                                                                ? 'Active'
                                                                : 'Inactive'}
                                                        </Badge>
                                                    </div>
                                                    <p className="mb-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                                                        {officer.position}
                                                    </p>
                                                    {officer.department && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {officer.department}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {canManage && (
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/usg/admin/officers/${officer.id}/edit`,
                                                            )
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                officer,
                                                            )
                                                        }
                                                        className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Mail className="h-4 w-4" />
                                                <a
                                                    href={`mailto:${officer.email}`}
                                                    className="hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {officer.email}
                                                </a>
                                            </div>

                                            {officer.phone && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <Phone className="h-4 w-4" />
                                                    <a
                                                        href={`tel:${officer.phone}`}
                                                        className="hover:text-blue-600 dark:hover:text-blue-400"
                                                    >
                                                        {officer.phone}
                                                    </a>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Calendar className="h-4 w-4" />
                                                Term:{' '}
                                                {formatDate(officer.term_start)}
                                                {officer.term_end &&
                                                    ` - ${formatDate(officer.term_end)}`}
                                            </div>
                                        </div>

                                        {officer.bio && (
                                            <div className="mt-4 border-t pt-4">
                                                <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                                                    {officer.bio}
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full">
                                <Card>
                                    <CardContent className="p-12 text-center">
                                        <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                            No officers found
                                        </h3>
                                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                                            {searchQuery ||
                                            selectedDepartment ||
                                            selectedStatus
                                                ? 'Try adjusting your search filters'
                                                : 'Get started by adding your first officer'}
                                        </p>
                                        {canManage && (
                                            <Button
                                                onClick={() =>
                                                    router.visit(
                                                        '/usg/admin/officers/create',
                                                    )
                                                }
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Officer
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>

                    {/* Pagination could go here if needed */}
                </div>
            </div>
        </>
    );
}
