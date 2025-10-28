import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import foiRoutes from '@/routes/usg/admin/foi';
import { Head, Link, router } from '@inertiajs/react';
import {
    CheckCircle,
    Clock,
    Eye,
    FileText,
    Filter,
    XCircle,
} from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Reviewer {
    id: number;
    name: string;
}

interface FOIRequest {
    id: number;
    title: string;
    description: string;
    request_type: string;
    status: string;
    submitted_at: string;
    reviewed_at?: string;
    created_at: string;
    user: User;
    reviewer?: Reviewer;
}

interface PaginatedData {
    data: FOIRequest[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    requests: PaginatedData;
    filters: {
        status?: string;
    };
}

export default function FOIAdminIndex({ requests, filters }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'under_review':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'under_review':
                return 'Under Review';
            case 'completed':
                return 'Completed';
            case 'rejected':
                return 'Rejected';
            default:
                return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'under_review':
                return <Eye className="h-4 w-4" />;
            case 'completed':
                return <CheckCircle className="h-4 w-4" />;
            case 'rejected':
                return <XCircle className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const handleFilterChange = (status: string) => {
        router.get(
            foiRoutes.index({ query: status === 'all' ? {} : { status } }),
            {},
            { preserveState: true },
        );
    };

    return (
        <AppLayout>
            <Head title="FOI Requests - Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            FOI Requests
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage Freedom of Information requests
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Requests
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {requests.total}
                                </p>
                            </div>
                            <FileText className="h-8 w-8 text-gray-400" />
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Pending
                                </p>
                                <p className="mt-2 text-3xl font-bold text-yellow-600">
                                    {
                                        requests.data.filter(
                                            (r) => r.status === 'pending',
                                        ).length
                                    }
                                </p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-400" />
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Under Review
                                </p>
                                <p className="mt-2 text-3xl font-bold text-blue-600">
                                    {
                                        requests.data.filter(
                                            (r) => r.status === 'under_review',
                                        ).length
                                    }
                                </p>
                            </div>
                            <Eye className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Completed
                                </p>
                                <p className="mt-2 text-3xl font-bold text-green-600">
                                    {
                                        requests.data.filter(
                                            (r) => r.status === 'completed',
                                        ).length
                                    }
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-center gap-4">
                        <Filter className="h-5 w-5 text-gray-400" />
                        <Select
                            value={filters.status || 'all'}
                            onValueChange={handleFilterChange}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Requests
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="under_review">
                                    Under Review
                                </SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                                <SelectItem value="rejected">
                                    Rejected
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    {requests.data.length === 0 ? (
                        <div className="p-16 text-center">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No requests found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {filters.status
                                    ? 'No requests match the selected filter.'
                                    : 'No FOI requests have been submitted yet.'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                            Request
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                            Requester
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                            Submitted
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {requests.data.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {request.title}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    #{request.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {request.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {request.user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {request.request_type}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    className={`flex w-fit items-center gap-1 ${getStatusColor(request.status)}`}
                                                >
                                                    {getStatusIcon(
                                                        request.status,
                                                    )}
                                                    {getStatusLabel(
                                                        request.status,
                                                    )}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                {new Date(
                                                    request.submitted_at,
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={foiRoutes.show(
                                                        request.id,
                                                    )}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
