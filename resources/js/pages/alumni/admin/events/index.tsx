import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, ArrowLeft, Save, Calendar } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EventIndex({ events }: { events: any }) {
    return (
        <AppLayout>
            <Head title="Events" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Calendar className="mr-2 inline h-6 w-6" />Alumni Events</h1>
                    <Link href={route('alumni.admin.events.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Event</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead className="text-center">Participants</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.data?.map((e: any) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{e.title}</TableCell>
                                        <TableCell className="capitalize">{e.event_type}</TableCell>
                                        <TableCell>{e.event_date ? new Date(e.event_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell>{e.location ?? '—'}</TableCell>
                                        <TableCell className="text-center">{e.participants_count ?? 0}</TableCell>
                                        <TableCell><span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${e.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : e.status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{e.status}</span></TableCell>
                                        <TableCell>
                                            <Link href={route('alumni.admin.events.show', e.id)}><Button variant="ghost" size="sm">View</Button></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!events.data || events.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No events found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}