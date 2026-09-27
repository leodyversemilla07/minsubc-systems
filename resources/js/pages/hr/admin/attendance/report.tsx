import { Head, Link, router } from '@inertiajs/react';
import { BarChart3 } from 'lucide-react';

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

interface AttendanceReportProps {
    reportData: {
        employee: {
            first_name: string;
            last_name: string;
            employee_id: string;
            department?: { name: string } | null;
        };
        present: number;
        late: number;
        absent: number;
        on_leave: number;
        total: number;
    }[];
    departments: { id: number; name: string }[];
    month: string;
    selectedDepartment?: number | null;
}

export default function AttendanceReport({
    reportData,
    departments,
    month,
    selectedDepartment,
}: AttendanceReportProps) {
    return (
        <AppLayout>
            <Head title={`Attendance Report — ${month}`} />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">
                    <BarChart3 className="mr-2 inline h-6 w-6" />
                    Attendance Report — {month}
                </h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-end gap-4">
                        <label className="text-sm">
                            <span className="mb-1 block font-medium">
                                Month
                            </span>
                            <input
                                type="month"
                                defaultValue={month}
                                className="rounded-md border px-3 py-1.5"
                                onChange={(e) =>
                                    router.get(
                                        route('hr.admin.attendance.report'),
                                        {
                                            month: e.target.value,
                                            department:
                                                selectedDepartment ?? '',
                                        },
                                        { preserveState: true },
                                    )
                                }
                            />
                        </label>
                        <label className="text-sm">
                            <span className="mb-1 block font-medium">
                                Department
                            </span>
                            <select
                                defaultValue={selectedDepartment ?? ''}
                                className="rounded-md border px-3 py-1.5"
                                onChange={(e) =>
                                    router.get(
                                        route('hr.admin.attendance.report'),
                                        { month, department: e.target.value },
                                        { preserveState: true },
                                    )
                                }
                            >
                                <option value="">All departments</option>
                                {departments.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <Link href={route('hr.admin.attendance.index')}>
                            <Button variant="outline">Daily view</Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead className="text-right">
                                        Present
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Late
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Absent
                                    </TableHead>
                                    <TableHead className="text-right">
                                        On Leave
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Total
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportData.map((row) => (
                                    <TableRow key={row.employee.employee_id}>
                                        <TableCell className="font-medium">
                                            {row.employee.first_name}{' '}
                                            {row.employee.last_name}
                                        </TableCell>
                                        <TableCell>
                                            {row.employee.department?.name ??
                                                '—'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {row.present}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {row.late}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {row.absent}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {row.on_leave}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {row.total}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {reportData.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No active employees for this filter.
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
