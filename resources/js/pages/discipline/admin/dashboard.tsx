import { Head, Link } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Dashboard({ stats, recentIncidents }: { stats: any; recentIncidents: any }) {
    const statCards = [
        { title: 'Total Incidents', value: stats.total_incidents, color: 'text-blue-600' },
        { title: 'Pending', value: stats.pending_incidents, color: 'text-yellow-600' },
        { title: 'Active Sanctions', value: stats.active_sanctions, color: 'text-red-600' },
        { title: 'Pending Appeals', value: stats.pending_appeals, color: 'text-purple-600' },
        { title: 'Categories', value: stats.categories, color: 'text-green-600' },
    ];
    return (
        <AppLayout>
            <Head title="Discipline Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Shield className="mr-2 inline h-6 w-6" />Discipline Dashboard</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {statCards.map((c, i) => (
                        <Card key={i}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle></CardHeader>
                            <CardContent><p className={`text-2xl font-bold ${c.color}`}>{c.value}</p></CardContent></Card>
                    ))}
                </div>
                <Card><CardHeader><CardTitle className="text-base">Recent Incidents</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {recentIncidents?.map((i: any) => (
                            <div key={i.id} className="flex items-center justify-between rounded-lg border p-3">
                                <div><p className="font-medium">{i.student?.first_name} {i.student?.last_name}</p>
                                    <p className="text-xs text-muted-foreground">{i.offense?.name} • {i.incident_date}</p></div>
                                <Badge className={`capitalize ${i.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : i.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{i.status}</Badge>
                            </div>
                        ))}
                        {(!recentIncidents || recentIncidents.length === 0) && <p className="text-sm text-muted-foreground">No incidents.</p>}
                    </CardContent></Card>
            </div>
        </AppLayout>
    );
}