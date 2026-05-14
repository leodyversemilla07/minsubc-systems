import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ImmunizationCreate({ patients }: { patients: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        medical_record_id: '', vaccine_name: '', dose_number: '',
        date_administered: '', administered_by: '', batch_no: '', next_due_date: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('clinic.admin.immunizations.store')); };
    return (
        <AppLayout>
            <Head title="Record Immunization" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.immunizations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Record Immunization</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Immunization Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Patient</Label>
                                <Select value={data.medical_record_id} onValueChange={(v) => setData('medical_record_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                                    <SelectContent>{patients.map((p: any) => <SelectItem key={p.id} value={String(p.id)}>{p.first_name} {p.last_name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Vaccine Name</Label>
                                    <Select value={data.vaccine_name} onValueChange={(v) => setData('vaccine_name', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select vaccine" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Hepatitis B">Hepatitis B</SelectItem>
                                            <SelectItem value="BCG">BCG</SelectItem>
                                            <SelectItem value="DPT">DPT</SelectItem>
                                            <SelectItem value="Polio">Polio</SelectItem>
                                            <SelectItem value="Measles">Measles</SelectItem>
                                            <SelectItem value="MMR">MMR</SelectItem>
                                            <SelectItem value="HPV">HPV</SelectItem>
                                            <SelectItem value="COVID-19">COVID-19</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Dose Number</Label><Input type="number" value={data.dose_number} onChange={(e) => setData('dose_number', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Date Administered</Label><Input type="date" value={data.date_administered} onChange={(e) => setData('date_administered', e.target.value)} /></div>
                                <div><Label>Next Due Date</Label><Input type="date" value={data.next_due_date} onChange={(e) => setData('next_due_date', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Administered By</Label><Input value={data.administered_by} onChange={(e) => setData('administered_by', e.target.value)} /></div>
                                <div><Label>Batch No.</Label><Input value={data.batch_no} onChange={(e) => setData('batch_no', e.target.value)} /></div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('clinic.admin.immunizations.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}