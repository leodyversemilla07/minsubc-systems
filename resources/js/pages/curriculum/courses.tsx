import { Head } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Courses({ courses }: { courses: any[] }) {
    return (
        <AppLayout>
            <Head title="Courses" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BookOpen className="mr-2 inline h-6 w-6" />Courses</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">Units</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-mono text-sm">{c.code}</TableCell>
                                        <TableCell className="font-medium">{c.name}</TableCell>
                                        <TableCell className="text-right">{c.units ?? c.units_lecture ?? '—'}</TableCell>
                                        <TableCell className="max-w-md text-muted-foreground truncate">{c.description ?? '—'}</TableCell>
                                    </TableRow>
                                ))}
                                {courses.length === 0 && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No courses found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}