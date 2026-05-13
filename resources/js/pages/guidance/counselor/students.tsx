import { Head, Link } from '@inertiajs/react';
import { Users, Eye } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function CounselorStudents({ students }: { students: any[] }) {
    return (
        <AppLayout>
            <Head title="My Students" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Users className="mr-2 inline h-6 w-6" />My Students</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Sessions</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((s: any) => (
                                    <TableRow key={s.id}>
                                        <TableCell className="font-mono text-sm">{s.student_id ?? s.id}</TableCell>
                                        <TableCell className="font-medium">{s.name}</TableCell>
                                        <TableCell>{s.sessions_count ?? s.sessions?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <Link href={route('guidance.counselor.students.show', s.id)}>
                                                <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {students.length === 0 && (
                                    <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No students assigned yet.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}