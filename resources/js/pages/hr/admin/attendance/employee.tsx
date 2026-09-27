import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, User } from 'lucide-react';

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

interface EmployeeAttendanceProps {
    employee: {
        id: number;
        first_name: string;
        last_name: string;
        employee_id: string;
        department?: { name: string } | null;
    };
    attendance: { data: Record<string, string | null>[] };
    stats: { present: number; late: number; absent: number };
}

export default function EmployeeAttendance({
    employee,
    attendance,
    stats,
}: EmployeeAttendanceProps) {
    const rows = attendance.data ?? [];

    return (
        <AppLayout>
            <Head
                title={`${employee.first_name} ${employee.last_name} — Attendance`}
            />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.attendance.index')}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">
                        <User className="mr-2 inline h-6 w-6" />
                        {employee.first_name} {employee.last_name}
                        <span className="ml-2 text-base font-normal text-muted-foreground">
                            {employee.employee_id} ·{' '}
                            {employee.department?.name ?? '—'}
                        </span>
                    </h1>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Present</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-green-700">
                            {stats.present}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Late</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-yellow-700">
                            {stats.late}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Absent</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-red-700">
                            {stats.absent}
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time In</TableHead>
                                    <TableHead>Time Out</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((a) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">
                                            {a.date}
                                        </TableCell>
                                        <TableCell>
                                            {a.time_in ?? '—'}
                                        </TableCell>
                                        <TableCell>
                                            {a.time_out ?? '—'}
                                        </TableCell>
                                        <TableCell>{a.status}</TableCell>
                                        <TableCell>
                                            {a.remarks ?? '—'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {rows.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No attendance records.
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
