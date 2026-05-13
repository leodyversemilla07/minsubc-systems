import { Head, Link } from '@inertiajs/react';
import { CalendarRange, Plus, Trash2, Eye } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SlotIndex({ slots }: { slots: any[] }) {
    return (
        <AppLayout>
            <Head title="Appointment Slots" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Appointment Slots</h1>
                    <Link href={route('guidance.admin.slots.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Slot</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle><CalendarRange className="mr-2 inline h-5 w-5" />Available Slots</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Counselor</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead className="w-20">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {slots.map((s: any) => (
                                    <TableRow key={s.id}>
                                        <TableCell className="font-medium">{s.counselor?.full_name ?? '—'}</TableCell>
                                        <TableCell>{s.date ?? '—'}</TableCell>
                                        <TableCell>{s.start_time ? `${s.start_time} - ${s.end_time ?? ''}` : '—'}</TableCell>
                                        <TableCell>{s.duration_minutes ? `${s.duration_minutes} min` : '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block h-2.5 w-2.5 rounded-full ${s.is_available ? 'bg-green-500' : 'bg-red-400'}`} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('guidance.admin.slots.show', s.id)}>
                                                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                                </Link>
                                                <Link as="button" method="delete" href={route('guidance.admin.slots.destroy', s.id)} onClick={(e: any) => { if (!confirm('Delete this slot?')) e.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {slots.length === 0 && (
                                    <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No slots found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}