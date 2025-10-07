import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { Search, CheckCircle, XCircle, Receipt } from 'lucide-react';
import { toast } from 'sonner';
import { cashierDashboard, verifyPayment, confirmCashPayment } from '@/routes/registrar/cashier';

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

export default function Dashboard() {
    const [paymentReference, setPaymentReference] = useState('');
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!paymentReference.trim()) {
            setError('Please enter a payment reference number');
            return;
        }

        setVerifying(true);
        setError('');
        setPaymentDetails(null);

        try {
            const response = await fetch(verifyPayment(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ payment_reference: paymentReference }),
            });

            const data = await response.json();

            if (data.success) {
                setPaymentDetails(data.payment);
                toast.success('Payment reference verified successfully');
            } else {
                setError(data.message || 'Payment reference not found');
            }
        } catch (err) {
            setError('Failed to verify payment reference');
        } finally {
            setVerifying(false);
        }
    };

    const handleConfirm = async () => {
        if (!paymentDetails) return;

        setLoading(true);
        try {
            const response = await fetch(confirmCashPayment(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ payment_reference: paymentDetails.reference }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Payment confirmed successfully');
                setPaymentDetails(null);
                setPaymentReference('');
            } else {
                toast.error(data.message || 'Failed to confirm payment');
            }
        } catch (err) {
            toast.error('Failed to confirm payment');
        } finally {
            setLoading(false);
        }
    };

    const formatDocumentType = (type: string) => {
        const types: Record<string, string> = {
            'coe': 'Certificate of Enrollment',
            'cog': 'Certificate of Grades',
            'tor': 'Transcript of Records',
            'honorable_dismissal': 'Honorable Dismissal',
            'certificate_good_moral': 'Certificate of Good Moral Character',
            'cav': 'Certificate of Authentication and Verification',
            'diploma': 'Diploma (Certified True Copy)',
            'so': 'Special Order',
            'form_137': 'Form 137',
        };
        return types[type] || type;
    };

    return (
        <>
            <Head title="Cashier Dashboard" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-6">
                    <Receipt className="w-8 h-8 mr-3 text-primary" />
                    <h1 className="text-3xl font-bold">Cashier Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Payment Verification Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Search className="w-5 h-5 mr-2" />
                                Verify Payment Reference
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Field>
                                <FieldLabel htmlFor="payment_reference">Payment Reference Number</FieldLabel>
                                <div className="flex space-x-2">
                                    <Input
                                        id="payment_reference"
                                        value={paymentReference}
                                        onChange={(e) => setPaymentReference(e.target.value.toUpperCase())}
                                        placeholder="Enter PRN (e.g., PRN-20251007-0001)"
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleVerify}
                                        disabled={verifying}
                                        variant="outline"
                                    >
                                        {verifying ? (
                                            <Spinner className="w-4 h-4" />
                                        ) : (
                                            <Search className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            </Field>

                            {error && (
                                <Alert variant="destructive">
                                    <XCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    {/* Payment Details Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {paymentDetails ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Reference</label>
                                            <p className="font-mono text-sm">{paymentDetails.reference}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Amount</label>
                                            <p className="text-lg font-bold text-success">₱{paymentDetails.amount}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Request #</label>
                                            <p className="font-medium">{paymentDetails.request_number}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                                            <p className="font-medium">{paymentDetails.student_id}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                                        <p className="font-medium">{paymentDetails.student_name}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Document Type</label>
                                        <Badge variant="secondary">{formatDocumentType(paymentDetails.document_type)}</Badge>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Request Date</label>
                                        <p className="text-sm">{new Date(paymentDetails.created_at).toLocaleString()}</p>
                                    </div>

                                    <Button
                                        onClick={handleConfirm}
                                        disabled={loading}
                                        className="w-full"
                                        size="lg"
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner className="w-4 h-4 mr-2" />
                                                Confirming...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Confirm Payment
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Enter a payment reference number to view details</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}