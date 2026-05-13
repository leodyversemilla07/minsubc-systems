import { Head, Link } from '@inertiajs/react';
import { BarChart3, Target, BookCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

export default function ReportIndex() {
    return (
        <AppLayout>
            <Head title="Curriculum Reports" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BarChart3 className="mr-2 inline h-6 w-6" />Reports</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('curriculum.admin.reports.curriculum-map')}>
                        <CardHeader><CardTitle><Target className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Curriculum Map</h3>
                            <p className="text-muted-foreground text-sm">Program outcomes mapped to course outcomes</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('curriculum.admin.reports.syllabus-status')}>
                        <CardHeader><CardTitle><BookCheck className="h-8 w-8 text-green-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Syllabus Status</h3>
                            <p className="text-muted-foreground text-sm">Course syllabus completion status</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}