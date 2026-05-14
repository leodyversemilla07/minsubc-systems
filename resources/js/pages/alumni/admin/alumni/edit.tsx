import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AlumniEdit({ alumnus }: { alumnus: any }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: alumnus.first_name, last_name: alumnus.last_name,
        email: alumnus.email, is_verified: alumnus.is_verified,
        is_employed: alumnus.is_employed,
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('alumni.admin.alumni.update', alumnus.id)); };
    return (
        <AppLayout>
            <Head title="Edit Alumnus" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.alumni.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Alumnus</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>First Name</Label><Input value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />{errors.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}</div>
                                <div><Label>Last Name</Label><Input value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />{errors.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}</div>
                            </div>
                            <div><Label>Email</Label><Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />{errors.email && <p className="text-sm text-red-600">{errors.email}</p>}</div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_verified} onChange={(e) => setData('is_verified', e.target.checked)} className="h-4 w-4 rounded border-gray-300" /> Verified</label>
                                <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_employed} onChange={(e) => setData('is_employed', e.target.checked)} className="h-4 w-4 rounded border-gray-300" /> Employed</label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('alumni.admin.alumni.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}