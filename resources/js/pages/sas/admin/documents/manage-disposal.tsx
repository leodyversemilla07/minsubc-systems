import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Archive, FileText, CheckCircle, XCircle } from 'lucide-react';

interface Props extends PageProps {
    documents: { data: any[]; links: any[] };
}

export default function ManageDisposal({ documents }: Props) {
    const handleApprove = (id: number) => router.post(route('sas.admin.documents.update-disposal-status', id), { status: 'approved' });

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
                                {documents?.data?.map((doc: any) => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium">{doc.title ?? doc.name}</TableCell>
                                        <TableCell><Badge variant="outline">{doc.type ?? doc.document_type}</Badge></TableCell>
                                        <TableCell>{doc.organization?.name ?? '-'}</TableCell>
                                        <TableCell>{doc.user?.name ?? '-'}</TableCell>
                                        <TableCell><Badge variant={doc.disposal_status === 'approved' ? 'secondary' : doc.disposal_status === 'pending' ? 'outline' : 'destructive'}>{doc.disposal_status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            {doc.disposal_status === 'pending' && (
                                                <div className="flex justify-end gap-1">
                                                    <Button size="sm" variant="outline" onClick={() => handleApprove(doc.id)}><CheckCircle className="h-3 w-3 mr-1" />Approve</Button>
                                                    <Button size="sm" variant="ghost" onClick={() => handleReject(doc.id)}><XCircle className="h-3 w-3 mr-1" />Reject</Button>
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