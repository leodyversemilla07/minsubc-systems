import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, ArrowUpDown } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { create } from '@/routes/registrar/document-requests';
import { show } from '@/routes/registrar/document-requests';
import { edit } from '@/routes/registrar/document-requests';

interface DocumentRequest {
    id: number;
    request_number: string;
    document_type: string;
    processing_type: string;
    status: string;
    amount: number;
    created_at: string;
    student: {
        first_name: string;
        last_name: string;
        student_id: string;
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

const statusColors = {
    pending_payment: 'bg-yellow-100 text-yellow-800',
    payment_expired: 'bg-red-100 text-red-800',
    paid: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    ready_for_pickup: 'bg-green-100 text-green-800',
    released: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
};

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

export default function Index({ requests }: Props) {
    const columns: ColumnDef<DocumentRequest>[] = [
        {
            accessorKey: 'request_number',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Request #
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <span className="font-medium">{row.getValue("request_number")}</span>
            ),
        },
        {
            accessorKey: 'student',
            header: 'Student',
            cell: ({ row }) => {
                const student = row.original.student;
                return (
                    <div>
                        {student.first_name} {student.last_name}
                        <br />
                        <span className="text-sm text-gray-500">
                            {student.student_id}
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'document_type',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Document Type
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => (
                documentTypeLabels[row.getValue("document_type") as keyof typeof documentTypeLabels] || row.getValue("document_type")
            ),
        },
        {
            accessorKey: 'processing_type',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Processing
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <span className="capitalize">{row.getValue("processing_type")}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <Badge className={statusColors[row.getValue("status") as keyof typeof statusColors] || 'bg-gray-100'}>
                    {(row.getValue("status") as string).replace('_', ' ')}
                </Badge>
            ),
        },
        {
            accessorKey: 'amount',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Amount
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => `₱${row.getValue("amount")}`,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const request = row.original;
                return (
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={show(request.id)}>
                                <Eye className="w-4 h-4" />
                            </Link>
                        </Button>
                        {request.status === 'pending_payment' && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={edit(request.id)}>
                                    <Edit className="w-4 h-4" />
                                </Link>
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Head title="Document Requests" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Document Requests</h1>
                    <Button asChild>
                        <Link href={create()}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Request
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={requests.data}
                            filterColumn="request_number"
                            filterPlaceholder="Filter requests..."
                            emptyMessage="No document requests found."
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}