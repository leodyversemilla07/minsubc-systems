import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProgramCreate() {
    const { data, setData, post, processing, errors } = useForm({ code: '', name: '', description: '', is_active: true });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('curriculum.admin.programs.store')); };
    return (
        <AppLayout>
            <Head title="Create Program" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.programs.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Program</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Program Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Code</Label><Input value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="e.g. BSCS" />{errors.code && <p className="text-sm text-red-600">{errors.code}</p>}</div>
                                <div><Label>Name</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. Bachelor of Science in CS" />{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}</div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('curriculum.admin.programs.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}