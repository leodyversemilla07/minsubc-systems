import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ConsultationsIndex({ consultations }: { consultations: any }) {
    return (
        <AppLayout>
            <Head title="Consultations" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Activity className="mr-2 inline h-6 w-6" />Consultations</h1>
                    <Link href={route('clinic.admin.consultations.create')}><Button>New Consultation</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Diagnosis</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {consultations.data?.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{c.medical_record?.first_name} {c.medical_record?.last_name}</TableCell>
                                        <TableCell>{c.consultation_date ? new Date(c.consultation_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell>{c.diagnosis ?? '—'}</TableCell>
                                        <TableCell className="capitalize">{c.status}</TableCell>
                                        <TableCell><Link href={route('clinic.admin.consultations.show', c.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!consultations.data || consultations.data.length === 0) && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No consultations.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}