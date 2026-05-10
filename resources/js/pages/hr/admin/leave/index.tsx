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

interface Leave {
    id: number;
    leave_code: string;
    employee: { id: number; employee_id: string; first_name: string; last_name: string };
    leaveType: { id: number; name: string };
    start_date: string;
    end_date: string;
    total_days: number;
    status: string;
    reason: string;
}

interface LeaveType {
    id: number;
    name: string;
}

interface Props {
    leaves: { data: Leave[]; links: any[] };
    leaveTypes: LeaveType[];
    summary: { pending: number; approved: number; rejected: number };
    filters: { status?: string; leave_type?: string };
}

export default function Index({ leaves, leaveTypes, summary, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Leave Requests" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Leave Requests</h1>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-4 text-center"><div className="text-2xl font-bold text-yellow-600">{summary.pending}</div><div className="text-muted-foreground text-sm">Pending</div></Card>
                    <Card className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{summary.approved}</div><div className="text-muted-foreground text-sm">Approved</div></Card>
                    <Card className="p-4 text-center"><div className="text-2xl font-bold text-red-600">{summary.rejected}</div><div className="text-muted-foreground text-sm">Rejected</div></Card>
                </div>

                <Card className="p-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="w-40">
                            <Label>Status</Label>
                            <Select value={filters.status || ''} onValueChange={(v) => router.get(route('hr.admin.leave.index'), { ...filters, status: v }, { preserveState: true })}>
                                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-48">
                            <Label>Leave Type</Label>
                            <Select value={filters.leave_type || ''} onValueChange={(v) => router.get(route('hr.admin.leave.index'), { ...filters, leave_type: v }, { preserveState: true })}>
                                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    {leaveTypes.map((lt) => <SelectItem key={lt.id} value={String(lt.id)}>{lt.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Start</TableHead>
                            <TableHead>End</TableHead>
                            <TableHead>Days</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaves.data.map((l) => (
                            <TableRow key={l.id}>
                                <TableCell className="font-mono text-sm">{l.leave_code}</TableCell>
                                <TableCell className="font-medium">{l.employee?.first_name} {l.employee?.last_name}</TableCell>
                                <TableCell>{l.leaveType?.name}</TableCell>
                                <TableCell>{l.start_date}</TableCell>
                                <TableCell>{l.end_date}</TableCell>
                                <TableCell>{l.total_days}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        l.status === 'approved' ? 'default' :
                                        l.status === 'rejected' ? 'destructive' : 'secondary'
                                    }>
                                        {l.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={route('hr.admin.leave.show', l.id)}>
                                        <Button variant="outline" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}