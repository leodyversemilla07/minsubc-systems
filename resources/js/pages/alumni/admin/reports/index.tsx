import { Head, Link } from '@inertiajs/react';
import { BarChart3, TrendingUp, Briefcase, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

export default function ReportIndex() {
    return (
        <AppLayout>
            <Head title="Alumni Reports" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BarChart3 className="mr-2 inline h-6 w-6" />Alumni Reports</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('alumni.admin.reports.employment')}>
                        <CardHeader><CardTitle><Briefcase className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Employment Report</h3>
                            <p className="text-muted-foreground text-sm">Employment rates by industry</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('alumni.admin.reports.donations')}>
                        <CardHeader><CardTitle><DollarSign className="h-8 w-8 text-green-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Donations Summary</h3>
                            <p className="text-muted-foreground text-sm">Donation totals by purpose</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('alumni.admin.reports.tracer')}>
                        <CardHeader><CardTitle><TrendingUp className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Graduate Tracer</h3>
                            <p className="text-muted-foreground text-sm">Tracer survey results</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}