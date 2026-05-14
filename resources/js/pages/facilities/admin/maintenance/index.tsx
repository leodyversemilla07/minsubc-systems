import { Head, Link } from '@inertiajs/react';
import { Wrench } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function MaintenanceIndex({ requests }: { requests: any }) {
    return (
        <AppLayout>
            <Head title="Maintenance" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Wrench className="mr-2 inline h-6 w-6" />Maintenance Requests</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Facility</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-20">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.data?.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.title}</TableCell>
                                        <TableCell>{r.facility?.name ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                                                r.priority === 'critical' ? 'bg-red-100 text-red-800' :
                                                r.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                r.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>{r.priority}</span>
                                        </TableCell>
                                        <TableCell className="capitalize">{r.status}</TableCell>
                                        <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                                    </TableRow>
                                ))}
                                {(!requests.data || requests.data.length === 0) && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No maintenance requests.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}