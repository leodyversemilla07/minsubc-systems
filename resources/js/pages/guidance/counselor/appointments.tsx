import { Head, Link } from '@inertiajs/react';
import { CalendarCheck } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function CounselorAppointments({ appointments }: { appointments: any[] }) {
    return (
        <AppLayout>
            <Head title="My Appointments" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><CalendarCheck className="mr-2 inline h-6 w-6" />My Appointments</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((a: any) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">{a.student?.name ?? a.student_id ?? '—'}</TableCell>
                                        <TableCell>{a.scheduled_date ? new Date(a.scheduled_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell className="capitalize">{a.appointment_type ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${a.status === 'completed' ? 'bg-green-100 text-green-800' : a.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{a.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            {a.status === 'scheduled' && (
                                                <Link as="button" method="post" href={route('guidance.admin.appointments.complete', a.id)}>
                                                    <Button variant="outline" size="sm">Complete</Button>
                                                </Link>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {appointments.length === 0 && (
                                    <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No appointments.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}