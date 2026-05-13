import { Head, Link } from '@inertiajs/react';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CourseIndex({ courses }: { courses: any[] }) {
    return (
        <AppLayout>
            <Head title="Courses" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <Link href={route('curriculum.admin.courses.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Course</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><FileText className="mr-2 inline h-5 w-5" />All Courses</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">Units</TableHead>
                                    <TableHead>Active</TableHead>
                                    <TableHead>Syllabi</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-mono text-sm">{c.code}</TableCell>
                                        <TableCell className="font-medium max-w-xs truncate">{c.name}</TableCell>
                                        <TableCell className="text-right">{c.units ?? c.units_lecture ?? '—'}</TableCell>
                                        <TableCell><span className={`inline-block h-2.5 w-2.5 rounded-full ${c.is_active ? 'bg-green-500' : 'bg-red-400'}`} /></TableCell>
                                        <TableCell>{c.syllabi_count ?? c.syllabi?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('curriculum.admin.courses.edit', c.id)}><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                                                <Link as="button" method="delete" href={route('curriculum.admin.courses.destroy', c.id)} onClick={(e: any) => { if (!confirm('Delete?')) e.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {courses.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No courses found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}