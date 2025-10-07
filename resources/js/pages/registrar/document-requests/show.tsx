import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Printer, Download } from 'lucide-react';
import { index } from '@/routes/registrar/document-requests';
import { edit } from '@/routes/registrar/document-requests';

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
    certificate_good_moral: 'Certificate of Good Moral Character',
    cav: 'Certificate of Authentication and Verification',
    diploma: 'Diploma (Certified True Copy)',
    so: 'Special Order',
    form_137: 'Form 137',
};

export default function Show({ request }: Props) {
    return (
        <>
            <Head title={`Document Request ${request.request_number}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <Button variant="outline" size="sm" asChild className="mr-4">
                            <Link href={index()}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">Request {request.request_number}</h1>
                            <p className="text-gray-600">Document Request Details</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {request.status === 'pending_payment' && (
                            <Button variant="outline" asChild>
                                <Link href={edit(request.id)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Link>
                            </Button>
                        )}
                        <Button variant="outline">
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                        </Button>
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Request Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Request Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Request Number</label>
                                        <p className="text-lg font-semibold">{request.request_number}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <Badge className={statusColors[request.status as keyof typeof statusColors] || 'bg-gray-100'}>
                                                {request.status.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Document Type</label>
                                        <p>{documentTypeLabels[request.document_type as keyof typeof documentTypeLabels] || request.document_type}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Processing Type</label>
                                        <p className="capitalize">{request.processing_type}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Quantity</label>
                                        <p>{request.quantity}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Amount</label>
                                        <p className="text-lg font-semibold text-green-600">₱{request.amount}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <label className="text-sm font-medium text-gray-500">Purpose</label>
                                    <p className="mt-1">{request.purpose}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Created</label>
                                        <p>{new Date(request.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                        <p>{new Date(request.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {request.payments.length > 0 ? (
                                    <div className="space-y-4">
                                        {request.payments.map((payment) => (
                                            <div key={payment.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium">₱{payment.amount}</p>
                                                        <p className="text-sm text-gray-500 capitalize">
                                                            {payment.payment_method} • {payment.status}
                                                        </p>
                                                    </div>
                                                    <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                                                        {payment.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    {new Date(payment.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No payments recorded yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Student Information Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Student Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Student ID</label>
                                    <p className="font-semibold">{request.student.student_id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Name</label>
                                    <p>{request.student.user?.full_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                    <p className="text-sm">{request.student.user?.email}</p>
                                </div>
                                {request.student.phone && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Phone</label>
                                        <p className="text-sm">{request.student.phone}</p>
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Course</label>
                                    <p className="text-sm">{request.student.course}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Year Level</label>
                                    <p className="text-sm">{request.student.year_level}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {request.notifications.length > 0 ? (
                                    <div className="space-y-3">
                                        {request.notifications.map((notification) => (
                                            <div key={notification.id} className="border-l-4 border-blue-500 pl-4">
                                                <p className="text-sm font-medium">{notification.type}</p>
                                                <p className="text-sm text-gray-600">{notification.message}</p>
                                                <p className="text-xs text-gray-400">
                                                    {notification.sent_at ? new Date(notification.sent_at).toLocaleString() : 'Not sent'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No notifications sent yet.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}