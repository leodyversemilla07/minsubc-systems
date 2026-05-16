import { Head } from '@inertiajs/react';
import { LifeBuoy } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Dashboard({ stats, recentTickets }: { stats: any; recentTickets: any }) {
    const cards = [
        { title: 'Open Tickets', value: stats.open_tickets, color: 'text-yellow-600' },
        { title: 'In Progress', value: stats.in_progress, color: 'text-blue-600' },
        { title: 'Resolved', value: stats.resolved, color: 'text-green-600' },
        { title: 'Total', value: stats.total, color: 'text-purple-600' },
        { title: 'Categories', value: stats.categories, color: 'text-slate-600' },
    ];
    return (
        <AppLayout>
            <Head title="Helpdesk Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><LifeBuoy className="mr-2 inline h-6 w-6" />Helpdesk Dashboard</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {cards.map((c, i) => (
                        <Card key={i}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle></CardHeader>
                            <CardContent><p className={`text-2xl font-bold ${c.color}`}>{c.value}</p></CardContent></Card>
                    ))}
                </div>
                <Card><CardHeader><CardTitle className="text-base">Recent Tickets</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {recentTickets?.map((t: any) => (
                            <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                                <div><p className="font-medium">{t.title}</p>
                                    <p className="text-xs text-muted-foreground">{t.category?.name} • {t.priority}</p></div>
                                <Badge className={`capitalize ${t.status === 'open' ? 'bg-yellow-100 text-yellow-800' : t.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{t.status}</Badge>
                            </div>
                        ))}
                        {(!recentTickets || recentTickets.length === 0) && <p className="text-sm text-muted-foreground">No tickets.</p>}
                    </CardContent></Card>
            </div>
        </AppLayout>
    );
}