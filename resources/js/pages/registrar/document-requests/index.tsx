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
import { ArrowUpDown, Edit, Eye, MoreVertical, Plus } from 'lucide-react';

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
            accessorKey: 'student',
            header: 'Student',
            cell: ({ row }) => {
                const student = row.original.student;
                return (
                    <div>
                        {student.user.full_name}
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
            accessorKey: 'processing_type',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Processing
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <span className="capitalize">
                    {row.getValue('processing_type')}
                </span>
            ),
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
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const request = row.original;
                const canEdit = request.status === 'pending_payment';

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

                            {canEdit && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() =>
                                            router.visit(
                                                edit(request.request_number)
                                                    .url,
                                            )
                                        }
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Request
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
            <Head title="Document Requests" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Document Requests
                        </h1>
                        <p className="text-muted-foreground">
                            Manage and track all document requests
                        </p>
                    </div>
                    <Button asChild className="w-full sm:w-auto">
                        <Link href={create()}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Request
                        </Link>
                    </Button>
                </div>

                {/* Requests Table */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">All Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
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
        </AppLayout>
    );
}
