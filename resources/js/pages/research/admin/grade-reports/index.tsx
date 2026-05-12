import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Plus, Eye } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ gradeReports }: { gradeReports: any[] }) {
    return (
        <AppLayout>
            <Head title="Grade Reports" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Grade Reports</h1>
                    <Link href={route('research.admin.grade-reports.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Grade Report</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle><GraduationCap className="mr-2 inline h-5 w-5" />All Grade Reports</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Proposal</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Remarks</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {gradeReports.map((g: any) => (
                                    <TableRow key={g.id}>
                                        <TableCell className="font-medium">{g.student?.name ?? '—'}</TableCell>
                                        <TableCell className="max-w-xs truncate">{g.proposal?.title ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                (g.grade ?? 0) >= 1.0 && (g.grade ?? 0) <= 1.5 ? 'bg-green-100 text-green-800' :
                                                (g.grade ?? 0) <= 2.0 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>{g.grade}</span>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-muted-foreground">{g.remarks ?? '—'}</TableCell>
                                        <TableCell>
                                            <Link href={route('research.admin.grade-reports.edit', g.id)}>
                                                <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {gradeReports.length === 0 && (
                                    <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No grade reports found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}