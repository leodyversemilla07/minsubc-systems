import { Head, Link } from '@inertiajs/react';
import { CalendarCheck, Eye, CheckCircle, XCircle, Clock, CalendarX } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AppointmentIndex({ appointments }: { appointments: any[] }) {
    return (
        <AppLayout>
            <Head title="Appointments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Appointments</h1>
                </div>

                <Card>
                    <CardHeader><CardTitle><CalendarCheck className="mr-2 inline h-5 w-5" />All Appointments</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Counselor</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((a: any) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">{a.student?.name ?? a.student?.student_id ?? '—'}</TableCell>
                                        <TableCell>{a.counselor?.full_name ?? '—'}</TableCell>
                                        <TableCell>{a.scheduled_date ? new Date(a.scheduled_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                a.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                a.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                                a.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                a.status === 'no_show' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{a.status}</span>
                                        </TableCell>
                                        <TableCell className="capitalize">{a.appointment_type ?? '—'}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('guidance.admin.appointments.show', a.id)}>
                                                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                                </Link>
                                                {a.status === 'scheduled' && (
                                                    <>
                                                        <Link as="button" method="post" href={route('guidance.admin.appointments.confirm', a.id)}>
                                                            <Button variant="ghost" size="icon" title="Confirm"><CheckCircle className="h-4 w-4 text-green-600" /></Button>
                                                        </Link>
                                                        <Link as="button" method="post" href={route('guidance.admin.appointments.cancel', a.id)}>
                                                            <Button variant="ghost" size="icon" title="Cancel"><XCircle className="h-4 w-4 text-red-600" /></Button>
                                                        </Link>
                                                        <Link as="button" method="post" href={route('guidance.admin.appointments.no-show', a.id)}>
                                                            <Button variant="ghost" size="icon" title="No Show"><Clock className="h-4 w-4 text-yellow-600" /></Button>
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {appointments.length === 0 && (
                                    <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No appointments found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}