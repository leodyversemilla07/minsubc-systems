import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ConsultationCreate({ patients }: { patients: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        medical_record_id: '', complaint: '', diagnosis: '', treatment: '',
        prescription: '', consultation_date: '', follow_up_date: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('clinic.admin.consultations.store')); };
    return (
        <AppLayout>
            <Head title="New Consultation" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.consultations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">New Consultation</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Consultation Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Patient</Label>
                                <Select value={data.medical_record_id} onValueChange={(v) => setData('medical_record_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                                    <SelectContent>{patients.map((p: any) => <SelectItem key={p.id} value={String(p.id)}>{p.first_name} {p.last_name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Date</Label><Input type="datetime-local" value={data.consultation_date} onChange={(e) => setData('consultation_date', e.target.value)} /></div>
                                <div><Label>Follow-up</Label><Input type="date" value={data.follow_up_date} onChange={(e) => setData('follow_up_date', e.target.value)} /></div>
                            </div>
                            <div><Label>Complaint</Label><Textarea value={data.complaint} onChange={(e) => setData('complaint', e.target.value)} rows={2} /></div>
                            <div><Label>Diagnosis</Label><Input value={data.diagnosis} onChange={(e) => setData('diagnosis', e.target.value)} /></div>
                            <div><Label>Treatment</Label><Textarea value={data.treatment} onChange={(e) => setData('treatment', e.target.value)} rows={2} /></div>
                            <div><Label>Prescription</Label><Textarea value={data.prescription} onChange={(e) => setData('prescription', e.target.value)} rows={2} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('clinic.admin.consultations.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}