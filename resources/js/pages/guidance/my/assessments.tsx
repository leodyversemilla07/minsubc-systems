import { Head, Link } from '@inertiajs/react';
import { FileText } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function Assessments({ assessments }: { assessments: any[] }) {
    return (
        <AppLayout>
            <Head title="My Assessments" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><FileText className="mr-2 inline h-6 w-6" />My Assessments</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assessments.map((a: any) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="capitalize font-medium">{a.assessment_type ?? '—'}</TableCell>
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
                                            {a.status === 'pending' && (
                                                <Link as="button" method="post" href={route('guidance.my.assessments.submit', a.id)}>
                                                    <Button variant="outline" size="sm">Submit</Button>
                                                </Link>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {assessments.length === 0 && (
                                    <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No assessments found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}