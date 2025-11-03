import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, router } from '@inertiajs/react';
import {
    Building2,
    Edit,
    Plus,
    Search,
    Shield,
    Trash2,
    Users,
} from 'lucide-react';
import { useState } from 'react';

interface Organization {
    id: number;
    organization_code: string;
    organization_name: string;
    organization_type: string;
    category: string;
    status: string;
    establishment_date?: string;
}

interface Props {
    organizations: {
        data: Organization[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        organization_type?: string;
        status?: string;
        search?: string;
    };
}

export default function OrganizationsIndex({ organizations, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [orgType, setOrgType] = useState(filters.organization_type || '');
    const [status, setStatus] = useState(filters.status || '');

    function handleFilter() {
        router.get(
            '/sas/admin/organizations',
            {
                organization_type: orgType || undefined,
                status: status || undefined,
                search: search || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function handleReset() {
        setSearch('');
        setOrgType('');
        setStatus('');
        router.get(
            sas.admin.organizations.index.url(),
            {},
            { preserveState: true },
        );
    }

    function handleDelete(id: number, name: string) {
        if (
            confirm(
                `Are you sure you want to delete "${name}"? This action cannot be undone.`,
            )
        ) {
            router.delete(`/sas/admin/organizations/${id}`, {
                preserveScroll: true,
            });
        }
    }

    const stats = {
        total: organizations.total,
        active: organizations.data.filter((o) => o.status === 'Active').length,
        major: organizations.data.filter((o) => o.organization_type === 'Major')
            .length,
        minor: organizations.data.filter((o) => o.organization_type === 'Minor')
            .length,
    };

    function getStatusBadge(status: string) {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive' | 'outline'
        > = {
            Active: 'default',
            Inactive: 'secondary',
            Suspended: 'destructive',
        };

        return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
    }

    function getTypeBadge(type: string) {
        return (
            <Badge variant={type === 'Major' ? 'default' : 'outline'}>
                {type}
            </Badge>
        );
    }

    return (
        <AppLayout>
            <Head title="Organizations Management" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Organizations Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Manage student organizations and their activities
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={sas.admin.organizations.create.url()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Organization
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Organizations
                        </CardTitle>
                        <Building2 className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active
                        </CardTitle>
                        <Shield className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.active}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Major Organizations
                        </CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.major}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Minor Organizations
                        </CardTitle>
                        <Users className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.minor}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    placeholder="Search by organization name or code..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9"
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleFilter()
                                    }
                                />
                            </div>
                        </div>
                        <Select value={orgType} onValueChange={setOrgType}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Types</SelectItem>
                                <SelectItem value="Major">Major</SelectItem>
                                <SelectItem value="Minor">Minor</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Statuses</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">
                                    Inactive
                                </SelectItem>
                                <SelectItem value="Suspended">
                                    Suspended
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>Filter</Button>
                            <Button variant="outline" onClick={handleReset}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Organizations Table */}
            <Card>
                <CardContent className="p-0">
                    {organizations.data.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Organization Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Established</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {organizations.data.map((org) => (
                                    <TableRow key={org.id}>
                                        <TableCell className="font-mono text-sm">
                                            {org.organization_code}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {org.organization_name}
                                        </TableCell>
                                        <TableCell>
                                            {getTypeBadge(
                                                org.organization_type,
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {org.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {org.establishment_date
                                                ? new Date(
                                                      org.establishment_date,
                                                  ).getFullYear()
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(org.status)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/sas/admin/organizations/${org.id}/edit`}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            org.id,
                                                            org.organization_name,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="py-12 text-center">
                            <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-400">
                                No organizations found
                            </p>
                            <Button className="mt-4" asChild>
                                <Link
                                    href={sas.admin.organizations.create.url()}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create First Organization
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {organizations.last_page > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing page {organizations.current_page} of{' '}
                        {organizations.last_page}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={organizations.current_page === 1}
                            onClick={() =>
                                router.get(
                                    `/sas/admin/organizations?page=${organizations.current_page - 1}`,
                                    {
                                        organization_type: orgType || undefined,
                                        status: status || undefined,
                                        search: search || undefined,
                                    },
                                    { preserveState: true },
                                )
                            }
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={
                                organizations.current_page ===
                                organizations.last_page
                            }
                            onClick={() =>
                                router.get(
                                    `/sas/admin/organizations?page=${organizations.current_page + 1}`,
                                    {
                                        organization_type: orgType || undefined,
                                        status: status || undefined,
                                        search: search || undefined,
                                    },
                                    { preserveState: true },
                                )
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
