import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Events({ events }: { events: any }) {
    return (
        <AppLayout>
            <Head title="Alumni Events" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href="/alumni"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Calendar className="mr-2 inline h-6 w-6" />Upcoming Events</h1>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {events.data?.map((e: any) => (
                        <Card key={e.id} className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = `/alumni/events/${e.id}`}>
                            <CardHeader>
                                <CardTitle className="text-lg">{e.title}</CardTitle>
                                <p className="text-xs text-muted-foreground capitalize">{e.event_type}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4" />{e.event_date ? new Date(e.event_date).toLocaleDateString() : '—'}</p>
                                {e.location && <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" />{e.location}</p>}
                                <p className="flex items-center gap-2 text-sm"><Users className="h-4 w-4" />{e.participants_count ?? 0} participants</p>
                            </CardContent>
                        </Card>
                    ))}
                    {(!events.data || events.data.length === 0) && <p className="text-muted-foreground col-span-3 py-8 text-center">No upcoming events.</p>}
                </div>
            </div>
        </AppLayout>
    );
}