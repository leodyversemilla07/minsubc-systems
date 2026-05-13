import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CalendarCheck } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DailyRow {
    date: string;
    total: number;
    completed: number;
    cancelled: number;
    no_show: number;
}

interface CounselorRow {
    id: number;
    first_name: string;
    last_name: string;
    appointments_count: number;
}

export default function AppointmentsReport({ month, daily, byCounselor }: { month: string; daily: DailyRow[]; byCounselor: CounselorRow[] }) {
    return (
        <AppLayout>
            <Head title="Appointments Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><CalendarCheck className="mr-2 inline h-6 w-6" />Appointments Report</h1>
                </div>
                <p className="text-muted-foreground">Period: {month}</p>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <CardTitle className="mb-4 text-lg">Daily Appointments</CardTitle>
                        {daily?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="text-right">Completed</TableHead>
                                        <TableHead className="text-right">Cancelled</TableHead>
                                        <TableHead className="text-right">No Show</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {daily.map((d) => (
                                        <TableRow key={d.date}>
                                            <TableCell>{d.date}</TableCell>
                                            <TableCell className="text-right font-bold">{d.total}</TableCell>
                                            <TableCell className="text-right text-green-600">{d.completed}</TableCell>
                                            <TableCell className="text-right text-red-600">{d.cancelled}</TableCell>
                                            <TableCell className="text-right text-yellow-600">{d.no_show}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground">No data for this period.</p>}
                    </Card>

                    <Card className="p-6">
                        <CardTitle className="mb-4 text-lg">By Counselor</CardTitle>
                        {byCounselor?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Counselor</TableHead>
                                        <TableHead className="text-right">Appointments</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {byCounselor.map((c) => (
                                        <TableRow key={c.id}>
                                            <TableCell>{c.first_name} {c.last_name}</TableCell>
                                            <TableCell className="text-right font-bold">{c.appointments_count}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground">No data for this period.</p>}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}