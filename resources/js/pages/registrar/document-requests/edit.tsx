import { Head, Link, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calculator } from 'lucide-react';
import { useState } from 'react';
import { show } from '@/routes/registrar/document-requests';
import { update } from '@/routes/registrar/document-requests';

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

    return (
        <>
            <Head title={`Edit Request ${request.request_number}`} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-6">
                    <Button variant="outline" size="sm" asChild className="mr-4">
                        <Link href={show(request.id)}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold">Edit Document Request</h1>
                        <p className="text-gray-600">Request {request.request_number}</p>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Request Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={update(request.id)}
                                method="patch"
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
                                    processing,
                                    wasSuccessful
                                }) => (
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="document_type">Document Type *</Label>
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
                                                <p className="text-sm text-red-600 mt-1">{errors.document_type}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="processing_type">Processing Type *</Label>
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
                                                <p className="text-sm text-red-600 mt-1">{errors.processing_type}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="quantity">Quantity *</Label>
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
                                                <p className="text-sm text-red-600 mt-1">{errors.quantity}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="purpose">Purpose *</Label>
                                            <Textarea
                                                name="purpose"
                                                defaultValue={request.purpose}
                                                placeholder="Please specify the purpose of this document request..."
                                                rows={4}
                                            />
                                            {errors.purpose && (
                                                <p className="text-sm text-red-600 mt-1">{errors.purpose}</p>
                                            )}
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">Updated Amount:</span>
                                                <span className="text-2xl font-bold text-green-600">
                                                    ₱{calculatedAmount}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">
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

                                        {wasSuccessful && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                                                Request updated successfully!
                                            </div>
                                        )}
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