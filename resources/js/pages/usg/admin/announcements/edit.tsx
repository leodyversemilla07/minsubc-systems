import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnnouncementData {
    id: number; title: string; content: string; excerpt: string;
    category: string; status: string; publish_date: string;
}

interface Props extends PageProps {
    announcement: AnnouncementData;
    categories: string[];
}

export default function AnnouncementEdit({ announcement, categories }: Props) {
    const [form, setForm] = useState({ title: '', content: '', category: '', publish_at: '', excerpt: '' });

    useEffect(() => {
        setForm({
            title: announcement.title,
            content: announcement.content,
            category: announcement.category,
            publish_at: announcement.publish_date ? announcement.publish_date.split('T')[0] : '',
            excerpt: announcement.excerpt ?? '',
        });
    }, [announcement]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('usg.admin.announcements.update', announcement.id), form);
    };

    return (
        <AppLayout>
            <Head title="Edit Announcement" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.announcements.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Announcement</h1>
                </div>
                <Card>
                    <CardHeader><CardTitle>Announcement Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <div><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Content</label><textarea className="w-full rounded-md border p-2" rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Category</label>
                                <select className="w-full rounded-md border p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    <option value="">Select category</option>
                                    {categories?.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div><label className="text-sm font-medium">Publish Date</label><Input type="date" value={form.publish_at} onChange={e => setForm({ ...form, publish_at: e.target.value })} /></div>
                            <div><label className="text-sm font-medium">Excerpt</label><textarea className="w-full rounded-md border p-2" rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></div>
                            <div className="flex gap-2">
                                <Button type="submit">Update</Button>
                                <Link href={route('usg.admin.announcements.index')}><Button variant="outline" type="button">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}