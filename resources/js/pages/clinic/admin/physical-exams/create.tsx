import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PhysicalExamCreate({ patients }: { patients: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        medical_record_id: '', exam_date: '', height_cm: '', weight_kg: '',
        blood_pressure: '', heart_rate: '', temperature: '', is_cleared: false,
        vision_left: '', vision_right: '', findings: '', recommendations: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('clinic.admin.physical-exams.store')); };
    return (
        <AppLayout>
            <Head title="Record Physical Exam" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.physical-exams.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Record Physical Exam</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Physical Exam Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Patient</Label>
                                <Select value={data.medical_record_id} onValueChange={(v) => setData('medical_record_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                                    <SelectContent>{patients.map((p: any) => <SelectItem key={p.id} value={String(p.id)}>{p.first_name} {p.last_name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div><Label>Exam Date</Label><Input type="date" value={data.exam_date} onChange={(e) => setData('exam_date', e.target.value)} /></div>
                            <div className="grid grid-cols-3 gap-4">
                                <div><Label>Height (cm)</Label><Input type="number" step="0.1" value={data.height_cm} onChange={(e) => setData('height_cm', e.target.value)} /></div>
                                <div><Label>Weight (kg)</Label><Input type="number" step="0.1" value={data.weight_kg} onChange={(e) => setData('weight_kg', e.target.value)} /></div>
                                <div><Label>Temperature</Label><Input type="number" step="0.1" value={data.temperature} onChange={(e) => setData('temperature', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div><Label>Blood Pressure</Label><Input value={data.blood_pressure} onChange={(e) => setData('blood_pressure', e.target.value)} placeholder="120/80" /></div>
                                <div><Label>Heart Rate</Label><Input type="number" value={data.heart_rate} onChange={(e) => setData('heart_rate', e.target.value)} /></div>
                                <div><Label>Vision Left</Label><Input value={data.vision_left} onChange={(e) => setData('vision_left', e.target.value)} placeholder="20/20" /></div>
                            </div>
                            <div><Label>Findings</Label><Textarea value={data.findings} onChange={(e) => setData('findings', e.target.value)} rows={2} /></div>
                            <div><Label>Recommendations</Label><Textarea value={data.recommendations} onChange={(e) => setData('recommendations', e.target.value)} rows={2} /></div>
                            <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_cleared} onChange={(e) => setData('is_cleared', e.target.checked)} className="h-4 w-4 rounded border-gray-300" /> Cleared for academic activities</label>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('clinic.admin.physical-exams.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}