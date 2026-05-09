import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps { categories: string[]; statuses: string[] }

export default function ResolutionCreate({ categories, statuses }: Props) {
    const [form, setForm] = useState({ title: '', description: '', content: '', category: '', date_passed: '', file: null as File | null });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('description', form.description);
        fd.append('content', form.content);
        fd.append('category', form.category);
        fd.append('date_passed', form.date_passed);
        if (form.file) fd.append('file', form.file);
        router.post(route('usg.admin.resolutions.store'), fd);
    };

    return (
        <AppLayout>
            <Head title="Create Resolution" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.resolutions.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Resolution</h1>
                </div>
                <Card>
                    <CardHeader><CardTitle>Resolution Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4" encType="multipart/form-data">
                            <div><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Description</label><textarea className="w-full rounded-md border p-2" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Content</label><textarea className="w-full rounded-md border p-2" rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium">Category</label>
                                    <select className="w-full rounded-md border p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                        <option value="">Select category</option>
                                        {categories?.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div><label className="text-sm font-medium">Date Passed</label><Input type="date" value={form.date_passed} onChange={e => setForm({ ...form, date_passed: e.target.value })} required /></div>
                            </div>
                            <div><label className="text-sm font-medium">PDF File</label><Input type="file" accept=".pdf" onChange={e => setForm({ ...form, file: e.target.files?.[0] ?? null })} required /></div>
                            <div className="flex gap-2"><Button type="submit">Create</Button><Link href={route('usg.admin.resolutions.index')}><Button variant="outline" type="button">Cancel</Button></Link></div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}