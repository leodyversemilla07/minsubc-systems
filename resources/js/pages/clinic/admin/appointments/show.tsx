import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AppointmentShow({ appointment }: { appointment: any }) {
    const { data, setData, put, processing } = useForm({
        status: appointment.status,
        appointment_date: appointment.appointment_date?.slice(0, 16) ?? '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('clinic.admin.appointments.update', appointment.id)); };
    return (
        <AppLayout>
            <Head title="Appointment Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.appointments.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Calendar className="mr-2 inline h-6 w-6" />Appointment</h1>
                </div>
                <Card className="max-w-xl p-6">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Student ID</dt><dd className="font-mono">{appointment.student_id ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{appointment.appointment_type}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Reason</dt><dd>{appointment.reason ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Notes</dt><dd>{appointment.notes ?? '—'}</dd></div>
                    </dl>
                    <form onSubmit={submit} className="mt-4 space-y-3 border-t pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label>Date</Label><Input type="datetime-local" value={data.appointment_date} onChange={(e) => setData('appointment_date', e.target.value)} /></div>
                            <div><Label>Status</Label>
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                        <SelectItem value="no-show">No Show</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit" disabled={processing}>Update Status</Button>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}