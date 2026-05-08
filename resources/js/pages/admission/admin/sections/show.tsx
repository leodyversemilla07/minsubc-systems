import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ArrowLeft, Edit, Trash2, Users, Calendar } from 'lucide-react';

interface SectionData {
    id: number;
    name: string;
    year_level: number;
    status: string;
    max_students: number | null;
    room: string | null;
    notes: string | null;
    course: { id: number; code: string; name: string };
    academic_term: { id: number; academic_year: string; semester: string };
    adviser: { id: number; name: string } | null;
    enrollments: Array<{ id: number; student_id: string | null; user: { id: number; name: string } | null }>;
}

interface ScheduleItem {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    room: string | null;
    type: string;
    subject: { id: number; code: string; name: string; units: number };
    instructor: { id: number; name: string } | null;
}

interface Props extends PageProps {
    section: SectionData;
    scheduleByDay: Record<string, ScheduleItem[]>;
    availableSubjects: Array<{ id: number; code: string; name: string; units: number }>;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function SectionShow({ section, scheduleByDay }: Props) {
    const handleDelete = () => {
        if (!confirm('Delete this section?')) return;
        router.delete(route('admission.admin.sections.destroy', section.id));
    };

    return (
        <>
            <Head title={`Section: ${section.name}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admission.admin.sections.index')} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{section.name}</h1>
                            <p className="text-muted-foreground">{section.course?.name ?? '-'} — Year {section.year_level}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admission.admin.sections.edit', section.id)} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"><Edit className="mr-2 h-4 w-4" /> Edit</Link>
                        <Button variant="destructive" onClick={handleDelete}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Term</CardTitle></CardHeader>
                        <CardContent><p className="font-medium">{section.academic_term?.academic_year ?? '-'} — {section.academic_term?.semester ?? '-'}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Status</CardTitle></CardHeader>
                        <CardContent><Badge variant={section.status === 'open' ? 'default' : 'secondary'}>{section.status}</Badge></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Students</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold">{section.enrollments?.length ?? 0}{section.max_students ? ` / ${section.max_students}` : ''}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Room</CardTitle></CardHeader>
                        <CardContent><p className="font-medium">{section.room ?? 'Not set'}</p></CardContent></Card>
                </div>

                {section.notes && <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Notes:</p><p>{section.notes}</p></CardContent></Card>}

                {/* Schedule */}
                <Card>
                    <CardHeader><CardTitle><Calendar className="mr-2 h-5 w-5 inline" /> Schedule</CardTitle></CardHeader>
                    <CardContent>
                        {DAYS.every((d) => !scheduleByDay[d] || scheduleByDay[d].length === 0) ? (
                            <p className="text-sm text-muted-foreground">No schedule set.</p>
                        ) : (
                            <div className="space-y-4">
                                {DAYS.map((day) => {
                                    const items = scheduleByDay[day];
                                    if (!items || items.length === 0) return null;
                                    return (
                                        <div key={day}>
                                            <h4 className="text-sm font-semibold mb-2">{day}</h4>
                                            <div className="space-y-1">
                                                {items.map((sched: any) => (
                                                    <div key={sched.id} className="flex items-center gap-3 rounded-md border p-2 text-sm">
                                                        <Badge variant="secondary">{sched.start_time?.slice(0, 5)}-{sched.end_time?.slice(0, 5)}</Badge>
                                                        <span className="font-medium">{sched.subject?.code ?? '-'}</span>
                                                        <span className="text-muted-foreground">{sched.subject?.name}</span>
                                                        {sched.room && <span className="text-muted-foreground">({sched.room})</span>}
                                                        {sched.instructor && <span className="text-muted-foreground">— {sched.instructor.name}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Enrolled Students */}
                <Card>
                    <CardHeader><CardTitle><Users className="mr-2 h-5 w-5 inline" /> Enrolled Students ({section.enrollments?.length ?? 0})</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        {!section.enrollments || section.enrollments.length === 0 ? (
                            <div className="px-6 pb-6 text-sm text-muted-foreground">No students enrolled.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow><TableHead>Student ID</TableHead><TableHead>Name</TableHead></TableRow>
                                </TableHeader>
                                <TableBody>
                                    {section.enrollments.map((e: any) => (
                                        <TableRow key={e.id}>
                                            <TableCell className="font-mono text-sm">{e.student_id ?? '-'}</TableCell>
                                            <TableCell>{e.user?.name ?? 'Unknown'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SectionShow.layout = (page: React.ReactNode) => <AppLayout children={page} />;