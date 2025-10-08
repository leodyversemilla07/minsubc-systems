import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { requests } from '@/routes/registrar/admin';
import { show } from '@/routes/registrar/document-requests';
import { statusColors } from '@/lib/status-colors';

interface DocumentRequest {
    id: number;
    request_number: string;
    status: string;
    created_at: string;
    student: {
        user: {
            first_name: string;
            last_name: string;
            full_name: string;
        };
    };
}

interface Props {
    stats: {
        pending_requests: number;
        paid_requests: number;
        processing_requests: number;
        ready_for_pickup: number;
        total_today: number;
    };
    recentRequests: DocumentRequest[];
}

export default function Dashboard({ stats, recentRequests }: Props) {
    const columns: ColumnDef<DocumentRequest>[] = [
        {
            accessorKey: 'request_number',
            header: 'Request #',
            cell: ({ row }) => (
                <span className="font-medium">{row.original.request_number}</span>
            ),
        },
        {
            accessorKey: 'student',
            header: 'Student',
            cell: ({ row }) => (
                row.original.student.user.full_name
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Badge className={statusColors[row.original.status as keyof typeof statusColors] || 'bg-muted text-muted-foreground'}>
                    {row.original.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Badge>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Created',
            cell: ({ row }) => (
                new Date(row.original.created_at).toLocaleDateString()
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <Button variant="outline" size="sm" onClick={() => router.visit(show(Number(row.original.id)))}>
                    View
                </Button>
            ),
        },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Registrar Admin Dashboard</h1>
                    <Button asChild>
                        <Link href={requests()}>
                            View All Requests
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending_requests}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Paid</CardTitle>
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.paid_requests}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Processing</CardTitle>
                            <FileText className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{stats.processing_requests}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ready for Pickup</CardTitle>
                            <Users className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.ready_for_pickup}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Today</CardTitle>
                            <AlertCircle className="h-4 w-4 text-gray-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_today}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Requests */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            data={recentRequests}
                            columns={columns}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}