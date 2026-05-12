import { Head, Link } from '@inertiajs/react';
import { Users, Eye } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ panels }: { panels: any[] }) {
    return (
        <AppLayout>
            <Head title="Panels" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Panelists</h1>

                <Card>
                    <CardHeader><CardTitle><Users className="mr-2 inline h-5 w-5" />All Panel Assignments</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Proposal</TableHead>
                                    <TableHead>Panelist</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {panels.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{p.proposal?.title ?? '—'}</TableCell>
                                        <TableCell>{p.panelist?.name ?? '—'}</TableCell>
                                        <TableCell className="capitalize">{p.role ?? 'Member'}</TableCell>
                                    </TableRow>
                                ))}
                                {panels.length === 0 && (
                                    <TableRow><TableCell colSpan={3} className="py-8 text-center text-muted-foreground">No panel assignments yet.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}