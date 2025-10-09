import { Head as InertiaHead } from '@inertiajs/react';
import { CheckCircle, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { index } from '@/routes/registrar/document-requests';

interface PaymentSuccessProps {
    request: {
        id: number;
        request_number: string;
        document_type: string;
        processing_type: string;
        status: string;
        student: {
            student_id: string;
            user: {
                name: string;
                email: string;
            };
        };
    };
    payment: {
        id: number;
        amount: number;
        paymongo_payment_method: string;
        paid_at: string;
    };
}

export default function PaymentSuccess({ request, payment }: PaymentSuccessProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Document Requests', href: index().url },
        { title: `Request ${request.request_number}`, href: '#' },
        { title: 'Payment Success', href: '#' },
    ];
    const getDocumentTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            coe: 'Certificate of Enrollment',
            cog: 'Certificate of Grades',
            tor: 'Transcript of Records',
            honorable_dismissal: 'Honorable Dismissal',
            cav: 'Certificate of Authentication and Verification',
            diploma: 'Diploma (Certified True Copy)',
        };
        return types[type] || type;
    };

    const getPaymentMethodLabel = (method: string) => {
        const methods: Record<string, string> = {
            card: 'Credit/Debit Card',
            gcash: 'GCash',
            maya: 'Maya',
            grab_pay: 'GrabPay',
        };
        return methods[method] || method;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <InertiaHead title="Payment Successful" />

            <div className="flex flex-col space-y-8 p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Success Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                        <p className="text-gray-600">
                            Your payment has been processed successfully. Your document request is now being processed.
                        </p>
                    </div>

                    {/* Payment Details */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Document Request Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Request Number</p>
                                    <p className="text-lg font-semibold">{request.request_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        Paid
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Document Type</p>
                                    <p className="font-medium">{getDocumentTypeLabel(request.document_type)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Processing Type</p>
                                    <p className="font-medium capitalize">{request.processing_type}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Amount Paid</p>
                                    <p className="text-2xl font-bold text-green-600">₱{payment.amount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Payment Method</p>
                                    <p className="font-medium">{getPaymentMethodLabel(payment.paymongo_payment_method)}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Payment Date</p>
                                <p className="font-medium">{new Date(payment.paid_at).toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Student Information */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Student Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Student ID</p>
                                    <p className="font-medium">{request.student.student_id}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Name</p>
                                    <p className="font-medium">{request.student.user.name}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Email</p>
                                <p className="font-medium">{request.student.user.email}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>What happens next?</CardTitle>
                            <CardDescription>
                                Your document request is now in the processing queue.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                                <li>Our registrar staff will process your document (5-7 working days for regular, 2-3 days for rush)</li>
                                <li>You will receive an email/SMS notification when your document is ready for pickup</li>
                                <li>Visit the Registrar's Office with your valid ID to claim your document</li>
                                <li>Present this payment confirmation and your student ID</li>
                            </ol>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex gap-4 justify-center">
                        <Button asChild>
                            <a href={index().url}>
                                View My Requests
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="/dashboard">
                                Back to Dashboard
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}