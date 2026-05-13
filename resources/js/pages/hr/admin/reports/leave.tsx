import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CalendarCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function LeaveReport({ year, months }: { year: string; months: any[] }) {
    return (
        <AppLayout>
            <Head title="Leave Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><CalendarCheck className="mr-2 inline h-6 w-6" />Leave Report</h1>
                </div>
                <p className="text-muted-foreground">Year: {year}</p>

                <Card className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead className="text-right">Approved Days</TableHead>
                                <TableHead className="text-right text-green-600">Approved</TableHead>
                                <TableHead className="text-right text-yellow-600">Pending</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {months.map((m: any) => (
                                <TableRow key={m.month}>
                                    <TableCell className="font-medium">{m.month}</TableCell>
                                    <TableCell className="text-right font-bold">{m.approved_days}</TableCell>
                                    <TableCell className="text-right text-green-600">{m.approved_requests}</TableCell>
                                    <TableCell className="text-right text-yellow-600">{m.pending_requests}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}