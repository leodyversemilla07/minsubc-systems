import { Head, Link } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ImmunizationsIndex({ immunizations }: { immunizations: any }) {
    return (
        <AppLayout>
            <Head title="Immunizations" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Shield className="mr-2 inline h-6 w-6" />Immunizations</h1>
                    <Link href={route('clinic.admin.immunizations.create')}><Button>Record Immunization</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Vaccine</TableHead>
                                    <TableHead>Dose</TableHead>
                                    <TableHead>Date Administered</TableHead>
                                    <TableHead>Next Due</TableHead>
                                    <TableHead className="w-20">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {immunizations.data?.map((i: any) => (
                                    <TableRow key={i.id}>
                                        <TableCell className="font-medium">{i.medical_record?.first_name} {i.medical_record?.last_name}</TableCell>
                                        <TableCell>{i.vaccine_name}</TableCell>
                                        <TableCell>Dose {i.dose_number ?? '—'}</TableCell>
                                        <TableCell>{i.date_administered ?? '—'}</TableCell>
                                        <TableCell>{i.next_due_date ?? '—'}</TableCell>
                                        <TableCell><Link href={route('clinic.admin.immunizations.show', i.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!immunizations.data || immunizations.data.length === 0) && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No immunizations recorded.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}