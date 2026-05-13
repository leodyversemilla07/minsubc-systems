import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, Eye, Plus, CheckCircle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function IncidentIndex({ incidentReports }: { incidentReports: any[] }) {
    return (
        <AppLayout>
            <Head title="Incident Reports" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Incident Reports</h1>
                    <Link href={route('guidance.admin.incident-reports.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Report</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><AlertTriangle className="mr-2 inline h-5 w-5" />All Incident Reports</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incidentReports.map((i: any) => (
                                    <TableRow key={i.id}>
                                        <TableCell className="font-medium">{i.student?.name ?? i.student_id ?? '—'}</TableCell>
                                        <TableCell className="capitalize">{i.type ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                i.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                                i.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                                i.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                                i.severity === 'low' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{i.severity ?? '—'}</span>
                                        </TableCell>
                                        <TableCell>{i.incident_date ?? i.created_at ? new Date(i.created_at).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                i.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                                i.status === 'open' ? 'bg-red-100 text-red-800' :
                                                i.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{i.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('guidance.admin.incident-reports.show', i.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                {i.status !== 'resolved' && (
                                                    <Link as="button" method="post" href={route('guidance.admin.incident-reports.resolve', i.id)}>
                                                        <Button variant="ghost" size="icon" title="Resolve"><CheckCircle className="h-4 w-4 text-green-600" /></Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {incidentReports.length === 0 && (
                                    <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No incident reports found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}