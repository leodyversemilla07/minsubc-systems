import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function CourseEdit({ course, prerequisites }: { course: any; prerequisites: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        code: course.code, name: course.name, units_lecture: String(course.units_lecture ?? '3'), units_lab: String(course.units_lab ?? '0'), description: course.description ?? '', is_active: course.is_active,
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('curriculum.admin.courses.update', course.id)); };

    return (
        <AppLayout>
            <Head title="Edit Course" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.courses.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Course</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Course Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Code</Label><Input value={data.code} onChange={(e) => setData('code', e.target.value)} />{errors.code && <p className="text-sm text-red-600">{errors.code}</p>}</div>
                                <div><Label>Name</Label><Input value={data.name} onChange={(e) => setData('name', e.target.value)} />{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Lecture Units</Label><Input type="number" value={data.units_lecture} onChange={(e) => setData('units_lecture', e.target.value)} /></div>
                                <div><Label>Lab Units</Label><Input type="number" value={data.units_lab} onChange={(e) => setData('units_lab', e.target.value)} /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('curriculum.admin.courses.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="p-6">
                    <CardTitle className="mb-4 text-lg">Prerequisites</CardTitle>
                    {prerequisites?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="w-16">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {prerequisites.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-mono">{p.prerequisite?.code ?? '—'}</TableCell>
                                        <TableCell>{p.prerequisite?.name ?? '—'}</TableCell>
                                        <TableCell>
                                            <Link as="button" method="delete" href={route('curriculum.admin.courses.remove-prerequisite', [course.id, p.id])}>
                                                <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground text-sm mb-3">No prerequisites.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}