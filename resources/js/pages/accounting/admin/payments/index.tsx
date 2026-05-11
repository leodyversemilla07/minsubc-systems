import { Head, Link } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Payment {
    id: number;
    payment_code: string;
    amount: number;
    payment_method: string;
    payment_date: string;
    status: string;
    reference_number: string;
    assessment?: { assessment_code: string };
    user?: { name: string };
}

export default function Index({ payments, filters }: { payments: { data: Payment[]; links: any[] }; filters: { method?: string } }) {
    return (
        <AppLayout>
            <Head title="Payments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Payments</h1>
                    <Link href={route('accounting.admin.payments.create')}>
                        <Button>Record Payment</Button>
                    </Link>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Assessment</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.data.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-mono text-sm">{p.payment_code}</TableCell>
                                <TableCell>{p.assessment?.assessment_code || '—'}</TableCell>
                                <TableCell className="text-right">₱{(p.amount ?? 0).toLocaleString()}</TableCell>
                                <TableCell className="capitalize">{p.payment_method}</TableCell>
                                <TableCell>{p.payment_date}</TableCell>
                                <TableCell><Badge>{p.status}</Badge></TableCell>
                                <TableCell>
                                    <Link href={route('accounting.admin.payments.show', p.id)}>
                                        <Button variant="outline" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}