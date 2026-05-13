import { Head, Link } from '@inertiajs/react';
import { FileText, Eye, Printer } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AssessmentIndex({ assessments }: { assessments: any[] }) {
    return (
        <AppLayout>
            <Head title="Assessments" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Assessments</h1>
                <Card>
                    <CardHeader><CardTitle><FileText className="mr-2 inline h-5 w-5" />All Assessments</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assessments.map((a: any) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">{a.student?.name ?? a.student_id ?? '—'}</TableCell>
                                        <TableCell className="capitalize">{a.assessment_type ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                a.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                a.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                a.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{a.status}</span>
                                        </TableCell>
                                        <TableCell>{a.submitted_at ?? '—'}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('guidance.admin.assessments.show', a.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('guidance.admin.assessments.print', a.id)}><Button variant="ghost" size="icon"><Printer className="h-4 w-4" /></Button></Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {assessments.length === 0 && (
                                    <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No assessments found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}