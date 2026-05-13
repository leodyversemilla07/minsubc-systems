import { Head, Link } from '@inertiajs/react';
import { BarChart3, Clock, CalendarCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

export default function ReportIndex() {
    return (
        <AppLayout>
            <Head title="HR Reports" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BarChart3 className="mr-2 inline h-6 w-6" />HR Reports</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('hr.admin.reports.attendance')}>
                        <CardHeader><CardTitle><Clock className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Attendance Report</h3>
                            <p className="text-muted-foreground text-sm">Department attendance summary by month</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('hr.admin.reports.leave')}>
                        <CardHeader><CardTitle><CalendarCheck className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Leave Report</h3>
                            <p className="text-muted-foreground text-sm">Leave request trends by month</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}