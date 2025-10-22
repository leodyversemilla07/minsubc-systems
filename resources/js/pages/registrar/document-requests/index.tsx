import { DataTable } from '@/components/data-table';
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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { statusColors } from '@/lib/status-colors';
import {
    create,
    edit,
    index,
    show,
} from '@/routes/registrar/document-requests';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import {
    ArrowUpDown,
    CreditCard,
    Download,
    Eye,
    FileText,
    Filter,
    HelpCircle,
    MoreVertical,
    Package,
    Plus,
    Search,
    TrendingUp,
    Users,
    X,
} from 'lucide-react';

interface DocumentRequest {
    id: number;
    request_number: string;
    document_type: string;
    processing_type: string;
    status: string;
    amount: number;
    created_at: string;
    student: {
        student_id: string;
        user: {
            first_name: string;
            last_name: string;
            full_name: string;
        };
    };
}

interface Props {
    requests: {
        data: DocumentRequest[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const documentTypeLabels = {
    coe: 'Certificate of Enrollment',
    cog: 'Certificate of Grades',
    tor: 'Transcript of Records',
    honorable_dismissal: 'Honorable Dismissal',
    certificate_good_moral: 'Certificate of Good Moral',
    cav: 'Certificate of Authentication',
    diploma: 'Diploma',
    so: 'Special Order',
    form_137: 'Form 137',
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Document Requests',
        href: index().url,
    },
];

export default function Index({ requests }: Props) {
    // Filter states - only for student's own requests
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Calculate statistics for student's own requests only
    const stats = {
        total: requests.total,
        pendingPayment: requests.data.filter(r => r.status === 'pending_payment').length,
        processing: requests.data.filter(r => r.status === 'processing').length,
        readyForClaim: requests.data.filter(r => r.status === 'ready_for_claim').length,
        claimed: requests.data.filter(r => r.status === 'claimed').length,
    };

    // Filter data based on current filters
    const filteredData = requests.data.filter((request) => {
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        const matchesSearch = searchQuery === '' ||
            request.request_number.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    const clearFilters = () => {
        setStatusFilter('all');
        setSearchQuery('');
    };

    const columns: ColumnDef<DocumentRequest>[] = [
        {
            accessorKey: 'request_number',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Request #
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <span className="font-medium">
                    {row.getValue('request_number')}
                </span>
            ),
        },
        {
            accessorKey: 'document_type',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Document Type
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) =>
                documentTypeLabels[
                    row.getValue(
                        'document_type',
                    ) as keyof typeof documentTypeLabels
                ] || row.getValue('document_type'),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Status
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <Badge
                    className={
                        statusColors[
                            row.getValue('status') as keyof typeof statusColors
                        ] || 'bg-muted text-muted-foreground'
                    }
                >
                    {(row.getValue('status') as string)
                        .split('_')
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ')}
                </Badge>
            ),
        },
        {
            accessorKey: 'amount',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Amount
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => `₱${row.getValue('amount')}`,
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Date Requested
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => new Date(row.getValue('created_at') as string).toLocaleDateString(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const request = row.original;
                const canPay = request.status === 'pending_payment';
                const canClaim = request.status === 'ready_for_claim';

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 touch-manipulation"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="text-xs">
                                Request #{request.request_number}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(
                                        show(request.request_number).url,
                                    )
                                }
                                className="cursor-pointer touch-manipulation"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>

                            {canPay && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.visit(
                                                edit(request.request_number)
                                                    .url,
                                            )
                                        }
                                        className="cursor-pointer touch-manipulation"
                                    >
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Make Payment
                                    </DropdownMenuItem>
                                </>
                            )}

                            {canClaim && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.visit(
                                                show(request.request_number).url + '?action=claim',
                                            )
                                        }
                                        className="cursor-pointer touch-manipulation text-green-600 focus:text-green-600"
                                    >
                                        <Package className="mr-2 h-4 w-4" />
                                        Claim Document
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
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Document Requests" />

            <div className="flex-1 space-y-6 md:space-y-8 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                            Document Requests
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Manage and track all document requests
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="sm" className="w-full sm:w-auto touch-manipulation">
                                    <Download className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Export Data</span>
                                    <span className="sm:hidden">Export</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Export requests to CSV or PDF format</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button asChild size="sm" className="w-full sm:w-auto touch-manipulation">
                                    <Link href={create()}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">New Request</span>
                                        <span className="sm:hidden">New</span>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Create a new document request</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                {/* Statistics Dashboard - Student View */}
                <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="transition-all hover:shadow-md cursor-help touch-manipulation">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 md:px-6 md:py-4">
                                    <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">
                                        My Requests
                                    </CardTitle>
                                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                                </CardHeader>
                                <CardContent className="px-4 pb-3 md:px-6 md:pb-4">
                                    <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Total requests
                                    </p>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Total number of your document requests</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="transition-all hover:shadow-md cursor-help touch-manipulation">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 md:px-6 md:py-4">
                                    <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">
                                        Pending Payment
                                    </CardTitle>
                                    <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                                </CardHeader>
                                <CardContent className="px-4 pb-3 md:px-6 md:pb-4">
                                    <div className="text-xl sm:text-2xl font-bold text-orange-600">
                                        {stats.pendingPayment}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Awaiting payment
                                    </p>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Requests waiting for your payment</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="transition-all hover:shadow-md cursor-help touch-manipulation">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 md:px-6 md:py-4">
                                    <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">
                                        Processing
                                    </CardTitle>
                                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                                </CardHeader>
                                <CardContent className="px-4 pb-3 md:px-6 md:pb-4">
                                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                                        {stats.processing}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Currently processing
                                    </p>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Requests currently being prepared</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="transition-all hover:shadow-md cursor-help touch-manipulation">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 md:px-6 md:py-4">
                                    <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">
                                        Ready to Claim
                                    </CardTitle>
                                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                                </CardHeader>
                                <CardContent className="px-4 pb-3 md:px-6 md:pb-4">
                                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                                        {stats.readyForClaim}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Available for pickup
                                    </p>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Documents ready for you to claim</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Simple Filters - Student View */}
                <Card className="transition-all hover:shadow-md">
                    <CardHeader className="pb-3 md:pb-4 px-4 py-3 md:px-6 md:py-4">
                        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                            <Filter className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                            Filter My Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 px-4 pb-4 md:px-6 md:pb-6">
                        <div className="flex flex-col gap-4">
                            {/* Search - Full width on mobile */}
                            <div className="w-full">
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                    Search My Requests
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by request number..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 h-10 md:h-9"
                                    />
                                </div>
                            </div>

