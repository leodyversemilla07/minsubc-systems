import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ReservationShow({ reservation }: { reservation: any }) {
    const { data, setData, post, processing } = useForm({ notes: '' });
    return (
        <AppLayout>
            <Head title="Reservation Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('facilities.admin.reservations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Calendar className="mr-2 inline h-6 w-6" />Reservation</h1>
                    <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        reservation.status === 'approved' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        reservation.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>{reservation.status}</span>
                </div>
                <Card className="max-w-xl p-6">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Facility</dt><dd className="font-medium">{reservation.facility?.name}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Requested By</dt><dd>{reservation.user?.name}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Purpose</dt><dd>{reservation.purpose}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Start</dt><dd>{reservation.start_time ? new Date(reservation.start_time).toLocaleString() : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">End</dt><dd>{reservation.end_time ? new Date(reservation.end_time).toLocaleString() : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Attendees</dt><dd>{reservation.attendees_count ?? '—'}</dd></div>
                    </dl>
                    {reservation.status === 'pending' && (
                        <div className="mt-6 space-y-3 border-t pt-4">
                            <h3 className="text-sm font-medium">Actions</h3>
                            <div className="flex gap-2">
                                <form action={route('facilities.admin.reservations.approve', reservation.id)} method="POST">
                                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''} />
                                    <Button>Approve</Button>
                                </form>
                                <div>
                                    <Label>Reason (if rejecting)</Label>
                                    <Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={2} className="mb-2" />
                                    <form action={route('facilities.admin.reservations.reject', reservation.id)} method="POST">
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''} />
                                        <input type="hidden" name="notes" value={data.notes} />
                                        <Button variant="destructive">Reject</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {reservation.status === 'approved' && (
                        <div className="mt-4">
                            <form action={route('facilities.admin.reservations.complete', reservation.id)} method="POST">
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''} />
                                <Button>Mark Completed</Button>
                            </form>
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}