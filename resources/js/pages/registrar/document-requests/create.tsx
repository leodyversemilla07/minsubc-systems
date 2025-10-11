import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/registrar/document-requests';
import { store } from '@/routes/registrar/document-requests';
import { type BreadcrumbItem } from '@/types';

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

export default function Create({ documentTypes, dailyLimit, todayCount, remaining, hasReachedLimit }: Props) {
    const [selectedType, setSelectedType] = useState<DocumentTypeData | null>(null);
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Document Request" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            New Document Request
                        </h1>
                        <p className="text-muted-foreground">
                            Submit a request for official documents
                        </p>
                    </div>
                </div>

                {/* Daily Limit Warning/Info */}
                {hasReachedLimit ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Daily Limit Reached</AlertTitle>
                        <AlertDescription>
                            The maximum number of document requests ({dailyLimit}) for today has been reached. 
                            Please try again tomorrow.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Daily Request Status</AlertTitle>
                        <AlertDescription>
                            {todayCount} of {dailyLimit} requests submitted today. {remaining} requests remaining.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Form */}
                <div className="max-w-2xl">
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader>
                            <CardTitle>Request Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={store()}
                                method="post"
                                onSuccess={() => toast.success('Request submitted successfully!')}
                            >
                                {({
                                    errors,
                                    processing
                                }) => (
                                    <div className="space-y-6">
                                        <Field>
                                            <FieldLabel htmlFor="document_type">Document Type *</FieldLabel>
                                            <Select
                                                name="document_type"
                                                defaultValue=""
                                                onValueChange={(value) => {
                                                    const type = documentTypes.find(t => t.value === value);
                                                    setSelectedType(type || null);
                                                }}
                                                disabled={hasReachedLimit}
                                            >
                                                <SelectTrigger id="document_type">
                                                    <SelectValue placeholder="Select document type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {documentTypes.map((type) => (
                                                        <SelectItem key={type.value} value={type.value}>
                                                            {type.label} - {type.price_label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {selectedType && (
                                                <FieldDescription>
                                                    {selectedType.price_label} • Processing time: {selectedType.processing_time}
                                                </FieldDescription>
                                            )}
                                            {errors.document_type && (
                                                <p className="text-sm text-destructive mt-1">{errors.document_type}</p>
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
                                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                                disabled={hasReachedLimit}
                                            />
                                            {selectedType?.is_per_page && (
                                                <FieldDescription>Number of pages</FieldDescription>
                                            )}
                                            {errors.quantity && (
                                                <p className="text-sm text-destructive mt-1">{errors.quantity}</p>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="purpose">Purpose *</FieldLabel>
                                            <Select
                                                name="purpose"
                                                defaultValue=""
                                                onValueChange={(value) => {
                                                    setSelectedPurpose(value);
                                                    if (value !== 'Other (please specify)') {
                                                        setCustomPurpose('');
                                                    }
                                                }}
                                                disabled={hasReachedLimit}
                                            >
                                                <SelectTrigger id="purpose">
                                                    <SelectValue placeholder="Select purpose" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {purposeOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldDescription>Select the purpose of this document request.</FieldDescription>
                                            {errors.purpose && (
                                                <p className="text-sm text-destructive mt-1">{errors.purpose}</p>
                                            )}
                                        </Field>

                                        {selectedPurpose === 'Other (please specify)' && (
                                            <Field>
                                                <FieldLabel htmlFor="custom_purpose">Please specify *</FieldLabel>
                                                <Input
                                                    id="custom_purpose"
                                                    name="custom_purpose"
                                                    type="text"
                                                    placeholder="Enter your specific purpose..."
                                                    value={customPurpose}
                                                    onChange={(e) => setCustomPurpose(e.target.value)}
                                                    disabled={hasReachedLimit}
                                                />
                                                <FieldDescription>Provide more details about your purpose.</FieldDescription>
                                            </Field>
                                        )}

                                        {selectedType && (
                                            <div className="bg-muted p-4 rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">Total Amount:</span>
                                                    <span className="text-2xl font-bold text-success">
                                                        ₱{calculateAmount()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {selectedType.price_label} × {quantity} {selectedType.is_per_page ? 'page(s)' : 'copy(ies)'}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex justify-end">
                                            <Button type="submit" disabled={hasReachedLimit || processing}>
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
        </AppLayout>
    );
}
