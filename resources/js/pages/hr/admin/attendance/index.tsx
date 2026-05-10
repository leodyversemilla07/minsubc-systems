import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface AttendanceRecord {
    id: number;
    employee: { id: number; employee_id: string; first_name: string; last_name: string; department_id: number };
    date: string;
    time_in: string;
    time_out: string;
    status: string;
}

interface Department {
    id: number;
    name: string;
}

interface Props {
    attendance: { data: AttendanceRecord[]; links: any[] };
    departments: Department[];
    summary: { present: number; late: number; absent: number; on_leave: number };
    filters: { date?: string; department?: string; status?: string };
}

export default function Index({ attendance, departments, summary, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Attendance" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Attendance</h1>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{summary.present}</div><div className="text-muted-foreground text-sm">Present</div></Card>
                    <Card className="p-4 text-center"><div className="text-2xl font-bold text-yellow-600">{summary.late}</div><div className="text-muted-foreground text-sm">Late</div></Card>
                    <Card className="p-4 text-center"><div className="text-2xl font-bold text-red-600">{summary.absent}</div><div className="text-muted-foreground text-sm">Absent</div></Card>
                    <Card className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">{summary.on_leave}</div><div className="text-muted-foreground text-sm">On Leave</div></Card>
                </div>

                <Card className="p-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="w-48">
                            <Label>Date</Label>
                            <Input type="date" defaultValue={filters.date} onChange={(e) => router.get(route('hr.admin.attendance.index'), { ...filters, date: e.target.value }, { preserveState: true })} />
                        </div>
                        <div className="w-48">
                            <Label>Department</Label>
                            <Select value={filters.department || ''} onValueChange={(v) => router.get(route('hr.admin.attendance.index'), { ...filters, department: v }, { preserveState: true })}>
                                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    {departments.map((d) => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-40">
                            <Label>Status</Label>
                            <Select value={filters.status || ''} onValueChange={(v) => router.get(route('hr.admin.attendance.index'), { ...filters, status: v }, { preserveState: true })}>
                                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="present">Present</SelectItem>
                                    <SelectItem value="late">Late</SelectItem>
                                    <SelectItem value="absent">Absent</SelectItem>
                                    <SelectItem value="leave">Leave</SelectItem>
                                    <SelectItem value="holiday">Holiday</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time In</TableHead>
                            <TableHead>Time Out</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendance.data.map((a) => (
                            <TableRow key={a.id}>
                                <TableCell className="font-medium">
                                    <Link href={route('hr.admin.attendance.employee', a.employee.id)} className="hover:underline">
                                        {a.employee.first_name} {a.employee.last_name}
                                    </Link>
                                </TableCell>
                                <TableCell>{a.date}</TableCell>
                                <TableCell>{a.time_in ? new Date(a.time_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</TableCell>
                                <TableCell>{a.time_out ? new Date(a.time_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</TableCell>
                                <TableCell className="capitalize"><Badge>{a.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}