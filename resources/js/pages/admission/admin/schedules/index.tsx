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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface Schedule {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    room: string | null;
    type: string;
    section: { id: number; name: string; course: { code: string } };
    subject: { id: number; code: string; name: string };
    instructor: { id: number; name: string } | null;
}

interface Section { id: number; name: string; course: { code: string } }
interface Instructor { id: number; name: string }
interface Props extends PageProps {
    schedules: { data: Schedule[]; links: any[] };
    sections: Section[];
    instructors: Instructor[];
    rooms: string[];
    filters: { section_id?: string; instructor_id?: string; day?: string; room?: string };
}

export default function ScheduleIndex({ schedules, sections, instructors, rooms, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get(route('admission.admin.schedules.index'), { ...filters, [key]: value || undefined }, { preserveState: true, preserveScroll: true });
    };
    const handleDelete = (id: number) => {
        if (!confirm('Delete this schedule?')) return;
        router.delete(route('admission.admin.schedules.destroy', id));
    };

    return (
        <>
            <Head title="Schedules" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div><h1 className="text-2xl font-bold tracking-tight">Schedules</h1><p className="text-muted-foreground">Manage class schedules</p></div>
                    <Link href={route('admission.admin.schedules.create')} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" /> New Schedule</Link>
                </div>

                <Card>
                    <CardContent className="p-4 flex flex-wrap gap-3">
                        <Select value={filters.section_id ?? ''} onValueChange={(v: string | null) => handleFilter('section_id', v ?? '')}>
                            <SelectTrigger className="w-[200px]"><SelectValue placeholder="All Sections" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Sections</SelectItem>
                                {sections.map((s) => (<SelectItem key={s.id} value={String(s.id)}>{s.name} ({s.course?.code})</SelectItem>))}
                            </SelectContent>
                        </Select>
                        <Select value={filters.instructor_id ?? ''} onValueChange={(v: string | null) => handleFilter('instructor_id', v ?? '')}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Instructor" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Instructors</SelectItem>
                                {instructors.map((i) => (<SelectItem key={i.id} value={String(i.id)}>{i.name}</SelectItem>))}
                            </SelectContent>
                        </Select>
                        <Select value={filters.day ?? ''} onValueChange={(v: string | null) => handleFilter('day', v ?? '')}>
                            <SelectTrigger className="w-[130px]"><SelectValue placeholder="Day" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Days</SelectItem>
                                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
                            </SelectContent>
                        </Select>
                        <Select value={filters.room ?? ''} onValueChange={(v: string | null) => handleFilter('room', v ?? '')}>
                            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Room" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Rooms</SelectItem>
                                {rooms.map((r) => (<SelectItem key={r} value={r}>{r}</SelectItem>))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>All Schedules</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Section</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Day</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Room</TableHead>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead className="text-center">Type</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedules.data.length === 0 ? (
                                    <TableRow><TableCell colSpan={8} className="text-center py-12 text-muted-foreground">No schedules found</TableCell></TableRow>
                                ) : schedules.data.map((sched) => (
                                    <TableRow key={sched.id}>
                                        <TableCell className="text-sm">{sched.section?.name ?? '-'}</TableCell>
                                        <TableCell><span className="font-mono text-sm">{sched.subject?.code ?? '-'}</span> <span className="text-xs text-muted-foreground">{sched.subject?.name}</span></TableCell>
                                        <TableCell>{sched.day}</TableCell>
                                        <TableCell className="text-sm">{sched.start_time?.slice(0, 5)} — {sched.end_time?.slice(0, 5)}</TableCell>
                                        <TableCell className="text-sm">{sched.room ?? '-'}</TableCell>
                                        <TableCell className="text-sm">{sched.instructor?.name ?? '-'}</TableCell>
                                        <TableCell className="text-center"><Badge variant="secondary" className="text-xs uppercase">{sched.type}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Link href={route('admission.admin.schedules.show', sched.id)} className="p-2 hover:bg-accent rounded-md"><Eye className="h-4 w-4" /></Link>
                                                <Link href={route('admission.admin.schedules.edit', sched.id)} className="p-2 hover:bg-accent rounded-md"><Edit className="h-4 w-4" /></Link>
                                                <button onClick={() => handleDelete(sched.id)} className="p-2 hover:bg-accent rounded-md text-destructive"><Trash2 className="h-4 w-4" /></button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {schedules.links && schedules.links.length > 3 && (
                    <div className="flex justify-center gap-1">
                        {schedules.links.map((link: any, i: number) => (
                            <Link key={i} href={link.url || '#'}
                                className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'border border-input bg-background hover:bg-accent'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

ScheduleIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;