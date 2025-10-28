import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import foiRoutes from '@/routes/usg/admin/foi';
import { Head, useForm } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle,
    Clock,
    Eye,
    FileText,
    MessageSquare,
    Send,
    StickyNote,
    User,
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
    internal_notes?: string;
    created_at: string;
    user: User;
    reviewer?: Reviewer;
    responses: FOIResponse[];
}

interface Props {
    request: FOIRequest;
}

export default function FOIAdminShow({ request }: Props) {
    const statusForm = useForm({
        status: request.status,
        rejection_reason: '',
    });

    const responseForm = useForm({
        response_text: '',
        document: null as File | null,
    });

    const notesForm = useForm({
        internal_notes: request.internal_notes || '',
    });

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

    const handleStatusUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        statusForm.post(foiRoutes.updateStatus(request.id).url, {
            preserveScroll: true,
            onSuccess: () => statusForm.reset(),
        });
    };

    const handleAddResponse = (e: React.FormEvent) => {
        e.preventDefault();
        responseForm.post(foiRoutes.addResponse(request.id).url, {
            preserveScroll: true,
            onSuccess: () => responseForm.reset(),
        });
    };

    const handleUpdateNotes = (e: React.FormEvent) => {
        e.preventDefault();
        notesForm.post(foiRoutes.updateNotes(request.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title={`FOI Request: ${request.title} - Admin`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            FOI Request Details
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Request ID: #{request.id}
                        </p>
                    </div>
                    <Badge
                        className={`flex items-center gap-1 text-base ${getStatusColor(request.status)}`}
                    >
                        {getStatusIcon(request.status)}
                        {getStatusLabel(request.status)}
                    </Badge>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Request Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-6 w-6 text-[var(--usg-primary)]" />
                                    {request.title}
                                </CardTitle>
                                <CardDescription>
                                    Submitted by {request.user.name} on{' '}
                                    {new Date(
                                        request.submitted_at,
                                    ).toLocaleDateString()}
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
                                            Requester Email
                                        </p>
                                        <p className="mt-1 text-lg font-semibold">
                                            {request.user.email}
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
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-6 w-6 text-[var(--usg-primary)]" />
                                    Responses ({request.responses.length})
                                </CardTitle>
                                <CardDescription>
                                    Official responses to this request
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {request.responses.length > 0 && (
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
                                )}

                                {/* Add Response Form */}
                                <form
                                    onSubmit={handleAddResponse}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="response_text">
                                            Add Response
                                        </Label>
                                        <Textarea
                                            id="response_text"
                                            value={
                                                responseForm.data.response_text
                                            }
                                            onChange={(e) =>
                                                responseForm.setData(
                                                    'response_text',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Write your response here..."
                                            rows={4}
                                        />
                                        {responseForm.errors.response_text && (
                                            <p className="text-sm text-red-500">
                                                {
                                                    responseForm.errors
                                                        .response_text
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={responseForm.processing}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        {responseForm.processing
                                            ? 'Sending...'
                                            : 'Send Response'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Update Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Update Status</CardTitle>
                                <CardDescription>
                                    Change the request status
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleStatusUpdate}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={statusForm.data.status}
                                            onValueChange={(value) =>
                                                statusForm.setData(
                                                    'status',
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
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

                                    {statusForm.data.status === 'rejected' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="rejection_reason">
                                                Rejection Reason
                                            </Label>
                                            <Textarea
                                                id="rejection_reason"
                                                value={
                                                    statusForm.data
                                                        .rejection_reason
                                                }
                                                onChange={(e) =>
                                                    statusForm.setData(
                                                        'rejection_reason',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Explain why this request is being rejected..."
                                                rows={3}
                                            />
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={statusForm.processing}
                                    >
                                        {statusForm.processing
                                            ? 'Updating...'
                                            : 'Update Status'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Internal Notes */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <StickyNote className="h-5 w-5" />
                                    Internal Notes
                                </CardTitle>
                                <CardDescription>
                                    Private notes for staff only
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleUpdateNotes}
                                    className="space-y-4"
                                >
                                    <Textarea
                                        value={notesForm.data.internal_notes}
                                        onChange={(e) =>
                                            notesForm.setData(
                                                'internal_notes',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Add internal notes..."
                                        rows={6}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={notesForm.processing}
                                    >
                                        {notesForm.processing
                                            ? 'Saving...'
                                            : 'Save Notes'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Request Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Request Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <p className="font-medium text-gray-500 dark:text-gray-400">
                                        Requester
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-900 dark:text-white">
                                        <User className="h-4 w-4" />
                                        {request.user.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500 dark:text-gray-400">
                                        Submitted
                                    </p>
                                    <p className="flex items-center gap-2 text-gray-900 dark:text-white">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(
                                            request.submitted_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                {request.reviewer && (
                                    <div>
                                        <p className="font-medium text-gray-500 dark:text-gray-400">
                                            Reviewer
                                        </p>
                                        <p className="text-gray-900 dark:text-white">
                                            {request.reviewer.name}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
