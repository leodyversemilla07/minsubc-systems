import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Award, FileText } from 'lucide-react';

interface Props extends PageProps {
    recipient: {
        id: number; status: string; application_date: string; notes: string | null;
        student: { id: number; name: string; email: string; student_id?: string } | null;
        scholarship: { id: number; name: string; type: string; amount: number } | null;
        requirements: { id: number; name: string; status: string; file_path: string | null }[];
    };
}

export default function ScholarshipRecipientShow({ recipient }: Props) {
    return (
        <AppLayout>
            <Head title="Recipient Details" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('sas.admin.scholarship-recipients.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><Award className="h-6 w-6" /> Scholarship Recipient</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Student Info</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="text-muted-foreground">Name:</span> {recipient.student?.name}</p>
                            <p><span className="text-muted-foreground">Email:</span> {recipient.student?.email}</p>
                            {recipient.student?.student_id && <p><span className="text-muted-foreground">ID:</span> {recipient.student.student_id}</p>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Scholarship</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="text-muted-foreground">Name:</span> {recipient.scholarship?.name}</p>
                            <p><span className="text-muted-foreground">Type:</span> <Badge variant="outline">{recipient.scholarship?.type}</Badge></p>
                            <p><span className="text-muted-foreground">Amount:</span> ₱{recipient.scholarship?.amount?.toLocaleString()}</p>
                            <p><span className="text-muted-foreground">Status:</span> <Badge variant={recipient.status === 'active' ? 'secondary' : recipient.status === 'pending' ? 'outline' : 'destructive'}>{recipient.status}</Badge></p>
                        </CardContent>
                    </Card>
                </div>

                {recipient.requirements?.length > 0 && (
                    <Card>
                        <CardHeader><CardTitle><FileText className="inline h-4 w-4 mr-2" />Requirements</CardTitle></CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>File</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recipient.requirements.map(r => (
                                        <TableRow key={r.id}>
                                            <TableCell>{r.name}</TableCell>
                                            <TableCell><Badge variant="outline">{r.status}</Badge></TableCell>
                                            <TableCell>{r.file_path ? 'Uploaded' : '-'}</TableCell>
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