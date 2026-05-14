import { Head, Link } from '@inertiajs/react';
import { Calendar } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AppointmentsIndex({ appointments }: { appointments: any }) {
    return (
        <AppLayout>
            <Head title="Appointments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Calendar className="mr-2 inline h-6 w-6" />Clinic Appointments</h1>
                    <Link href={route('clinic.admin.appointments.create')}><Button>New Appointment</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.data?.map((a: any) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-mono font-medium">{a.student_id ?? '—'}</TableCell>
                                        <TableCell className="capitalize">{a.appointment_type}</TableCell>
                                        <TableCell>{a.appointment_date ? new Date(a.appointment_date).toLocaleString() : '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${a.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : a.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{a.status}</span>
                                        </TableCell>
                                        <TableCell><Link href={route('clinic.admin.appointments.show', a.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!appointments.data || appointments.data.length === 0) && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No appointments.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}