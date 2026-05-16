import { Head, Link } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function IncidentsIndex({ incidents }: { incidents: any }) {
    return (
        <AppLayout>
            <Head title="Incidents" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><ClipboardList className="mr-2 inline h-6 w-6" />Incidents</h1>
                    <Link href={route('discipline.admin.incidents.create')}><Button>Report Incident</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Offense</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Reported By</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incidents.data?.map((i: any) => (
                                    <TableRow key={i.id}>
                                        <TableCell className="font-medium">{i.student?.first_name} {i.student?.last_name}</TableCell>
                                        <TableCell>{i.offense?.name}</TableCell>
                                        <TableCell>{i.incident_date}</TableCell>
                                        <TableCell>{i.reporter?.name ?? '—'}</TableCell>
                                        <TableCell>
                                            <Badge className={`capitalize ${i.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : i.status === 'investigating' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{i.status}</Badge>
                                        </TableCell>
                                        <TableCell><Link href={route('discipline.admin.incidents.show', i.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!incidents.data || incidents.data.length === 0) && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No incidents.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}