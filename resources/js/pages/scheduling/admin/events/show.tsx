import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CalendarPlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function EventShow({ event }: { event: any }) {
    return (
        <AppLayout>
            <Head title={event.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('scheduling.admin.events.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><CalendarPlus className="mr-2 inline h-6 w-6" />{event.title}</h1>
                    <Badge variant="secondary" className="capitalize">{event.event_type}</Badge>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${event.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{event.status}</span>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="p-6">
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Start</dt><dd>{event.start_datetime ? new Date(event.start_datetime).toLocaleString() : '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">End</dt><dd>{event.end_datetime ? new Date(event.end_datetime).toLocaleString() : '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd>{event.location ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">All Day</dt><dd>{event.all_day ? '✅ Yes' : '❌ No'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Public</dt><dd>{event.is_public ? '✅ Yes' : '❌ No'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Max Participants</dt><dd>{event.max_participants ?? 'Unlimited'}</dd></div>
                        </dl>
                        {event.description && <div className="mt-4"><h3 className="mb-1 text-sm font-medium">Description</h3><p className="text-sm text-muted-foreground">{event.description}</p></div>}
                    </Card>
                    <Card className="p-6">
                        <h3 className="mb-3 text-sm font-medium">Bookings ({event.bookings?.length ?? 0})</h3>
                        <div className="space-y-2">
                            {event.bookings?.map((b: any) => (
                                <div key={b.id} className="flex items-center justify-between rounded border p-2 text-sm">
                                    <span>{b.user?.name ?? '—'}</span>
                                    <Badge variant="secondary" className="capitalize">{b.status}</Badge>
                                </div>
                            ))}
                            {(!event.bookings || event.bookings.length === 0) && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}