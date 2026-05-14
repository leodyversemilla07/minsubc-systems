import { Head, Link } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard({ stats, recentReservations }: { stats: any; recentReservations: any }) {
    const statCards = [
        { title: 'Total Facilities', value: stats.total_facilities, icon: LayoutGrid, color: 'text-blue-600' },
        { title: 'Available', value: stats.available_facilities, icon: LayoutGrid, color: 'text-green-600' },
        { title: 'Pending Reservations', value: stats.pending_reservations, icon: LayoutGrid, color: 'text-yellow-600' },
        { title: 'Active Reservations', value: stats.active_reservations, icon: LayoutGrid, color: 'text-purple-600' },
        { title: 'Equipment Items', value: stats.equipment_count, icon: LayoutGrid, color: 'text-indigo-600' },
        { title: 'Pending Maintenance', value: stats.pending_maintenance, icon: LayoutGrid, color: 'text-red-600' },
    ];
    return (
        <AppLayout>
            <Head title="Facilities Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><LayoutGrid className="mr-2 inline h-6 w-6" />Facilities Dashboard</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {statCards.map((card, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                                <card.icon className={`h-4 w-4 ${card.color}`} />
                            </CardHeader>
                            <CardContent><p className="text-2xl font-bold">{card.value}</p></CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}