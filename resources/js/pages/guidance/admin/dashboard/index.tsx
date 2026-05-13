import { Head, Link } from '@inertiajs/react';
import { CalendarCheck, ShieldAlert, ClipboardList, HeartHandshake, Users, FileText, AlertTriangle, BookCheck, Activity } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

interface DashboardStats {
    counselors: number;
    appointments_total: number;
    appointments_today: number;
    appointments_pending: number;
    sessions_completed: number;
    assessments_pending: number;
    referrals_active: number;
    incidents_open: number;
    interventions_active: number;
    high_risk_cases: number;
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    const cards = [
        { title: 'Counselors', value: stats.counselors, icon: Users, color: 'text-blue-600', href: route('guidance.admin.counselors.index') },
        { title: 'Total Appointments', value: stats.appointments_total, icon: CalendarCheck, color: 'text-green-600', href: route('guidance.admin.appointments.index') },
        { title: "Today's Appointments", value: stats.appointments_today, icon: CalendarCheck, color: 'text-cyan-600' },
        { title: 'Pending Appointments', value: stats.appointments_pending, icon: CalendarCheck, color: 'text-yellow-600' },
        { title: 'Sessions Completed', value: stats.sessions_completed, icon: ClipboardList, color: 'text-purple-600' },
        { title: 'Pending Assessments', value: stats.assessments_pending, icon: FileText, color: 'text-orange-600' },
        { title: 'Active Referrals', value: stats.referrals_active, icon: HeartHandshake, color: 'text-indigo-600' },
        { title: 'Open Incidents', value: stats.incidents_open, icon: AlertTriangle, color: 'text-red-600' },
        { title: 'Active Interventions', value: stats.interventions_active, icon: Activity, color: 'text-teal-600' },
        { title: 'High Risk Cases', value: stats.high_risk_cases, icon: ShieldAlert, color: 'text-rose-600' },
    ];

    return (
        <AppLayout>
            <Head title="Guidance Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Guidance & Counseling Dashboard</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {cards.map((card) => {
                        const content = (
                            <Card className={card.href ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    <card.icon className={`${card.color} h-5 w-5`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{card.value}</div>
                                </CardContent>
                            </Card>
                        );
                        return card.href ? <Link key={card.title} href={card.href}>{content}</Link> : <div key={card.title}>{content}</div>;
                    })}
                </div>
            </div>
        </AppLayout>
    );
}