import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    CreditCard,
    CheckCircle,
    Building,
    Loader2,
} from 'lucide-react';
import { useState } from 'react';

interface Fee {
    name: string;
    amount: number;
}

interface Payment {
    id: number;
    amount: number;
    reference_number: string | null;
    payment_method: string | null;
    status: string;
    created_at: string;
}

interface EnrollmentInfo {
    id: number;
    academic_year: string;
    semester: string;
    status: string;
}

interface PaymentPageProps extends PageProps {
    enrollment: EnrollmentInfo;
    fees: Fee[];
    totalFees: number;
    totalPaid: number;
    balance: number;
    payments: Payment[];
}

export default function StudentPayment({
    enrollment,
    fees,
    totalFees,
    totalPaid,
    balance,
    payments,
}: PaymentPageProps) {
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'bank_deposit' | null>(null);
    const payPercent = totalFees > 0 ? Math.min(100, (totalPaid / totalFees) * 100) : 0;

    const { data, setData, post, processing, errors } = useForm({
        method: 'online',
        amount: balance.toString(),
        reference_number: '',
        deposit_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('student.enrollment.payment.submit', enrollment.id), {
            preserveScroll: true,
            onSuccess: () => setPaymentMethod(null),
        });
    };

    return (
        <>
            <Head title="Payment" />

            <div className="space-y-6 p-6 max-w-4xl mx-auto">
                <div>
                    <Link href={route('student.enrollment.index')} className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Payment</h1>
                    <p className="text-muted-foreground">Pay your enrollment fees</p>
                </div>

                {/* Payment Summary */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Fees Breakdown */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="mb-4 text-lg font-semibold">Fees Breakdown</h3>
                            <div className="space-y-3">
                                {fees.map((fee, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">{fee.name}</span>
                                        <span className="font-medium">₱{fee.amount.toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="border-t pt-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Total</span>
                                        <span className="text-xl font-bold text-blue-600">₱{totalFees.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Status */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="mb-4 text-lg font-semibold">Payment Status</h3>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Total Fees</span>
                                    <span className="font-medium">₱{totalFees.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Amount Paid</span>
                                    <span className="font-medium text-green-600">₱{totalPaid.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Balance</span>
                                    <span className={`text-xl font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        ₱{balance.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <Progress value={payPercent} className="h-3" />
                                <p className="mt-1 text-center text-xs text-muted-foreground">{Math.round(payPercent)}% Paid</p>
                            </div>

                            {balance > 0 ? (
                                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        Please pay your remaining balance of <strong>₱{balance.toLocaleString()}</strong> to complete your enrollment.
                                    </p>
                                </div>
                            ) : (
                                <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
                                    <p className="text-sm text-green-800 dark:text-green-200">
                                        <CheckCircle className="mr-1 inline h-4 w-4" /> Your enrollment is fully paid!
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Options */}
                {balance > 0 && (
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="mb-4 text-lg font-semibold">Payment Options</h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Online Payment Card */}
                                <div
                                    className={`rounded-lg border p-4 cursor-pointer transition hover:border-blue-300 ${paymentMethod === 'online' ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}
                                    onClick={() => setPaymentMethod('online')}
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                            <CreditCard className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Pay Online (GCash/GrabPay)</h4>
                                            <p className="text-sm text-muted-foreground">Pay via PayMongo</p>
                                        </div>
                                    </div>

                                    {paymentMethod === 'online' && (
                                        <form onSubmit={handleSubmit} className="mt-3 space-y-3" onClick={(e) => e.stopPropagation()}>
                                            <input type="hidden" name="method" value="online" />
                                            <div>
                                                <label className="mb-1 block text-sm text-muted-foreground">Amount to Pay</label>
                                                <Input
                                                    type="number"
                                                    value={data.amount}
                                                    onChange={(e) => setData('amount', e.target.value)}
                                                    min={1}
                                                    max={balance}
                                                    step={0.01}
                                                />
                                            </div>
                                            <Button type="submit" className="w-full" disabled={processing}>
                                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Pay ₱{parseFloat(data.amount || '0').toLocaleString()}
                                            </Button>
                                        </form>
                                    )}
                                </div>

                                {/* Bank Deposit Card */}
                                <div
                                    className={`rounded-lg border p-4 cursor-pointer transition hover:border-green-300 ${paymentMethod === 'bank_deposit' ? 'border-green-500 ring-2 ring-green-200' : ''}`}
                                    onClick={() => setPaymentMethod('bank_deposit')}
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                                            <Building className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Bank Deposit / OTC</h4>
                                            <p className="text-sm text-muted-foreground">Manual payment with reference</p>
                                        </div>
                                    </div>

                                    <div className="mb-3 rounded-lg bg-muted p-3">
                                        <p className="text-sm"><strong>Bank:</strong> BDO</p>
                                        <p className="text-sm"><strong>Account Name:</strong> MinSU BC Systems</p>
                                        <p className="text-sm"><strong>Account Number:</strong> 1234-5678-9012</p>
                                    </div>

                                    {paymentMethod === 'bank_deposit' && (
                                        <form onSubmit={handleSubmit} className="mt-3 space-y-3" onClick={(e) => e.stopPropagation()}>
                                            <input type="hidden" name="method" value="bank_deposit" />
                                            <div>
                                                <label className="mb-1 block text-sm text-muted-foreground">Reference Number</label>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter deposit reference"
                                                    value={data.reference_number}
                                                    onChange={(e) => setData('reference_number', e.target.value)}
                                                    required
                                                />
                                                {errors.reference_number && <p className="text-sm text-destructive mt-1">{errors.reference_number}</p>}
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm text-muted-foreground">Amount</label>
                                                <Input
                                                    type="number"
                                                    value={data.amount}
                                                    onChange={(e) => setData('amount', e.target.value)}
                                                    min={1}
                                                    max={balance}
                                                    step={0.01}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm text-muted-foreground">Deposit Date</label>
                                                <Input
                                                    type="date"
                                                    value={data.deposit_date}
                                                    onChange={(e) => setData('deposit_date', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <Button type="submit" className="w-full" variant="secondary" disabled={processing}>
                                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Submit Payment Details
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Payment History */}
                {payments.length > 0 && (
                    <Card>
                        <div className="border-b px-6 py-4">
                            <h3 className="text-lg font-semibold">Payment History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Reference</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Method</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium uppercase text-muted-foreground">Amount</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium uppercase text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {payments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-muted/30">
                                            <td className="px-4 py-3 text-sm">{payment.created_at}</td>
                                            <td className="px-4 py-3 text-sm font-mono">{payment.reference_number || 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm capitalize">{payment.payment_method?.replace(/_/g, ' ') || 'N/A'}</td>
                                            <td className="px-4 py-3 text-right font-medium">₱{payment.amount.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-center">
                                                {payment.status === 'verified' && <Badge variant="success">Verified</Badge>}
                                                {payment.status === 'pending' && <Badge variant="secondary">Pending</Badge>}
                                                {payment.status === 'rejected' && <Badge variant="destructive">Rejected</Badge>}
                                                {!['verified', 'pending', 'rejected'].includes(payment.status) && (
                                                    <Badge variant="outline">{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</Badge>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
}

StudentPayment.layout = (page: React.ReactNode) => <AppLayout children={page} />;