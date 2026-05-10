import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    birth_date: string;
    gender: string;
    employement_status?: string;
    employment_status: string;
    hire_date: string;
    education_level: string;
    specialization: string;
    notes: string;
    department?: { id: number; name: string };
    position?: { id: number; title: string };
    attendance?: Array<{
        id: number;
        date: string;
        time_in: string;
        time_out: string;
        status: string;
    }>;
}

interface Props {
    employee: Employee;
}

export default function Show({ employee }: Props) {
    return (
        <AppLayout>
            <Head title={`${employee.first_name} ${employee.last_name}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('hr.admin.employees.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                        <h1 className="text-2xl font-bold">{employee.first_name} {employee.last_name}</h1>
                        <Badge>{employee.employment_status || employee.employement_status}</Badge>
                    </div>
                    <Link href={route('hr.admin.employees.edit', employee.id)}>
                        <Button>Edit Employee</Button>
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Employee ID</dt><dd className="font-medium">{employee.employee_id}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd>{employee.email}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Phone</dt><dd>{employee.phone || '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Gender</dt><dd className="capitalize">{employee.gender || '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Birth Date</dt><dd>{employee.birth_date || '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Education</dt><dd>{employee.education_level || '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Specialization</dt><dd>{employee.specialization || '—'}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Employment Details</h2>
                        <dl className="space-y-3">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Department</dt><dd className="font-medium">{employee.department?.name || '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Position</dt><dd>{employee.position?.title || '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Hire Date</dt><dd>{employee.hire_date}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{employee.employment_status || employee.employement_status}</dd></div>
                        </dl>
                        {employee.notes && (
                            <div className="mt-4">
                                <h3 className="text-muted-foreground mb-1 text-sm">Notes</h3>
                                <p className="text-sm">{employee.notes}</p>
                            </div>
                        )}
                    </Card>
                </div>

                {employee.attendance && employee.attendance.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">Recent Attendance</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time In</TableHead>
                                    <TableHead>Time Out</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employee.attendance.map((a) => (
                                    <TableRow key={a.id}>
                                        <TableCell>{a.date}</TableCell>
                                        <TableCell>{a.time_in || '—'}</TableCell>
                                        <TableCell>{a.time_out || '—'}</TableCell>
                                        <TableCell className="capitalize">{a.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}