                            {/* Status Filter - Simplified for students */}
                            <div className="w-full max-w-xs">
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                                    Filter by Status
                                </label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="h-10 md:h-9">
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All My Requests</SelectItem>
                                        <SelectItem value="pending_payment">Pending Payment</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="ready_for_claim">Ready for Claim</SelectItem>
                                        <SelectItem value="claimed">Claimed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {(statusFilter !== 'all' || searchQuery) && (
                            <>
                                <Separator />
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-sm text-muted-foreground">Active filters:</span>
                                    {searchQuery && (
                                        <Badge variant="secondary" className="gap-1 text-xs">
                                            Search: "{searchQuery}"
                                            <X
                                                className="h-3 w-3 cursor-pointer touch-manipulation"
                                                onClick={() => setSearchQuery('')}
                                            />
                                        </Badge>
                                    )}
                                    {statusFilter !== 'all' && (
                                        <Badge variant="secondary" className="gap-1 text-xs">
                                            Status: {statusFilter.split('_').map(word =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}
                                            <X
                                                className="h-3 w-3 cursor-pointer touch-manipulation"
                                                onClick={() => setStatusFilter('all')}
                                            />
                                        </Badge>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="h-6 px-2 text-xs touch-manipulation"
                                    >
                                        Clear all
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Requests Table */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">All Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            filterColumn="request_number"
                            filterPlaceholder="Filter requests..."
                            emptyMessage="No document requests found matching your filters."
                        />
                    </CardContent>
                </Card>

                {/* Help Section - Student Focused */}
                <Card className="transition-all hover:shadow-md">
                    <CardHeader className="pb-3 md:pb-4 px-4 py-3 md:px-6 md:py-4">
                        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                            <HelpCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                            How to Use This Page
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-semibold text-primary">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">View Your Requests</h4>
                                        <p className="text-xs text-muted-foreground">
                                            See all your document requests and their current status in the table below.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-semibold text-primary">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Make Payments</h4>
                                        <p className="text-xs text-muted-foreground">
                                            For requests pending payment, click the actions menu and select "Make Payment".
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-semibold text-primary">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Track Progress</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Monitor your request status from pending payment to ready for claim.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                                        <span className="text-xs font-semibold text-primary">4</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Claim Documents</h4>
                                        <p className="text-xs text-muted-foreground">
                                            When ready, visit the Registrar's Office to pick up your completed documents.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Need help? Contact the Registrar's Office during business hours for assistance with your requests.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
        </TooltipProvider>
    );
}
