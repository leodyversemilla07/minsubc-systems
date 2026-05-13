import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SyllabusStatus({ courses, total, withSyllabi, published }: { courses: any[]; total: number; withSyllabi: number; published: number }) {
    return (
        <AppLayout>
            <Head title="Syllabus Status" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><BookCheck className="mr-2 inline h-6 w-6" />Syllabus Status</h1>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="p-6"><div className="text-sm font-medium text-muted-foreground">Total Courses</div><div className="text-3xl font-bold">{total}</div></Card>
                    <Card className="p-6"><div className="text-sm font-medium text-muted-foreground">With Syllabi</div><div className="text-3xl font-bold">{withSyllabi}</div></Card>
                    <Card className="p-6"><div className="text-sm font-medium text-muted-foreground">Published</div><div className="text-3xl font-bold text-green-600">{published}</div></Card>
                </div>

                <Card className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead className="text-right">Syllabi</TableHead>
                                <TableHead className="text-right">Published</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map((c: any) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-mono text-sm">{c.code}</TableCell>
                                    <TableCell className="font-medium">{c.name}</TableCell>
                                    <TableCell className="text-right">{c.syllabi_count ?? 0}</TableCell>
                                    <TableCell className="text-right">{c.published_syllabi ?? 0}</TableCell>
                                    <TableCell>
                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${c.published_syllabi > 0 ? 'bg-green-100 text-green-800' : c.syllabi_count > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {c.published_syllabi > 0 ? 'Complete' : c.syllabi_count > 0 ? 'In Progress' : 'Missing'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}