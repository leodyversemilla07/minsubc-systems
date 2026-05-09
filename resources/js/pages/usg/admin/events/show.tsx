import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface EventData {
    id: number; title: string; description: string; event_date: string;
    event_time: string; location: string; category: string; status: string;
}

interface Props extends PageProps { event: EventData }

export default function EventShow({ event }: Props) {
    return (
        <AppLayout>
            <Head title={event.title} />
            <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.events.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                </div>
                <div className="flex gap-2"><Badge variant="secondary">{event.category}</Badge><Badge>{event.status}</Badge></div>
                <p className="text-sm text-muted-foreground">{new Date(event.event_date).toLocaleDateString()} at {event.event_time} — {event.location}</p>
                <Card><CardContent className="p-6"><div className="prose max-w-none">{event.description}</div></CardContent></Card>
            </div>
        </AppLayout>
    );
}