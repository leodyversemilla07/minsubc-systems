import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import USGLayout from '@/layouts/usg-layout';
import foiRoutes from '@/routes/usg/foi';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Clock, Eye, FileText, Plus, XCircle } from 'lucide-react';

interface FOIRequest {
    id: number;
    title: string;
    description: string;
    request_type: string;
    status: string;
    submitted_at: string;
    reviewed_at?: string;
    created_at: string;
}

interface Props {
    requests: FOIRequest[];
}

export default function FOIIndex({ requests }: Props) {
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

    return (
        <USGLayout>
            <Head title="My FOI Requests - USG" />

            {/* Hero Section */}
            <section className="relative bg-[var(--usg-primary)] py-20 text-white">
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            Freedom of Information Requests
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Track and manage your information requests
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                My Requests
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                {requests.length} total request
                                {requests.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <Link href={foiRoutes.create()}>
                            <Button className="bg-[var(--usg-primary)] hover:bg-[var(--usg-primary)]/90">
                                <Plus className="mr-2 h-4 w-4" />
                                New Request
                            </Button>
                        </Link>
                    </div>

                    {requests.length === 0 ? (
                        <div className="rounded-lg bg-white p-16 text-center shadow-sm dark:bg-gray-900">
                            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-[var(--usg-light)] p-6">
                                <FileText className="h-12 w-12 text-[var(--usg-primary)]" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                No requests yet
                            </h3>
                            <p className="mx-auto mb-6 max-w-md text-lg text-gray-600 dark:text-gray-300">
                                Submit your first Freedom of Information request
                                to get started.
                            </p>
                            <Link href={foiRoutes.create()}>
                                <Button className="bg-[var(--usg-primary)] hover:bg-[var(--usg-primary)]/90">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Request
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    {request.title}
                                                </h3>
                                                <Badge
                                                    className={`flex items-center gap-1 ${getStatusColor(request.status)}`}
                                                >
                                                    {getStatusIcon(
                                                        request.status,
                                                    )}
                                                    {getStatusLabel(
                                                        request.status,
                                                    )}
                                                </Badge>
                                            </div>
                                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                                {request.description}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span>
                                                    Type:{' '}
                                                    <span className="font-medium">
                                                        {request.request_type}
                                                    </span>
                                                </span>
                                                <span>
                                                    Submitted:{' '}
                                                    <span className="font-medium">
                                                        {new Date(
                                                            request.submitted_at,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <Link href={foiRoutes.show(request.id)}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="mr-2 h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </USGLayout>
    );
}
