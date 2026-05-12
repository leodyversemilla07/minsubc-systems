import { Head, Link } from '@inertiajs/react';
import { CalendarCheck, Eye, Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ defenses }: { defenses: any[] }) {
    return (
        <AppLayout>
            <Head title="Defenses" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Defenses</h1>
                    <Link href={route('research.admin.defenses.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> Schedule Defense</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle><CalendarCheck className="mr-2 inline h-5 w-5" />All Defenses</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Proposal</TableHead>
                                    <TableHead>Scheduled Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Room</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {defenses.map((d: any) => (
                                    <TableRow key={d.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{d.proposal?.title ?? '—'}</TableCell>
                                        <TableCell>{d.scheduled_date}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                d.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                                d.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                d.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{d.status}</span>
                                        </TableCell>
                                        <TableCell>{d.room ?? '—'}</TableCell>
                                        <TableCell>
                                            <Link href={route('research.admin.defenses.show', d.id)}>
                                                <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {defenses.length === 0 && (
                                    <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No defenses scheduled.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}