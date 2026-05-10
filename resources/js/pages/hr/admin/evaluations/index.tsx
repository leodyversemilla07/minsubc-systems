import { Head, Link } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Evaluation {
    id: number;
    employee: { id: number; employee_id: string; first_name: string; last_name: string };
    evaluator: { id: number; first_name: string; last_name: string };
    type: string;
    period: string;
    rating: number;
    status: string;
    submitted_at: string;
}

interface Props {
    evaluations: { data: Evaluation[]; links: any[] };
    filters: { status?: string; type?: string };
}

export default function Index({ evaluations, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Evaluations" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Evaluations</h1>
                    <Link href={route('hr.admin.evaluations.create')}>
                        <Button>New Evaluation</Button>
                    </Link>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Evaluator</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {evaluations.data.map((e) => (
                            <TableRow key={e.id}>
                                <TableCell className="font-medium">{e.employee?.first_name} {e.employee?.last_name}</TableCell>
                                <TableCell>{e.evaluator?.first_name} {e.evaluator?.last_name}</TableCell>
                                <TableCell className="capitalize">{e.type}</TableCell>
                                <TableCell>{e.period}</TableCell>
                                <TableCell>{e.rating || '—'}</TableCell>
                                <TableCell><Badge variant={e.status === 'completed' ? 'default' : 'secondary'}>{e.status}</Badge></TableCell>
                                <TableCell>
                                    <Link href={route('hr.admin.evaluations.show', e.id)}>
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