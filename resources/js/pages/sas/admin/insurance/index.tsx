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
    AlertCircle,
    CheckCircle,
    Clock,
    FileText,
    Search,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    student_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
}

interface InsuranceRecord {
    id: number;
    student_id: number;
    insurance_provider: string;
    policy_number: string;
    policy_type: string;
    coverage_amount: string;
    effective_date: string;
    expiration_date: string;
    status: string;
    submission_date: string;
    student: Student;
}

interface Props {
    insuranceRecords: {
        data: InsuranceRecord[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        status?: string;
        policy_type?: string;
        search?: string;
    };
}

export default function InsuranceIndex({ insuranceRecords, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [policyType, setPolicyType] = useState(filters.policy_type || 'all');

    function handleFilter() {
        router.get(
            '/sas/admin/insurance',
            {
                status: status === 'all' ? undefined : status,
                policy_type: policyType === 'all' ? undefined : policyType,
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
        setStatus('all');
        setPolicyType('all');
        router.get(
            sas.admin.insurance.index.url(),
            {},
            { preserveState: true },
        );
    }

    const stats = {
        pending: insuranceRecords.data.filter((i) => i.status === 'Pending')
            .length,
        approved: insuranceRecords.data.filter((i) => i.status === 'Approved')
            .length,
        rejected: insuranceRecords.data.filter((i) => i.status === 'Rejected')
            .length,
        total: insuranceRecords.total,
    };

    function getStatusBadge(status: string) {
        const variants: Record<
            string,
            {
                variant: 'default' | 'secondary' | 'destructive';
                icon: typeof Clock;
            }
        > = {
            Pending: { variant: 'secondary', icon: Clock },
            Approved: { variant: 'default', icon: CheckCircle },
            Rejected: { variant: 'destructive', icon: XCircle },
        };

        const config = variants[status] || {
            variant: 'secondary' as const,
            icon: AlertCircle,
        };
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="gap-1">
                <Icon className="h-3 w-3" />
                {status}
            </Badge>
        );
    }

    function formatCurrency(amount: string) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(parseFloat(amount));
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: '/sas/admin/dashboard' },
                { title: 'Insurance', href: '/sas/admin/insurance' },
            ]}
        >
            <Head title="Insurance Management" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                            Insurance Management
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Review and manage student insurance submissions
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Submissions
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Review
                            </CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.pending}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Approved
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.approved}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Rejected
                            </CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.rejected}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        placeholder="Search by policy number, provider, or student name..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="pl-9"
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' && handleFilter()
                                        }
                                    />
                                </div>
                            </div>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="Pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="Approved">
                                        Approved
                                    </SelectItem>
                                    <SelectItem value="Rejected">
                                        Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={policyType}
                                onValueChange={setPolicyType}
                            >
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Types
                                    </SelectItem>
                                    <SelectItem value="Health">
                                        Health
                                    </SelectItem>
                                    <SelectItem value="Life">Life</SelectItem>
                                    <SelectItem value="Accident">
                                        Accident
                                    </SelectItem>
                                    <SelectItem value="Travel">
                                        Travel
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

                {/* Insurance Records Table */}
                <Card>
                    <CardContent className="p-0">
                        {insuranceRecords.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Policy Number</TableHead>
                                        <TableHead>Provider</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Coverage</TableHead>
                                        <TableHead>Effective Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {insuranceRecords.data.map((insurance) => (
                                        <TableRow key={insurance.id}>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {
                                                        insurance.student
                                                            .first_name
                                                    }{' '}
                                                    {
                                                        insurance.student
                                                            .last_name
                                                    }
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {
                                                        insurance.student
                                                            .student_id
                                                    }
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-mono text-sm">
                                                {insurance.policy_number}
                                            </TableCell>
                                            <TableCell>
                                                {insurance.insurance_provider}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {insurance.policy_type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(
                                                    insurance.coverage_amount,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    insurance.effective_date,
                                                ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(
                                                    insurance.status,
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/sas/admin/insurance/${insurance.id}`}
                                                    >
                                                        Review
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="py-12 text-center">
                                <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <p className="text-gray-600 dark:text-gray-400">
                                    No insurance records found
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {insuranceRecords.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing page {insuranceRecords.current_page} of{' '}
                            {insuranceRecords.last_page}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={insuranceRecords.current_page === 1}
                                onClick={() =>
                                    router.get(
                                        `/sas/admin/insurance?page=${insuranceRecords.current_page - 1}`,
                                        {
                                            status:
                                                status === 'all'
                                                    ? undefined
                                                    : status,
                                            policy_type:
                                                policyType === 'all'
                                                    ? undefined
                                                    : policyType,
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
                                    insuranceRecords.current_page ===
                                    insuranceRecords.last_page
                                }
                                onClick={() =>
                                    router.get(
                                        `/sas/admin/insurance?page=${insuranceRecords.current_page + 1}`,
                                        {
                                            status:
                                                status === 'all'
                                                    ? undefined
                                                    : status,
                                            policy_type:
                                                policyType === 'all'
                                                    ? undefined
                                                    : policyType,
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
            </div>
        </AppLayout>
    );
}
