import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Target } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CurriculumMap({ programs }: { programs: any[] }) {
    return (
        <AppLayout>
            <Head title="Curriculum Map" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Target className="mr-2 inline h-6 w-6" />Curriculum Map</h1>
                </div>
                {programs?.length ? programs.map((prog: any) => (
                    <Card key={prog.id} className="p-6">
                        <h2 className="mb-4 text-lg font-semibold">{prog.code} — {prog.name}</h2>
                        {prog.outcomes?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Program Outcome</TableHead>
                                        <TableHead>Curriculum</TableHead>
                                        <TableHead>Curricula</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {prog.outcomes.map((po: any) => (
                                        <TableRow key={po.id}>
                                            <TableCell className="font-medium">{po.code ?? 'PO' + po.id}: {po.description}</TableCell>
                                            <TableCell>{prog.curricula?.map((c: any) => c.name).join(', ') || '—'}</TableCell>
                                            <TableCell>{prog.curricula?.length ?? 0}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground text-sm">No outcomes defined for this program.</p>}
                    </Card>
                )) : <p className="text-muted-foreground">No program data available.</p>}
            </div>
        </AppLayout>
    );
}