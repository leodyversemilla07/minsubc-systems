import { Head } from '@inertiajs/react';
import { BarChart3, Users, CalendarCheck, AlertTriangle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CounselorDashboard({ stats, recentAppointments }: { stats: any; recentAppointments: any[] }) {
    return (
        <AppLayout>
            <Head title="Counselor Dashboard" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Counselor Dashboard</h1>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card><CardHeader><CardTitle className="text-sm font-medium">Today's Appointments</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats?.appointments_today ?? 0}</div></CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-sm font-medium">Pending</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats?.pending_appointments ?? 0}</div></CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-sm font-medium">Total Students</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats?.total_students ?? 0}</div></CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-sm font-medium">Sessions This Month</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats?.sessions_this_month ?? 0}</div></CardContent></Card>
                </div>

                <Card className="p-6">
                    <CardTitle className="mb-4 text-lg"><CalendarCheck className="mr-2 inline h-5 w-5" />Recent Appointments</CardTitle>
                    {recentAppointments?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentAppointments.map((a: any) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">{a.student?.name ?? a.student_id ?? '—'}</TableCell>
                                        <TableCell>{a.scheduled_date ? new Date(a.scheduled_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                a.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                a.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{a.status}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground">No recent appointments.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}