import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ClipboardList } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface MonthlyRow { month: string; count: number }

export default function SessionsReport({ year, monthly, byRisk, byType }: { year: string; monthly: MonthlyRow[]; byRisk: Record<string, number>; byType: Record<string, number> }) {
    return (
        <AppLayout>
            <Head title="Sessions Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><ClipboardList className="mr-2 inline h-6 w-6" />Sessions Report</h1>
                </div>
                <p className="text-muted-foreground">Year: {year}</p>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="p-6 md:col-span-2">
                        <CardTitle className="mb-4 text-lg">Monthly Sessions</CardTitle>
                        {monthly?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Month</TableHead>
                                        <TableHead className="text-right">Sessions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {monthly.map((m) => (
                                        <TableRow key={m.month}>
                                            <TableCell>{m.month}</TableCell>
                                            <TableCell className="text-right font-bold">{m.count}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground">No data for this year.</p>}
                    </Card>

                    <div className="space-y-6">
                        <Card className="p-6">
                            <CardTitle className="mb-4 text-lg">By Risk Level</CardTitle>
                            {byRisk && Object.keys(byRisk).length ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Level</TableHead>
                                            <TableHead className="text-right">Count</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(byRisk).map(([level, count]) => (
                                            <TableRow key={level}>
                                                <TableCell className="capitalize">{level}</TableCell>
                                                <TableCell className="text-right font-bold">{count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : <p className="text-muted-foreground">No data.</p>}
                        </Card>

                        <Card className="p-6">
                            <CardTitle className="mb-4 text-lg">By Type</CardTitle>
                            {byType && Object.keys(byType).length ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Type</TableHead>
                                            <TableHead className="text-right">Count</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(byType).map(([type, count]) => (
                                            <TableRow key={type}>
                                                <TableCell className="capitalize">{type}</TableCell>
                                                <TableCell className="text-right font-bold">{count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : <p className="text-muted-foreground">No data.</p>}
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}