import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Users, MapPin } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function EventShow({ event }: { event: any }) {
    return (
        <AppLayout>
            <Head title={event.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.events.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : event.status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{event.status}</span>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground"><Calendar className="mr-1 inline h-3 w-3" /> Date</dt><dd>{event.event_date ? new Date(event.event_date).toLocaleString() : '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground"><MapPin className="mr-1 inline h-3 w-3" /> Location</dt><dd>{event.location ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground"><Users className="mr-1 inline h-3 w-3" /> Participants</dt><dd>{event.participants?.length ?? 0} / {event.max_participants ?? '∞'}</dd></div>
                        </dl>
                        {event.description && <p className="mt-4 text-sm text-muted-foreground">{event.description}</p>}
                    </Card>
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <Link href={route('alumni.admin.events.edit', event.id)}><Button variant="outline">Edit Event</Button></Link>
                    </Card>
                </div>
                {event.participants?.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Users className="mr-2 inline h-5 w-5" />Participants</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Registered</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {event.participants.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.alumnus?.first_name} {p.alumnus?.last_name}</TableCell>
                                        <TableCell className="capitalize">{p.status}</TableCell>
                                        <TableCell>{p.registered_at ? new Date(p.registered_at).toLocaleDateString() : '—'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}