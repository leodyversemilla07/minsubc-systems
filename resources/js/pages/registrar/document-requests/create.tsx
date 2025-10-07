import { Head, Link, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calculator } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { index } from '@/routes/registrar/document-requests';
import { store } from '@/routes/registrar/document-requests';

interface Props {
    documentTypes: Record<string, string>;
    processingTypes: Record<string, { label: string; days: string; price: number }>;
}

export default function Create({ documentTypes, processingTypes }: Props) {
    const [calculatedAmount, setCalculatedAmount] = useState(0);

    return (
        <>
            <Head title="New Document Request" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-6">
                    <Button variant="outline" size="sm" asChild className="mr-4">
                        <Link href={index()}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold">New Document Request</h1>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Request Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={store()}
                                method="post"
                                onSuccess={() => toast.success('Request submitted successfully!')}
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
                                        <Field>
                                            <FieldLabel htmlFor="document_type">Document Type *</FieldLabel>
                                            <Select name="document_type" defaultValue="">
                                                <SelectTrigger id="document_type">
                                                    <SelectValue placeholder="Select document type" />
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
                                                <p className="text-sm text-destructive mt-1">{errors.document_type}</p>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="processing_type">Processing Type *</FieldLabel>
                                            <Select
                                                name="processing_type"
                                                defaultValue="regular"
                                                onValueChange={(value) => {
                                                    const quantity = parseInt((document.querySelector('input[name="quantity"]') as HTMLInputElement)?.value) || 1;
                                                    const basePrice = processingTypes[value]?.price || 50;
                                                    setCalculatedAmount(basePrice * quantity);
                                                }}
                                            >
                                                <SelectTrigger id="processing_type">
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
                                                <p className="text-sm text-destructive mt-1">{errors.processing_type}</p>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="quantity">Quantity *</FieldLabel>
                                            <Input
                                                id="quantity"
                                                name="quantity"
                                                type="number"
                                                min="1"
                                                max="10"
                                                defaultValue="1"
                                                onChange={(e) => {
                                                    const quantity = parseInt(e.target.value) || 1;
                                                    const processingType = (document.querySelector('select[name="processing_type"]') as HTMLSelectElement)?.value || 'regular';
                                                    const basePrice = processingTypes[processingType]?.price || 50;
                                                    setCalculatedAmount(basePrice * quantity);
                                                }}
                                            />
                                            {errors.quantity && (
                                                <p className="text-sm text-destructive mt-1">{errors.quantity}</p>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="purpose">Purpose *</FieldLabel>
                                            <Textarea
                                                id="purpose"
                                                name="purpose"
                                                placeholder="Please specify the purpose of this document request..."
                                                rows={4}
                                            />
                                            <FieldDescription>This will be reflected in the document's purpose.</FieldDescription>
                                            {errors.purpose && (
                                                <p className="text-sm text-destructive mt-1">{errors.purpose}</p>
                                            )}
                                        </Field>

                                        <div className="bg-muted p-4 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">Estimated Amount:</span>
                                                <span className="text-2xl font-bold text-success">
                                                    ₱{calculatedAmount || 50}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Amount will be calculated based on processing type and quantity.
                                            </p>
                                        </div>

                                        <div className="flex justify-end space-x-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const processingType = (document.querySelector('select[name="processing_type"]') as HTMLSelectElement)?.value || 'regular';
                                                    const quantity = parseInt((document.querySelector('input[name="quantity"]') as HTMLInputElement)?.value) || 1;
                                                    const basePrice = processingTypes[processingType]?.price || 50;
                                                    setCalculatedAmount(basePrice * quantity);
                                                }}
                                                disabled={processing}
                                            >
                                                <Calculator className="w-4 h-4 mr-2" />
                                                Calculate
                                            </Button>
                                            <Button type="submit" disabled={processing}>
                                                {processing ? (
                                                    <>
                                                        <Spinner className="w-4 h-4 mr-2" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    'Submit Request'
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}