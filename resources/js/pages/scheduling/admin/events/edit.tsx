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
    const { data, setData, put, processing } = useForm({
        title: event.title,
        event_type: event.event_type,
        start_datetime: event.start_datetime?.slice(0, 16) ?? '',
        end_datetime: event.end_datetime?.slice(0, 16) ?? '',
        location: event.location ?? '',
        description: event.description ?? '',
        status: event.status,
        all_day: event.all_day,
        is_public: event.is_public,
        color: event.color ?? '#3b82f6',
        max_participants: String(event.max_participants ?? ''),
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('scheduling.admin.events.update', event.id)); };
    return (
        <AppLayout>
            <Head title="Edit Event" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('scheduling.admin.events.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit: {event.title}</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Title</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Type</Label>
                                    <Select value={data.event_type} onValueChange={(v) => setData('event_type', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="meeting">Meeting</SelectItem>
                                            <SelectItem value="workshop">Workshop</SelectItem>
                                            <SelectItem value="seminar">Seminar</SelectItem>
                                            <SelectItem value="exam">Exam</SelectItem>
                                            <SelectItem value="orientation">Orientation</SelectItem>
                                            <SelectItem value="celebration">Celebration</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Status</Label>
                                    <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="scheduled">Scheduled</SelectItem>
                                            <SelectItem value="ongoing">Ongoing</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Start</Label><Input type="datetime-local" value={data.start_datetime} onChange={(e) => setData('start_datetime', e.target.value)} /></div>
                                <div><Label>End</Label><Input type="datetime-local" value={data.end_datetime} onChange={(e) => setData('end_datetime', e.target.value)} /></div>
                                <div><Label>Location</Label><Input value={data.location} onChange={(e) => setData('location', e.target.value)} /></div>
                                <div><Label>Color</Label><Input type="color" value={data.color} onChange={(e) => setData('color', e.target.value)} /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex items-center gap-4">
                                <label><input type="checkbox" checked={data.all_day} onChange={(e) => setData('all_day', e.target.checked)} /> All Day</label>
                                <label><input type="checkbox" checked={data.is_public} onChange={(e) => setData('is_public', e.target.checked)} /> Public</label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('scheduling.admin.events.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}