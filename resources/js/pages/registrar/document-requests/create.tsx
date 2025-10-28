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
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
} from '@/components/ui/item';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/registrar/document-requests';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    DollarSign,
    FileText,
    HelpCircle,
    Info,
    Plus,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DocumentTypeData {
    value: string;
    label: string;
    price: number;
    price_label: string;
    is_per_page: boolean;
    processing_time: string;
}

interface Props {
    documentTypes: DocumentTypeData[];
    dailyLimit: number;
    todayCount: number;
    remaining: number;
    hasReachedLimit: boolean;
}

export default function Create({
    documentTypes,
    dailyLimit,
    todayCount,
    remaining,
    hasReachedLimit,
}: Props) {
    const [selectedType, setSelectedType] = useState<DocumentTypeData | null>(
        null,
    );
    const [quantity, setQuantity] = useState(1);
    const [selectedPurpose, setSelectedPurpose] = useState<string>('');
    const [customPurpose, setCustomPurpose] = useState<string>('');

    const purposeOptions = [
        'Scholarship',
        'Provincial scholarship',
        'Municipal scholarship',
        'Educational assistance',
        'Financial assistance',
        'Other (please specify)',
    ];

    const calculateAmount = () => {
        if (!selectedType) return 0;
        return selectedType.price * quantity;
    };

    const getProgressValue = () => {
        return (todayCount / dailyLimit) * 100;
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Document Requests',
            href: index().url,
        },
        {
            title: 'New Request',
            href: '#',
        },
    ];

    return (
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="New Document Request" />

                <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                    {/* Enhanced Header */}
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 md:h-10 md:w-10">
                                    <Plus className="h-4 w-4 text-primary md:h-5 md:w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
                                        New Document Request
                                    </h1>
                                    <p className="text-sm text-muted-foreground md:text-base">
                                        Submit a request for official documents
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 self-start sm:self-center">
                            <Badge
                                variant="outline"
                                className="gap-1 text-xs md:text-sm"
                            >
                                <FileText className="h-3 w-3" />
                                <span className="hidden sm:inline">
                                    {documentTypes.length} Types Available
                                </span>
                                <span className="sm:hidden">
                                    {documentTypes.length} Types
                                </span>
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-3">
                        {/* Main Form */}
                        <div className="space-y-6 md:space-y-8 xl:col-span-2">
                            {/* Daily Limit Status Card */}
                            <Card className="mb-4 md:mb-6">
                                <CardHeader className="pb-3">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <CardTitle className="text-sm md:text-base">
                                                Daily Request Status
                                            </CardTitle>
                                        </div>
                                        <Badge
                                            variant={
                                                hasReachedLimit
                                                    ? 'destructive'
                                                    : remaining <= 2
                                                      ? 'secondary'
                                                      : 'default'
                                            }
                                            className="self-start text-xs"
                                        >
                                            {hasReachedLimit
                                                ? 'Limit Reached'
                                                : `${remaining} Remaining`}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3 md:space-y-4">
                                    <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between md:text-sm">
                                        <span className="text-muted-foreground">
                                            Requests today: {todayCount} of{' '}
                                            {dailyLimit}
                                        </span>
                                        <span className="font-medium">
                                            {Math.round(getProgressValue())}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={getProgressValue()}
                                        className="h-2"
                                    />
                                    {hasReachedLimit ? (
                                        <Alert
                                            variant="destructive"
                                            className="text-xs md:text-sm"
                                        >
                                            <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
                                            <AlertTitle className="text-xs md:text-sm">
                                                Daily Limit Reached
                                            </AlertTitle>
                                            <AlertDescription className="text-xs md:text-sm">
                                                The maximum number of document
                                                requests ({dailyLimit}) for
                                                today has been reached. Please
                                                try again tomorrow.
                                            </AlertDescription>
                                        </Alert>
                                    ) : remaining <= 2 ? (
                                        <Alert className="text-xs md:text-sm">
                                            <Info className="h-3 w-3 md:h-4 md:w-4" />
                                            <AlertDescription className="text-xs md:text-sm">
                                                You have {remaining} request
                                                {remaining === 1
                                                    ? ''
                                                    : 's'}{' '}
                                                remaining today.
                                            </AlertDescription>
                                        </Alert>
                                    ) : null}
                                </CardContent>
                            </Card>

                            {/* Request Form */}
                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="pb-4 md:pb-6">
                                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                                        <FileText className="h-4 w-4 md:h-5 md:w-5" />
                                        Request Details
                                    </CardTitle>
                                    <CardDescription className="text-sm md:text-base">
                                        Fill in the details for your document
                                        request
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-4 md:px-6">
                                    <Form
                                        action={store()}
                                        method="post"
                                        onSuccess={() =>
                                            toast.success(
                                                'Request submitted successfully!',
                                            )
                                        }
                                    >
                                        {({ errors, processing }) => (
                                            <div className="space-y-6 md:space-y-8">
                                                {/* Document Type Section */}
                                                <div className="space-y-3 md:space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-sm font-medium md:text-base">
                                                            Document Type
                                                        </h3>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <HelpCircle className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs">
                                                                <p className="text-xs md:text-sm">
                                                                    Select the
                                                                    type of
                                                                    document you
                                                                    need
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <Field>
                                                        <FieldLabel
                                                            htmlFor="document_type"
                                                            className="text-sm md:text-base"
                                                        >
                                                            Document Type *
                                                        </FieldLabel>
                                                        <Select
                                                            name="document_type"
                                                            defaultValue=""
                                                            onValueChange={(
                                                                value,
                                                            ) => {
                                                                const type =
                                                                    documentTypes.find(
                                                                        (t) =>
                                                                            t.value ===
                                                                            value,
                                                                    );
                                                                setSelectedType(
                                                                    type ||
                                                                        null,
                                                                );
                                                            }}
                                                            disabled={
                                                                hasReachedLimit
                                                            }
                                                        >
                                                            <SelectTrigger
                                                                id="document_type"
                                                                className="h-10 md:h-11"
                                                            >
                                                                <SelectValue placeholder="Select document type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {documentTypes.map(
                                                                    (type) => (
                                                                        <SelectItem
                                                                            key={
                                                                                type.value
                                                                            }
                                                                            value={
                                                                                type.value
                                                                            }
                                                                            className="text-sm md:text-base"
                                                                        >
                                                                            <div className="flex w-full items-center justify-between">
                                                                                <span>
                                                                                    {
                                                                                        type.label
                                                                                    }
                                                                                </span>
                                                                                <Badge
                                                                                    variant="outline"
                                                                                    className="ml-2 text-xs"
                                                                                >
                                                                                    {
                                                                                        type.price_label
                                                                                    }
                                                                                </Badge>
                                                                            </div>
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        {selectedType && (
                                                            <FieldDescription className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center md:gap-4 md:text-sm">
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" />
                                                                    Processing
                                                                    time:{' '}
                                                                    {
                                                                        selectedType.processing_time
                                                                    }
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <DollarSign className="h-3 w-3" />
                                                                    {
                                                                        selectedType.price_label
                                                                    }
                                                                </span>
                                                            </FieldDescription>
                                                        )}
                                                        {errors.document_type && (
                                                            <p className="mt-1 text-xs text-destructive md:text-sm">
                                                                {
                                                                    errors.document_type
                                                                }
                                                            </p>
                                                        )}
                                                    </Field>
                                                </div>

                                                <Separator className="my-4 md:my-6" />

                                                {/* Quantity Section */}
                                                <div className="space-y-3 md:space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-sm font-medium md:text-base">
                                                            Quantity
                                                        </h3>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <HelpCircle className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs">
                                                                <p className="text-xs md:text-sm">
                                                                    Specify how
                                                                    many copies
                                                                    or pages you
                                                                    need
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <Field>
                                                        <FieldLabel
                                                            htmlFor="quantity"
                                                            className="text-sm md:text-base"
                                                        >
                                                            Quantity *
                                                        </FieldLabel>
                                                        <Input
                                                            id="quantity"
                                                            name="quantity"
                                                            type="number"
                                                            min="1"
                                                            max="10"
                                                            defaultValue="1"
                                                            onChange={(e) =>
                                                                setQuantity(
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                    ) || 1,
                                                                )
                                                            }
                                                            disabled={
                                                                hasReachedLimit
                                                            }
                                                            className="h-10 max-w-xs text-sm md:h-11 md:text-base"
                                                        />
                                                        {selectedType?.is_per_page && (
                                                            <FieldDescription className="text-xs md:text-sm">
                                                                Number of pages
                                                                required
                                                            </FieldDescription>
                                                        )}
                                                        {errors.quantity && (
                                                            <p className="mt-1 text-xs text-destructive md:text-sm">
                                                                {
                                                                    errors.quantity
                                                                }
                                                            </p>
                                                        )}
                                                    </Field>
                                                </div>

                                                <Separator className="my-4 md:my-6" />

                                                {/* Purpose Section */}
                                                <div className="space-y-3 md:space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-sm font-medium md:text-base">
                                                            Purpose
                                                        </h3>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <HelpCircle className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-xs">
                                                                <p className="text-xs md:text-sm">
                                                                    Select or
                                                                    specify the
                                                                    purpose of
                                                                    your request
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                    <Field>
                                                        <FieldLabel
                                                            htmlFor="purpose"
                                                            className="text-sm md:text-base"
                                                        >
                                                            Purpose *
                                                        </FieldLabel>
                                                        <Select
                                                            name="purpose"
                                                            defaultValue=""
                                                            onValueChange={(
                                                                value,
                                                            ) => {
                                                                setSelectedPurpose(
                                                                    value,
                                                                );
                                                                if (
                                                                    value !==
                                                                    'Other (please specify)'
                                                                ) {
                                                                    setCustomPurpose(
                                                                        '',
                                                                    );
                                                                }
                                                            }}
                                                            disabled={
                                                                hasReachedLimit
                                                            }
                                                        >
                                                            <SelectTrigger
                                                                id="purpose"
                                                                className="h-10 md:h-11"
                                                            >
                                                                <SelectValue placeholder="Select purpose" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {purposeOptions.map(
                                                                    (
                                                                        option,
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                option
                                                                            }
                                                                            value={
                                                                                option
                                                                            }
                                                                            className="text-sm md:text-base"
                                                                        >
                                                                            {
                                                                                option
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        <FieldDescription className="text-xs md:text-sm">
                                                            Select the purpose
                                                            of this document
                                                            request.
                                                        </FieldDescription>
                                                        {errors.purpose && (
                                                            <p className="mt-1 text-xs text-destructive md:text-sm">
                                                                {errors.purpose}
                                                            </p>
                                                        )}
                                                    </Field>

                                                    {selectedPurpose ===
                                                        'Other (please specify)' && (
                                                        <Field>
                                                            <FieldLabel
                                                                htmlFor="custom_purpose"
                                                                className="text-sm md:text-base"
                                                            >
                                                                Please specify *
                                                            </FieldLabel>
                                                            <Input
                                                                id="custom_purpose"
                                                                name="custom_purpose"
                                                                type="text"
                                                                placeholder="Enter your specific purpose..."
                                                                value={
                                                                    customPurpose
                                                                }
                                                                onChange={(e) =>
                                                                    setCustomPurpose(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                disabled={
                                                                    hasReachedLimit
                                                                }
                                                                className="h-10 text-sm md:h-11 md:text-base"
                                                            />
                                                            <FieldDescription className="text-xs md:text-sm">
                                                                Provide more
                                                                details about
                                                                your purpose.
                                                            </FieldDescription>
                                                        </Field>
                                                    )}
                                                </div>

                                                <Separator className="my-4 md:my-6" />

                                                {/* Submit Section */}
                                                <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                                                    <Button
                                                        type="submit"
                                                        disabled={
                                                            hasReachedLimit ||
                                                            processing
                                                        }
                                                        size="lg"
                                                        className="h-11 w-full min-w-[140px] text-sm sm:w-auto md:h-12 md:text-base"
                                                    >
                                                        {processing ? (
                                                            <>
                                                                <Spinner className="mr-2 h-4 w-4" />
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                                Submit Request
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </Form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-4 md:space-y-6 xl:mt-0">
                            {/* Cost Summary */}
                            {selectedType && (
                                <Card>
                                    <CardHeader className="pb-3 md:pb-4">
                                        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                                            <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
                                            Cost Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 md:space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs md:text-sm">
                                                <span className="text-muted-foreground">
                                                    Unit Price:
                                                </span>
                                                <span>
                                                    {selectedType.price_label}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-xs md:text-sm">
                                                <span className="text-muted-foreground">
                                                    Quantity:
                                                </span>
                                                <span>
                                                    {quantity}{' '}
                                                    {selectedType.is_per_page
                                                        ? 'page(s)'
                                                        : 'copy(ies)'}
                                                </span>
                                            </div>
                                            <Separator className="my-2" />
                                            <div className="flex justify-between text-sm font-semibold md:text-lg">
                                                <span>Total Amount:</span>
                                                <span className="text-success">
                                                    ₱{calculateAmount()}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Processing Info */}
                            {selectedType && (
                                <Card>
                                    <CardHeader className="pb-3 md:pb-4">
                                        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                                            <Clock className="h-4 w-4 md:h-5 md:w-5" />
                                            Processing Info
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 md:space-y-3">
                                        <div className="flex items-center gap-2 text-xs md:text-sm">
                                            <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-green-500 md:h-4 md:w-4" />
                                            <span>
                                                Processing time:{' '}
                                                {selectedType.processing_time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs md:text-sm">
                                            <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-green-500 md:h-4 md:w-4" />
                                            <span>
                                                Digital delivery available
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs md:text-sm">
                                            <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-green-500 md:h-4 md:w-4" />
                                            <span>
                                                Official university seal
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Help Card */}
                            <Card>
                                <CardHeader className="pb-3 md:pb-4">
                                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                                        <HelpCircle className="h-4 w-4 md:h-5 md:w-5" />
                                        Need Help?
                                    </CardTitle>
                                    <CardDescription className="text-xs md:text-sm">
                                        If you have questions about document
                                        types or the request process, please
                                        contact the registrar's office.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-4 md:px-6">
                                    <ItemGroup>
                                        <Item className="py-2 md:py-3">
                                            <ItemMedia>
                                                <Clock className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemDescription className="text-xs md:text-sm">
                                                    Documents are processed in
                                                    the order received
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                        <Item className="py-2 md:py-3">
                                            <ItemMedia>
                                                <Info className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemDescription className="text-xs md:text-sm">
                                                    Processing times may vary
                                                    during peak periods
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                        <Item className="py-2 md:py-3">
                                            <ItemMedia>
                                                <CheckCircle2 className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemDescription className="text-xs md:text-sm">
                                                    All requests are subject to
                                                    approval
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                    </ItemGroup>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </TooltipProvider>
    );
}
