import { Head, Link, Form, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { CreditCard, Banknote, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { show } from '@/routes/registrar/document-requests';
import { initiate, cash } from '@/routes/registrar/payments';
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
}

interface Props {
    request: DocumentRequest;
}

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

export default function PaymentMethod({ request }: Props) {
    const page = usePage();
    const flash = page.props.flash as any;
    const payment_reference = flash?.payment_reference;
    const payment_amount = flash?.payment_amount;
    const payment_deadline = flash?.payment_deadline;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Document Requests',
            href: '/registrar/document-requests',
        },
        {
            title: `Request ${request.request_number}`,
            href: show(request.id).url,
        },
        {
            title: 'Select Payment Method',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Payment Method - ${request.request_number}`} />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Select Payment Method
                        </h1>
                        <p className="text-muted-foreground">
                            Choose how you would like to pay for your document request
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={show(request.id)}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Request
                        </Link>
                    </Button>
                </div>

                {/* Request Summary */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Request Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Request Number</Label>
                                <p className="font-semibold">{request.request_number}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Document Type</Label>
                                <p>{documentTypeLabels[request.document_type as keyof typeof documentTypeLabels] || request.document_type}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                                <Badge className={statusColors[request.status as keyof typeof statusColors] || 'bg-muted text-muted-foreground'}>
                                    {request.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </Badge>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Amount</Label>
                                <p className="text-lg font-semibold text-success">₱{request.amount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Method Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Online Payment */}
                    <Card className="transition-shadow hover:shadow-md border-2 hover:border-primary/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 text-primary" />
                                Online Payment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            <div className="space-y-2">
                                <h4 className="font-medium">Pay instantly online</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• E-wallets (GCash, Maya, GrabPay)</li>
                                    <li>• Credit/Debit Cards (Visa, Mastercard, JCB)</li>
                                    <li>• Online Banking (BPI, BDO, UnionBank)</li>
                                    <li>• Over-the-Counter (7-Eleven, Cebuana)</li>
                                </ul>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-lg">
                                <p className="text-sm">
                                    <span className="font-medium">Processing Fee:</span> 2.5% + ₱15
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Total: ₱{(request.amount + (request.amount * 0.025) + 15).toFixed(2)}
                                </p>
                            </div>
                            <Form action={initiate(request.id).url} method="post">
                                {({ processing }) => (
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? 'Processing...' : 'Pay Online Now'}
                                    </Button>
                                )}
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Cash Payment */}
                    <Card className="transition-shadow hover:shadow-md border-2 hover:border-primary/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center">
                                <Banknote className="w-5 h-5 mr-2 text-primary" />
                                Cash Payment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            <div className="space-y-2">
                                <h4 className="font-medium">Pay at Cashier's Office</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• No transaction fees</li>
                                    <li>• Pay in person at the office</li>
                                    <li>• Get Official Receipt immediately</li>
                                    <li>• Payment deadline: {new Date(request.payment_deadline).toLocaleString()}</li>
                                </ul>
                            </div>
                            <div className="bg-success/10 border border-success/20 p-3 rounded-lg">
                                <p className="text-sm font-medium text-success">
                                    No additional fees - Pay exactly ₱{request.amount}
                                </p>
                            </div>
                            <Form action={cash(request.id).url} method="post">
                                {({ processing }) => (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? 'Generating PRN...' : 'Generate Payment Reference'}
                                    </Button>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* Cash Payment Instructions */}
                {payment_reference && (
                    <Card className="border-success">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg text-success flex items-center">
                                <Banknote className="w-5 h-5 mr-2" />
                                Cash Payment Reference Generated
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Payment Reference Number</Label>
                                        <p className="text-lg font-mono font-semibold text-success">{payment_reference}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Amount to Pay</Label>
                                        <p className="text-lg font-semibold">₱{payment_amount}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label className="text-sm font-medium text-muted-foreground">Payment Deadline</Label>
                                        <p className="text-sm">{new Date(payment_deadline).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium">Next Steps:</h4>
                                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                                    <li>Visit the Cashier's Office within 48 hours</li>
                                    <li>Present this Payment Reference Number (PRN)</li>
                                    <li>Pay ₱{payment_amount} in cash</li>
                                    <li>Receive your Official Receipt</li>
                                </ol>
                            </div>

                            <div className="bg-muted/50 p-3 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                    <strong>Important:</strong> This payment reference will expire on {new Date(payment_deadline).toLocaleDateString()} at {new Date(payment_deadline).toLocaleTimeString()}.
                                    Make sure to complete your payment before the deadline.
                                </p>
                            </div>

                            <Button asChild className="w-full">
                                <Link href={show(request.id).url}>
                                    View Request Details
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Help Text */}
                <Card className="bg-muted/30">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-2">
                            <h4 className="font-medium">Need Help?</h4>
                            <p className="text-sm text-muted-foreground">
                                Contact the Registrar's Office if you have questions about payment options or need assistance.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}