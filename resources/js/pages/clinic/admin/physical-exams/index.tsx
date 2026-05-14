import { Head, Link } from '@inertiajs/react';
import { CheckSquare } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PhysicalExamsIndex({ exams }: { exams: any }) {
    return (
        <AppLayout>
            <Head title="Physical Exams" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><CheckSquare className="mr-2 inline h-6 w-6" />Physical Exams</h1>
                    <Link href={route('clinic.admin.physical-exams.create')}><Button>Record Exam</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Height</TableHead>
                                    <TableHead>Weight</TableHead>
                                    <TableHead>BP</TableHead>
                                    <TableHead className="text-center">Cleared</TableHead>
                                    <TableHead className="w-20">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {exams.data?.map((e: any) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-medium">{e.medical_record?.first_name} {e.medical_record?.last_name}</TableCell>
                                        <TableCell>{e.exam_date ?? '—'}</TableCell>
                                        <TableCell>{e.height_cm ? `${e.height_cm} cm` : '—'}</TableCell>
                                        <TableCell>{e.weight_kg ? `${e.weight_kg} kg` : '—'}</TableCell>
                                        <TableCell>{e.blood_pressure ?? '—'}</TableCell>
                                        <TableCell className="text-center">{e.is_cleared ? '✅' : '❌'}</TableCell>
                                        <TableCell><Link href={route('clinic.admin.physical-exams.show', e.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!exams.data || exams.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No physical exams recorded.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}