import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface VMGOHistoryEntry {
    id: number;
    version: number;
    vision: string;
    mission: string;
    updated_at: string;
    updated_by?: { name: string };
}

interface Props extends PageProps {
    history: VMGOHistoryEntry[];
}

export default function VMGOHistory({ history }: Props) {
    return (
        <AppLayout>
            <Head title="VMGO History" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.vmgo.edit')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">VMGO Revision History</h1>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Version</TableHead>
                                    <TableHead>Vision</TableHead>
                                    <TableHead>Mission</TableHead>
                                    <TableHead>Updated By</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history?.map(h => (
                                    <TableRow key={h.id}>
                                        <TableCell>v{h.version}</TableCell>
                                        <TableCell className="max-w-xs truncate">{h.vision}</TableCell>
                                        <TableCell className="max-w-xs truncate">{h.mission}</TableCell>
                                        <TableCell>{h.updated_by?.name ?? '-'}</TableCell>
                                        <TableCell>{new Date(h.updated_at).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}