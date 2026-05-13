import { Head, Link } from '@inertiajs/react';
import { LifeBuoy, CalendarCheck, FileText, Users, CalendarRange } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index() {
    return (
        <AppLayout>
            <Head title="Guidance Office" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><LifeBuoy className="mr-2 inline h-6 w-6" />Guidance & Counseling Office</h1>
                <p className="text-muted-foreground">Student support services, counseling, and wellness programs.</p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/guidance/my/appointments'}>
                        <CardHeader><CardTitle><CalendarCheck className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">My Appointments</h3>
                            <p className="text-muted-foreground text-sm">Schedule and manage your counseling appointments</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/guidance/my/assessments'}>
                        <CardHeader><CardTitle><FileText className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Assessments</h3>
                            <p className="text-muted-foreground text-sm">Complete and review your assessments</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/guidance/my/counselors'}>
                        <CardHeader><CardTitle><Users className="h-8 w-8 text-green-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Counselors</h3>
                            <p className="text-muted-foreground text-sm">View available counselors and their schedules</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}