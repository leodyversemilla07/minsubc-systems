import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { index, show, update } from '@/routes/registrar/document-requests';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Request ${request.request_number}`} />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Edit Document Request
                        </h1>
                        <p className="text-muted-foreground">
                            Request {request.request_number}
                        </p>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="max-w-2xl">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">
                                Request Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <Form
                                action={update(request.request_number).url}
                                method="patch"
                                onSuccess={() =>
                                    toast.success(
                                        'Request updated successfully!',
                                    )
                                }
                            >
                                {({ errors, processing }) => (
                                    <div className="space-y-6">
                                        <div>
                                            <Field>
                                                <FieldLabel htmlFor="document_type">
                                                    Document Type *
                                                </FieldLabel>
                                                <Select
                                                    name="document_type"
                                                    defaultValue={
                                                        request.document_type
                                                    }
                                                    onValueChange={(value) => {
                                                        const type =
                                                            documentTypes.find(
                                                                (t) =>
                                                                    t.value ===
                                                                    value,
                                                            );
                                                        setSelectedType(
                                                            type || null,
                                                        );
                                                    }}
                                                >
                                                    <SelectTrigger>
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
                                                                    {type.label}{' '}
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
                                                    <FieldDescription>
                                                        {
                                                            selectedType.price_label
                                                        }{' '}
                                                        • Processing time:{' '}
                                                        {
                                                            selectedType.processing_time
                                                        }
                                                    </FieldDescription>
                                                )}
                                                {errors.document_type && (
                                                    <FieldDescription className="text-destructive">
                                                        {errors.document_type}
                                                    </FieldDescription>
                                                )}
                                            </Field>
                                        </div>

                                        <div>
                                            <Field>
                                                <FieldLabel htmlFor="quantity">
                                                    Quantity *
                                                </FieldLabel>
                                                <Input
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
                                                                e.target.value,
                                                            ) || 1,
                                                        )
                                                    }
                                                />
                                                {selectedType?.is_per_page && (
                                                    <FieldDescription>
                                                        Number of pages
                                                    </FieldDescription>
                                                )}
                                                {errors.quantity && (
                                                    <FieldDescription className="text-destructive">
                                                        {errors.quantity}
                                                    </FieldDescription>
                                                )}
                                            </Field>
                                        </div>

                                        <div>
                                            <Field>
                                                <FieldLabel htmlFor="purpose">
                                                    Purpose *
                                                </FieldLabel>
                                                <Select
                                                    name="purpose"
                                                    defaultValue={
                                                        initialPurpose
                                                    }
                                                    onValueChange={(value) => {
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
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {purposeOptions.map(
                                                            (option) => (
                                                                <SelectItem
                                                                    key={option}
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FieldDescription>
                                                    Select the purpose of this
                                                    document request.
                                                </FieldDescription>
                                                {errors.purpose && (
                                                    <FieldDescription className="text-destructive">
                                                        {errors.purpose}
                                                    </FieldDescription>
                                                )}
                                            </Field>
                                        </div>

                                        {selectedPurpose ===
                                            'Other (please specify)' && (
                                            <div>
                                                <Field>
                                                    <FieldLabel htmlFor="custom_purpose">
                                                        Please specify *
                                                    </FieldLabel>
                                                    <Input
                                                        name="custom_purpose"
                                                        type="text"
                                                        placeholder="Enter your specific purpose..."
                                                        value={customPurpose}
                                                        onChange={(e) =>
                                                            setCustomPurpose(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                    <FieldDescription>
                                                        Provide more details
                                                        about your purpose.
                                                    </FieldDescription>
                                                </Field>
                                            </div>
                                        )}

                                        {selectedType && (
                                            <div className="rounded-lg bg-muted p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">
                                                        Updated Amount:
                                                    </span>
                                                    <span className="text-2xl font-bold text-success">
                                                        ₱{calculateAmount()}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {selectedType.price_label} ×{' '}
                                                    {quantity}{' '}
                                                    {selectedType.is_per_page
                                                        ? 'page(s)'
                                                        : 'copy(ies)'}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? 'Updating...'
                                                    : 'Update Request'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
