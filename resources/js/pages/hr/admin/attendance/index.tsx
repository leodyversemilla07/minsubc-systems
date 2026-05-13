import { Head, Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AttendanceIndex({ attendance }: { attendance: any[] }) {
    return (
        <AppLayout>
            <Head title="Attendance" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Clock className="mr-2 inline h-6 w-6" />Attendance</h1>
                <Card>
                    <CardHeader><CardTitle>Today's Attendance</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Time In</TableHead>
                                    <TableHead>Time Out</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendance.map((a: any) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">{a.employee?.first_name} {a.employee?.last_name}</TableCell>
                                        <TableCell>{a.employee?.department?.name ?? '—'}</TableCell>
                                        <TableCell>{a.time_in ?? '—'}</TableCell>
                                        <TableCell>{a.time_out ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${a.status === 'present' ? 'bg-green-100 text-green-800' : a.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{a.status}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {attendance.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No attendance records for today.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}