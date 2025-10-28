import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    FileText,
    MessageSquare,
    User,
    XCircle,
} from 'lucide-react';

interface FOIResponse {
    id: number;
    response_text: string;
    document_path?: string;
    created_at: string;
    responder: {
        name: string;
    };
}

interface FOIRequest {
    id: number;
    title: string;
    description: string;
    request_type: string;
    purpose: string;
    status: string;
    submitted_at: string;
    reviewed_at?: string;
    rejection_reason?: string;
    created_at: string;
    responses: FOIResponse[];
    reviewer?: {
        name: string;
    };
}

interface Props {
    request: FOIRequest;
}

export default function FOIShow({ request }: Props) {
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
                return <Clock className="h-5 w-5" />;
            case 'under_review':
                return <Eye className="h-5 w-5" />;
            case 'completed':
                return <CheckCircle className="h-5 w-5" />;
            case 'rejected':
                return <XCircle className="h-5 w-5" />;
            default:
                return <FileText className="h-5 w-5" />;
        }
    };

    return (
        <USGLayout>
            <Head title={`FOI Request: ${request.title} - USG`} />

            {/* Hero Section */}
            <section className="relative bg-[var(--usg-primary)] py-20 text-white">
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            Request Details
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Freedom of Information Request
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="space-y-6">
                        {/* Status Card */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-6 w-6 text-[var(--usg-primary)]" />
                                        {request.title}
                                    </CardTitle>
                                    <Badge
                                        className={`flex items-center gap-1 ${getStatusColor(request.status)}`}
                                    >
                                        {getStatusIcon(request.status)}
                                        {getStatusLabel(request.status)}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    Request ID: #{request.id}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Request Type
                                        </p>
                                        <p className="mt-1 text-lg font-semibold">
                                            {request.request_type}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Submitted
                                        </p>
                                        <p className="mt-1 flex items-center gap-2 text-lg font-semibold">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(
                                                request.submitted_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Description
                                    </p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {request.description}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Purpose
                                    </p>
                                    <p className="mt-1 text-gray-900 dark:text-white">
                                        {request.purpose}
                                    </p>
                                </div>

                                {request.reviewer && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Reviewer
                                        </p>
                                        <p className="mt-1 flex items-center gap-2 text-lg font-semibold">
                                            <User className="h-4 w-4" />
                                            {request.reviewer.name}
                                        </p>
                                    </div>
                                )}

                                {request.rejection_reason && (
                                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                                        <p className="text-sm font-medium text-red-800 dark:text-red-300">
                                            Rejection Reason
                                        </p>
                                        <p className="mt-1 text-red-900 dark:text-red-200">
                                            {request.rejection_reason}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Responses */}
                        {request.responses && request.responses.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="h-6 w-6 text-[var(--usg-primary)]" />
                                        Responses ({request.responses.length})
                                    </CardTitle>
                                    <CardDescription>
                                        Official responses to your request
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {request.responses.map((response) => (
                                            <div
                                                key={response.id}
                                                className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <div className="mb-2 flex items-center justify-between">
                                                    <p className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        <User className="h-4 w-4" />
                                                        {
                                                            response.responder
                                                                .name
                                                        }
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(
                                                            response.created_at,
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {response.response_text}
                                                </p>
                                                {response.document_path && (
                                                    <div className="mt-2">
                                                        <a
                                                            href={
                                                                response.document_path
                                                            }
                                                            className="flex items-center gap-2 text-sm text-[var(--usg-primary)] hover:underline"
                                                        >
                                                            <FileText className="h-4 w-4" />
                                                            View attached
                                                            document
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </section>
        </USGLayout>
    );
}
