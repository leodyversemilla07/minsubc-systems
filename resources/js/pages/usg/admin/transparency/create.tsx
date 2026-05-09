import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps { types: string[] }

export default function TransparencyCreate({ types }: Props) {
    const [form, setForm] = useState({ title: '', content: '', report_type: '', status: 'draft', period_start: '', period_end: '', file: null as File | null });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('title', form.title); fd.append('content', form.content);
        fd.append('report_type', form.report_type); fd.append('status', form.status);
        fd.append('period_start', form.period_start); fd.append('period_end', form.period_end);
        if (form.file) fd.append('file', form.file);
        router.post(route('usg.admin.transparency.store'), fd);
    };

    return (
        <AppLayout>
            <Head title="Create Transparency Report" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.transparency.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Transparency Report</h1>
                </div>
                <Card>
                    <CardHeader><CardTitle>Report Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4" encType="multipart/form-data">
                            <div><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Content</label><textarea className="w-full rounded-md border p-2" rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium">Type</label>
                                    <select className="w-full rounded-md border p-2" value={form.report_type} onChange={e => setForm({ ...form, report_type: e.target.value })}>
                                        <option value="">Select type</option>
                                        {types?.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div><label className="text-sm font-medium">Status</label>
                                    <select className="w-full rounded-md border p-2" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium">Period Start</label><Input type="date" value={form.period_start} onChange={e => setForm({ ...form, period_start: e.target.value })} required /></div>
                                <div><label className="text-sm font-medium">Period End</label><Input type="date" value={form.period_end} onChange={e => setForm({ ...form, period_end: e.target.value })} required /></div>
                            </div>
                            <div><label className="text-sm font-medium">PDF File</label><Input type="file" accept=".pdf" onChange={e => setForm({ ...form, file: e.target.files?.[0] ?? null })} /></div>
                            <div className="flex gap-2"><Button type="submit">Create</Button><Link href={route('usg.admin.transparency.index')}><Button variant="outline" type="button">Cancel</Button></Link></div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}