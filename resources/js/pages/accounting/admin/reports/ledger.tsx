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

interface LedgerEntry {
    id: number;
    entry_number: string;
    entry_date: string;
    description: string;
    total_debit: number;
    total_credit: number;
    lines?: {
        id: number;
        debit: number;
        credit: number;
        description: string | null;
        chart_account?: { account_code: string; name: string } | null;
    }[];
}

interface LedgerReport {
    entries: { data: LedgerEntry[] };
    totalDebit: number;
    totalCredit: number;
}

export default function Ledger({ report }: { report: LedgerReport }) {
    return (
        <AppLayout>
            <Head title="General Ledger" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.reports.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">General Ledger</h1>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="p-6">
                        <p className="text-sm text-muted-foreground">
                            Total Debit
                        </p>
                        <p className="text-2xl font-bold">
                            ₱{(report.totalDebit ?? 0).toLocaleString()}
                        </p>
                    </Card>
                    <Card className="p-6">
                        <p className="text-sm text-muted-foreground">
                            Total Credit
                        </p>
                        <p className="text-2xl font-bold">
                            ₱{(report.totalCredit ?? 0).toLocaleString()}
                        </p>
                    </Card>
                </div>
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle>Posted Entries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Entry #</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">
                                        Debit
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Credit
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {report.entries.data.map((e) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-mono text-sm">
                                            {e.entry_number}
                                        </TableCell>
                                        <TableCell>{e.entry_date}</TableCell>
                                        <TableCell>{e.description}</TableCell>
                                        <TableCell className="text-right">
                                            ₱
                                            {(
                                                e.total_debit ?? 0
                                            ).toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ₱
                                            {(
                                                e.total_credit ?? 0
                                            ).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {report.entries.data.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No posted entries.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
