import { Head, Link } from '@inertiajs/react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ReservationsIndex({ reservations }: { reservations: any }) {
    return (
        <AppLayout>
            <Head title="Reservations" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Calendar className="mr-2 inline h-6 w-6" />Reservations</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Facility</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Purpose</TableHead>
                                    <TableHead>Start</TableHead>
                                    <TableHead>End</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-40">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reservations.data?.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.facility?.name}</TableCell>
                                        <TableCell>{r.user?.name ?? '—'}</TableCell>
                                        <TableCell className="max-w-40 truncate">{r.purpose}</TableCell>
                                        <TableCell>{r.start_time ? new Date(r.start_time).toLocaleString() : '—'}</TableCell>
                                        <TableCell>{r.end_time ? new Date(r.end_time).toLocaleString() : '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                                                r.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                r.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{r.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={route('facilities.admin.reservations.show', r.id)}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!reservations.data || reservations.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No reservations.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}