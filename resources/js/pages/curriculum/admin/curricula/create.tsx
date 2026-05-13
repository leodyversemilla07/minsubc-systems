import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CurriculaCreate({ programs }: { programs: any[] }) {
    const { data, setData, post, processing, errors } = useForm({ program_id: '', name: '', version: '', description: '' });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('curriculum.admin.curricula.store')); };
    return (
        <AppLayout>
            <Head title="Create Curriculum" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.curricula.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Curriculum</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Curriculum Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>Program</Label>
                                <Select value={data.program_id} onValueChange={(v) => setData('program_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                                    <SelectContent>{programs.map((p: any) => <SelectItem key={p.id} value={String(p.id)}>{p.code} — {p.name}</SelectItem>)}</SelectContent>
                                </Select>
                                {errors.program_id && <p className="text-sm text-red-600">{errors.program_id}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Name</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. BSCS 2025 Curriculum" />{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}</div>
                                <div><Label>Version</Label><Input value={data.version} onChange={(e) => setData('version', e.target.value)} placeholder="e.g. 2025-01" /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('curriculum.admin.curricula.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}