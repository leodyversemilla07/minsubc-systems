import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Star } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DefenseScore {
    id: number;
    panelist: { id: number; name: string } | null;
    score: number | null;
    remarks: string | null;
}

export default function Show({ defense }: { defense: any }) {
    return (
        <AppLayout>
            <Head title="Defense Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.defenses.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Defense Details</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Information</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Proposal</dt><dd className="font-medium">{defense.proposal?.title ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{defense.scheduled_date}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Room</dt><dd>{defense.room ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{defense.status}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm"><CheckCircle className="mr-2 h-4 w-4" /> Complete Defense</Button>
                        </div>
                    </Card>
                </div>

                <Card className="p-6">
                    <CardTitle className="mb-4 text-lg"><Star className="mr-2 inline h-5 w-5" />Scores</CardTitle>
                    {defense.scores?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Panelist</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Remarks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {defense.scores.map((s: DefenseScore) => (
                                    <TableRow key={s.id}>
                                        <TableCell>{s.panelist?.name ?? '—'}</TableCell>
                                        <TableCell>{s.score ?? '—'}</TableCell>
                                        <TableCell className="max-w-xs truncate">{s.remarks ?? '—'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground text-sm">No scores recorded yet.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}