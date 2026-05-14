import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MedicalRecordCreate() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '', last_name: '', birth_date: '', gender: '', blood_type: '',
        student_id: '', emergency_contact_name: '', emergency_contact_phone: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('clinic.admin.medical-records.store')); };
    return (
        <AppLayout>
            <Head title="Add Patient" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.medical-records.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Patient</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Patient Information</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>First Name</Label><Input value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />{errors.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}</div>
                                <div><Label>Last Name</Label><Input value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />{errors.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div><Label>Birth Date</Label><Input type="date" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} /></div>
                                <div><Label>Gender</Label>
                                    <Select value={data.gender} onValueChange={(v) => setData('gender', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Blood Type</Label>
                                    <Select value={data.blood_type} onValueChange={(v) => setData('blood_type', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="A+">A+</SelectItem><SelectItem value="A-">A-</SelectItem>
                                            <SelectItem value="B+">B+</SelectItem><SelectItem value="B-">B-</SelectItem>
                                            <SelectItem value="O+">O+</SelectItem><SelectItem value="O-">O-</SelectItem>
                                            <SelectItem value="AB+">AB+</SelectItem><SelectItem value="AB-">AB-</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div><Label>Student ID</Label><Input value={data.student_id} onChange={(e) => setData('student_id', e.target.value)} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('clinic.admin.medical-records.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}