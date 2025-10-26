import { Alert, AlertDescription } from '@/components/ui/alert';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { index, show, update } from '@/routes/registrar/document-requests';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
    DollarSign,
    Edit3,
    FileText,
    HelpCircle,
    Info,
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

interface DocumentRequest {
    id: number;
    request_number: string;
    document_type: string;
    quantity: number;
    purpose: string;
    amount: number;
}

interface Props {
    request: DocumentRequest;
    documentTypes: DocumentTypeData[];
}

export default function Edit({ request, documentTypes }: Props) {
    const initialType = documentTypes.find(
        (t) => t.value === request.document_type,
    );
    const [selectedType, setSelectedType] = useState<DocumentTypeData | null>(
        initialType || null,
    );
    const [quantity, setQuantity] = useState(request.quantity);

    // Extract purpose - check if it starts with "Other: "
    const isOtherPurpose = request.purpose.startsWith('Other: ');
    const initialPurpose = isOtherPurpose
        ? 'Other (please specify)'
        : request.purpose;
    const initialCustomPurpose = isOtherPurpose
        ? request.purpose.replace('Other: ', '')
        : '';

    const [selectedPurpose, setSelectedPurpose] =
        useState<string>(initialPurpose);
    const [customPurpose, setCustomPurpose] =
        useState<string>(initialCustomPurpose);

    const purposeOptions = [
        'Scholarship',
        'Provincial scholarship',
        'Municipal scholarship',
        'Educational assistance',
        'Financial assistance',
        'Other (please specify)',
    ];

    const calculateAmount = () => {
        if (!selectedType) return request.amount;
        return selectedType.price * quantity;
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Document Requests',
            href: index().url,
        },
        {
            title: `Request ${request.request_number}`,
            href: show(request.request_number).url,
        },
        {
            title: 'Edit',
            href: '#',
        },
    ];

    return (
        <TooltipProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`Edit Request ${request.request_number}`} />

                <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                    {/* Enhanced Header */}
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 md:h-10 md:w-10">
                                    <Edit3 className="h-4 w-4 text-primary md:h-5 md:w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
                                        Edit Document Request
                                    </h1>
                                    <p className="text-sm text-muted-foreground md:text-base">
                                        Request {request.request_number}
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
                                    Editing Request
                                </span>
                                <span className="sm:hidden">Editing</span>
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-3">
                        {/* Main Form */}
                        <div className="space-y-6 md:space-y-8 xl:col-span-2">
                            {/* Request Status Card */}
                            <Card className="mb-4 md:mb-6">
                                <CardHeader className="pb-3">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                            <CardTitle className="text-sm md:text-base">
                                                Request Status
                                            </CardTitle>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="self-start text-xs"
                                        >
                                            Editable
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3 md:space-y-4">
                                    <Alert className="text-xs md:text-sm">
                                        <Info className="h-3 w-3 md:h-4 md:w-4" />
                                        <AlertDescription className="text-xs md:text-sm">
                                            You can modify the document type,
                                            quantity, and purpose of this
                                            request. Changes will recalculate
                                            the total amount.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>

                            {/* Edit Form */}
                            <Card className="transition-shadow hover:shadow-md">
                                <CardHeader className="pb-4 md:pb-6">
                                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                                        <FileText className="h-4 w-4 md:h-5 md:w-5" />
                                        Update Request Details
                                    </CardTitle>
                                    <CardDescription className="text-sm md:text-base">
                                        Modify the details of your document
                                        request
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-4 md:px-6">
                                    <Form
                                        action={
                                            update(request.request_number).url
                                        }
                                        method="patch"
                                        onSuccess={() =>
                                            toast.success(
                                                'Request updated successfully!',
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
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <HelpCircle className="h-3 w-3 cursor-help text-muted-foreground md:h-4 md:w-4" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-xs md:text-sm">
                                                                    Select the
                                                                    type of
                                                                    document you
                                                                    need.
                                                                    Changing
                                                                    this will
                                                                    update the
                                                                    pricing.
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
                                                            defaultValue={
                                                                request.document_type
                                                            }
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
                                                        >
                                                            <SelectTrigger className="h-10 md:h-11">
                                                                <SelectValue />
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
                                                                        >
                                                                            {
                                                                                type.label
                                                                            }{' '}
                                                                            -{' '}
                                                                            {
                                                                                type.price_label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        {selectedType && (
                                                            <FieldDescription className="text-xs md:text-sm">
                                                                {
                                                                    selectedType.price_label
                                                                }{' '}
                                                                • Processing
                                                                time:{' '}
                                                                {
                                                                    selectedType.processing_time
                                                                }
                                                            </FieldDescription>
                                                        )}
                                                        {errors.document_type && (
                                                            <FieldDescription className="text-xs text-destructive md:text-sm">
                                                                {
                                                                    errors.document_type
                                                                }
                                                            </FieldDescription>
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
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <HelpCircle className="h-3 w-3 cursor-help text-muted-foreground md:h-4 md:w-4" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-xs md:text-sm">
                                                                    Specify how
                                                                    many copies
                                                                    or pages you
                                                                    need.
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
                                                            defaultValue={
                                                                request.quantity
                                                            }
                                                            onChange={(e) =>
                                                                setQuantity(
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                    ) || 1,
                                                                )
                                                            }
                                                            className="h-10 max-w-xs text-sm md:h-11 md:text-base"
                                                        />
                                                        {selectedType?.is_per_page && (
                                                            <FieldDescription className="text-xs md:text-sm">
                                                                Number of pages
                                                            </FieldDescription>
                                                        )}
                                                        {!selectedType?.is_per_page && (
                                                            <FieldDescription className="text-xs md:text-sm">
                                                                Number of copies
                                                            </FieldDescription>
                                                        )}
                                                        {errors.quantity && (
                                                            <FieldDescription className="text-xs text-destructive md:text-sm">
                                                                {
                                                                    errors.quantity
                                                                }
                                                            </FieldDescription>
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
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <HelpCircle className="h-3 w-3 cursor-help text-muted-foreground md:h-4 md:w-4" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-xs md:text-sm">
                                                                    Select or
                                                                    specify the
                                                                    purpose for
                                                                    this
                                                                    document
                                                                    request.
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
                                                            defaultValue={
                                                                initialPurpose
                                                            }
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
                                                        >
                                                            <SelectTrigger className="h-10 md:h-11">
                                                                <SelectValue />
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
                                                            <FieldDescription className="text-xs text-destructive md:text-sm">
                                                                {errors.purpose}
                                                            </FieldDescription>
                                                        )}
                                                    </Field>

                                                    {selectedPurpose ===
                                                        'Other (please specify)' && (
                                                        <div className="space-y-2">
                                                            <Field>
                                                                <FieldLabel
                                                                    htmlFor="custom_purpose"
                                                                    className="text-sm md:text-base"
                                                                >
                                                                    Please
                                                                    specify *
                                                                </FieldLabel>
                                                                <Input
                                                                    id="custom_purpose"
                                                                    name="custom_purpose"
                                                                    type="text"
                                                                    placeholder="Enter your specific purpose..."
                                                                    value={
                                                                        customPurpose
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setCustomPurpose(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    className="h-10 text-sm md:h-11 md:text-base"
                                                                />
                                                                <FieldDescription className="text-xs md:text-sm">
                                                                    Provide more
                                                                    details
                                                                    about your
                                                                    purpose.
                                                                </FieldDescription>
                                                            </Field>
                                                        </div>
                                                    )}
                                                </div>

                                                <Separator className="my-4 md:my-6" />

                                                {/* Submit Section */}
                                                <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                                                    <Button
                                                        type="submit"
                                                        disabled={processing}
                                                        size="lg"
                                                        className="h-11 w-full min-w-[140px] text-sm sm:w-auto md:h-12 md:text-base"
                                                    >
                                                        {processing ? (
                                                            <>
                                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                                Updating...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Edit3 className="mr-2 h-4 w-4" />
                                                                Update Request
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
                                            Updated Cost Summary
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
                                                <span>New Total:</span>
                                                <span className="text-success">
                                                    ₱{calculateAmount()}
                                                </span>
                                            </div>
                                            {calculateAmount() !==
                                                request.amount && (
                                                <div className="flex justify-between text-xs text-muted-foreground md:text-sm">
                                                    <span>
                                                        Original Amount:
                                                    </span>
                                                    <span>
                                                        ₱{request.amount}
                                                    </span>
                                                </div>
                                            )}
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
                                        If you have questions about editing your
                                        request, please contact the registrar's
                                        office.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-4 md:px-6">
                                    <ItemGroup>
                                        <Item className="py-2 md:py-3">
                                            <ItemMedia>
                                                <Edit3 className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemDescription className="text-xs md:text-sm">
                                                    You can only edit requests
                                                    that are pending payment
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                        <Item className="py-2 md:py-3">
                                            <ItemMedia>
                                                <DollarSign className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemDescription className="text-xs md:text-sm">
                                                    Changing document type or
                                                    quantity will update the
                                                    total cost
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                        <Item className="py-2 md:py-3">
                                            <ItemMedia>
                                                <Clock className="h-3 w-3 text-muted-foreground md:h-4 md:w-4" />
                                            </ItemMedia>
                                            <ItemContent>
                                                <ItemDescription className="text-xs md:text-sm">
                                                    Processing times may vary
                                                    based on document type
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
