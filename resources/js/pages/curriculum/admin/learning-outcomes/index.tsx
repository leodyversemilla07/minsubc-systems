import { Head, Link } from '@inertiajs/react';
import { Target, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ProgramOutcomeIndex({ programOutcomes }: { programOutcomes: any[] }) {
    return (
        <AppLayout>
            <Head title="Program Outcomes" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Target className="mr-2 inline h-6 w-6" />Program Outcomes</h1>
                <Card>
                    <CardHeader><CardTitle>All Program Outcomes</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead className="w-16">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {programOutcomes.map((po: any) => (
                                    <TableRow key={po.id}>
                                        <TableCell className="font-mono text-sm font-medium">{po.code ?? 'PO' + po.id}</TableCell>
                                        <TableCell className="max-w-md">{po.description}</TableCell>
                                        <TableCell>{po.program?.code ?? '—'}</TableCell>
                                        <TableCell>
                                            <Link as="button" method="delete" href={route('curriculum.admin.program-outcomes.destroy', po.id)} onClick={(e: any) => { if (!confirm('Delete?')) e.preventDefault(); }}>
                                                <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {programOutcomes.length === 0 && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No program outcomes found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}