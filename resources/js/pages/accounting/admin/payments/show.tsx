import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Payment {
    id: number;
    payment_code: string;
    amount: number;
    payment_method: string;
    payment_date: string;
    reference_number: string;
    status: string;
    notes: string;
    assessment: {
        assessment_code: string;
        assessable?: { first_name?: string; last_name?: string };
    };
    user?: { name: string };
    allocations?: Array<{
        id: number;
        amount: number;
        assessment_line?: { fee_item?: { name: string } };
    }>;
}

export default function Show({ payment }: { payment: Payment }) {
    return (
        <AppLayout>
            <Head title={`Payment ${payment.payment_code}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.payments.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Payment: {payment.payment_code}</h1>
                    <Badge>{payment.status}</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Payment Details</h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Amount</dt><dd className="font-semibold text-lg">₱{(payment.amount ?? 0).toLocaleString()}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Method</dt><dd className="capitalize">{payment.payment_method}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{payment.payment_date}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Reference</dt><dd>{payment.reference_number || '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Collected By</dt><dd>{payment.user?.name || 'System'}</dd></div>
                        </dl>
                        {payment.notes && <p className="text-muted-foreground mt-4 text-sm">{payment.notes}</p>}
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Assessment</h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Code</dt><dd>{payment.assessment?.assessment_code}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Student</dt><dd>{payment.assessment?.assessable ? `${payment.assessment.assessable.first_name ?? ''} ${payment.assessment.assessable.last_name ?? ''}` : '—'}</dd></div>
                        </dl>
                    </Card>
                </div>

                {payment.allocations && payment.allocations.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Payment Allocation</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fee Item</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payment.allocations.map((a) => (
                                    <TableRow key={a.id}>
                                        <TableCell>{a.assessment_line?.fee_item?.name || '—'}</TableCell>
                                        <TableCell className="text-right">₱{(a.amount ?? 0).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}