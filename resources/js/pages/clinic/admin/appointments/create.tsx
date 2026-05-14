import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AppointmentCreate() {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '', appointment_date: '', appointment_type: '', reason: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('clinic.admin.appointments.store')); };
    return (
        <AppLayout>
            <Head title="New Appointment" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.appointments.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">New Appointment</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Appointment Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Student ID</Label><Input value={data.student_id} onChange={(e) => setData('student_id', e.target.value)} /></div>
                                <div><Label>Date</Label><Input type="datetime-local" value={data.appointment_date} onChange={(e) => setData('appointment_date', e.target.value)} /></div>
                            </div>
                            <div><Label>Type</Label>
                                <Select value={data.appointment_type} onValueChange={(v) => setData('appointment_type', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="check-up">Check-up</SelectItem>
                                        <SelectItem value="consultation">Consultation</SelectItem>
                                        <SelectItem value="follow-up">Follow-up</SelectItem>
                                        <SelectItem value="vaccination">Vaccination</SelectItem>
                                        <SelectItem value="dental">Dental</SelectItem>
                                        <SelectItem value="physical-exam">Physical Exam</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div><Label>Reason</Label><Textarea value={data.reason} onChange={(e) => setData('reason', e.target.value)} rows={2} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('clinic.admin.appointments.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}