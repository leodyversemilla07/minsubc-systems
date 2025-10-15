import AlertError from '@/components/alert-error';
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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { statusColors } from '@/lib/status-colors';
import { edit, index } from '@/routes/registrar/document-requests';
import { method } from '@/routes/registrar/payments';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Clock as ClockIcon,
    CreditCard,
    Download,
    Edit,
    IdCard,
    Info,
    MapPin,
    Package,
} from 'lucide-react';

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
    const { errors } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Document Requests',
            href: index().url,
        },
        {
            title: `Request ${request.request_number}`,
            href: '#',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Document Request ${request.request_number}`} />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Error Display */}
                {errors && Object.keys(errors).length > 0 && (
                    <AlertError
                        errors={
                            Object.values(errors)
                                .flat()
                                .filter(Boolean) as string[]
                        }
                        title="Payment Error"
                    />
                )}

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
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                        {request.status === 'pending_payment' && (
                            <>
                                <Button
                                    variant="default"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link href={method(request.request_number)}>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Select Payment Method
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="w-full sm:w-auto"
                                >
                                    <Link href={edit(request.request_number)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Link>
                                </Button>
                            </>
                        )}
                        {request.status === 'released' && (
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Request Details */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">
                                    Request Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-0">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Request Number
                                        </Label>
                                        <p className="text-lg font-semibold">
                                            {request.request_number}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Status
                                        </Label>
                                        <div className="mt-1">
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
                                                        (word) =>
                                                            word
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            word.slice(1),
                                                    )
                                                    .join(' ')}
                                            </Badge>
                                        </div>
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
                                            Processing Type
                                        </Label>
                                        <p className="capitalize">
                                            {request.processing_type}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Quantity
                                        </Label>
                                        <p>{request.quantity}</p>
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

                                <Separator />

                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Purpose
                                    </Label>
                                    <p className="mt-1">{request.purpose}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Created
                                        </Label>
                                        <p>
                                            {new Date(
                                                request.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Last Updated
                                        </Label>
                                        <p>
                                            {new Date(
                                                request.updated_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Information */}
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">
                                    Payment Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                {request.payments.length > 0 ? (
                                    <div className="space-y-4">
                                        {request.payments.map((payment) => (
                                            <div
                                                key={payment.id}
                                                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-medium">
                                                            ₱{payment.amount}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground capitalize">
                                                            {payment.payment_method.replace(
                                                                '_',
                                                                ' ',
                                                            )}{' '}
                                                            •{' '}
                                                            {payment.status.replace(
                                                                '_',
                                                                ' ',
                                                            )}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            payment.status ===
                                                            'paid'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                        className={
                                                            payment.status ===
                                                            'paid'
                                                                ? 'bg-green-600'
                                                                : ''
                                                        }
                                                    >
                                                        {payment.status
                                                            .split('_')
                                                            .map(
                                                                (word) =>
                                                                    word
                                                                        .charAt(
                                                                            0,
                                                                        )
                                                                        .toUpperCase() +
                                                                    word.slice(
                                                                        1,
                                                                    ),
                                                            )
                                                            .join(' ')}
                                                    </Badge>
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    {new Date(
                                                        payment.created_at,
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">
                                        No payments recorded yet.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Student Information Sidebar */}
                    <div className="space-y-6">
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">
                                    Student Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 pt-0">
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Student ID
                                    </Label>
                                    <p className="font-semibold">
                                        {request.student.student_id}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Name
                                    </Label>
                                    <p>
                                        {request.student.user?.full_name ||
                                            'Not available'}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Email
                                    </Label>
                                    <p className="text-sm">
                                        {request.student.user?.email ||
                                            'Not available'}
                                    </p>
                                </div>
                                {request.student.phone && (
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">
                                            Phone
                                        </Label>
                                        <p className="text-sm">
                                            {request.student.phone}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Course
                                    </Label>
                                    <p className="text-sm">
                                        {request.student.course}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-muted-foreground">
                                        Year Level
                                    </Label>
                                    <p className="text-sm">
                                        {request.student.year_level}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Document Ready for Claim - Informational Only */}
                        {(request.status === 'ready_for_claim' ||
                            request.status === 'claimed') && (
                            <Card className="shadow-lg">
                                <CardHeader className="space-y-3 pb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-primary p-3 shadow-sm">
                                            <Package className="h-6 w-6 text-primary-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-xl">
                                                {request.status === 'claimed'
                                                    ? 'Document Claimed'
                                                    : 'Document Ready for Claim'}
                                            </CardTitle>
                                            <CardDescription className="mt-1 text-base">
                                                {request.status === 'claimed'
                                                    ? "You have picked up this document from the Registrar's Office"
                                                    : "Your document is waiting for you at the Registrar's Office"}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    {/* Important Notice */}
                                    <Alert>
                                        <Info className="h-4 w-4" />
                                        <AlertTitle>Ready to Claim</AlertTitle>
                                        <AlertDescription>
                                            Please visit the Registrar's Office
                                            during office hours to claim your
                                            document. Make sure to bring valid
                                            identification.
                                        </AlertDescription>
                                    </Alert>

                                    {/* Office Information */}
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-md bg-primary/10 p-2">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        Location
                                                    </p>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Registrar's Office
                                                        <br />
                                                        Ground Floor, Admin
                                                        Building
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-md bg-primary/10 p-2">
                                                    <ClockIcon className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold">
                                                        Office Hours
                                                    </p>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Monday - Friday
                                                        <br />
                                                        8:00 AM - 5:00 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Pickup Requirements */}
                                    <Alert>
                                        <IdCard className="h-4 w-4" />
                                        <AlertTitle>What to Bring</AlertTitle>
                                        <AlertDescription>
                                            <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm">
                                                <li>
                                                    Valid student ID or
                                                    government-issued ID
                                                </li>
                                                <li>
                                                    Request number:{' '}
                                                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold">
                                                        {request.request_number}
                                                    </code>
                                                </li>
                                                <li>
                                                    Authorization letter (if
                                                    claiming on behalf of
                                                    another person)
                                                </li>
                                                <li>
                                                    Payment for any additional
                                                    fees if applicable
                                                </li>
                                            </ul>
                                        </AlertDescription>
                                    </Alert>

                                    {/* Pickup Instructions */}
                                    <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
                                        <h4 className="flex items-center gap-2 text-sm font-semibold">
                                            <Package className="h-4 w-4" />
                                            Pickup Process
                                        </h4>
                                        <ol className="ml-6 list-decimal space-y-2 text-sm text-muted-foreground">
                                            <li>
                                                Visit the Registrar's Office
                                                during office hours
                                            </li>
                                            <li>
                                                Present your valid ID and
                                                request number to the staff
                                            </li>
                                            <li>
                                                Staff will verify your identity
                                            </li>
                                            <li>Sign the release log</li>
                                            <li>
                                                Receive your sealed document
                                            </li>
                                        </ol>
                                    </div>

                                    <Alert>
                                        <Info className="h-4 w-4" />
                                        <AlertDescription>
                                            <strong>Note:</strong> Physical
                                            verification will be done by
                                            Registrar staff when you arrive. No
                                            online confirmation needed.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>
                        )}

                        {/* Notifications */}
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">
                                    Notifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                {request.notifications.length > 0 ? (
                                    <div className="space-y-3">
                                        {request.notifications.map(
                                            (notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="rounded-lg border p-3 transition-colors hover:bg-muted/50"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Badge
                                                            variant="outline"
                                                            className="shrink-0 uppercase"
                                                        >
                                                            {notification.type}
                                                        </Badge>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm leading-relaxed break-words">
                                                                {
                                                                    notification.message
                                                                }
                                                            </p>
                                                            <p className="mt-2 text-xs text-muted-foreground">
                                                                {notification.sent_at
                                                                    ? new Date(
                                                                          notification.sent_at,
                                                                      ).toLocaleString()
                                                                    : 'Pending'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">
                                        No notifications sent yet.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
