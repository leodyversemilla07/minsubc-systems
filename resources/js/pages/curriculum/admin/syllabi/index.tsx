import { Head, Link } from '@inertiajs/react';
import { BookCheck, Eye, Plus, Send } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SyllabusIndex({ syllabi }: { syllabi: any[] }) {
    return (
        <AppLayout>
            <Head title="Syllabi" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Syllabi</h1>
                    <Link href={route('curriculum.admin.syllabi.create')}><Button><Plus className="mr-2 h-4 w-4" /> Create Syllabus</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><BookCheck className="mr-2 inline h-5 w-5" />All Syllabi</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Outcomes</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {syllabi.map((s: any) => (
                                    <TableRow key={s.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{s.title}</TableCell>
                                        <TableCell>{s.course?.code ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${s.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{s.status}</span>
                                        </TableCell>
                                        <TableCell>{s.course_outcomes_count ?? s.course_outcomes?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('curriculum.admin.syllabi.show', s.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                {s.status !== 'published' && (
                                                    <Link as="button" method="post" href={route('curriculum.admin.syllabi.publish', s.id)}>
                                                        <Button variant="ghost" size="icon" title="Publish"><Send className="h-4 w-4 text-green-600" /></Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {syllabi.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No syllabi found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}