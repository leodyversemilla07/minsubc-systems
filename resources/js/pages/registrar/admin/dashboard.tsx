import { DataTable } from '@/components/data-table';
import { DatePicker } from '@/components/date-picker';
import { ReleaseDocumentDialog } from '@/components/release-document-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { statusColors } from '@/lib/status-colors';
import { dashboard } from '@/routes/registrar/admin';
import { show } from '@/routes/registrar/admin/requests';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    ChevronDown,
    Clock,
    DollarSign,
    Eye,
    FileText,
    Filter,
    MoreVertical,
    Package,
    Search,
    X,
    XCircle,
} from 'lucide-react';
import { FormEvent, useState } from 'react';

interface DocumentRequest {
    id: number;
    request_number: string;
    status:
        | 'pending_payment'
        | 'payment_expired'
        | 'paid'
        | 'processing'
        | 'ready_for_claim'
        | 'claimed'
        | 'released'
        | 'cancelled'
        | 'rejected';
    document_type: string;
    purpose: string;
    copies: number;
    total_amount: number;
    created_at: string;
    student: {
        student_id: string;
        user: {
            first_name: string;
            last_name: string;
            full_name: string;
            email: string;
        };
    };
    payments: Array<{
        id: number;
        amount: number;
        payment_method: 'paymongo' | 'cash';
        status: 'pending' | 'paid' | 'failed';
        created_at: string;
    }>;
}

