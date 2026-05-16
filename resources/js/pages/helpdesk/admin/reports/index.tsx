import { Head } from '@inertiajs/react';
import { BarChart3 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsIndex({ by_category, by_priority, by_status, weekly_trend }: { by_category: any; by_priority: any; by_status: any; weekly_trend: any }) {
    return (
        <AppLayout>
            <Head title="Helpdesk Reports" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BarChart3 className="mr-2 inline h-6 w-6" />Reports</h1>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card><CardHeader><CardTitle className="text-base">Tickets by Category</CardTitle></CardHeader>
                        <CardContent>
                            {by_category?.map((c: any) => (
                                <div key={c.id} className="mb-2 flex items-center justify-between">
                                    <span>{c.name}</span>
                                    <span className="font-bold">{c.tickets_count}</span>
                                </div>
                            ))}
                            {(!by_category || by_category.length === 0) && <p className="text-sm text-muted-foreground">No data.</p>}
                        </CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-base">Tickets by Status</CardTitle></CardHeader>
                        <CardContent>
                            {by_status && Object.entries(by_status).map(([k, v]: [string, any]) => (
                                <div key={k} className="mb-2 flex items-center justify-between capitalize">
                                    <span className="capitalize">{k.replace('_', ' ')}</span>
                                    <span className="font-bold">{v}</span>
                                </div>
                            ))}
                        </CardContent></Card>
                    <Card className="md:col-span-2"><CardHeader><CardTitle className="text-base">30-Day Trend</CardTitle></CardHeader>
                        <CardContent>
                            {weekly_trend?.map((d: any) => (
                                <div key={d.date} className="mb-1 flex items-center justify-between text-sm">
                                    <span>{d.date}</span>
                                    <span className="font-bold">{d.count}</span>
                                </div>
                            ))}
                            {(!weekly_trend || weekly_trend.length === 0) && <p className="text-sm text-muted-foreground">No data.</p>}
                        </CardContent></Card>
                </div>
            </div>
        </AppLayout>
    );
}