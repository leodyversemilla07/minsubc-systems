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

interface JournalEntry {
    id: number;
    entry_number: string;
    entry_date: string;
    description: string;
    status: string;
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

export default function Journal({
    entries,
}: {
    entries: { data: JournalEntry[] };
}) {
    return (
        <AppLayout>
            <Head title="Journal Entries" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.reports.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Journal Entries</h1>
                </div>
                <Card className="p-6">
                    <CardHeader>
                        <CardTitle>Entries</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {entries.data.map((e) => (
                            <div key={e.id} className="rounded-md border p-4">
                                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                    <p className="font-mono text-sm font-semibold">
                                        {e.entry_number} · {e.entry_date}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {e.status} · D ₱
                                        {(e.total_debit ?? 0).toLocaleString()}{' '}
                                        / C ₱
                                        {(e.total_credit ?? 0).toLocaleString()}
                                    </p>
                                </div>
                                <p className="mb-2 text-sm">{e.description}</p>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Account</TableHead>
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
                                        {(e.lines ?? []).map((l) => (
                                            <TableRow key={l.id}>
                                                <TableCell>
                                                    {l.chart_account
                                                        ? `${l.chart_account.account_code} — ${l.chart_account.name}`
                                                        : '—'}
                                                </TableCell>
                                                <TableCell>
                                                    {l.description || '—'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {l.debit
                                                        ? `₱${Number(l.debit).toLocaleString()}`
                                                        : '—'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {l.credit
                                                        ? `₱${Number(l.credit).toLocaleString()}`
                                                        : '—'}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ))}
                        {entries.data.length === 0 && (
                            <p className="py-8 text-center text-muted-foreground">
                                No journal entries.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
