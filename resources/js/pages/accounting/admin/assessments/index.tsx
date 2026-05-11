import { Head, Link } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Assessment {
    id: number;
    assessment_code: string;
    assessable_type: string;
    assessable_id: number;
    total_amount: number;
    paid_amount: number;
    status: string;
    due_date: string;
    academic_year: string;
    semester: string;
    assessable?: { student_id?: string; first_name?: string; last_name?: string };
}

export default function Index({ assessments, filters }: { assessments: { data: Assessment[]; links: any[] }; filters: { status?: string } }) {
    return (
        <AppLayout>
            <Head title="Assessments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Assessments</h1>
                    <Link href={route('accounting.admin.assessments.create')}>
                        <Button>New Assessment</Button>
                    </Link>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Academic Year</TableHead>
                            <TableHead>Sem</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">Paid</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assessments.data.map((a) => (
                            <TableRow key={a.id}>
                                <TableCell className="font-mono text-sm">{a.assessment_code}</TableCell>
                                <TableCell className="font-medium">
                                    {a.assessable ? `${a.assessable.first_name ?? ''} ${a.assessable.last_name ?? ''}` : `#${a.assessable_id}`}
                                </TableCell>
                                <TableCell>{a.academic_year || '—'}</TableCell>
                                <TableCell>{a.semester || '—'}</TableCell>
                                <TableCell className="text-right">₱{(a.total_amount ?? 0).toLocaleString()}</TableCell>
                                <TableCell className="text-right">₱{(a.paid_amount ?? 0).toLocaleString()}</TableCell>
                                <TableCell className="text-right font-semibold">₱{((a.total_amount ?? 0) - (a.paid_amount ?? 0)).toLocaleString()}</TableCell>
                                <TableCell>{a.due_date || '—'}</TableCell>
                                <TableCell><Badge variant={a.status === 'paid' ? 'default' : a.status === 'partial' ? 'secondary' : 'outline'}>{a.status}</Badge></TableCell>
                                <TableCell>
                                    <Link href={route('accounting.admin.assessments.show', a.id)}>
                                        <Button variant="outline" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}