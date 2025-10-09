import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Download, FileCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/registrar/admin';
import { type BreadcrumbItem } from '@/types';
import { statusColors } from '@/lib/status-colors';

interface DocumentRequest {
    id: number;
    request_number: string;
    document_type: string;
    processing_type: string;
    quantity: number;
    purpose: string;
    amount: number;
    payment_method: string;
    status: string;
    payment_deadline: string;
    created_at: string;
    updated_at: string;
    student: {
        student_id: string;
        phone: string;
        course: string;
        year_level: number;
        user?: {
            first_name: string;
            middle_name?: string;
            last_name: string;
            email: string;
            full_name: string;
        };
    };
    payments: Array<{
        id: number;
        amount: number;
        payment_method: string;
        status: string;
        created_at: string;
    }>;
    notifications: Array<{
        id: number;
        type: string;
        message: string;
        sent_at: string;
    }>;
}

interface Props {
    request: DocumentRequest;
}

const documentTypeLabels: Record<string, string> = {
    coe: 'Certificate of Enrollment',
    cog: 'Certificate of Grades',
    tor: 'Transcript of Records',
    honorable_dismissal: 'Honorable Dismissal',
    certificate_good_moral: 'Certificate of Good Moral Character',
    cav: 'Certificate of Authentication and Verification',
    diploma: 'Diploma (Certified True Copy)',
    so: 'Special Order',
    form_137: 'Form 137',
};

export default function Show({ request }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: dashboard().url,
        },
        {
            title: `Request ${request.request_number}`,
            href: '#',
        },
    ];

    const canGenerate = request.status === 'paid' || request.status === 'processing';
    const canDownload = request.status === 'ready_for_pickup' || request.status === 'released';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Document Request ${request.request_number}`} />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Request {request.request_number}
                        </h1>
                        <p className="text-muted-foreground">
                            Document Request Details
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                        {canGenerate && (
                            <Button 
                                variant="default"
                                onClick={() => {
                                    if (confirm('Generate document for this request?')) {
                                        window.location.href = `/admin/requests/${request.request_number}/generate`;
                                    }
                                }}
                            >
                                <FileCheck className="w-4 h-4 mr-2" />
                                Generate Document
                            </Button>
                        )}
                        {canDownload && (
                            <Button 
                                variant="default"
                                onClick={() => {
                                    window.location.href = `/admin/requests/${request.request_number}/download`;
                                }}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Request Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Request Information</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Request Number</Label>
                                        <p className="text-lg font-semibold">{request.request_number}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                                        <div className="mt-1">
                                            <Badge className={statusColors[request.status as keyof typeof statusColors] || 'bg-muted text-muted-foreground'}>
                                                {request.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Document Type</Label>
                                        <p>{documentTypeLabels[request.document_type] || request.document_type}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Processing Type</Label>
                                        <p className="capitalize">{request.processing_type}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Quantity</Label>
                                        <p>{request.quantity}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Amount</Label>
                                        <p className="text-lg font-semibold text-success">₱{request.amount}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Purpose</Label>
                                    <p className="mt-1">{request.purpose}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Created</Label>
                                        <p>{new Date(request.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Last Updated</Label>
                                        <p>{new Date(request.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Information */}
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                {request.payments.length > 0 ? (
                                    <div className="space-y-4">
                                        {request.payments.map((payment) => (
                                            <div key={payment.id} className="border rounded-lg p-4 transition-colors hover:bg-muted/50">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium">₱{payment.amount}</p>
                                                        <p className="text-sm text-muted-foreground capitalize">
                                                            {payment.payment_method.replace('_', ' ')} • {payment.status.replace('_', ' ')}
                                                        </p>
                                                    </div>
                                                    <Badge 
                                                        variant={payment.status === 'paid' ? 'default' : 'secondary'}
                                                        className={payment.status === 'paid' ? 'bg-green-600' : ''}
                                                    >
                                                        {payment.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {new Date(payment.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No payments recorded yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Student Information Sidebar */}
                    <div className="space-y-6">
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Student Information</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 space-y-3">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Student ID</Label>
                                    <p className="font-semibold">{request.student.student_id}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                                    <p>{request.student.user?.full_name || 'Not available'}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                                    <p className="text-sm">{request.student.user?.email || 'Not available'}</p>
                                </div>
                                {request.student.phone && (
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                                        <p className="text-sm">{request.student.phone}</p>
                                    </div>
                                )}
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Course</Label>
                                    <p className="text-sm">{request.student.course}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Year Level</Label>
                                    <p className="text-sm">{request.student.year_level}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Notifications</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                {request.notifications.length > 0 ? (
                                    <div className="space-y-3">
                                        {request.notifications.map((notification) => (
                                            <div key={notification.id} className="border rounded-lg p-3 transition-colors hover:bg-muted/50">
                                                <div className="flex items-start gap-3">
                                                    <Badge variant="outline" className="uppercase shrink-0">
                                                        {notification.type}
                                                    </Badge>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm leading-relaxed break-words">{notification.message}</p>
                                                        <p className="text-xs text-muted-foreground mt-2">
                                                            {notification.sent_at ? new Date(notification.sent_at).toLocaleString() : 'Pending'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No notifications sent yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
