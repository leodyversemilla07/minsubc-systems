import { Head } from '@inertiajs/react';
import { Wrench } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
export default function MaintenanceIndex({ requests }: { requests: any }) {
    const sColors: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-800', in_progress: 'bg-blue-100 text-blue-800', resolved: 'bg-green-100 text-green-800' };
    const pColors: Record<string, string> = { low: 'bg-slate-100 text-slate-800', medium: 'bg-blue-100 text-blue-800', high: 'bg-orange-100 text-orange-800', urgent: 'bg-red-100 text-red-800' };
    return (<AppLayout><Head title="Maintenance" />
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold"><Wrench className="mr-2 inline h-6 w-6" />Maintenance Requests</h1>
            <Card><CardContent className="p-0"><Table>
                <TableHeader><TableRow>
                    <TableHead>Issue</TableHead><TableHead>Room</TableHead><TableHead>Reported By</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Assigned To</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                    {requests.data?.map((r: any) => (
                        <TableRow key={r.id}>
                            <TableCell className="font-medium capitalize">{r.issue_type.replace('_', ' ')}</TableCell>
                            <TableCell>{r.room?.room_number ?? '—'} ({r.room?.hall?.name ?? '—'})</TableCell>
                            <TableCell className="text-sm">{r.reporter?.name ?? '—'}</TableCell>
                            <TableCell><Badge className={pColors[r.priority] ?? 'bg-blue-100'}>{r.priority}</Badge></TableCell>
                            <TableCell><Badge className={sColors[r.status] ?? 'bg-gray-100'}>{r.status.replace('_', ' ')}</Badge></TableCell>
                            <TableCell className="text-sm">{r.assignee?.name ?? '—'}</TableCell>
                        </TableRow>
                    ))}
                    {(!requests.data || requests.data.length === 0) && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No requests.</TableCell></TableRow>}
                </TableBody>
            </Table></CardContent></Card>
        </div></AppLayout>
    );
}