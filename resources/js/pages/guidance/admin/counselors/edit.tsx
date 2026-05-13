import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CounselorEdit({ counselor }: { counselor: any }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: counselor.first_name, last_name: counselor.last_name, email: counselor.email,
        phone: counselor.phone ?? '', specialization: counselor.specialization ?? '', bio: counselor.bio ?? '', is_available: counselor.is_available,
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('guidance.admin.counselors.update', counselor.id)); };

    return (
        <AppLayout>
            <Head title="Edit Counselor" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.counselors.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Counselor</h1>
                </div>
                <Card className="max-w-2xl">
                    <CardHeader><CardTitle>Counselor Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>First Name</Label><Input value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />{errors.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}</div>
                                <div><Label>Last Name</Label><Input value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />{errors.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Email</Label><Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />{errors.email && <p className="text-sm text-red-600">{errors.email}</p>}</div>
                                <div><Label>Phone</Label><Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} /></div>
                            </div>
                            <div><Label>Specialization</Label><Input value={data.specialization} onChange={(e) => setData('specialization', e.target.value)} /></div>
                            <div><Label>Bio</Label><Textarea value={data.bio} onChange={(e) => setData('bio', e.target.value)} rows={3} /></div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_available" checked={data.is_available} onChange={(e) => setData('is_available', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                <Label htmlFor="is_available">Available for appointments</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('guidance.admin.counselors.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}