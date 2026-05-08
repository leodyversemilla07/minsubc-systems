import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface Section { id: number; name: string; course: { code: string; name: string } }
interface Subject { id: number; code: string; name: string; units: number }

interface Props extends PageProps {
    sections: Section[];
    subjects: Subject[];
    selectedSection: Section | null;
    days: string[];
}

export default function ScheduleCreate({ sections, subjects, selectedSection, days }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        section_id: selectedSection ? String(selectedSection.id) : '',
        subject_id: '',
        day: 'Monday',
        start_time: '08:00',
        end_time: '10:00',
        room: '',
        instructor_id: '',
        type: 'lec',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admission.admin.schedules.store'));
    };

    return (
        <>
            <Head title="Create Schedule" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admission.admin.schedules.index')} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                    <div><h1 className="text-2xl font-bold tracking-tight">Create Schedule</h1><p className="text-muted-foreground">Add a schedule entry</p></div>
                </div>
                <form onSubmit={submit} className="max-w-3xl">
                    <Card><CardHeader><CardTitle>Schedule Details</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Section *</Label>
                                    <Select value={data.section_id || 'noop'} onValueChange={(v: string | null) => setData('section_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue placeholder="Select section" /></SelectTrigger>
                                        <SelectContent>{sections.map((s) => (
                                            <SelectItem key={s.id} value={String(s.id)}>{s.name} ({s.course?.code})</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    {errors.section_id && <span className="text-xs text-destructive">{errors.section_id}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Subject *</Label>
                                    <Select value={data.subject_id || 'noop'} onValueChange={(v: string | null) => setData('subject_id', (v === 'noop' ? '' : v) ?? '')}>
                                        <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                                        <SelectContent>{subjects.map((s) => (
                                            <SelectItem key={s.id} value={String(s.id)}>{s.code} — {s.name}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    {errors.subject_id && <span className="text-xs text-destructive">{errors.subject_id}</span>}
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-4">
                                <div className="space-y-2">
                                    <Label>Day *</Label>
                                    <Select value={data.day || 'noop'} onValueChange={(v: string | null) => setData('day', (v === 'noop' ? 'Monday' : v) ?? 'Monday')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{days.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}</SelectContent>
                                    </Select>
                                    {errors.day && <span className="text-xs text-destructive">{errors.day}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Start *</Label>
                                    <Input type="time" value={data.start_time} onChange={(e) => setData('start_time', e.target.value)} />
                                    {errors.start_time && <span className="text-xs text-destructive">{errors.start_time}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label>End *</Label>
                                    <Input type="time" value={data.end_time} onChange={(e) => setData('end_time', e.target.value)} />
                                    {errors.end_time && <span className="text-xs text-destructive">{errors.end_time}</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Type *</Label>
                                    <Select value={data.type || 'noop'} onValueChange={(v: string | null) => setData('type', (v === 'noop' ? 'lec' : v) ?? 'lec')}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent><SelectItem value="lec">Lecture</SelectItem><SelectItem value="lab">Lab</SelectItem></SelectContent>
                                    </Select>
                                    {errors.type && <span className="text-xs text-destructive">{errors.type}</span>}
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Room</Label>
                                    <Input value={data.room} onChange={(e) => setData('room', e.target.value)} placeholder="e.g., R201" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Instructor</Label>
                                    <Input value={data.instructor_id} onChange={(e) => setData('instructor_id', e.target.value)} placeholder="User ID" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={2} />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="mt-6 flex justify-end gap-3">
                        <Link href={route('admission.admin.schedules.index')} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</Link>
                        <Button type="submit" disabled={processing}>{processing ? 'Creating...' : 'Create Schedule'}</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

ScheduleCreate.layout = (page: React.ReactNode) => <AppLayout children={page} />;