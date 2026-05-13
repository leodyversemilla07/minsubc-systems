import { Head, Link } from '@inertiajs/react';
import { BarChart3, TrendingUp, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

export default function ReportIndex() {
    return (
        <AppLayout>
            <Head title="Library Reports" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BarChart3 className="mr-2 inline h-6 w-6" />Library Reports</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('library.admin.reports.popular-books')}>
                        <CardHeader><CardTitle><TrendingUp className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Popular Books</h3>
                            <p className="text-muted-foreground text-sm">Most borrowed books</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('library.admin.reports.borrowing-trends')}>
                        <CardHeader><CardTitle><BookOpen className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Borrowing Trends</h3>
                            <p className="text-muted-foreground text-sm">Monthly borrowing statistics</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}