import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { show } from '@/routes/registrar/document-requests';

interface DocumentRequest {
    id: number;
    request_number: string;
    document_type: string;
    processing_type: string;
    quantity: number;
    amount: number;
    payment_method: string;
    status: string;
    payment_deadline: string;
    created_at: string;
    student: {
        student_id: string;
        phone: string;
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
        payment_method: string;
        amount: number;
        status: string;
        created_at: string;
        paymongo_payment_intent_id?: string;
        payment_reference_number?: string;
        official_receipt_number?: string;
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

const paymentStatusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
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

export default function Status({ request }: Props) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending_payment':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'paid':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'payment_expired':
                return <XCircle className="w-5 h-5 text-red-600" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-600" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-600" />;
        }
    };

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'digital':
                return 'Digital Payment (PayMongo)';
            case 'cash':
                return 'Cash Payment';
            default:
                return method;
        }
    };

    return (
        <>
            <Head title={`Payment Status - ${request.request_number}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-6">
                    <Button variant="outline" size="sm" asChild className="mr-4">
                        <Link href={show(request.id)}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Request
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Payment Status</h1>
                        <p className="text-gray-600">Request {request.request_number}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Request Summary */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    {getStatusIcon(request.status)}
                                    <span className="ml-2">Request Status</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Status:</span>
                                        <Badge className={statusColors[request.status as keyof typeof statusColors] || 'bg-gray-100'}>
                                            {request.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Document Type:</span>
                                        <span>{documentTypeLabels[request.document_type as keyof typeof documentTypeLabels] || request.document_type}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Processing Type:</span>
                                        <span className="capitalize">{request.processing_type}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Quantity:</span>
                                        <span>{request.quantity}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Amount:</span>
                                        <span className="text-xl font-bold text-green-600">₱{request.amount}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Payment Method:</span>
                                        <span>{getPaymentMethodLabel(request.payment_method)}</span>
                                    </div>

                                    {request.payment_deadline && (
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Payment Deadline:</span>
                                            <span>{new Date(request.payment_deadline).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment History */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2" />
                                    Payment History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {request.payments.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No payment records found.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {request.payments.map((payment) => (
                                            <div key={payment.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-medium">{getPaymentMethodLabel(payment.payment_method)}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(payment.created_at).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <Badge className={paymentStatusColors[payment.status as keyof typeof paymentStatusColors] || 'bg-gray-100'}>
                                                        {payment.status}
                                                    </Badge>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">Amount:</span>
                                                    <span className="text-lg font-bold">₱{payment.amount}</span>
                                                </div>

                                                {payment.paymongo_payment_intent_id && (
                                                    <div className="mt-2 text-sm text-gray-600">
                                                        <span className="font-medium">Payment Intent ID:</span> {payment.paymongo_payment_intent_id}
                                                    </div>
                                                )}

                                                {payment.payment_reference_number && (
                                                    <div className="mt-2 text-sm text-gray-600">
                                                        <span className="font-medium">Reference Number:</span> {payment.payment_reference_number}
                                                    </div>
                                                )}

                                                {payment.official_receipt_number && (
                                                    <div className="mt-2 text-sm text-gray-600">
                                                        <span className="font-medium">Official Receipt:</span> {payment.official_receipt_number}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Student Information Sidebar */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Student Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Student ID</p>
                                        <p className="font-medium">{request.student.student_id}</p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Name</p>
                                        <p className="font-medium">
                                            {request.student.user?.full_name}
                                        </p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Email</p>
                                        <p className="font-medium">{request.student.user?.email}</p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Phone</p>
                                        <p className="font-medium">{request.student.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}