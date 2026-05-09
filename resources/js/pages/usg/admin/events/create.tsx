import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps { categories: string[] }

export default function EventCreate({ categories }: Props) {
    const [form, setForm] = useState({ title: '', description: '', event_date: '', event_time: '10:00', location: '', category: '' });
    const submit = (e: React.FormEvent) => { e.preventDefault(); router.post(route('usg.admin.events.store'), form); };

    return (
        <AppLayout>
            <Head title="Create Event" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.events.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Event</h1>
                </div>
                <Card>
                    <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <div><label className="text-sm font-medium">Title</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Description</label><textarea className="w-full rounded-md border p-2" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium">Date</label><Input type="date" value={form.event_date} onChange={e => setForm({ ...form, event_date: e.target.value })} required /></div>
                                <div><label className="text-sm font-medium">Time</label><Input type="time" value={form.event_time} onChange={e => setForm({ ...form, event_time: e.target.value })} required /></div>
                            </div>
                            <div><label className="text-sm font-medium">Location</label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required /></div>
                            <div><label className="text-sm font-medium">Category</label>
                                <select className="w-full rounded-md border p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    <option value="">Select category</option>
                                    {categories?.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="flex gap-2"><Button type="submit">Create</Button><Link href={route('usg.admin.events.index')}><Button variant="outline" type="button">Cancel</Button></Link></div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}