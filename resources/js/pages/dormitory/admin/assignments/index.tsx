import { Head, Link } from '@inertiajs/react';
import { UserCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
export default function AssignmentsIndex({ assignments, beds }: { assignments: any; beds: any }) {
    return (<AppLayout><Head title="Assignments" />
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold"><UserCheck className="mr-2 inline h-6 w-6" />Bed Assignments</h1>
            <Card><CardContent className="p-0"><Table>
                <TableHeader><TableRow>
                    <TableHead>Student</TableHead><TableHead>Hall</TableHead><TableHead>Room</TableHead><TableHead>Bed</TableHead><TableHead>Check-in</TableHead><TableHead>Fee</TableHead><TableHead>Status</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                    {assignments.data?.map((a: any) => (
                        <TableRow key={a.id}>
                            <TableCell className="font-medium">{a.student?.first_name} {a.student?.last_name}</TableCell>
                            <TableCell className="text-sm">{a.bed?.room?.hall?.name ?? '—'}</TableCell>
                            <TableCell>{a.bed?.room?.room_number ?? '—'}</TableCell>
                            <TableCell>{a.bed?.bed_label ?? '—'}</TableCell>
                            <TableCell>{a.checkin_date}</TableCell>
                            <TableCell>₱{a.fee_per_semester}</TableCell>
                            <TableCell><Badge className={`capitalize ${a.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{a.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                    {(!assignments.data || assignments.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No assignments.</TableCell></TableRow>}
                </TableBody>
            </Table></CardContent></Card>
        </div></AppLayout>
    );
}