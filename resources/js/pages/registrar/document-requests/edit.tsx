import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calculator } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { show } from '@/routes/registrar/document-requests';
import { update } from '@/routes/registrar/document-requests';
import { index } from '@/routes/registrar/document-requests';
import { type BreadcrumbItem } from '@/types';

interface DocumentRequest {
    id: number;
    request_number: string;
    document_type: string;
    processing_type: string;
    quantity: number;
    purpose: string;
    amount: number;
}

interface Props {
    request: DocumentRequest;
    documentTypes: Record<string, string>;
    processingTypes: Record<string, { label: string; days: string; price: number }>;
}

export default function Edit({ request, documentTypes, processingTypes }: Props) {
    const [calculatedAmount, setCalculatedAmount] = useState(request.amount);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Document Requests',
            href: index().url,
        },
        {
            title: `Request ${request.request_number}`,
            href: show(request.id).url,
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
                            <CardTitle className="text-lg">Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <Form
                                action={update(request.id)}
                                method="patch"
                                onSuccess={() => toast.success('Request updated successfully!')}
                                onBefore={() => {
                                    // Calculate amount before submission
                                    const form = document.querySelector('form') as HTMLFormElement;
                                    if (form) {
                                        const formData = new FormData(form);
                                        const processingType = formData.get('processing_type') as string;
                                        const quantity = parseInt(formData.get('quantity') as string) || 1;
                                        const basePrice = processingTypes[processingType]?.price || 50;
                                        setCalculatedAmount(basePrice * quantity);
                                    }
                                }}
                            >
                                {({
                                    errors,
                                    processing
                                }) => (
                                    <div className="space-y-6">
                                        <div>
                                            <Field>
                                                <FieldLabel htmlFor="document_type">Document Type *</FieldLabel>
                                                <Select name="document_type" defaultValue={request.document_type}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(documentTypes).map(([key, label]) => (
                                                            <SelectItem key={key} value={key}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.document_type && (
                                                    <FieldDescription className="text-destructive">{errors.document_type}</FieldDescription>
                                                )}
                                            </Field>
                                        </div>

                                        <div>
                                            <Field>
                                                <FieldLabel htmlFor="processing_type">Processing Type *</FieldLabel>
                                                <Select
                                                    name="processing_type"
                                                    defaultValue={request.processing_type}
                                                    onValueChange={(value) => {
                                                        const quantity = parseInt((document.querySelector('input[name="quantity"]') as HTMLInputElement)?.value) || request.quantity;
                                                        const basePrice = processingTypes[value]?.price || 50;
                                                        setCalculatedAmount(basePrice * quantity);
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(processingTypes).map(([key, type]) => (
                                                            <SelectItem key={key} value={key}>
                                                                {type.label} - {type.days} - ₱{type.price}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.processing_type && (
                                                    <FieldDescription className="text-destructive">{errors.processing_type}</FieldDescription>
                                                )}
                                            </Field>
                                        </div>

                                        <div>
                                            <Field>
                                                <FieldLabel htmlFor="quantity">Quantity *</FieldLabel>
                                                <Input
                                                    name="quantity"
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    defaultValue={request.quantity}
                                                    onChange={(e) => {
                                                        const quantity = parseInt(e.target.value) || 1;
                                                        const processingType = (document.querySelector('select[name="processing_type"]') as HTMLSelectElement)?.value || request.processing_type;
                                                        const basePrice = processingTypes[processingType]?.price || 50;
                                                        setCalculatedAmount(basePrice * quantity);
                                                    }}
                                                />
                                                {errors.quantity && (
                                                    <FieldDescription className="text-destructive">{errors.quantity}</FieldDescription>
                                                )}
                                            </Field>
                                        </div>

                                        <div>
                                            <Field>
                                                <FieldLabel htmlFor="purpose">Purpose *</FieldLabel>
                                                <Textarea
                                                    name="purpose"
                                                    defaultValue={request.purpose}
                                                    placeholder="Please specify the purpose of this document request..."
                                                    rows={4}
                                                />
                                                {errors.purpose && (
                                                    <FieldDescription className="text-destructive">{errors.purpose}</FieldDescription>
                                                )}
                                            </Field>
                                        </div>

                                        <div className="bg-muted p-4 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">Updated Amount:</span>
                                                <span className="text-2xl font-bold text-success">
                                                    ₱{calculatedAmount}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Amount will be recalculated based on processing type and quantity.
                                            </p>
                                        </div>

                                        <div className="flex justify-end space-x-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const processingType = (document.querySelector('select[name="processing_type"]') as HTMLSelectElement)?.value || request.processing_type;
                                                    const quantity = parseInt((document.querySelector('input[name="quantity"]') as HTMLInputElement)?.value) || request.quantity;
                                                    const basePrice = processingTypes[processingType]?.price || 50;
                                                    setCalculatedAmount(basePrice * quantity);
                                                }}
                                                disabled={processing}
                                            >
                                                <Calculator className="w-4 h-4 mr-2" />
                                                Recalculate
                                            </Button>
                                            <Button type="submit" disabled={processing}>
                                                {processing ? 'Updating...' : 'Update Request'}
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