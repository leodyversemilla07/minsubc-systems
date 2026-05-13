import { Head, Link } from '@inertiajs/react';
import { Users, Building2, Briefcase, CalendarCheck, ClipboardList, Clock, UserCheck, UserX, GraduationCap } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

interface DashboardStats {
    total_employees: number;
    active_employees: number;
    on_leave: number;
    departments: number;
    today_present: number;
    pending_leaves: number;
    pending_evaluations: number;
    faculty_count: number;
    staff_count: number;
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    const cards = [
        { title: 'Total Employees', value: stats.total_employees, icon: Users, color: 'text-blue-600', href: route('hr.admin.employees.index') },
        { title: 'Active', value: stats.active_employees, icon: UserCheck, color: 'text-green-600' },
        { title: 'On Leave', value: stats.on_leave, icon: UserX, color: 'text-orange-600' },
        { title: 'Departments', value: stats.departments, icon: Building2, color: 'text-purple-600', href: route('hr.admin.departments.index') },
        { title: 'Present Today', value: stats.today_present, icon: Clock, color: 'text-emerald-600', href: route('hr.admin.attendance.index') },
        { title: 'Pending Leaves', value: stats.pending_leaves, icon: CalendarCheck, color: 'text-yellow-600', href: route('hr.admin.leave.index') },
        { title: 'Pending Evals', value: stats.pending_evaluations, icon: ClipboardList, color: 'text-indigo-600' },
        { title: 'Faculty', value: stats.faculty_count, icon: GraduationCap, color: 'text-cyan-600' },
        { title: 'Staff', value: stats.staff_count, icon: Briefcase, color: 'text-rose-600' },
    ];

    return (
        <AppLayout>
            <Head title="HR Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">HR Management Dashboard</h1>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {cards.map((card) => {
                        const content = (
                            <Card className={card.href ? 'cursor-pointer transition-shadow hover:shadow-md' : ''}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    <card.icon className={`${card.color} h-5 w-5`} />
                                </CardHeader>
                                <CardContent><div className="text-2xl font-bold">{card.value}</div></CardContent>
                            </Card>
                        );
                        return card.href ? <Link key={card.title} href={card.href}>{content}</Link> : <div key={card.title}>{content}</div>;
                    })}
                </div>
            </div>
        </AppLayout>
    );
}