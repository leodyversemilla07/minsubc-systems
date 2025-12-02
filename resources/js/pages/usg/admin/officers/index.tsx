import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import SearchBar from '@/components/usg/search-bar';
import { ViewToggle } from '@/components/view-toggle';
import AppLayout from '@/layouts/app-layout';
import officerRoutes from '@/routes/usg/admin/officers';
import { Head, router } from '@inertiajs/react';
import {
    Calendar,
    Edit,
    Mail,
    MapPin,
    Phone,
    Plus,
    Trash2,
    User,
    Users,
    X,
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
    photo?: string;
    photo_url?: string;
    is_active: boolean;
    term_start: string;
    term_end?: string;
    order: number;
    user_id?: number;
    created_at: string;
    updated_at: string;
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

// Skeleton Loaders
function OfficersGridSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <Skeleton className="h-24 w-24 rounded-full" />
                            </div>
                            <div className="space-y-2 text-center">
                                <Skeleton className="mx-auto h-5 w-32" />
                                <Skeleton className="mx-auto h-4 w-24" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                            <div className="flex items-center justify-center gap-2 pt-2">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function OfficersTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <Skeleton className="h-4 w-32" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-24" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-24" />
                    </TableHead>
                    <TableHead>
                        <Skeleton className="h-4 w-20" />
                    </TableHead>
                    <TableHead className="w-[100px]">
                        <Skeleton className="h-4 w-16" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(8)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-16" />
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center justify-end gap-2">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
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
        safeFilters.department || undefined,
    );
    const [selectedStatus, setSelectedStatus] = useState(
        safeFilters.status || undefined,
    );
    const [view, setView] = useState<'grid' | 'table'>('grid');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        router.get(
            officerRoutes.index({
                query: {
                    search: query,
                    department: selectedDepartment || '',
                    status: selectedStatus || '',
                },
            }),
        );
    };

    const handleDepartmentChange = (value: string) => {
        const department = value === 'all' ? undefined : value;
        setSelectedDepartment(department);
        router.get(
            officerRoutes.index({
                query: {
                    search: searchQuery,
                    department: department || '',
                    status: selectedStatus || '',
                },
            }),
        );
    };

    const handleStatusChange = (value: string) => {
        const status = value === 'all' ? undefined : value;
        setSelectedStatus(status);
        router.get(
            officerRoutes.index({
                query: {
                    search: searchQuery,
                    department: selectedDepartment || '',
                    status: status || '',
                },
            }),
        );
    };

    const handleClearAllFilters = () => {
        setSearchQuery('');
        setSelectedDepartment(undefined);
        setSelectedStatus(undefined);
        router.get(officerRoutes.index());
    };

    const hasActiveFilters =
        searchQuery || selectedDepartment || selectedStatus;

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

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'Officers', href: '/usg/admin/officers' },
            ]}
        >
            <Head title="Officers Management - USG Admin" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header with action button */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
                            Officers
                        </h1>
                        <p className="text-muted-foreground">
                            Manage USG officer profiles and information
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <ViewToggle view={view} onViewChange={setView} />
                        {canManage && (
                            <Button
                                onClick={() =>
                                    router.visit(officerRoutes.create())
                                }
                                size="sm"
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                Add Officer
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">
                                    <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {safeOfficers.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Total Officers
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                    <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {
                                            safeOfficers.filter(
                                                (o) => o.is_active,
                                            ).length
                                        }
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Active Officers
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {safeDepartments.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Departments
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
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
                                <Select
                                    value={selectedDepartment}
                                    onValueChange={handleDepartmentChange}
                                >
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="All Departments" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {safeDepartments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Select
                                    value={selectedStatus}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger className="h-10 w-full">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Active Filter Badges */}
                        {hasActiveFilters && (
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Active filters:
                                </span>
                                {searchQuery && (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        Search: "{searchQuery}"
                                        <button
                                            onClick={() => handleSearch('')}
                                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                {selectedDepartment && (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        Department: {selectedDepartment}
                                        <button
                                            onClick={() =>
                                                handleDepartmentChange('all')
                                            }
                                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                {selectedStatus && (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        Status:{' '}
                                        {selectedStatus === 'active'
                                            ? 'Active'
                                            : 'Inactive'}
                                        <button
                                            onClick={() =>
                                                handleStatusChange('all')
                                            }
                                            className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClearAllFilters}
                                    className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                                >
                                    Clear all
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Officers List */}
                {officers === undefined ? (
                    view === 'grid' ? (
                        <OfficersGridSkeleton />
                    ) : (
                        <Card>
                            <CardContent className="p-0">
                                <OfficersTableSkeleton />
                            </CardContent>
                        </Card>
                    )
                ) : safeOfficers.length > 0 ? (
                    view === 'grid' ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {safeOfficers.map((officer) => (
                                <Card
                                    key={officer.id}
                                    className="group relative overflow-hidden border-border/50 transition-all duration-200 hover:shadow-xl hover:shadow-primary/5"
                                >
                                    <CardContent className="p-6">
                                        {/* Status Indicator */}
                                        <div className="absolute top-4 right-4">
                                            <Badge
                                                variant="secondary"
                                                className={`${
                                                    officer.is_active
                                                        ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
                                                        : 'border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
                                                } text-xs font-medium sm:text-sm`}
                                            >
                                                <div
                                                    className={`mr-1.5 h-2 w-2 rounded-full ${
                                                        officer.is_active
                                                            ? 'bg-green-500'
                                                            : 'bg-gray-400'
                                                    }`}
                                                />
                                                <span className="hidden sm:inline">
                                                    {officer.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                                <span className="sm:hidden">
                                                    {officer.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </Badge>
                                        </div>

                                        <div className="flex items-start gap-4 pr-20">
                                            <Avatar className="h-16 w-16 ring-2 ring-primary/10 transition-all group-hover:ring-primary/20">
                                                <AvatarImage
                                                    src={
                                                        officer.photo_url ||
                                                        officer.photo
                                                    }
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-lg font-semibold text-primary">
                                                    {getInitials(officer.name)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="min-w-0 flex-1 space-y-1">
                                                <h3 className="text-lg leading-tight font-bold text-foreground">
                                                    {officer.name}
                                                </h3>
                                                <p className="text-sm font-semibold text-primary">
                                                    {officer.position}
                                                </p>
                                                {officer.department && (
                                                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <MapPin className="h-3 w-3" />
                                                        {officer.department}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Contact Actions */}
                                        <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 flex-1 text-xs"
                                                asChild
                                            >
                                                <a
                                                    href={`mailto:${officer.email}`}
                                                >
                                                    <Mail className="mr-1.5 h-3 w-3" />
                                                    Email
                                                </a>
                                            </Button>
                                            {officer.phone && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 flex-1 text-xs"
                                                    asChild
                                                >
                                                    <a
                                                        href={`tel:${officer.phone}`}
                                                    >
                                                        <Phone className="mr-1.5 h-3 w-3" />
                                                        Call
                                                    </a>
                                                </Button>
                                            )}
                                        </div>

                                        {/* Term Information */}
                                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>
                                                Term:{' '}
                                                {formatDate(officer.term_start)}
                                                {officer.term_end &&
                                                    ` - ${formatDate(officer.term_end)}`}
                                            </span>
                                        </div>

                                        {/* Bio */}
                                        {officer.bio && (
                                            <div className="mt-4 border-t border-border/50 pt-4">
                                                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                    {officer.bio}
                                                </p>
                                            </div>
                                        )}

                                        {/* Management Actions */}
                                        {canManage && (
                                            <div className="mt-4 flex items-center justify-end gap-2 border-t border-border/50 pt-4">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            officerRoutes.edit(
                                                                officer.id,
                                                            ),
                                                        )
                                                    }
                                                    className="text-primary hover:bg-primary/10 hover:text-primary"
                                                >
                                                    <Edit className="mr-1.5 h-3 w-3" />
                                                    Edit
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                        >
                                                            <Trash2 className="mr-1.5 h-3 w-3" />
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Delete Officer
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you
                                                                want to delete{' '}
                                                                <strong>
                                                                    {
                                                                        officer.name
                                                                    }
                                                                </strong>
                                                                ? This action
                                                                cannot be undone
                                                                and will
                                                                permanently
                                                                remove the
                                                                officer from the
                                                                system.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    router.delete(
                                                                        officerRoutes.destroy(
                                                                            officer.id,
                                                                        ),
                                                                    )
                                                                }
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                Delete Officer
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Officer</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Term</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {safeOfficers.map((officer) => (
                                        <TableRow key={officer.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage
                                                            src={
                                                                officer.photo_url ||
                                                                officer.photo
                                                            }
                                                        />
                                                        <AvatarFallback>
                                                            {getInitials(
                                                                officer.name,
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">
                                                            {officer.name}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {officer.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {officer.position}
                                            </TableCell>
                                            <TableCell>
                                                {officer.department || (
                                                    <span className="text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    {officer.phone && (
                                                        <div className="flex items-center gap-1">
                                                            <Phone className="h-3 w-3" />
                                                            {officer.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {officer.term_start && (
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {formatDate(
                                                                officer.term_start,
                                                            )}{' '}
                                                            -{' '}
                                                            {officer.term_end
                                                                ? formatDate(
                                                                      officer.term_end,
                                                                  )
                                                                : 'Present'}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={
                                                        officer.is_active
                                                            ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300'
                                                            : 'border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
                                                    }
                                                >
                                                    {officer.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <a
                                                            href={`mailto:${officer.email}`}
                                                        >
                                                            <Mail className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                    {canManage && (
                                                        <>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    router.visit(
                                                                        officerRoutes.edit(
                                                                            {
                                                                                officer:
                                                                                    officer.id,
                                                                            },
                                                                        ),
                                                                    )
                                                                }
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Delete
                                                                            Officer?
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Are
                                                                            you
                                                                            sure
                                                                            you
                                                                            want
                                                                            to
                                                                            delete{' '}
                                                                            <strong>
                                                                                {
                                                                                    officer.name
                                                                                }
                                                                            </strong>
                                                                            ?
                                                                            This
                                                                            action
                                                                            cannot
                                                                            be
                                                                            undone.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() =>
                                                                                router.delete(
                                                                                    officerRoutes.destroy(
                                                                                        officer.id,
                                                                                    ),
                                                                                )
                                                                            }
                                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                        >
                                                                            Delete
                                                                            Officer
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    )
                ) : (
                    <Card className="border-dashed">
                        <CardContent className="p-12">
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Users className="h-6 w-6" />
                                    </EmptyMedia>
                                    <EmptyTitle>
                                        {searchQuery ||
                                        selectedDepartment ||
                                        selectedStatus
                                            ? 'No officers found'
                                            : 'No officers yet'}
                                    </EmptyTitle>
                                    <EmptyDescription>
                                        {searchQuery ||
                                        selectedDepartment ||
                                        selectedStatus
                                            ? 'Try adjusting your search criteria or clearing some filters to see more results.'
                                            : 'Get started by adding your first USG officer. Officers can manage student affairs and represent the student body.'}
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    {hasActiveFilters && (
                                        <Button
                                            variant="outline"
                                            onClick={handleClearAllFilters}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Clear Filters
                                        </Button>
                                    )}
                                    {canManage && (
                                        <Button
                                            onClick={() =>
                                                router.visit(
                                                    officerRoutes.create(),
                                                )
                                            }
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add First Officer
                                        </Button>
                                    )}
                                    {!hasActiveFilters && !canManage && (
                                        <p className="text-sm text-muted-foreground">
                                            Contact your administrator to add
                                            officers.
                                        </p>
                                    )}
                                </EmptyContent>
                            </Empty>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination could go here if needed */}
            </div>
        </AppLayout>
    );
}
