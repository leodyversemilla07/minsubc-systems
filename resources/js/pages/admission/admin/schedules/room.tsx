import { Head, Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
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

interface Schedule {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    type: string;
    section: { id: number; name: string; course: { code: string; name: string } };
    subject: { id: number; code: string; name: string };
    instructor: { id: number; name: string } | null;
}

interface Term { id: number; academic_year: string; semester: string }

interface Props extends PageProps {
    room: string;
    scheduleByDay: Record<string, Schedule[]>;
    terms: Term[];
    selectedTerm?: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function RoomSchedule({ room, scheduleByDay, terms, selectedTerm }: Props) {
    const handleFilter = (value: string) => {
        router.get(route('admission.admin.schedules.room', room), { term_id: value || undefined }, { preserveState: true });
    };

    const totalSlots = Object.values(scheduleByDay).flat().length;

    return (
        <>
            <Head title={`Room: ${room}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admission.admin.schedules.index')} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                        <div><h1 className="text-2xl font-bold tracking-tight">Room {room}</h1><p className="text-muted-foreground">{totalSlots} class slots</p></div>
                    </div>
                    <Select value={selectedTerm ?? ''} onValueChange={(v: string | null) => handleFilter(v ?? '')}>
                        <SelectTrigger className="w-[220px]"><SelectValue placeholder="Select term" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Terms</SelectItem>
                            {terms.map((t) => (<SelectItem key={t.id} value={String(t.id)}>{t.academic_year} — {t.semester}</SelectItem>))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {DAYS.map((day) => {
                        const items = scheduleByDay[day];
                        return (
                            <Card key={day}>
                                <CardHeader className="pb-2"><CardTitle className="text-sm">{day}</CardTitle></CardHeader>
                                <CardContent>
                                    {!items || items.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">No classes</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {items.map((sched: any) => (
                                                <div key={sched.id} className="rounded-md border p-2 text-xs">
                                                    <p className="font-medium">{sched.start_time?.slice(0, 5)}-{sched.end_time?.slice(0, 5)}</p>
                                                    <p>{sched.subject?.code ?? '-'} — {sched.section?.name ?? '-'}</p>
                                                    {sched.instructor && <p className="text-muted-foreground">{sched.instructor.name}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

RoomSchedule.layout = (page: React.ReactNode) => <AppLayout children={page} />;