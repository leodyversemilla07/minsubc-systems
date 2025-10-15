import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { confirmPayment, verifyPayment } from '@/routes/registrar/cashier';
import { type BreadcrumbItem } from '@/types';
import { Form, Head as InertiaHead } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle,
    DollarSign,
    FileText,
    Receipt,
    Search,
    User,
    XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PaymentDetails {
    id: number;
    reference: string;
    amount: number;
    request_number: string;
    student_name: string;
    student_id: string;
    document_type: string;
    created_at: string;
}

interface ConfirmedPayment {
    payment_reference: string;
    official_receipt_number: string;
    amount: number;
    student_name: string;
}

interface DashboardProps {
    flash?: {
        payment?: PaymentDetails;
        confirmed?: ConfirmedPayment;
    };
}

export default function Dashboard({ flash }: DashboardProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Cashier Dashboard', href: '#' },
    ];

    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
        flash?.payment || null,
    );
    const [confirmedPayment, setConfirmedPayment] =
        useState<ConfirmedPayment | null>(flash?.confirmed || null);

    // Update payment details when it comes from flash data
    useEffect(() => {
        if (flash?.payment) {
            setPaymentDetails(flash.payment);
        }
    }, [flash?.payment]);

    // Update confirmed payment when it comes from flash data
    useEffect(() => {
        if (flash?.confirmed) {
            setConfirmedPayment(flash.confirmed);
            setPaymentDetails(null); // Clear payment details after confirmation
        }
    }, [flash?.confirmed]);

    const formatDocumentType = (type: string) => {
        const types: Record<string, string> = {
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
        return types[type] || type;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <InertiaHead title="Cashier Dashboard" />

            <div className="flex flex-col space-y-8 p-6 md:p-8">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Cashier Dashboard
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Payment Verification Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-5 w-5 text-primary" />
                                Verify Payment Reference
                            </CardTitle>
                            <CardDescription>
                                Enter the payment reference number to verify and
                                process payment
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={verifyPayment()}
                                options={{ preserveScroll: true }}
                                onSuccess={() => {
                                    toast.success(
                                        'Payment reference verified successfully',
                                    );
                                }}
                                onError={() => {
                                    toast.error('Payment reference not found');
                                }}
                            >
                                {({ errors, processing }) => (
                                    <div className="space-y-4">
                                        <Field>
                                            <FieldLabel htmlFor="payment_reference">
                                                Payment Reference Number
                                            </FieldLabel>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="payment_reference"
                                                    name="payment_reference"
                                                    placeholder="Enter PRN (e.g., PRN-20251007-0001)"
                                                    className="flex-1 uppercase"
                                                    disabled={processing}
                                                />
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    variant="default"
                                                    size="icon"
                                                >
                                                    {processing ? (
                                                        <Spinner className="h-4 w-4" />
                                                    ) : (
                                                        <Search className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                            {errors.payment_reference && (
                                                <p className="mt-1 text-sm text-destructive">
                                                    {errors.payment_reference}
                                                </p>
                                            )}
                                        </Field>

                                        {errors.payment_reference && (
                                            <Alert variant="destructive">
                                                <XCircle className="h-4 w-4" />
                                                <AlertTitle>
                                                    Verification Failed
                                                </AlertTitle>
                                                <AlertDescription>
                                                    {errors.payment_reference}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                )}
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Payment Details Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Receipt className="h-5 w-5 text-primary" />
                                Payment Details
                            </CardTitle>
                            <CardDescription>
                                Review payment information and enter official
                                receipt number
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {paymentDetails ? (
                                <Form
                                    action={confirmPayment()}
                                    options={{ preserveScroll: true }}
                                    transform={(data) => ({
                                        ...data,
                                        payment_reference_number:
                                            paymentDetails.reference,
                                    })}
                                    onSuccess={() => {
                                        toast.success(
                                            'Payment confirmed successfully',
                                        );
                                    }}
                                    onError={() => {
                                        toast.error(
                                            'Failed to confirm payment',
                                        );
                                    }}
                                >
                                    {({ errors, processing }) => (
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                                            <FileText className="h-3 w-3" />
                                                            Reference
                                                        </label>
                                                        <p className="font-mono text-sm font-semibold break-all">
                                                            {
                                                                paymentDetails.reference
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                                            <DollarSign className="h-3 w-3" />
                                                            Amount
                                                        </label>
                                                        <p className="text-lg font-bold text-primary">
                                                            ₱
                                                            {paymentDetails.amount.toFixed(
                                                                2,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div className="space-y-1">
                                                        <label className="text-sm font-medium text-muted-foreground">
                                                            Request Number
                                                        </label>
                                                        <p className="font-medium">
                                                            {
                                                                paymentDetails.request_number
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                                            <User className="h-3 w-3" />
                                                            Student ID
                                                        </label>
                                                        <p className="font-medium">
                                                            {
                                                                paymentDetails.student_id
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-muted-foreground">
                                                        Student Name
                                                    </label>
                                                    <p className="text-lg font-medium">
                                                        {
                                                            paymentDetails.student_name
                                                        }
                                                    </p>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-muted-foreground">
                                                        Document Type
                                                    </label>
                                                    <div>
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-sm"
                                                        >
                                                            {formatDocumentType(
                                                                paymentDetails.document_type,
                                                            )}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        Request Date
                                                    </label>
                                                    <p className="text-sm">
                                                        {new Date(
                                                            paymentDetails.created_at,
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <Separator />

                                            <Field>
                                                <FieldLabel htmlFor="official_receipt_number">
                                                    Official Receipt Number{' '}
                                                    <span className="text-destructive">
                                                        *
                                                    </span>
                                                </FieldLabel>
                                                <Input
                                                    id="official_receipt_number"
                                                    name="official_receipt_number"
                                                    type="text"
                                                    placeholder="Enter OR number (e.g., OR-2025-001234)"
                                                    disabled={processing}
                                                    required
                                                />
                                                {errors.official_receipt_number && (
                                                    <p className="mt-1 text-sm text-destructive">
                                                        {
                                                            errors.official_receipt_number
                                                        }
                                                    </p>
                                                )}
                                            </Field>

                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full"
                                                size="lg"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Spinner className="mr-2 h-4 w-4" />
                                                        Confirming Payment...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Confirm Payment
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </Form>
                            ) : (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Receipt />
                                        </EmptyMedia>
                                        <EmptyTitle>
                                            No Payment Selected
                                        </EmptyTitle>
                                        <EmptyDescription>
                                            Enter a payment reference number
                                            above to view and confirm payment
                                            details
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            )}
                        </CardContent>
                    </Card>

                    {/* Success Message Section */}
                    {confirmedPayment && (
                        <Card className="border-primary/20 bg-primary/5 lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <CheckCircle className="h-5 w-5" />
                                    Payment Confirmed Successfully
                                </CardTitle>
                                <CardDescription>
                                    The payment has been processed and confirmed
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Alert className="bg-background">
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <AlertTitle>
                                        Transaction Complete
                                    </AlertTitle>
                                    <AlertDescription className="mt-2">
                                        <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                                            <div>
                                                <span className="font-medium text-muted-foreground">
                                                    Reference:
                                                </span>
                                                <p className="mt-1 font-mono text-sm break-all">
                                                    {
                                                        confirmedPayment.payment_reference
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-muted-foreground">
                                                    Amount:
                                                </span>
                                                <p className="mt-1 font-semibold">
                                                    ₱
                                                    {confirmedPayment.amount.toFixed(
                                                        2,
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-muted-foreground">
                                                    Student:
                                                </span>
                                                <p className="mt-1 font-medium break-words">
                                                    {
                                                        confirmedPayment.student_name
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <span className="font-medium text-muted-foreground">
                                                    OR Number:
                                                </span>
                                                <p className="mt-1 font-medium break-all">
                                                    {
                                                        confirmedPayment.official_receipt_number
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </AlertDescription>
                                </Alert>

                                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                                    <Button
                                        onClick={() => window.print()}
                                        variant="default"
                                        className="flex-1"
                                    >
                                        <Receipt className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">
                                            Print Official Receipt
                                        </span>
                                        <span className="sm:hidden">
                                            Print Receipt
                                        </span>
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setConfirmedPayment(null);
                                        }}
                                        variant="outline"
                                        className="w-full sm:w-auto"
                                    >
                                        <span className="hidden sm:inline">
                                            Process Another Payment
                                        </span>
                                        <span className="sm:hidden">
                                            New Payment
                                        </span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
