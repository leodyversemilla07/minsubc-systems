import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps { departments: string[]; positions: string[] }

export default function OfficerCreate({ departments, positions }: Props) {
    const [form, setForm] = useState({ name: '', position: '', department: '', email: '', phone: '' });
    const submit = (e: React.FormEvent) => { e.preventDefault(); router.post(route('usg.admin.officers.store'), form); };

    return (
        <AppLayout>
            <Head title="Add Officer" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.officers.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Officer</h1>
                </div>
                <Card>
                    <CardHeader><CardTitle>Officer Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <div><label className="text-sm font-medium">Name</label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Position</label>
                                <select className="w-full rounded-md border p-2" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })}>
                                    <option value="">Select position</option>
                                    {positions?.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div><label className="text-sm font-medium">Department</label>
                                <select className="w-full rounded-md border p-2" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
                                    <option value="">Select department</option>
                                    {departments?.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium">Email</label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                                <div><label className="text-sm font-medium">Phone</label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                            </div>
                            <div className="flex gap-2"><Button type="submit">Add Officer</Button><Link href={route('usg.admin.officers.index')}><Button variant="outline" type="button">Cancel</Button></Link></div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}