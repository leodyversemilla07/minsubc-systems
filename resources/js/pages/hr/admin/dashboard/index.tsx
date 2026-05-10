import { Head } from '@inertiajs/react';
import { BookOpen, CalendarCheck, Clock, Star, Users, Building2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Stat {
    total_employees: number;
    active_employees: number;
    total_departments: number;
    pending_leaves: number;
    pending_evaluations: number;
    today_attendance: number;
}

interface Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    email: string;
    employment_status: string;
    department?: { id: number; name: string };
    position?: { id: number; title: string };
}

interface Props {
    stats: Stat;
    recentEmployees: Employee[];
}

export default function Dashboard({ stats, recentEmployees }: Props) {
    const cards = [
        { title: 'Total Employees', value: stats.total_employees, icon: Users },
        { title: 'Active Employees', value: stats.active_employees, icon: Users },
        { title: 'Departments', value: stats.total_departments, icon: Building2 },
        { title: "Today's Attendance", value: stats.today_attendance, icon: Clock },
        { title: 'Pending Leaves', value: stats.pending_leaves, icon: CalendarCheck },
        { title: 'Pending Evaluations', value: stats.pending_evaluations, icon: Star },
    ];

    return (
        <AppLayout>
            <Head title="HR Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">HR Dashboard</h1>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                        <Card key={card.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <card.icon className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{card.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-semibold">Recent Employees</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentEmployees.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell>{emp.employee_id}</TableCell>
                                    <TableCell className="font-medium">{emp.first_name} {emp.last_name}</TableCell>
                                    <TableCell>{emp.department?.name || '—'}</TableCell>
                                    <TableCell>{emp.position?.title || '—'}</TableCell>
                                    <TableCell>{emp.employment_status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}