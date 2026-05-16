import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EventCreate() {
    const { data, setData, post, processing } = useForm({
        title: '', event_type: 'meeting', start_datetime: '', end_datetime: '',
        location: '', description: '', color: '#3b82f6', all_day: false,
        is_public: true, max_participants: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('scheduling.admin.events.store')); };
    return (
        <AppLayout>
            <Head title="New Event" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('scheduling.admin.events.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">New Event</h1>
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
                                <div><Label>Color</Label><Input type="color" value={data.color} onChange={(e) => setData('color', e.target.value)} /></div>
                                <div><Label>Start</Label><Input type="datetime-local" value={data.start_datetime} onChange={(e) => setData('start_datetime', e.target.value)} /></div>
                                <div><Label>End</Label><Input type="datetime-local" value={data.end_datetime} onChange={(e) => setData('end_datetime', e.target.value)} /></div>
                                <div><Label>Location</Label><Input value={data.location} onChange={(e) => setData('location', e.target.value)} /></div>
                                <div><Label>Max Participants</Label><Input type="number" value={data.max_participants} onChange={(e) => setData('max_participants', e.target.value)} /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2"><input type="checkbox" checked={data.all_day} onChange={(e) => setData('all_day', e.target.checked)} />All Day</label>
                                <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_public} onChange={(e) => setData('is_public', e.target.checked)} />Public</label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('scheduling.admin.events.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}