import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DentalRecordCreate({ patients }: { patients: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        medical_record_id: '', procedure: '', findings: '', treatment: '',
        dentist: '', dental_date: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('clinic.admin.dental-records.store')); };
    return (
        <AppLayout>
            <Head title="Add Dental Record" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.dental-records.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Dental Record</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Dental Record Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Patient</Label>
                                <Select value={data.medical_record_id} onValueChange={(v) => setData('medical_record_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                                    <SelectContent>{patients.map((p: any) => <SelectItem key={p.id} value={String(p.id)}>{p.first_name} {p.last_name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Procedure</Label>
                                    <Select value={data.procedure} onValueChange={(v) => setData('procedure', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Check-up">Check-up</SelectItem>
                                            <SelectItem value="Cleaning">Cleaning</SelectItem>
                                            <SelectItem value="Filling">Filling</SelectItem>
                                            <SelectItem value="Extraction">Extraction</SelectItem>
                                            <SelectItem value="Root Canal">Root Canal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Date</Label><Input type="date" value={data.dental_date} onChange={(e) => setData('dental_date', e.target.value)} /></div>
                            </div>
                            <div><Label>Findings</Label><Textarea value={data.findings} onChange={(e) => setData('findings', e.target.value)} rows={2} /></div>
                            <div><Label>Treatment</Label><Textarea value={data.treatment} onChange={(e) => setData('treatment', e.target.value)} rows={2} /></div>
                            <div><Label>Dentist</Label><Input value={data.dentist} onChange={(e) => setData('dentist', e.target.value)} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('clinic.admin.dental-records.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}