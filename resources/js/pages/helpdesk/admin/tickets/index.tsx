import { Head, Link } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function TicketsIndex({ tickets }: { tickets: any }) {
    return (
        <AppLayout>
            <Head title="Support Tickets" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><ClipboardList className="mr-2 inline h-6 w-6" />Support Tickets</h1>
                    <Link href={route('helpdesk.admin.tickets.create')}><Button>New Ticket</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Assignee</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tickets.data?.map((t: any) => (
                                    <TableRow key={t.id}>
                                        <TableCell className="font-medium">{t.title}</TableCell>
                                        <TableCell>{t.category?.name}</TableCell>
                                        <TableCell><Badge className={`capitalize ${t.priority === 'urgent' ? 'bg-red-100 text-red-800' : t.priority === 'high' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>{t.priority}</Badge></TableCell>
                                        <TableCell><Badge className={`capitalize ${t.status === 'open' ? 'bg-yellow-100 text-yellow-800' : t.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{t.status}</Badge></TableCell>
                                        <TableCell>{t.assignee?.name ?? '—'}</TableCell>
                                        <TableCell><Link href={route('helpdesk.admin.tickets.show', t.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!tickets.data || tickets.data.length === 0) && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No tickets.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}