import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, ArrowLeft, Save, Users, Search } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MedicalRecordsIndex({ records }: { records: any }) {
    return (
        <AppLayout>
            <Head title="Medical Records" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Users className="mr-2 inline h-6 w-6" />Medical Records</h1>
                    <Link href={route('clinic.admin.medical-records.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Patient</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Blood Type</TableHead>
                                    <TableHead>Gender</TableHead>
                                    <TableHead>Birth Date</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {records.data?.map((r: any) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.first_name} {r.last_name}</TableCell>
                                        <TableCell><span className="font-mono font-bold">{r.blood_type ?? '—'}</span></TableCell>
                                        <TableCell className="capitalize">{r.gender ?? '—'}</TableCell>
                                        <TableCell>{r.birth_date ?? '—'}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('clinic.admin.medical-records.show', r.id)}><Button variant="ghost" size="sm">View</Button></Link>
                                                <Link href={route('clinic.admin.medical-records.edit', r.id)}><Button variant="ghost" size="sm">Edit</Button></Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!records.data || records.data.length === 0) && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No patients found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}