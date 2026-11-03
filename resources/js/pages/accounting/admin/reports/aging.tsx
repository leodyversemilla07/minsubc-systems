import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface AgingBucket {
    total: number;
    count: number;
}

const buckets: { key: string; label: string }[] = [
    { key: 'current', label: 'Current (≤ 30 days)' },
    { key: '30_days', label: '31–60 days' },
    { key: '60_days', label: '61–90 days' },
    { key: '90_plus', label: '90+ days' },
];

export default function Aging({
    report,
}: {
    report: Record<string, AgingBucket>;
}) {
    return (
        <AppLayout>
            <Head title="Aging of Receivables" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.reports.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Aging of Receivables</h1>
                </div>
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle>Outstanding Balances by Age</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Bucket</TableHead>
                                    <TableHead className="text-right">
                                        Assessments
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Amount Owed
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {buckets.map((b) => (
                                    <TableRow key={b.key}>
                                        <TableCell className="font-medium">
                                            {b.label}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {report?.[b.key]?.count ?? 0}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            ₱
                                            {(
                                                report?.[b.key]?.total ?? 0
                                            ).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
