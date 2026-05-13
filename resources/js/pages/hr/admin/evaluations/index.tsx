import { Head, Link } from '@inertiajs/react';
import { ClipboardList, Plus, Eye, Star } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function EvaluationIndex({ evaluations }: { evaluations: any[] }) {
    return (
        <AppLayout>
            <Head title="Evaluations" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Evaluations</h1>
                    <Link href={route('hr.admin.evaluations.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Evaluation</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><ClipboardList className="mr-2 inline h-5 w-5" />All Evaluations</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {evaluations.map((e: any) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-medium">{e.employee?.first_name} {e.employee?.last_name}</TableCell>
                                        <TableCell className="capitalize">{e.evaluation_type ?? '—'}</TableCell>
                                        <TableCell>{e.period ?? '—'}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Star className={`h-4 w-4 ${(e.rating ?? 0) >= 4 ? 'text-yellow-400 fill-yellow-400' : (e.rating ?? 0) >= 3 ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                <span>{e.rating ?? '—'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${e.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{e.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={route('hr.admin.evaluations.show', e.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {evaluations.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No evaluations found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}