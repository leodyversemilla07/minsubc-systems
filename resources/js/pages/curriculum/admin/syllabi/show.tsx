import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Send, BookCheck, Target, GraduationCap, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SyllabusShow({ syllabus, courseOutcomes, textbooks }: { syllabus: any; courseOutcomes: any[]; textbooks: any[] }) {
    return (
        <AppLayout>
            <Head title={syllabus.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.syllabi.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{syllabus.title}</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${syllabus.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{syllabus.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><BookCheck className="mr-2 inline h-5 w-5" />Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Course</dt><dd className="font-medium">{syllabus.course?.code} — {syllabus.course?.name}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{syllabus.status}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Outcomes</dt><dd>{courseOutcomes?.length ?? 0}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Textbooks</dt><dd>{textbooks?.length ?? 0}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex flex-wrap gap-2">
                            {syllabus.status !== 'published' && (
                                <Link as="button" method="post" href={route('curriculum.admin.syllabi.publish', syllabus.id)}>
                                    <Button><Send className="mr-2 h-4 w-4" /> Publish</Button>
                                </Link>
                            )}
                        </div>
                    </Card>
                </div>

                {syllabus.description && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Description</h2>
                        <p className="text-muted-foreground text-sm">{syllabus.description}</p>
                    </Card>
                )}

                <Card className="p-6">
                    <CardHeader className="px-0 pt-0"><h2 className="text-lg font-semibold"><GraduationCap className="mr-2 inline h-5 w-5" />Course Outcomes ({courseOutcomes?.length ?? 0})</h2></CardHeader>
                    {courseOutcomes?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courseOutcomes.map((co: any) => (
                                    <TableRow key={co.id}>
                                        <TableCell className="font-mono text-sm">{co.code ?? 'CO' + co.id}</TableCell>
                                        <TableCell className="max-w-md">{co.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground text-sm">No course outcomes added yet.</p>}
                </Card>

                <Card className="p-6">
                    <CardHeader className="px-0 pt-0"><h2 className="text-lg font-semibold"><BookOpen className="mr-2 inline h-5 w-5" />Textbooks ({textbooks?.length ?? 0})</h2></CardHeader>
                    {textbooks?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>ISBN</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {textbooks.map((st: any) => (
                                    <TableRow key={st.id}>
                                        <TableCell className="font-medium">{st.textbook?.title ?? st.title ?? '—'}</TableCell>
                                        <TableCell>{st.textbook?.author ?? st.author ?? '—'}</TableCell>
                                        <TableCell className="font-mono text-sm">{st.textbook?.isbn ?? st.isbn ?? '—'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground text-sm">No textbooks assigned.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}