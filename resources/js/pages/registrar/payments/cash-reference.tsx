import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { statusColors } from '@/lib/status-colors';
import { show } from '@/routes/registrar/document-requests';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle,
    Copy,
    Info,
    Printer,
} from 'lucide-react';
import { toast } from 'sonner';

interface Payment {
    id: number;
    payment_method: string;
    payment_reference_number: string;
    amount: number;
    status: string;
    created_at: string;
    document_request: {
        id: number;
        request_number: string;
        document_type: string;
        processing_type: string;
        quantity: number;
        purpose: string;
        amount: number;
        status: string;
        payment_deadline: string;
        student: {
            student_id: string;
            course: string;
            year_level: number;
            user?: {
                first_name: string;
                last_name: string;
                email: string;
            };
        };
    };
}

interface Props {
    payment: Payment;
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

export default function CashPaymentReference({ payment }: Props) {
    if (!payment?.document_request) {
        return (
            <AppLayout>
                <Head title="Payment Reference" />
                <div className="flex-1 p-6 md:p-8">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-destructive">
                                Error: Payment data is incomplete. Please try
                                again or contact support.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    const request = payment.document_request;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Document Requests',
            href: '/registrar/document-requests',
        },
        {
            title: `Request ${request.request_number}`,
            href: show(request.request_number).url,
        },
        {
            title: 'Payment Reference',
            href: '#',
        },
    ];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const printReference = () => {
        window.print();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={`Payment Reference - ${payment.payment_reference_number}`}
            />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Payment Reference
                            </h1>
                            <p className="text-muted-foreground">
                                Your payment reference has been generated
                                successfully
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href={show(request.request_number).url}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Request
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Success Message */}
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Payment Reference Generated!</AlertTitle>
                    <AlertDescription>
                        Your payment reference number has been created. Please
                        save this information for your records.
                    </AlertDescription>
                </Alert>

                {/* Payment Reference Card */}
                <Card className="border-2 border-primary/20">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center text-xl">
                            <CheckCircle className="mr-2 h-6 w-6 text-primary" />
                            Payment Reference Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* PRN Display */}
                        <div className="rounded-lg border-2 border-dashed border-primary/30 bg-muted/50 p-6">
                            <div className="space-y-2 text-center">
                                <Label className="text-sm font-medium text-muted-foreground">
                                    Payment Reference Number
                                </Label>
                                <div className="flex items-center justify-center space-x-3">
                                    <code className="rounded border bg-background px-4 py-2 font-mono text-2xl font-bold text-primary">
                                        {payment.payment_reference_number}
                                    </code>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            copyToClipboard(
                                                payment.payment_reference_number,
                                            )
                                        }
                                        className="shrink-0"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details Grid */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Amount to Pay
                                    </Label>
                                    <p className="text-3xl font-bold text-primary">
                                        ₱{payment.amount}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Payment Deadline
                                    </Label>
                                    <p className="text-lg font-semibold">
                                        {new Date(
                                            request.payment_deadline,
                                        ).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Request Number
                                    </Label>
                                    <p className="font-semibold">
                                        {request.request_number}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Document Type
                                    </Label>
                                    <p>
                                        {documentTypeLabels[
                                            request.document_type as keyof typeof documentTypeLabels
                                        ] || request.document_type}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Status
                                    </Label>
                                    <Badge
                                        className={
                                            statusColors[
                                                request.status as keyof typeof statusColors
                                            ] ||
                                            'bg-muted text-muted-foreground'
                                        }
                                    >
                                        {request.status
                                            .split('_')
                                            .map(
                                                (word: string) =>
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    word.slice(1),
                                            )
                                            .join(' ')}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row">
                            <Button onClick={printReference} className="flex-1">
                                <Printer className="mr-2 h-4 w-4" />
                                Print Reference
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    copyToClipboard(
                                        payment.payment_reference_number,
                                    )
                                }
                                className="flex-1"
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy PRN
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Instructions Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <h4 className="font-medium">How to Pay:</h4>
                            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                                <li>
                                    Visit the Cashier's Office within 48 hours
                                </li>
                                <li>
                                    Present this Payment Reference Number (PRN):{' '}
                                    <code className="rounded bg-muted px-2 py-1 text-xs">
                                        {payment.payment_reference_number}
                                    </code>
                                </li>
                                <li>Pay ₱{payment.amount} in cash</li>
                                <li>
                                    Receive your Official Receipt (OR) from the
                                    cashier
                                </li>
                                <li>
                                    Your document request will be processed once
                                    payment is confirmed
                                </li>
                            </ol>
                        </div>

                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Important Notes</AlertTitle>
                            <AlertDescription>
                                <ul className="list-inside list-disc space-y-1">
                                    <li>
                                        Payment must be completed before the
                                        deadline
                                    </li>
                                    <li>Keep this reference number safe</li>
                                    <li>
                                        Unpaid requests will be automatically
                                        cancelled
                                    </li>
                                    <li>
                                        Cash payments only - no online payments
                                        accepted at cashier
                                    </li>
                                </ul>
                            </AlertDescription>
                        </Alert>

                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Cashier Office Information</AlertTitle>
                            <AlertDescription>
                                <div className="space-y-1">
                                    <p>
                                        <strong>Location:</strong> Ground Floor,
                                        Administration Building
                                    </p>
                                    <p>
                                        <strong>Hours:</strong> Monday-Friday,
                                        8:00 AM - 5:00 PM
                                    </p>
                                    <p>
                                        <strong>Contact:</strong> (043) 123-4567
                                    </p>
                                </div>
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-center">
                    <Button asChild size="lg">
                        <Link href={show(request.request_number).url}>
                            View Request Status
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
