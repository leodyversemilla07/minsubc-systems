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
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

interface Subject {
    id: number;
    code: string;
    name: string;
    description: string | null;
    units: number;
    semester: string;
    year_level: number;
    type: string;
    lab_hours: number | null;
    lec_hours: number | null;
    is_active: boolean;
    course: { id: number; code: string; name: string };
}

interface Schedule {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    room: string | null;
    section: { name: string } | null;
    instructor: { name: string } | null;
}

interface Props extends PageProps {
    subject: Subject;
    schedules: Schedule[];
}

export default function SubjectShow({ subject, schedules }: Props) {
    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this subject?')) return;
        router.delete(route('admission.admin.subjects.destroy', subject.id), {
            onError: (err) => alert(Object.values(err).join('\n')),
        });
    };

    return (
        <>
            <Head title={`Subject: ${subject.code}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admission.admin.subjects.index')} className="p-2 hover:bg-accent rounded-md">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">{subject.code}</h1>
                            <p className="text-muted-foreground">{subject.name}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admission.admin.subjects.edit', subject.id)} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Subject Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Course</p>
                                <p className="font-medium">{subject.course?.code ?? '-'} — {subject.course?.name ?? '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Units</p>
                                <p className="font-medium">{subject.units}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Year / Semester</p>
                                <p className="font-medium">Year {subject.year_level} — {subject.semester}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Type</p>
                                <Badge variant="secondary">{subject.type === 'lec' ? 'Lecture' : subject.type === 'lab' ? 'Lab' : 'Both'}</Badge>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Hours</p>
                                <p className="font-medium">Lec: {subject.lec_hours ?? 0}h / Lab: {subject.lab_hours ?? 0}h</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge variant="secondary">
                                    {subject.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </div>
                        {subject.description && (
                            <div className="mt-4">
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p className="mt-1">{subject.description}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Schedules */}
                <Card>
                    <CardHeader>
                        <CardTitle>Schedules ({schedules.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {schedules.length === 0 ? (
                            <div className="px-6 pb-6 text-sm text-muted-foreground">No schedules assigned.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Day</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Room</TableHead>
                                        <TableHead>Section</TableHead>
                                        <TableHead>Instructor</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {schedules.map((sched: any) => (
                                        <TableRow key={sched.id}>
                                            <TableCell>{sched.day}</TableCell>
                                            <TableCell>{sched.start_time} — {sched.end_time}</TableCell>
                                            <TableCell>{sched.room ?? '-'}</TableCell>
                                            <TableCell>{sched.section?.name ?? '-'}</TableCell>
                                            <TableCell>{sched.instructor?.name ?? '-'}</TableCell>
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

SubjectShow.layout = (page: React.ReactNode) => <AppLayout children={page} />;