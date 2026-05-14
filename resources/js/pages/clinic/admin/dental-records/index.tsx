import { Head, Link } from '@inertiajs/react';
import { Star } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DentalRecordsIndex({ records }: { records: any }) {
    return (
        <AppLayout>
            <Head title="Dental Records" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Star className="mr-2 inline h-6 w-6" />Dental Records</h1>
                    <Link href={route('clinic.admin.dental-records.create')}><Button>Add Dental Record</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Procedure</TableHead>
                                    <TableHead>Dentist</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="w-20">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {records.data?.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.medical_record?.first_name} {r.medical_record?.last_name}</TableCell>
                                        <TableCell>{r.procedure ?? '—'}</TableCell>
                                        <TableCell>{r.dentist ?? '—'}</TableCell>
                                        <TableCell>{r.dental_date ? new Date(r.dental_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell><Link href="#"><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!records.data || records.data.length === 0) && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No dental records.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}