interface RequestsProps {
    requests: {
        data: DocumentRequest[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        status?: string;
        date_from?: string;
        date_to?: string;
    };
    stats: {
        total: number;
        pending_payment: number;
        paid: number;
        processing: number;
        ready_for_claim: number;
        claimed: number;
    };
}

const statusConfig = {
    pending_payment: { label: 'Pending Payment', icon: Clock },
    payment_expired: { label: 'Payment Expired', icon: XCircle },
    paid: { label: 'Paid', icon: CheckCircle },
    processing: { label: 'Processing', icon: AlertCircle },
    ready_for_claim: { label: 'Ready for Claim', icon: CheckCircle },
    claimed: { label: 'Claimed', icon: CheckCircle },
    released: { label: 'Released', icon: CheckCircle },
    cancelled: { label: 'Cancelled', icon: XCircle },
    rejected: { label: 'Rejected', icon: XCircle },
};

export default function Dashboard({ requests, filters, stats }: RequestsProps) {
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [dateFrom, setDateFrom] = useState<Date | undefined>(
        filters.date_from ? new Date(filters.date_from) : undefined,
    );
    const [dateTo, setDateTo] = useState<Date | undefined>(
        filters.date_to ? new Date(filters.date_to) : undefined,
    );
    const [isFilterOpen, setIsFilterOpen] = useState(
        !!(filters.status || filters.date_from || filters.date_to),
    );
    const [releaseDialog, setReleaseDialog] = useState<{
        open: boolean;
        requestNumber: string;
        studentName?: string;
    }>({
        open: false,
        requestNumber: '',
        studentName: '',
    });

    const hasActiveFilters = statusFilter !== 'all' || dateFrom || dateTo;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: '#',
        },
    ];

    const handleFilterSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            dashboard().url,
            {
                status: statusFilter === 'all' ? undefined : statusFilter,
                date_from: dateFrom
                    ? dateFrom.toISOString().split('T')[0]
                    : undefined,
                date_to: dateTo
                    ? dateTo.toISOString().split('T')[0]
                    : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleClearFilters = () => {
        setStatusFilter('all');
        setDateFrom(undefined);
        setDateTo(undefined);
        router.get(dashboard().url);
    };

    const columns: ColumnDef<DocumentRequest>[] = [
        {
            accessorKey: 'request_number',
            header: 'Request #',
            cell: ({ row }) => (
                <div className="font-medium">{row.original.request_number}</div>
            ),
        },
        {
            accessorKey: 'student',
            header: 'Student',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">
                        {row.original.student.user.full_name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {row.original.student.student_id}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'document_type',
            header: 'Document Type',
            cell: ({ row }) => (
                <div className="max-w-xs">
                    <div className="font-medium">
                        {row.original.document_type}
                    </div>
                    <div className="line-clamp-2 text-sm break-words whitespace-pre-wrap text-muted-foreground">
                        {row.original.purpose}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.original.status;
                const config =
                    statusConfig[status as keyof typeof statusConfig];

                // Fallback for undefined statuses
                if (!config) {
                    return (
                        <Badge className="bg-muted text-muted-foreground">
                            {status
                                .split('_')
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1),
                                )
                                .join(' ')}
                        </Badge>
                    );
                }

                const Icon = config.icon;
                return (
                    <Badge className={statusColors[status]}>
                        <Icon className="mr-1 h-3 w-3" />
                        {config.label}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'total_amount',
            header: 'Amount',
            cell: ({ row }) => (
                <div className="font-medium">
                    ₱
                    {row.original.total_amount
                        ? row.original.total_amount.toFixed(2)
                        : '0.00'}
                </div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Date Requested',
            cell: ({ row }) => (
                <div className="text-sm">
                    {new Date(row.original.created_at).toLocaleDateString()}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const request = row.original;
                const canRelease =
                    request.status === 'ready_for_claim' ||
                    request.status === 'claimed';

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>
                                Request Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(
                                        show(request.request_number).url,
                                    )
                                }
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>

                            {canRelease && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setReleaseDialog({
                                                open: true,
                                                requestNumber:
                                                    request.request_number,
                                                studentName: `${request.student.user.first_name} ${request.student.user.last_name}`,
                                            });
                                        }}
                                        className="text-green-600 focus:text-green-600"
                                    >
                                        <Package className="mr-2 h-4 w-4" />
                                        Release Document
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Registrar Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        View and manage all document requests
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Requests
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                All document requests
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Payment
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.pending_payment}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting payment
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Paid
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.paid}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Payment received
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Processing
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.processing}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Being processed
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Ready for Claim
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.ready_for_claim}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Ready to claim
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Claimed
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.claimed}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Picked up by students
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-base font-medium">
                                    Filters
                                    {hasActiveFilters && (
                                        <Badge
                                            variant="secondary"
                                            className="ml-2 text-xs"
                                        >
                                            Active
                                        </Badge>
                                    )}
                                </CardTitle>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 text-muted-foreground transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                            />
                        </div>
                    </CardHeader>

                    {isFilterOpen && (
                        <>
                            <Separator />
                            <CardContent className="pt-6">
                                <form
                                    onSubmit={handleFilterSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {/* Status Filter */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="status"
                                                className="flex items-center gap-2 text-sm font-medium"
                                            >
                                                <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                                Status
                                            </Label>
                                            <Select
                                                value={statusFilter}
                                                onValueChange={setStatusFilter}
                                            >
                                                <SelectTrigger
                                                    id="status"
                                                    className="h-10"
                                                >
                                                    <SelectValue placeholder="Select status..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        <span className="flex items-center gap-2">
                                                            All Statuses
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="pending_payment">
                                                        <span className="flex items-center gap-2">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            Pending Payment
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="payment_expired">
                                                        <span className="flex items-center gap-2">
                                                            <XCircle className="h-3.5 w-3.5" />
                                                            Payment Expired
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="paid">
                                                        <span className="flex items-center gap-2">
                                                            <DollarSign className="h-3.5 w-3.5" />
                                                            Paid
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="processing">
                                                        <span className="flex items-center gap-2">
                                                            <Package className="h-3.5 w-3.5" />
                                                            Processing
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="ready_for_claim">
                                                        <span className="flex items-center gap-2">
                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                            Ready for Claim
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="claimed">
                                                        <span className="flex items-center gap-2">
                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                            Claimed
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="released">
                                                        <span className="flex items-center gap-2">
                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                            Released
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="cancelled">
                                                        <span className="flex items-center gap-2">
                                                            <XCircle className="h-3.5 w-3.5" />
                                                            Cancelled
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="rejected">
                                                        <span className="flex items-center gap-2">
                                                            <XCircle className="h-3.5 w-3.5" />
                                                            Rejected
                                                        </span>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Date From Filter */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="date_from"
                                                className="flex items-center gap-2 text-sm font-medium"
                                            >
                                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                From Date
                                            </Label>
                                            <DatePicker
                                                date={dateFrom}
                                                onDateChange={setDateFrom}
                                                placeholder="Select start date"
                                                maxDate={dateTo}
                                            />
                                        </div>

                                        {/* Date To Filter */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="date_to"
                                                className="flex items-center gap-2 text-sm font-medium"
                                            >
                                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                To Date
                                            </Label>
                                            <DatePicker
                                                date={dateTo}
                                                onDateChange={setDateTo}
                                                placeholder="Select end date"
                                                minDate={dateFrom}
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button
                                            type="submit"
                                            size="default"
                                            className="gap-2"
                                        >
                                            <Search className="h-4 w-4" />
                                            Apply Filters
                                        </Button>
                                        {hasActiveFilters && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="default"
                                                onClick={handleClearFilters}
                                                className="gap-2"
                                            >
                                                <X className="h-4 w-4" />
                                                Clear All
                                            </Button>
                                        )}
                                        {hasActiveFilters && (
                                            <p className="text-sm text-muted-foreground">
                                                {[
                                                    statusFilter !== 'all' &&
                                                        'Status',
                                                    dateFrom && 'Start date',
                                                    dateTo && 'End date',
                                                ]
                                                    .filter(Boolean)
                                                    .join(', ')}{' '}
                                                applied
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </>
                    )}
                </Card>

                {/* Requests Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Document Requests ({requests.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            data={requests.data}
                            columns={columns}
                            filterColumn="request_number"
                            filterPlaceholder="Search by request number..."
                            emptyMessage="No document requests found. Try adjusting your filters."
                        />
                    </CardContent>
                </Card>
            </div>

            <ReleaseDocumentDialog
                open={releaseDialog.open}
                onOpenChange={(open) =>
                    setReleaseDialog({ ...releaseDialog, open })
                }
                requestNumber={releaseDialog.requestNumber}
                studentName={releaseDialog.studentName}
            />
        </AppLayout>
    );
}
