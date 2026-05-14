import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function MedicalRecordEdit({ record }: { record: any }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: record.first_name, last_name: record.last_name,
        blood_type: record.blood_type ?? '',
        emergency_contact_name: record.emergency_contact_name ?? '',
        emergency_contact_phone: record.emergency_contact_phone ?? '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('clinic.admin.medical-records.update', record.id)); };
    return (
        <AppLayout>
            <Head title="Edit Medical Record" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.medical-records.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Medical Record</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>{record.first_name} {record.last_name}</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>First Name</Label><Input value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} /></div>
                                <div><Label>Last Name</Label><Input value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} /></div>
                            </div>
                            <div><Label>Blood Type</Label><Input value={data.blood_type} onChange={(e) => setData('blood_type', e.target.value)} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Emergency Contact</Label><Input value={data.emergency_contact_name} onChange={(e) => setData('emergency_contact_name', e.target.value)} /></div>
                                <div><Label>Emergency Phone</Label><Input value={data.emergency_contact_phone} onChange={(e) => setData('emergency_contact_phone', e.target.value)} /></div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('clinic.admin.medical-records.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}