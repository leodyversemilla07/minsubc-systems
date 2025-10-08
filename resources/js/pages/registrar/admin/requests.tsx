import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Search, Filter, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { dashboard } from '@/routes/registrar/admin';

interface DocumentRequest {
    id: number;
    request_number: string;
    status: 'pending_payment' | 'paid' | 'processing' | 'ready_for_pickup' | 'released' | 'cancelled';
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
}

const statusConfig = {
    pending_payment: { label: 'Pending Payment', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    paid: { label: 'Paid', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    processing: { label: 'Processing', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
    ready_for_pickup: { label: 'Ready for Pickup', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    released: { label: 'Released', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function Requests({ requests, filters }: RequestsProps) {
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
                    <div className="font-medium">{row.original.student.user.full_name}</div>
                    <div className="text-sm text-muted-foreground">{row.original.student.student_id}</div>
                </div>
            ),
        },
        {
            accessorKey: 'document_type',
            header: 'Document Type',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.document_type}</div>
                    <div className="text-sm text-muted-foreground">{row.original.purpose}</div>
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const config = statusConfig[row.original.status];
                const Icon = config.icon;
                return (
                    <Badge className={config.color}>
                        <Icon className="w-3 h-3 mr-1" />
                        {config.label}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'total_amount',
            header: 'Amount',
            cell: ({ row }) => (
                <div className="font-medium">₱{row.original.total_amount.toFixed(2)}</div>
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
            cell: ({ row }) => (
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/registrar/document-requests/${row.original.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                    </Link>
                </Button>
            ),
        },
    ];

    return (
        <>
            <Head title="Manage Requests" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <Button variant="outline" size="sm" asChild className="mr-4">
                            <Link href={dashboard()}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold">Manage Document Requests</h1>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Filter className="w-5 h-5 mr-2" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select defaultValue={filters.status || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Statuses</SelectItem>
                                        <SelectItem value="pending_payment">Pending Payment</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="ready_for_pickup">Ready for Pickup</SelectItem>
                                        <SelectItem value="released">Released</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="date_from">From Date</Label>
                                <Input
                                    id="date_from"
                                    type="date"
                                    defaultValue={filters.date_from || ''}
                                />
                            </div>
                            <div>
                                <Label htmlFor="date_to">To Date</Label>
                                <Input
                                    id="date_to"
                                    type="date"
                                    defaultValue={filters.date_to || ''}
                                />
                            </div>
                            <div className="flex items-end">
                                <Button type="submit" className="w-full">
                                    <Search className="w-4 h-4 mr-2" />
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Requests Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Document Requests ({requests.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            data={requests.data}
                            columns={columns}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}