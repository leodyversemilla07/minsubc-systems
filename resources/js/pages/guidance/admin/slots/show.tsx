import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

export default function SlotShow({ slot }: { slot: any }) {
    return (
        <AppLayout>
            <Head title="Slot Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.slots.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Slot Details</h1>
                </div>
                <Card className="max-w-xl p-6">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Counselor</dt><dd className="font-medium">{slot.counselor?.full_name ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{slot.date ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Time</dt><dd>{slot.start_time ? `${slot.start_time} - ${slot.end_time ?? ''}` : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Duration</dt><dd>{slot.duration_minutes ? `${slot.duration_minutes} min` : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Available</dt><dd>{slot.is_available ? 'Yes' : 'No'}</dd></div>
                        {slot.notes && <div className="flex justify-between"><dt className="text-muted-foreground">Notes</dt><dd>{slot.notes}</dd></div>}
                    </dl>
                </Card>
            </div>
        </AppLayout>
    );
}