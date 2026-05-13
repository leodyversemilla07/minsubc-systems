import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateAppointment({ counselors, slots }: { counselors: any[]; slots: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        counselor_id: '', slot_id: '', appointment_type: '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('guidance.my.appointments.store')); };

    return (
        <AppLayout>
            <Head title="Book Appointment" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.my.appointments')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Book Appointment</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Appointment Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>Counselor</Label>
                                <Select value={data.counselor_id} onValueChange={(v) => setData('counselor_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select counselor" /></SelectTrigger>
                                    <SelectContent>{counselors.map((c: any) => <SelectItem key={c.id} value={String(c.id)}>{c.full_name ?? `${c.first_name} ${c.last_name}`}</SelectItem>)}</SelectContent>
                                </Select>
                                {errors.counselor_id && <p className="text-sm text-red-600">{errors.counselor_id}</p>}
                            </div>
                            <div>
                                <Label>Available Slot</Label>
                                <Select value={data.slot_id} onValueChange={(v) => setData('slot_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select time slot" /></SelectTrigger>
                                    <SelectContent>
                                        {slots.map((s: any) => (
                                            <SelectItem key={s.id} value={String(s.id)}>
                                                {s.counselor?.full_name ?? '—'} - {s.date} {s.start_time} ({s.duration_minutes} min)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.slot_id && <p className="text-sm text-red-600">{errors.slot_id}</p>}
                            </div>
                            <div>
                                <Label>Type</Label>
                                <Select value={data.appointment_type} onValueChange={(v) => setData('appointment_type', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="counseling">Counseling</SelectItem>
                                        <SelectItem value="assessment">Assessment</SelectItem>
                                        <SelectItem value="consultation">Consultation</SelectItem>
                                        <SelectItem value="follow_up">Follow Up</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.appointment_type && <p className="text-sm text-red-600">{errors.appointment_type}</p>}
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Book</Button>
                                <Link href={route('guidance.my.appointments')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}