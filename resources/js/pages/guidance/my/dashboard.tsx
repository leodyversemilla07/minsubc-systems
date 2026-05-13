import { Head, Link } from '@inertiajs/react';
import { CalendarCheck } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Dashboard({ dashboard }: { dashboard: any }) {
    return (
        <AppLayout>
            <Head title="My Guidance Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">My Guidance Dashboard</h1>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader><CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle></CardHeader>
                        <CardContent><div className="text-3xl font-bold">{dashboard?.upcoming_appointments ?? 0}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-sm font-medium">Completed Sessions</CardTitle></CardHeader>
                        <CardContent><div className="text-3xl font-bold">{dashboard?.completed_sessions ?? 0}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-sm font-medium">Pending Assessments</CardTitle></CardHeader>
                        <CardContent><div className="text-3xl font-bold">{dashboard?.pending_assessments ?? 0}</div></CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}