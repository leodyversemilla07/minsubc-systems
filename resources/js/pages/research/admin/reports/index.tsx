import { Head, Link } from '@inertiajs/react';
import { BarChart3 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface StatusReport {
    proposals: Record<string, number>;
    total: number;
}

export default function Index({ proposalsStatus, panelSummary }: { proposalsStatus: StatusReport; panelSummary: any }) {
    return (
        <AppLayout>
            <Head title="Research Reports" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Research Reports</h1>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <CardTitle className="mb-4 text-lg">Proposals by Status</CardTitle>
                        {proposalsStatus?.proposals && Object.keys(proposalsStatus.proposals).length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Count</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(proposalsStatus.proposals).map(([status, count]) => (
                                        <TableRow key={status}>
                                            <TableCell className="capitalize">{status}</TableCell>
                                            <TableCell className="text-right font-bold">{count as number}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell className="font-bold">Total</TableCell>
                                        <TableCell className="text-right font-bold">{proposalsStatus.total}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-muted-foreground">No proposal data yet.</p>
                        )}
                    </Card>

                    <Card className="p-6">
                        <CardTitle className="mb-4 text-lg">Panel Summary by Proposal</CardTitle>
                        {panelSummary?.panels && Object.keys(panelSummary.panels).length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Proposal</TableHead>
                                        <TableHead className="text-right">Panelists</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(panelSummary.panels).map(([proposal, panels]) => (
                                        <TableRow key={proposal}>
                                            <TableCell className="max-w-xs truncate">{proposal}</TableCell>
                                            <TableCell className="text-right font-bold">{(panels as any[]).length}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-muted-foreground">No panel data yet.</p>
                        )}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}