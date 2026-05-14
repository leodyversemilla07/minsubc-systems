import { Head } from '@inertiajs/react';
import { Users, Calendar, DollarSign, Briefcase, ClipboardList, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard({ stats }: { stats: any }) {
    const cards = [
        { title: 'Total Alumni', value: stats.total_alumni ?? 0, icon: Users, color: 'text-blue-600' },
        { title: 'Verified', value: stats.verified_alumni ?? 0, icon: Users, color: 'text-green-600' },
        { title: 'Employed', value: stats.employed_alumni ?? 0, icon: Briefcase, color: 'text-purple-600' },
        { title: 'Upcoming Events', value: stats.upcoming_events ?? 0, icon: Calendar, color: 'text-orange-600' },
        { title: 'Total Donations', value: `₱${Number(stats.total_donations ?? 0).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600' },
        { title: 'New This Month', value: stats.recent_registrations ?? 0, icon: TrendingUp, color: 'text-cyan-600' },
    ];
    return (
        <AppLayout>
            <Head title="Alumni Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Alumni Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-3">
                    {cards.map((card, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <card.icon className={`h-5 w-5 ${card.color}`} />
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{card.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}