import { Head, Link } from '@inertiajs/react';
import { Plus, CalendarCheck } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Appointments({ appointments }: { appointments: any[] }) {
    return (
        <AppLayout>
            <Head title="My Appointments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Appointments</h1>
                    <Link href={route('guidance.my.appointments.create')}><Button><Plus className="mr-2 h-4 w-4" /> Book Appointment</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><CalendarCheck className="mr-2 inline h-5 w-5" />Appointments</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Counselor</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((a: any) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">{a.counselor?.full_name ?? '—'}</TableCell>
                                        <TableCell>{a.scheduled_date ? new Date(a.scheduled_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell className="capitalize">{a.appointment_type ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                a.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                a.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                                a.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{a.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            {a.status === 'scheduled' && (
                                                <Link as="button" method="post" href={route('guidance.my.appointments.cancel', a.id)}>
                                                    <Button variant="ghost" size="sm" className="text-red-600">Cancel</Button>
                                                </Link>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {appointments.length === 0 && (
                                    <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No appointments found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}