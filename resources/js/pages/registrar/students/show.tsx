import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, GraduationCap, Pencil, Mail, Phone, MapPin, BookOpen } from 'lucide-react';

interface Props extends PageProps {
    student: {
        id: number; student_id: string; first_name: string; last_name: string;
        middle_name: string | null; course: string; year_level: number;
        campus: string; status: string; email: string | null;
        contact_number: string | null; address: string | null;
        user: { name: string; email: string } | null;
        document_requests: { id: number; document_type: string; status: string; created_at: string }[];
    };
}

export default function StudentShow({ student }: Props) {
    return (
        <AppLayout>
            <Head title={`${student.last_name}, ${student.first_name}`} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('registrar.students.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <GraduationCap className="h-6 w-6" /> {student.last_name}, {student.first_name}
                        </h1>
                        <Badge variant={student.status === 'active' ? 'secondary' : student.status === 'graduated' ? 'default' : 'destructive'}>{student.status}</Badge>
                    </div>
                    <Link href={route('registrar.students.edit', student.id)}><Button><Pencil className="mr-2 h-4 w-4" /> Edit</Button></Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div><span className="text-sm text-muted-foreground">Student ID</span><p className="font-mono">{student.student_id}</p></div>
                                <div><span className="text-sm text-muted-foreground">Full Name</span><p>{student.last_name}, {student.first_name} {student.middle_name ?? ''}</p></div>
                                <div><span className="text-sm text-muted-foreground"><Mail className="inline h-3 w-3 mr-1" />Email</span><p>{student.email ?? '-'}</p></div>
                                <div><span className="text-sm text-muted-foreground"><Phone className="inline h-3 w-3 mr-1" />Contact</span><p>{student.contact_number ?? '-'}</p></div>
                                {student.address && <div className="col-span-2"><span className="text-sm text-muted-foreground"><MapPin className="inline h-3 w-3 mr-1" />Address</span><p>{student.address}</p></div>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Academic Information</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div><span className="text-sm text-muted-foreground"><BookOpen className="inline h-3 w-3 mr-1" />Course</span><p>{student.course}</p></div>
                                <div><span className="text-sm text-muted-foreground">Year Level</span><p>{student.year_level}</p></div>
                                <div><span className="text-sm text-muted-foreground">Campus</span><p>{student.campus}</p></div>
                                <div><span className="text-sm text-muted-foreground">Account</span><p>{student.user?.name ?? 'No account'}</p></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {student.document_requests?.length > 0 && (
                    <Card>
                        <CardHeader><CardTitle>Recent Document Requests</CardTitle></CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {student.document_requests.map(dr => (
                                        <TableRow key={dr.id}>
                                            <TableCell>{dr.document_type}</TableCell>
                                            <TableCell><Badge variant="outline">{dr.status}</Badge></TableCell>
                                            <TableCell>{dr.created_at}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}