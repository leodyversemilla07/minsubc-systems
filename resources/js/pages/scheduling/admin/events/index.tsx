import { Head, Link } from '@inertiajs/react';
import { CalendarPlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function EventsIndex({ events }: { events: any }) {
    return (
        <AppLayout>
            <Head title="Events" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><CalendarPlus className="mr-2 inline h-6 w-6" />Events</h1>
                    <Link href={route('scheduling.admin.events.create')}><Button>New Event</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Start</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Bookings</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.data?.map((e: any) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-medium">{e.title}</TableCell>
                                        <TableCell><Badge variant="secondary" className="capitalize">{e.event_type}</Badge></TableCell>
                                        <TableCell>{e.start_datetime ? new Date(e.start_datetime).toLocaleString() : '—'}</TableCell>
                                        <TableCell>{e.location ?? '—'}</TableCell>
                                        <TableCell>{e.bookings?.length ?? 0}</TableCell>
                                        <TableCell className="capitalize">{e.status}</TableCell>
                                        <TableCell>
                                            <Link href={route('scheduling.admin.events.show', e.id)}><Button variant="ghost" size="sm">View</Button></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!events.data || events.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No events.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}