import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Send, Plus, Trash2, ClipboardList } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CurriculaShow({ curriculum, curriculumCourses }: { curriculum: any; curriculumCourses: any[] }) {
    return (
        <AppLayout>
            <Head title={curriculum.name} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.curricula.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{curriculum.name}</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${curriculum.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{curriculum.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><ClipboardList className="mr-2 inline h-5 w-5" />Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Program</dt><dd className="font-medium">{curriculum.program?.code} — {curriculum.program?.name}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Version</dt><dd>{curriculum.version ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{curriculum.status}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Courses</dt><dd>{curriculumCourses?.length ?? 0}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex gap-2">
                            {curriculum.status !== 'published' && (
                                <Link as="button" method="post" href={route('curriculum.admin.curricula.publish', curriculum.id)}>
                                    <Button><Send className="mr-2 h-4 w-4" /> Publish</Button>
                                </Link>
                            )}
                        </div>
                    </Card>
                </div>

                {curriculum.description && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Description</h2>
                        <p className="text-muted-foreground text-sm">{curriculum.description}</p>
                    </Card>
                )}

                <Card className="p-6">
                    <CardHeader><CardTitle className="text-lg">Curriculum Courses ({curriculumCourses?.length ?? 0})</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">Units</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Year Level</TableHead>
                                    <TableHead className="w-16">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {curriculumCourses.map((cc: any) => (
                                    <TableRow key={cc.id}>
                                        <TableCell className="font-mono text-sm">{cc.course?.code ?? '—'}</TableCell>
                                        <TableCell>{cc.course?.name ?? '—'}</TableCell>
                                        <TableCell className="text-right">{cc.course?.units ?? '—'}</TableCell>
                                        <TableCell>{cc.semester ?? '—'}</TableCell>
                                        <TableCell>{cc.year_level ?? '—'}</TableCell>
                                        <TableCell>
                                            <Link as="button" method="delete" href={route('curriculum.admin.curricula.remove-course', [curriculum.id, cc.id])}>
                                                <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!curriculumCourses || curriculumCourses.length === 0) && (
                                    <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No courses assigned to this curriculum.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}