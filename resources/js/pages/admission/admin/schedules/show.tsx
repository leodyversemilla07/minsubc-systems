import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface ScheduleData {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    room: string | null;
    type: string;
    notes: string | null;
    section: { id: number; name: string; course: { code: string; name: string } };
    subject: { id: number; code: string; name: string; units: number };
    instructor: { id: number; name: string } | null;
}

interface Props extends PageProps {
    schedule: ScheduleData;
}

export default function ScheduleShow({ schedule }: Props) {
    const handleDelete = () => {
        if (!confirm('Delete this schedule?')) return;
        router.delete(route('admission.admin.schedules.destroy', schedule.id));
    };

    return (
        <>
            <Head title="Schedule Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admission.admin.schedules.index')} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                        <div><h1 className="text-2xl font-bold tracking-tight">Schedule</h1><p className="text-muted-foreground">{schedule.subject?.code ?? ''} — {schedule.section?.name ?? ''}</p></div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admission.admin.schedules.edit', schedule.id)} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"><Edit className="mr-2 h-4 w-4" /> Edit</Link>
                        <Button variant="destructive" onClick={handleDelete}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card><CardHeader><CardTitle>Schedule Info</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Day</span><span className="font-medium">{schedule.day}</span></div>
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Time</span><span className="font-medium">{schedule.start_time?.slice(0, 5)} — {schedule.end_time?.slice(0, 5)}</span></div>
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Type</span><Badge variant="secondary">{schedule.type === 'lec' ? 'Lecture' : 'Lab'}</Badge></div>
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Room</span><span className="font-medium">{schedule.room ?? 'Not set'}</span></div>
                            {schedule.notes && <div><span className="text-sm text-muted-foreground">Notes</span><p className="text-sm mt-1">{schedule.notes}</p></div>}
                        </CardContent>
                    </Card>
                    <Card><CardHeader><CardTitle>Related</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Section</span><Link href={route('admission.admin.sections.show', schedule.section?.id)} className="font-medium text-primary hover:underline">{schedule.section?.name ?? '-'}</Link></div>
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Course</span><span className="font-medium">{schedule.section?.course?.code ?? '-'}</span></div>
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Subject</span><span className="font-medium">{schedule.subject?.code ?? '-'} — {schedule.subject?.name}</span></div>
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Units</span><span className="font-medium">{schedule.subject?.units ?? '-'}</span></div>
                            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Instructor</span><span className="font-medium">{schedule.instructor?.name ?? 'Not assigned'}</span></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

ScheduleShow.layout = (page: React.ReactNode) => <AppLayout children={page} />;