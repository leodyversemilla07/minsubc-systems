import { Head } from '@inertiajs/react';
import { BedDouble } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function Dashboard({ stats, recentCheckins }: { stats: any; recentCheckins: any }) {
    const cards = [
        { title: 'Halls', value: stats.halls, color: 'text-blue-600', icon: '' },
        { title: 'Rooms', value: stats.rooms, color: 'text-purple-600', icon: '' },
        { title: 'Occupied Beds', value: stats.occupied_beds, color: 'text-orange-600', icon: '' },
        { title: 'Capacity', value: stats.total_capacity, color: 'text-green-600', icon: '' },
        { title: 'Occupancy Rate', value: `${stats.occupancy_rate}%`, color: 'text-indigo-600', icon: '' },
        { title: 'Pending Maintenance', value: stats.pending_maintenance, color: 'text-red-600', icon: '' },
    ];
    return (<AppLayout><Head title="Dormitory Dashboard" />
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold"><BedDouble className="mr-2 inline h-6 w-6" />Dormitory Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {cards.map((c, i) => (
                    <Card key={i}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle></CardHeader>
                        <CardContent><p className={`text-2xl font-bold ${c.color}`}>{c.value}</p></CardContent></Card>
                ))}
            </div>
            <Card><CardHeader><CardTitle className="text-base">Recent Check-ins</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {recentCheckins?.map((a: any) => (
                        <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div><p className="font-medium">{a.student?.first_name} {a.student?.last_name}</p>
                                <p className="text-xs text-muted-foreground">{a.bed?.room?.hall?.name} - Room {a.bed?.room?.room_number} - Bed {a.bed?.bed_label}</p></div>
                            <span className="text-sm text-muted-foreground">{a.checkin_date}</span>
                        </div>
                    ))}
                    {(!recentCheckins || recentCheckins.length === 0) && <p className="text-sm text-muted-foreground">No recent check-ins.</p>}
                </CardContent></Card>
        </div></AppLayout>
    );
}