import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EventEdit({ event }: { event: any }) {
    const { data, setData, put, processing, errors } = useForm({
        title: event.title, description: event.description ?? '',
        event_type: event.event_type, event_date: event.event_date?.slice(0, 16) ?? '',
        location: event.location ?? '', status: event.status,
        max_participants: String(event.max_participants ?? ''),
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('alumni.admin.events.update', event.id)); };
    return (
        <AppLayout>
            <Head title="Edit Event" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.events.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Event</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Title</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Type</Label>
                                    <Select value={data.event_type} onValueChange={(v) => setData('event_type', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="homecoming">Homecoming</SelectItem>
                                            <SelectItem value="reunion">Reunion</SelectItem>
                                            <SelectItem value="networking">Networking</SelectItem>
                                            <SelectItem value="fundraiser">Fundraiser</SelectItem>
                                            <SelectItem value="webinar">Webinar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upcoming">Upcoming</SelectItem>
                                            <SelectItem value="ongoing">Ongoing</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Date</Label><Input type="datetime-local" value={data.event_date} onChange={(e) => setData('event_date', e.target.value)} /></div>
                                <div><Label>Location</Label><Input value={data.location} onChange={(e) => setData('location', e.target.value)} /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('alumni.admin.events.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}