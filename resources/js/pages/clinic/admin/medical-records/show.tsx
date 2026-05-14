import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Users, Activity, Calendar, Shield, Star, CheckSquare } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function MedicalRecordShow({ record }: { record: any }) {
    return (
        <AppLayout>
            <Head title={`${record.first_name} ${record.last_name}`} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.medical-records.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{record.first_name} {record.last_name}</h1>
                    <span className="font-mono text-lg font-bold">{record.blood_type ?? ''}</span>
                </div>

                <Card className="p-6">
                    <h2 className="mb-2 text-lg font-semibold">Patient Details</h2>
                    <dl className="space-y-2 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Student ID</dt><dd className="font-mono">{record.student_id ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Gender</dt><dd className="capitalize">{record.gender ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Birth Date</dt><dd>{record.birth_date ?? '—'}</dd></div>
                    </dl>
                </Card>

                {record.consultations?.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Activity className="mr-2 inline h-5 w-5" />Consultations</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Diagnosis</TableHead>
                                    <TableHead>Treatment</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {record.consultations.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell>{c.consultation_date ? new Date(c.consultation_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell>{c.diagnosis ?? '—'}</TableCell>
                                        <TableCell className="max-w-xs truncate">{c.treatment ?? '—'}</TableCell>
                                        <TableCell className="capitalize">{c.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}

                {record.immunizations?.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Shield className="mr-2 inline h-5 w-5" />Immunizations</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Vaccine</TableHead>
                                    <TableHead>Dose</TableHead>
                                    <TableHead>Date Administered</TableHead>
                                    <TableHead>Next Due</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {record.immunizations.map((i: any) => (
                                    <TableRow key={i.id}>
                                        <TableCell className="font-medium">{i.vaccine_name}</TableCell>
                                        <TableCell>{i.dose_number ?? '—'}</TableCell>
                                        <TableCell>{i.date_administered ?? '—'}</TableCell>
                                        <TableCell>{i.next_due_date ?? '—'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}

                {record.physical_exams?.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><CheckSquare className="mr-2 inline h-5 w-5" />Physical Exams</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Height</TableHead>
                                    <TableHead>Weight</TableHead>
                                    <TableHead>BP</TableHead>
                                    <TableHead className="text-center">Cleared</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {record.physical_exams.map((e: any) => (
                                    <TableRow key={e.id}>
                                        <TableCell>{e.exam_date ?? '—'}</TableCell>
                                        <TableCell>{e.height_cm ? `${e.height_cm} cm` : '—'}</TableCell>
                                        <TableCell>{e.weight_kg ? `${e.weight_kg} kg` : '—'}</TableCell>
                                        <TableCell>{e.blood_pressure ?? '—'}</TableCell>
                                        <TableCell className="text-center">{e.is_cleared ? '✅' : '❌'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}

                {record.dental_records?.length > 0 && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><Star className="mr-2 inline h-5 w-5" />Dental Records</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Procedure</TableHead>
                                    <TableHead>Dentist</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {record.dental_records.map((d: any) => (
                                    <TableRow key={d.id}>
                                        <TableCell>{d.dental_date ? new Date(d.dental_date).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell>{d.procedure ?? '—'}</TableCell>
                                        <TableCell>{d.dentist ?? '—'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}