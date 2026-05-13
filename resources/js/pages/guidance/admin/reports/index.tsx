import { Head, Link } from '@inertiajs/react';
import { BarChart3, CalendarCheck, ClipboardList, AlertTriangle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function ReportIndex() {
    return (
        <AppLayout>
            <Head title="Reports" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BarChart3 className="mr-2 inline h-6 w-6" />Reports</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('guidance.admin.reports.appointments')}>
                        <CardHeader><CardTitle><CalendarCheck className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Appointments Report</h3>
                            <p className="text-muted-foreground text-sm">Monthly appointment statistics by counselor</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('guidance.admin.reports.sessions')}>
                        <CardHeader><CardTitle><ClipboardList className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Sessions Report</h3>
                            <p className="text-muted-foreground text-sm">Monthly sessions by risk level and type</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('guidance.admin.reports.incidents')}>
                        <CardHeader><CardTitle><AlertTriangle className="h-8 w-8 text-red-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Incidents Report</h3>
                            <p className="text-muted-foreground text-sm">Incident trends by type and severity</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}