import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function IncidentShow({ incidentReport }: { incidentReport: any }) {
    return (
        <AppLayout>
            <Head title="Incident Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.incident-reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Incident Report</h1>
                    <div className="flex gap-2">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            incidentReport.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            incidentReport.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            incidentReport.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>{incidentReport.severity}</span>
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            incidentReport.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>{incidentReport.status}</span>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><AlertTriangle className="mr-2 inline h-5 w-5" />Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Student</dt><dd className="font-medium">{incidentReport.student?.name ?? incidentReport.student_id ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="capitalize">{incidentReport.type ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{incidentReport.incident_date ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd>{incidentReport.location ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Reported By</dt><dd>{incidentReport.reported_by_name ?? '—'}</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        {incidentReport.status !== 'resolved' && (
                            <Link as="button" method="post" href={route('guidance.admin.incident-reports.resolve', incidentReport.id)}>
                                <Button><CheckCircle className="mr-2 h-4 w-4" /> Mark as Resolved</Button>
                            </Link>
                        )}
                    </Card>
                </div>

                <Card className="p-6">
                    <h2 className="mb-2 text-lg font-semibold">Description</h2>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap">{incidentReport.description ?? 'No description provided.'}</p>
                </Card>

                {incidentReport.actions_taken && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions Taken</h2>
                        <p className="text-muted-foreground text-sm whitespace-pre-wrap">{incidentReport.actions_taken}</p>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}