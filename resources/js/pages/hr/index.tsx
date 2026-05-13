import { Head } from '@inertiajs/react';
import { Building2, Users, Briefcase } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index() {
    return (
        <AppLayout>
            <Head title="HR" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Human Resources</h1>
                <p className="text-muted-foreground">Employee management, attendance, leave, and evaluations.</p>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/hr/directory'}>
                        <CardHeader><CardTitle><Users className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Employee Directory</h3>
                            <p className="text-muted-foreground text-sm">Browse all employees and their information</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('hr.admin.departments.index')}>
                        <CardHeader><CardTitle><Building2 className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Departments</h3>
                            <p className="text-muted-foreground text-sm">View organizational structure</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('hr.admin.positions.index')}>
                        <CardHeader><CardTitle><Briefcase className="h-8 w-8 text-green-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Positions</h3>
                            <p className="text-muted-foreground text-sm">View job positions and classifications</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}