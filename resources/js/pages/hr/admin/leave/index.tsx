import { Head, Link } from '@inertiajs/react';
import { CalendarCheck, Eye, CheckCircle, XCircle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function LeaveIndex({ leaveRequests }: { leaveRequests: any[] }) {
    return (
        <AppLayout>
            <Head title="Leave Requests" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><CalendarCheck className="mr-2 inline h-6 w-6" />Leave Requests</h1>
                <Card>
                    <CardHeader><CardTitle>All Leave Requests</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Days</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leaveRequests.map((l: any) => (
                                    <TableRow key={l.id}>
                                        <TableCell className="font-medium">{l.employee?.first_name} {l.employee?.last_name}</TableCell>
                                        <TableCell className="capitalize">{l.leave_type?.name ?? l.type ?? '—'}</TableCell>
                                        <TableCell>{l.start_date}</TableCell>
                                        <TableCell>{l.end_date ?? '—'}</TableCell>
                                        <TableCell className="text-right">{l.total_days ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${l.status === 'approved' ? 'bg-green-100 text-green-800' : l.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{l.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('hr.admin.leave.show', l.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                {l.status === 'pending' && (
                                                    <>
                                                        <Link as="button" method="post" href={route('hr.admin.leave.approve', l.id)}><Button variant="ghost" size="icon" title="Approve"><CheckCircle className="h-4 w-4 text-green-600" /></Button></Link>
                                                        <Link as="button" method="post" href={route('hr.admin.leave.reject', l.id)}><Button variant="ghost" size="icon" title="Reject"><XCircle className="h-4 w-4 text-red-600" /></Button></Link>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {leaveRequests.length === 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No leave requests found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}