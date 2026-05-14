import { Head } from '@inertiajs/react';
import { Users, Activity, Calendar, Share2, Stethoscope, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard({ stats }: { stats: any }) {
    const cards = [
        { title: 'Total Patients', value: stats.total_patients ?? 0, icon: Users, color: 'text-blue-600' },
        { title: 'Consultations Today', value: stats.consultations_today ?? 0, icon: Activity, color: 'text-green-600' },
        { title: 'Appointments Today', value: stats.appointments_today ?? 0, icon: Calendar, color: 'text-purple-600' },
        { title: 'Pending Referrals', value: stats.pending_referrals ?? 0, icon: Share2, color: 'text-orange-600' },
        { title: 'Pending Appointments', value: stats.pending_appointments ?? 0, icon: Stethoscope, color: 'text-cyan-600' },
        { title: 'New Patients This Month', value: stats.patients_this_month ?? 0, icon: TrendingUp, color: 'text-emerald-600' },
    ];
    return (
        <AppLayout>
            <Head title="Clinic Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Clinic Dashboard</h1>
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