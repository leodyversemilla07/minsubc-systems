import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    notes: string | null;
    assessment?: {
        assessment_code: string;
        academic_year: string;
        semester: string;
        assessable?: { first_name?: string; last_name?: string } | null;
        lines?: {
            id: number;
            amount: number;
            fee_item?: { name: string } | null;
        }[];
    } | null;
}

export default function Show({ invoice }: { invoice: Invoice }) {
    return (
        <AppLayout>
            <Head title={`Invoice ${invoice.invoice_number}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.invoices.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">
                        Invoice: {invoice.invoice_number}
                    </h1>
                    <Badge>{invoice.status}</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Invoice Details
                        </h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Issued
                                </dt>
                                <dd>{invoice.issued_date || '—'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Due</dt>
                                <dd>{invoice.due_date || '—'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Total</dt>
                                <dd className="text-lg font-semibold">
                                    ₱
                                    {(
                                        invoice.total_amount ?? 0
                                    ).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Paid</dt>
                                <dd>
                                    ₱
                                    {(
                                        invoice.paid_amount ?? 0
                                    ).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Balance
                                </dt>
                                <dd className="font-semibold">
                                    ₱
                                    {(
                                        (invoice.total_amount ?? 0) -
                                        (invoice.paid_amount ?? 0)
                                    ).toLocaleString()}
                                </dd>
                            </div>
                        </dl>
                        {invoice.notes && (
                            <p className="mt-4 text-sm text-muted-foreground">
                                {invoice.notes}
                            </p>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Assessment
                        </h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Code</dt>
                                <dd className="font-mono text-sm">
                                    {invoice.assessment?.assessment_code || '—'}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Student
                                </dt>
                                <dd>
                                    {invoice.assessment?.assessable
                                        ? `${invoice.assessment.assessable.first_name ?? ''} ${invoice.assessment.assessable.last_name ?? ''}`
                                        : '—'}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Academic Year
                                </dt>
                                <dd>
                                    {invoice.assessment?.academic_year || '—'}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Semester
                                </dt>
                                <dd>{invoice.assessment?.semester || '—'}</dd>
                            </div>
                        </dl>
                    </Card>
                </div>

                <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">Billed Lines</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fee Item</TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(invoice.assessment?.lines ?? []).map((l) => (
                                <TableRow key={l.id}>
                                    <TableCell>
                                        {l.fee_item?.name || '—'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ₱{(l.amount ?? 0).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(invoice.assessment?.lines?.length ?? 0) === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={2}
                                        className="py-8 text-center text-muted-foreground"
                                    >
                                        No lines.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
