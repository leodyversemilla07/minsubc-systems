import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AppointmentShow({ appointment }: { appointment: any }) {
    return (
        <AppLayout>
            <Head title="Appointment Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.appointments.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Appointment Details</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        appointment.status === 'no_show' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>{appointment.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Appointment Info</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Student</dt><dd className="font-medium">{appointment.student?.name ?? appointment.student_id ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Counselor</dt><dd>{appointment.counselor?.full_name ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{appointment.scheduled_date ? new Date(appointment.scheduled_date).toLocaleString() : '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{appointment.appointment_type ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{appointment.status}</dd></div>
                        </dl>
                    </Card>

                    {appointment.notes && (
                        <Card className="p-6">
                            <h2 className="mb-2 text-lg font-semibold">Notes</h2>
                            <p className="text-muted-foreground text-sm">{appointment.notes}</p>
                        </Card>
                    )}

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex flex-wrap gap-2">
                            {appointment.status === 'scheduled' && (
                                <>
                                    <Link as="button" method="post" href={route('guidance.admin.appointments.complete', appointment.id)}>
                                        <Button size="sm"><CheckCircle className="mr-2 h-4 w-4" /> Complete</Button>
                                    </Link>
                                    <Link as="button" method="post" href={route('guidance.admin.appointments.no-show', appointment.id)}>
                                        <Button variant="outline" size="sm"><Clock className="mr-2 h-4 w-4" /> No Show</Button>
                                    </Link>
                                    <Link as="button" method="post" href={route('guidance.admin.appointments.cancel', appointment.id)}>
                                        <Button variant="outline" size="sm"><XCircle className="mr-2 h-4 w-4" /> Cancel</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}