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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
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
    Eye,
    FileText,
    HelpCircle,
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
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`Document Request ${request.request_number}`} />

                <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
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

                    {/* Enhanced Header */}
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 md:h-10 md:w-10">
                                    <Eye className="h-4 w-4 text-primary md:h-5 md:w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
                                        Request {request.request_number}
                                    </h1>
                                    <p className="text-sm text-muted-foreground md:text-base">
                                        Document Request Details
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 self-start sm:self-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge
                                            variant="outline"
                                            className="gap-1 text-xs md:text-sm"
                                        >
                                            <FileText className="h-3 w-3" />
                                            <span className="hidden sm:inline">
                                                Viewing Request
                                            </span>
                                            <span className="sm:hidden">
                                                Viewing
                                            </span>
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            You are currently viewing request
                                            details
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    {/* Status Overview Card */}
                    <Card className="mb-4 md:mb-6">
                        <CardHeader className="pb-3">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <div className="flex items-center gap-2">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    <CardTitle className="text-sm md:text-base">
                                        Request Status
                                    </CardTitle>
                                </div>
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
                        </CardHeader>
                        <CardContent className="space-y-3 md:space-y-4">
                            <Alert className="text-xs md:text-sm">
                                <Info className="h-3 w-3 md:h-4 md:w-4" />
                                <AlertDescription className="text-xs md:text-sm">
                                    This request is currently in the "
                                    {request.status
                                        .split('_')
                                        .map(
                                            (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1),
                                        )
                                        .join(' ')}
                                    " status. You can view all details below.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                        {request.status === 'pending_payment' && (
                            <>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="default"
                                                asChild
                                                size="lg"
                                                className="h-11 w-full min-w-[160px] text-sm sm:w-auto md:h-12 md:text-base"
                                            >
                                                <Link
                                                    href={method(
                                                        request.request_number,
                                                    )}
                                                >
                                                    <CreditCard className="mr-2 h-4 w-4" />
                                                    Select Payment Method
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Choose your preferred payment
                                                method to complete the
                                                transaction
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                asChild
                                                size="lg"
                                                className="h-11 w-full min-w-[120px] text-sm sm:w-auto md:h-12 md:text-base"
                                            >
                                                <Link
                                                    href={edit(
                                                        request.request_number,
                                                    )}
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Request
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Modify your document request
                                                details
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </>
                        )}
                        {request.status === 'released' && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="h-11 w-full min-w-[140px] text-sm sm:w-auto md:h-12 md:text-base"
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Document
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Download your completed document</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>

                    {/* Help & Processing Information */}
                    <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3">
                        {/* Processing Timeline */}
                        <div className="space-y-4 xl:col-span-2">
                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Info className="h-5 w-5 text-primary" />
                                        Processing Timeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-0">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                1
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                    <p className="text-sm font-medium">
                                                        Request Submitted
                                                    </p>
                                                    <Badge
                                                        variant="outline"
                                                        className="w-fit text-xs"
                                                    >
                                                        ✓ Complete
                                                    </Badge>
                                                </div>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    Your document request has
                                                    been received and is being
                                                    processed.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                2
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                    <p className="text-sm font-medium">
                                                        {request.status ===
                                                        'pending_payment'
                                                            ? 'Payment Required'
                                                            : request.status ===
                                                                'processing'
                                                              ? 'Document Processing'
                                                              : request.status ===
                                                                  'ready_for_claim'
                                                                ? 'Ready for Pickup'
                                                                : request.status ===
                                                                    'claimed'
                                                                  ? 'Document Claimed'
                                                                  : 'Completed'}
                                                    </p>
                                                    <Badge
                                                        variant={
                                                            request.status ===
                                                            'claimed'
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                        className={`w-fit text-xs ${request.status === 'claimed' ? 'bg-green-600' : ''}`}
                                                    >
                                                        {request.status ===
                                                        'claimed'
                                                            ? '✓ Complete'
                                                            : 'In Progress'}
                                                    </Badge>
                                                </div>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {request.status ===
                                                    'pending_payment'
                                                        ? 'Complete payment to proceed with processing.'
                                                        : request.status ===
                                                            'processing'
                                                          ? 'Your document is being prepared by our staff.'
                                                          : request.status ===
                                                              'ready_for_claim'
                                                            ? "Your document is ready for pickup at the Registrar's Office."
                                                            : request.status ===
                                                                'claimed'
                                                              ? 'You have successfully claimed your document.'
                                                              : 'Your request has been completed.'}
                                                </p>
                                            </div>
                                        </div>

                                        {request.status ===
                                            'ready_for_claim' && (
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                    3
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                        <p className="text-sm font-medium">
                                                            Pickup Document
                                                        </p>
                                                        <Badge
                                                            variant="outline"
                                                            className="w-fit text-xs"
                                                        >
                                                            Pending
                                                        </Badge>
                                                    </div>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        Visit the Registrar's
                                                        Office during office
                                                        hours to claim your
                                                        document.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Cost Summary & Help */}
                        <div className="space-y-4">
                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                        Cost Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-0">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Document Fee
                                            </span>
                                            <span className="text-sm font-medium">
                                                ₱{request.amount}
                                            </span>
                                        </div>
                                        <Separator />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">
                                                Total Amount
                                            </span>
                                            <span className="text-lg font-bold text-success">
                                                ₱{request.amount}
                                            </span>
                                        </div>
                                    </div>

                                    {request.status === 'pending_payment' && (
                                        <Alert className="mt-4">
                                            <CreditCard className="h-4 w-4" />
                                            <AlertDescription className="text-xs">
                                                Payment is required to proceed
                                                with document processing.
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <HelpCircle className="h-5 w-5 text-primary" />
                                        Need Help?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-0">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 rounded-md bg-primary/10 p-2">
                                                <FileText className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium">
                                                    Document Status
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Track your request progress
                                                    in real-time.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 rounded-md bg-primary/10 p-2">
                                                <CreditCard className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium">
                                                    Payment
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Secure online payment
                                                    processing.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 rounded-md bg-primary/10 p-2">
                                                <MapPin className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium">
                                                    Pickup Location
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Registrar's Office, Ground
                                                    Floor.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">
                                            For urgent inquiries, contact the
                                            Registrar's Office directly.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-3">
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
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
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
                                                                        (
                                                                            word,
                                                                        ) =>
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
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>
                                                                {request.status ===
                                                                'pending_payment'
                                                                    ? 'Payment is required to process this request'
                                                                    : request.status ===
                                                                        'processing'
                                                                      ? 'Your document is being prepared'
                                                                      : request.status ===
                                                                          'ready_for_claim'
                                                                        ? "Document is ready for pickup at the Registrar's Office"
                                                                        : request.status ===
                                                                            'claimed'
                                                                          ? 'Document has been successfully claimed'
                                                                          : 'Request completed'}
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
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
                                        <p className="mt-1">
                                            {request.purpose}
                                        </p>
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
                                                                ₱
                                                                {payment.amount}
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
                                                    {request.status ===
                                                    'claimed'
                                                        ? 'Document Claimed'
                                                        : 'Document Ready for Claim'}
                                                </CardTitle>
                                                <CardDescription className="mt-1 text-base">
                                                    {request.status ===
                                                    'claimed'
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
                                            <AlertTitle>
                                                Ready to Claim
                                            </AlertTitle>
                                            <AlertDescription>
                                                Please visit the Registrar's
                                                Office during office hours to
                                                claim your document. Make sure
                                                to bring valid identification.
                                            </AlertDescription>
                                        </Alert>

                                        {/* Office Information */}
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-shrink-0 rounded-md bg-primary/10 p-2">
                                                        <MapPin className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
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
                                                    <div className="flex-shrink-0 rounded-md bg-primary/10 p-2">
                                                        <ClockIcon className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
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
                                            <AlertTitle>
                                                What to Bring
                                            </AlertTitle>
                                            <AlertDescription>
                                                <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm">
                                                    <li>
                                                        Valid student ID or
                                                        government-issued ID
                                                    </li>
                                                    <li>
                                                        Request number:{' '}
                                                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold">
                                                            {
                                                                request.request_number
                                                            }
                                                        </code>
                                                    </li>
                                                    <li>
                                                        Authorization letter (if
                                                        claiming on behalf of
                                                        another person)
                                                    </li>
                                                    <li>
                                                        Payment for any
                                                        additional fees if
                                                        applicable
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
                                                    Staff will verify your
                                                    identity
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
                                                Registrar staff when you arrive.
                                                No online confirmation needed.
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
                                                                {
                                                                    notification.type
                                                                }
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
        </TooltipProvider>
    );
}
