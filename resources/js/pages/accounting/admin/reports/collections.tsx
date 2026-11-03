import { Head, Link, router } from '@inertiajs/react';
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

interface CollectionsReport {
    dailyCollections: { date: string; total: number; count: number }[];
    byMethod: { payment_method: string; total: number; count: number }[];
    totalCollected: number;
    from: string;
    to: string;
}

export default function Collections({ report }: { report: CollectionsReport }) {
    return (
        <AppLayout>
            <Head title="Collections Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.reports.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Collections Report</h1>
                </div>

                <Card className="p-6">
                    <form
                        className="flex flex-wrap items-end gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const data = new FormData(e.currentTarget);
                            router.get(
                                route('accounting.admin.reports.collections'),
                                {
                                    from: String(data.get('from') ?? ''),
                                    to: String(data.get('to') ?? ''),
                                },
                            );
                        }}
                    >
                        <label className="text-sm">
                            <span className="mb-1 block font-medium">From</span>
                            <input
                                type="date"
                                name="from"
                                defaultValue={report.from?.slice(0, 10)}
                                className="rounded-md border px-3 py-1.5"
                            />
                        </label>
                        <label className="text-sm">
                            <span className="mb-1 block font-medium">To</span>
                            <input
                                type="date"
                                name="to"
                                defaultValue={report.to?.slice(0, 10)}
                                className="rounded-md border px-3 py-1.5"
                            />
                        </label>
                        <Button type="submit">Filter</Button>
                    </form>
                    <p className="mt-4 text-lg">
                        Total collected:{' '}
                        <span className="font-bold">
                            ₱{(report.totalCollected ?? 0).toLocaleString()}
                        </span>
                    </p>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>Daily Collections</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">
                                            Count
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Total
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {report.dailyCollections.map((d) => (
                                        <TableRow key={d.date}>
                                            <TableCell>{d.date}</TableCell>
                                            <TableCell className="text-right">
                                                {d.count}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                ₱
                                                {(
                                                    d.total ?? 0
                                                ).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {report.dailyCollections.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No collections in range.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>By Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">
                                            Count
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Total
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {report.byMethod.map((m) => (
                                        <TableRow key={m.payment_method}>
                                            <TableCell className="capitalize">
                                                {m.payment_method}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {m.count}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                ₱
                                                {(
                                                    m.total ?? 0
                                                ).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {report.byMethod.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No collections in range.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
