import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Building2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AttendanceReport({ month, departments }: { month: string; departments: any[] }) {
    return (
        <AppLayout>
            <Head title="Attendance Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Clock className="mr-2 inline h-6 w-6" />Attendance Report</h1>
                </div>
                <p className="text-muted-foreground">Period: {month}</p>

                <Card className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><Building2 className="mr-1 inline h-4 w-4" />Department</TableHead>
                                <TableHead className="text-right">Employees</TableHead>
                                <TableHead className="text-right text-green-600">Present</TableHead>
                                <TableHead className="text-right text-yellow-600">Late</TableHead>
                                <TableHead className="text-right text-red-600">Absent</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {departments.map((d: any) => (
                                <TableRow key={d.department}>
                                    <TableCell className="font-medium">{d.department}</TableCell>
                                    <TableCell className="text-right">{d.employee_count}</TableCell>
                                    <TableCell className="text-right font-bold text-green-600">{d.present}</TableCell>
                                    <TableCell className="text-right text-yellow-600">{d.late}</TableCell>
                                    <TableCell className="text-right text-red-600">{d.absent}</TableCell>
                                </TableRow>
                            ))}
                            {departments.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No data for this period.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}