import { Head, Link } from '@inertiajs/react';
import { Calendar, CalendarRange } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Dashboard({ stats, upcomingEvents, academicSchedules }: { stats: any; upcomingEvents: any; academicSchedules: any }) {
    const statCards = [
        { title: 'Upcoming Events', value: stats.upcoming_events, color: 'text-blue-600' },
        { title: "Today's Events", value: stats.today_events, color: 'text-green-600' },
        { title: 'Total Bookings', value: stats.total_bookings, color: 'text-purple-600' },
        { title: 'Confirmed Bookings', value: stats.confirmed_bookings, color: 'text-indigo-600' },
    ];
    return (
        <AppLayout>
            <Head title="Scheduling Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Calendar className="mr-2 inline h-6 w-6" />Scheduling Dashboard</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle></CardHeader>
                            <CardContent><p className={`text-2xl font-bold ${card.color}`}>{card.value}</p></CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card><CardHeader><CardTitle className="text-base">Upcoming Events</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingEvents?.map((e: any) => (
                                <div key={e.id} className="flex items-center justify-between rounded-lg border p-3">
                                    <div><p className="font-medium">{e.title}</p><p className="text-xs text-muted-foreground">{new Date(e.start_datetime).toLocaleDateString()} • {e.location ?? '—'}</p></div>
                                    <Badge variant="secondary" className="capitalize">{e.event_type}</Badge>
                                </div>
                            ))}
                            {(!upcomingEvents || upcomingEvents.length === 0) && <p className="text-sm text-muted-foreground">No upcoming events.</p>}
                        </CardContent>
                    </Card>
                    <Card><CardHeader><CardTitle className="text-base"><CalendarRange className="mr-2 inline h-4 w-4" />Academic Schedule</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {academicSchedules?.map((s: any) => (
                                <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                                    <div><p className="font-medium">{s.event_name}</p><p className="text-xs text-muted-foreground">{s.start_date} → {s.end_date}</p></div>
                                    {s.is_holiday && <Badge className="bg-red-100 text-red-800">Holiday</Badge>}
                                </div>
                            ))}
                            {(!academicSchedules || academicSchedules.length === 0) && <p className="text-sm text-muted-foreground">No schedules.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}