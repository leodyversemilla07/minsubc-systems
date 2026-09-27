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

interface AssessmentLine {
    id: number;
    amount: number;
    fee_item?: { name: string; category?: { name: string } } | null;
}

interface Assessment {
    id: number;
    assessment_code: string;
    academic_year: string;
    semester: string;
    total_amount: number;
    paid_amount: number;
    status: string;
    due_date: string;
    notes: string | null;
    assessable?: {
        first_name?: string;
        last_name?: string;
        student_id?: string;
    } | null;
    lines?: AssessmentLine[];
    payments?: {
        id: number;
        payment_code: string;
        amount: number;
        payment_method: string;
        payment_date: string;
        status: string;
    }[];
    applied_discounts?: {
        id: number;
        amount: number;
        discount?: { name: string } | null;
    }[];
}

export default function Show({ assessment }: { assessment: Assessment }) {
    return (
        <AppLayout>
            <Head title={`Assessment ${assessment.assessment_code}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.assessments.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">
                        Assessment: {assessment.assessment_code}
                    </h1>
                    <Badge>{assessment.status}</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Summary</h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Student
                                </dt>
                                <dd>
                                    {assessment.assessable
                                        ? `${assessment.assessable.first_name ?? ''} ${assessment.assessable.last_name ?? ''}`
                                        : '—'}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Academic Year
                                </dt>
                                <dd>{assessment.academic_year || '—'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Semester
                                </dt>
                                <dd>{assessment.semester || '—'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">
                                    Due Date
                                </dt>
                                <dd>{assessment.due_date || '—'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Total</dt>
                                <dd className="text-lg font-semibold">
                                    ₱
                                    {(
                                        assessment.total_amount ?? 0
                                    ).toLocaleString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Paid</dt>
                                <dd>
                                    ₱
                                    {(
                                        assessment.paid_amount ?? 0
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
                                        (assessment.total_amount ?? 0) -
                                        (assessment.paid_amount ?? 0)
                                    ).toLocaleString()}
                                </dd>
                            </div>
                        </dl>
                        {assessment.notes && (
                            <p className="mt-4 text-sm text-muted-foreground">
                                {assessment.notes}
                            </p>
                        )}
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Payments ({assessment.payments?.length ?? 0})
                        </h2>
                        {(assessment.payments?.length ?? 0) === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No payments recorded.
                            </p>
                        )}
                        {(assessment.payments ?? []).map((p) => (
                            <div
                                key={p.id}
                                className="flex justify-between border-b py-2 text-sm last:border-0"
                            >
                                <span className="font-mono">
                                    {p.payment_code} · {p.payment_date}
                                </span>
                                <span>
                                    ₱{(p.amount ?? 0).toLocaleString()}{' '}
                                    <Badge variant="outline" className="ml-2">
                                        {p.status}
                                    </Badge>
                                </span>
                            </div>
                        ))}
                    </Card>
                </div>

                <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Assessment Lines
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fee Item</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(assessment.lines ?? []).map((l) => (
                                <TableRow key={l.id}>
                                    <TableCell>
                                        {l.fee_item?.name || '—'}
                                    </TableCell>
                                    <TableCell>
                                        {l.fee_item?.category?.name || '—'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ₱{(l.amount ?? 0).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(assessment.lines?.length ?? 0) === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="py-8 text-center text-muted-foreground"
                                    >
                                        No lines.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                {(assessment.applied_discounts?.length ?? 0) > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Applied Discounts
                        </h2>
                        {(assessment.applied_discounts ?? []).map((d) => (
                            <div
                                key={d.id}
                                className="flex justify-between border-b py-2 text-sm last:border-0"
                            >
                                <span>{d.discount?.name || 'Discount'}</span>
                                <span>
                                    −₱{(d.amount ?? 0).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
