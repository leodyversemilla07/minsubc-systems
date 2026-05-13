import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function DepartmentCreate() {
    const { data, setData, post, processing, errors } = useForm({ code: '', name: '', description: '' });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('hr.admin.departments.store')); };
    return (
        <AppLayout>
            <Head title="Add Department" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.departments.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Department</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Department Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Code</Label><Input value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="e.g. CICS" />{errors.code && <p className="text-sm text-red-600">{errors.code}</p>}</div>
                                <div><Label>Name</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. College of Information Technology" />{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}</div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('hr.admin.departments.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}