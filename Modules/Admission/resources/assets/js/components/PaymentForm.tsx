import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
    CreditCard,
    Banknote,
    Smartphone,
    Building,
    CheckCircle,
    AlertCircle,
    Clock,
} from 'lucide-react';

interface FeeItem {
    id: number;
    name: string;
    type: string;
    amount: number;
    unit: string;
    is_required: boolean;
}

interface PaymentFormProps {
    enrollmentId: number;
    fees: FeeItem[];
    totalAmount: number;
    totalPaid: number;
    balance: number;
    onPaymentRecorded?: () => void;
}

interface PaymentMethod {
    value: string;
    label: string;
    icon: React.ReactNode;
    description: string;
}

const paymentMethods: PaymentMethod[] = [
    {
        value: 'cash',
        label: 'Cash',
        icon: <Banknote className="h-5 w-5" />,
        description: 'Pay at the cashier window',
    },
    {
        value: 'bank_transfer',
        label: 'Bank Transfer',
        icon: <Building className="h-5 w-5" />,
        description: 'Transfer to university bank account',
    },
    {
        value: 'gcash',
        label: 'GCash',
        icon: <Smartphone className="h-5 w-5" />,
        description: 'Pay via GCash',
    },
    {
        value: 'paymaya',
        label: 'PayMaya',
        icon: <Smartphone className="h-5 w-5" />,
        description: 'Pay via PayMaya',
    },
    {
        value: 'card',
        label: 'Credit/Debit Card',
        icon: <CreditCard className="h-5 w-5" />,
        description: 'Pay with card (online only)',
    },
    {
        value: 'online',
        label: 'Online Payment',
        icon: <CreditCard className="h-5 w-5" />,
        description: 'Other online payment methods',
    },
];

export function PaymentForm({
    enrollmentId,
    fees,
    totalAmount,
    totalPaid,
    balance,
    onPaymentRecorded,
}: PaymentFormProps) {
    const [amount, setAmount] = useState(balance.toFixed(2));
    const [method, setMethod] = useState('cash');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [paymentType, setPaymentType] = useState<'full' | 'partial' | 'installment'>('full');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
        paymentMethods[0]
    );

    const handleSubmit = () => {
        if (parseFloat(amount) <= 0) {
            return;
        }

        setIsSubmitting(true);

        router.post(
            route('admission.admin.enrollments.record-payment', enrollmentId),
            {
                amount: parseFloat(amount),
                method,
                reference_number: referenceNumber || null,
                type: paymentType,
                notes: notes || null,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    onPaymentRecorded?.();
                    // Reset form
                    setAmount(balance.toFixed(2));
                    setReferenceNumber('');
                    setNotes('');
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(value);
    };

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Fee Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Fee Summary</CardTitle>
                    <CardDescription>
                        Breakdown of enrollment fees
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {fees.map((fee) => (
                            <div
                                key={fee.id}
                                className="flex items-center justify-between text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span>{fee.name}</span>
                                    {!fee.is_required && (
                                        <Badge variant="secondary" className="text-xs">
                                            Optional
                                        </Badge>
                                    )}
                                </div>
                                <span className="font-medium">
                                    {formatCurrency(fee.amount)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Total Fees</span>
                            <span className="font-medium">
                                {formatCurrency(totalAmount)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Amount Paid</span>
                            <span className="font-medium text-green-600">
                                {formatCurrency(totalPaid)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Balance</span>
                            <span
                                className={`font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}
                            >
                                {formatCurrency(balance)}
                            </span>
                        </div>
                    </div>

                    {balance === 0 && (
                        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Fully Paid
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Record Payment</CardTitle>
                    <CardDescription>
                        Enter payment details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Payment Type */}
                    <div className="space-y-2">
                        <Label>Payment Type</Label>
                        <Select
                            value={paymentType}
                            onValueChange={(v) => setPaymentType(v as typeof paymentType)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full">Full Payment</SelectItem>
                                <SelectItem value="partial">Partial Payment</SelectItem>
                                <SelectItem value="installment">Installment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                ₱
                            </span>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0"
                                max={balance}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="pl-7"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setAmount(balance.toFixed(2))}
                            >
                                Pay Full Balance
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setAmount((balance / 2).toFixed(2))
                                }
                            >
                                Pay Half
                            </Button>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {paymentMethods.map((pm) => (
                                <button
                                    key={pm.value}
                                    type="button"
                                    className={`flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors ${
                                        method === pm.value
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                                    }`}
                                    onClick={() => {
                                        setMethod(pm.value);
                                        setSelectedMethod(pm);
                                    }}
                                >
                                    {pm.icon}
                                    <span className="font-medium">{pm.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reference Number */}
                    <div className="space-y-2">
                        <Label htmlFor="reference">
                            Reference Number
                            {method !== 'cash' && <span className="text-red-500"> *</span>}
                        </Label>
                        <Input
                            id="reference"
                            value={referenceNumber}
                            onChange={(e) => setReferenceNumber(e.target.value)}
                            placeholder={
                                method === 'cash'
                                    ? 'Optional for cash payments'
                                    : `Enter ${selectedMethod?.label} reference number`
                            }
                        />
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Input
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Optional notes"
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            parseFloat(amount) <= 0 ||
                            isSubmitting ||
                            (method !== 'cash' && !referenceNumber)
                        }
                        className="w-full"
                    >
                        {isSubmitting ? 'Recording...' : 'Record Payment'}
                    </Button>

                    <p className="text-xs text-gray-500">
                        <Clock className="mr-1 inline h-3 w-3" />
                        Payments are subject to verification before being
                        confirmed.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}