import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { statusColors } from '@/lib/status-colors';
import { show } from '@/routes/registrar/document-requests';
import { cash, cashReference } from '@/routes/registrar/payments';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { Banknote, CheckCircle, CreditCard, InfoIcon } from 'lucide-react';

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

interface Payment {
    id: number;
    payment_reference_number: string;
    amount: number;
    status: string;
}

interface Props {
    request: DocumentRequest;
    existingCashPayment?: Payment | null;
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

export default function PaymentMethod({ request, existingCashPayment }: Props) {
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
            title: 'Select Payment Method',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Payment Method - ${request.request_number}`} />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Select Payment Method
                    </h1>
                    <p className="text-muted-foreground">
                        Choose how you would like to pay for your document
                        request
                    </p>
                </div>

                {/* Request Summary */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">
                            Request Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
                                        ] || 'bg-muted text-muted-foreground'
                                    }
                                >
                                    {request.status
                                        .split('_')
                                        .map(
                                            (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1),
                                        )
                                        .join(' ')}
                                </Badge>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">
                                    Amount
                                </Label>
                                <p className="text-lg font-semibold text-success">
                                    ₱{request.amount}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Existing Cash Payment Alert */}
                {existingCashPayment && (
                    <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>
                            Payment Reference Already Generated
                        </AlertTitle>
                        <AlertDescription>
                            <p className="mb-2">
                                You already have a payment reference number for
                                this request.
                            </p>
                            <div className="flex items-center gap-2">
                                <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                                    {
                                        existingCashPayment.payment_reference_number
                                    }
                                </code>
                                <Button asChild variant="outline" size="sm">
                                    <Link
                                        href={
                                            cashReference(
                                                existingCashPayment.id,
                                            ).url
                                        }
                                    >
                                        View Payment Reference
                                    </Link>
                                </Button>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Payment Method Options */}
                <div
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    role="radiogroup"
                    aria-label="Payment method selection"
                >
                    {/* Online Payment */}
                    <Card className="border-2 transition-shadow focus-within:ring-2 focus-within:ring-primary/20 hover:border-primary/50 hover:shadow-md">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center text-lg">
                                <CreditCard
                                    className="mr-2 h-5 w-5 text-primary"
                                    aria-hidden="true"
                                />
                                Online Payment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                            <div className="space-y-2">
                                <h4 className="font-medium">
                                    Pay instantly online
                                </h4>
                                <ul
                                    className="space-y-1 text-sm text-muted-foreground"
                                    role="list"
                                >
                                    <li role="listitem">
                                        E-wallets (GCash, PayMaya, GrabPay)
                                    </li>
                                    <li role="listitem">
                                        Credit/Debit Cards (Visa, Mastercard,
                                        JCB)
                                    </li>
                                    <li role="listitem">
                                        Online Banking (BPI, BDO, UnionBank)
                                    </li>
                                    <li role="listitem">
                                        Over-the-Counter (7-Eleven, Cebuana)
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-lg bg-muted/50 p-3">
                                <p className="text-sm">
                                    <span className="font-medium">
                                        Processing Fee:
                                    </span>{' '}
                                    2.5% + ₱15
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Total: ₱
                                    {(
                                        request.amount +
                                        request.amount * 0.025 +
                                        15
                                    ).toFixed(2)}
                                </p>
                            </div>
                            <Button
                                className="w-full"
                                size="lg"
                                disabled
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Online Payment Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Cash Payment */}
                    <Card className="border-2 transition-shadow focus-within:ring-2 focus-within:ring-primary/20 hover:border-primary/50 hover:shadow-md">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center text-lg">
                                <Banknote
                                    className="mr-2 h-5 w-5 text-primary"
                                    aria-hidden="true"
                                />
                                Cash Payment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                            <div className="space-y-2">
                                <h4 className="font-medium">
                                    Pay at Cashier's Office
                                </h4>
                                <ul
                                    className="space-y-1 text-sm text-muted-foreground"
                                    role="list"
                                >
                                    <li role="listitem">No transaction fees</li>
                                    <li role="listitem">
                                        Pay in person at the office
                                    </li>
                                    <li role="listitem">
                                        Get Official Receipt immediately
                                    </li>
                                    <li role="listitem">
                                        Payment deadline:{' '}
                                        {new Date(
                                            request.payment_deadline,
                                        ).toLocaleString()}
                                    </li>
                                </ul>
                            </div>
                            <div className="rounded-lg border border-success/20 bg-success/10 p-3">
                                <p className="text-sm font-medium text-success">
                                    No additional fees - Pay exactly ₱
                                    {request.amount}
                                </p>
                            </div>
                            <Form {...cash.form(request.request_number)}>
                                {({ processing, errors }) => (
                                    <>
                                        {existingCashPayment ? (
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                asChild
                                                size="lg"
                                            >
                                                <Link
                                                    href={
                                                        cashReference(
                                                            existingCashPayment.id,
                                                        ).url
                                                    }
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    View Payment Reference
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                type="submit"
                                                disabled={processing}
                                                size="lg"
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                                        Generating PRN...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Banknote className="mr-2 h-4 w-4" />
                                                        Generate Payment
                                                        Reference
                                                    </>
                                                )}
                                            </Button>
                                        )}

                                        {errors.payment && (
                                            <Alert
                                                variant="destructive"
                                                className="mt-4"
                                            >
                                                <AlertDescription>
                                                    {errors.payment}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* Help Text */}
                <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Need Help?</AlertTitle>
                    <AlertDescription>
                        Contact the Registrar's Office if you have questions
                        about payment options or need assistance.
                    </AlertDescription>
                </Alert>
            </div>
        </AppLayout>
    );
}
