import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Archive, CheckCircle, XCircle } from 'lucide-react';

interface DisposalDocument {
    id: number;
    title?: string;
    name?: string;
    type?: string;
    document_type?: string;
    organization?: { name: string };
    user?: { name: string };
    disposal_status: string;
}

interface Props extends PageProps {
    documents: DisposalDocument[];
}

export default function ManageDisposal({ documents }: Props) {
    const updateDisposalStatus = (id: number, disposal_status: string) =>
        router.post(route('sas.admin.documents.update-disposal-status', id), { disposal_status });

    return (
        <AppLayout>
            <Head title="Manage Document Disposal" />
            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-2xl font-bold flex items-center gap-2"><Archive className="h-6 w-6" /> Document Disposal Management</h1>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Document</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Organization</TableHead>
                                    <TableHead>Requested By</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documents?.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium">{doc.title ?? doc.name}</TableCell>
                                        <TableCell><Badge variant="outline">{doc.type ?? doc.document_type}</Badge></TableCell>
                                        <TableCell>{doc.organization?.name ?? '-'}</TableCell>
                                        <TableCell>{doc.user?.name ?? '-'}</TableCell>
                                        <TableCell><Badge variant={doc.disposal_status === 'Approved for Disposal' ? 'secondary' : doc.disposal_status === 'Pending Disposal Approval' ? 'outline' : 'destructive'}>{doc.disposal_status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            {doc.disposal_status === 'Pending Disposal Approval' && (
                                                <div className="flex justify-end gap-1">
                                                    <Button size="sm" variant="outline" onClick={() => updateDisposalStatus(doc.id, 'Approved for Disposal')}><CheckCircle className="h-3 w-3 mr-1" />Approve</Button>
                                                    <Button size="sm" variant="ghost" onClick={() => updateDisposalStatus(doc.id, 'Physical Copy Exists')}><XCircle className="h-3 w-3 mr-1" />Reject</Button>
                                                </div>
                                            )}
                                        </TableCell>
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