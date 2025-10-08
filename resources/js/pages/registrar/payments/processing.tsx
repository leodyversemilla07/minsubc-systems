import { Head as InertiaHead } from '@inertiajs/react';
import { Clock, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { index, show } from '@/routes/registrar/document-requests';

interface PaymentProcessingProps {
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
        payments: Array<{
            id: number;
            amount: number;
            paymongo_payment_method: string;
            status: string;
        }>;
    };
}

export default function PaymentProcessing({ request }: PaymentProcessingProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Document Requests', href: index().url },
        { title: `Request ${request.request_number}`, href: show(request.id).url },
        { title: 'Payment Processing', href: '#' },
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

    const latestPayment = request.payments[0]; // Assuming payments are ordered by latest first

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <InertiaHead title="Payment Processing" />

            <div className="flex flex-col space-y-8 p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Processing Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <Clock className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Processing</h1>
                        <p className="text-gray-600">
                            We're processing your payment. This usually takes just a few moments.
                        </p>
                    </div>

                    {/* Request Details */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Document Request Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Request Number</p>
                                    <p className="text-lg font-semibold">{request.request_number}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                        Processing Payment
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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
                    {latestPayment && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Amount</p>
                                        <p className="text-2xl font-bold text-blue-600">₱{latestPayment.amount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Payment Method</p>
                                        <p className="font-medium">{getPaymentMethodLabel(latestPayment.paymongo_payment_method)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Payment Status</p>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        {latestPayment.status === 'pending' ? 'Processing' : latestPayment.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Student Information */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Student Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
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

                    {/* What to expect */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>What to expect</CardTitle>
                            <CardDescription>
                                Your payment is being verified by our payment processor.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Payment confirmation usually takes 1-3 minutes</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>You will be automatically redirected once payment is confirmed</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>If you don't receive confirmation within 10 minutes, please contact support</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex gap-4 justify-center">
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                        >
                            Check Status
                        </Button>
                        <Button variant="outline" asChild>
                            <a href={show(request.id).url}>
                                View Request Details
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="/dashboard">
                                Back to Dashboard
                            </a>
                        </Button>
                    </div>

                    {/* Auto-refresh notice */}
                    <p className="text-center text-xs text-gray-500 mt-4">
                        This page will automatically update when payment is confirmed.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}