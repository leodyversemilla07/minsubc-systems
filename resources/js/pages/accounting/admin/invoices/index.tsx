import { Head, Link } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Invoice {
    id: number;
    invoice_number: string;
    status: string;
    issued_date: string;
    due_date: string;
    total_amount: number;
    paid_amount: number;
    assessment?: {
        assessment_code: string;
        assessable?: { first_name?: string; last_name?: string };
    } | null;
}

export default function Index({
    invoices,
}: {
    invoices: { data: Invoice[]; links: unknown[] };
}) {
    return (
        <AppLayout>
            <Head title="Invoices" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Invoices</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Number</TableHead>
                            <TableHead>Assessment</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Issued</TableHead>
                            <TableHead>Due</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Paid</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.data.map((i) => (
                            <TableRow key={i.id}>
                                <TableCell className="font-mono text-sm">
                                    {i.invoice_number}
                                </TableCell>
                                <TableCell>
                                    {i.assessment?.assessment_code || '—'}
                                </TableCell>
                                <TableCell>
                                    {i.assessment?.assessable
                                        ? `${i.assessment.assessable.first_name ?? ''} ${i.assessment.assessable.last_name ?? ''}`
                                        : '—'}
                                </TableCell>
                                <TableCell>{i.issued_date || '—'}</TableCell>
                                <TableCell>{i.due_date || '—'}</TableCell>
                                <TableCell className="text-right">
                                    ₱{(i.total_amount ?? 0).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    ₱{(i.paid_amount ?? 0).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Badge>{i.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={route(
                                            'accounting.admin.invoices.show',
                                            i.id,
                                        )}
                                    >
                                        <Button variant="outline" size="sm">
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {invoices.data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    No invoices.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
