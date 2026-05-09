import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DocumentData { id: number; title: string; description: string; category: string; file_name: string; }
interface Props extends PageProps { document: DocumentData; categories: string[] }

export default function DocumentEdit({ document: doc, categories }: Props) {
    const [form, setForm] = useState({ title: '', description: '', category: '', file: null as File | null });
    useEffect(() => { setForm({ title: doc.title, description: doc.description ?? '', category: doc.category, file: null }); }, [doc]);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('description', form.description);
        fd.append('category', form.category);
        if (form.file) fd.append('file', form.file);
        fd.append('_method', 'PUT');
        router.post(route('usg.admin.documents.update', doc.id), fd);
    };

    return (
        <AppLayout>
            <Head title="Edit Document" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.documents.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Document</h1>
                </div>
                <Card>
                    <CardHeader><CardTitle>Document Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4" encType="multipart/form-data">
                            <input type="hidden" name="_method" value="PUT" />
                            <div><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Description</label><textarea className="w-full rounded-md border p-2" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                            <div><label className="text-sm font-medium">Category</label>
                                <select className="w-full rounded-md border p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    {categories?.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div><label className="text-sm font-medium">Replace File (optional)</label><Input type="file" onChange={e => setForm({ ...form, file: e.target.files?.[0] ?? null })} /></div>
                            <div className="flex gap-2"><Button type="submit">Update</Button><Link href={route('usg.admin.documents.index')}><Button variant="outline" type="button">Cancel</Button></Link></div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}