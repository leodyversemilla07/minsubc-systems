import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SyllabusCreate({ courses }: { courses: any[] }) {
    const { data, setData, post, processing, errors } = useForm({ course_id: '', title: '', description: '' });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('curriculum.admin.syllabi.store')); };
    return (
        <AppLayout>
            <Head title="Create Syllabus" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.syllabi.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Syllabus</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Syllabus Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>Course</Label>
                                <Select value={data.course_id} onValueChange={(v) => setData('course_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                                    <SelectContent>{courses.map((c: any) => <SelectItem key={c.id} value={String(c.id)}>{c.code} — {c.name}</SelectItem>)}</SelectContent>
                                </Select>
                                {errors.course_id && <p className="text-sm text-red-600">{errors.course_id}</p>}
                            </div>
                            <div><Label>Title</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="e.g. CS101 Syllabus" />{errors.title && <p className="text-sm text-red-600">{errors.title}</p>}</div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('curriculum.admin.syllabi.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}