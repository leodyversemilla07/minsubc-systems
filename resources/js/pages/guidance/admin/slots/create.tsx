import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function SlotCreate({ counselors }: { counselors: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        counselor_id: '', date: '', start_time: '', end_time: '', duration_minutes: '30', notes: '', is_available: true,
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('guidance.admin.slots.store')); };

    return (
        <AppLayout>
            <Head title="Create Slot" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.slots.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Appointment Slot</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Slot Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>Counselor</Label>
                                <Select value={data.counselor_id} onValueChange={(v) => setData('counselor_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select counselor" /></SelectTrigger>
                                    <SelectContent>
                                        {counselors.map((c: any) => <SelectItem key={c.id} value={String(c.id)}>{c.full_name ?? `${c.first_name} ${c.last_name}`}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.counselor_id && <p className="text-sm text-red-600">{errors.counselor_id}</p>}
                            </div>
                            <div><Label>Date</Label><Input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} />{errors.date && <p className="text-sm text-red-600">{errors.date}</p>}</div>
                            <div className="grid grid-cols-3 gap-4">
                                <div><Label>Start Time</Label><Input type="time" value={data.start_time} onChange={(e) => setData('start_time', e.target.value)} />{errors.start_time && <p className="text-sm text-red-600">{errors.start_time}</p>}</div>
                                <div><Label>End Time</Label><Input type="time" value={data.end_time} onChange={(e) => setData('end_time', e.target.value)} /></div>
                                <div><Label>Duration (min)</Label><Input type="number" value={data.duration_minutes} onChange={(e) => setData('duration_minutes', e.target.value)} /></div>
                            </div>
                            <div><Label>Notes</Label><Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={2} /></div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_available" checked={data.is_available} onChange={(e) => setData('is_available', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                <Label htmlFor="is_available">Available</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('guidance.admin.slots.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}