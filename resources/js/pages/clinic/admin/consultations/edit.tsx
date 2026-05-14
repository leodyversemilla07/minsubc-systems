import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ConsultationEdit({ consultation }: { consultation: any }) {
    const { data, setData, put, processing, errors } = useForm({
        diagnosis: consultation.diagnosis ?? '',
        treatment: consultation.treatment ?? '',
        prescription: consultation.prescription ?? '',
        follow_up_date: consultation.follow_up_date ?? '',
        status: consultation.status,
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('clinic.admin.consultations.update', consultation.id)); };
    return (
        <AppLayout>
            <Head title="Edit Consultation" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.consultations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Consultation</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>{consultation.medical_record?.first_name} {consultation.medical_record?.last_name}</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Diagnosis</Label><Input value={data.diagnosis} onChange={(e) => setData('diagnosis', e.target.value)} /></div>
                            <div><Label>Treatment</Label><Textarea value={data.treatment} onChange={(e) => setData('treatment', e.target.value)} rows={2} /></div>
                            <div><Label>Prescription</Label><Textarea value={data.prescription} onChange={(e) => setData('prescription', e.target.value)} rows={2} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Follow-up Date</Label><Input type="date" value={data.follow_up_date} onChange={(e) => setData('follow_up_date', e.target.value)} /></div>
                                <div><Label>Status</Label>
                                    <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="follow-up">Follow-up</SelectItem>
                                            <SelectItem value="referred">Referred</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('clinic.admin.consultations.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}