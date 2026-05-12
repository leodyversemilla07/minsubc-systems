import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, FileText } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Proposals({ proposals }: { proposals: any[] }) {
    return (
        <AppLayout>
            <Head title="Proposals" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><FileText className="mr-2 inline h-6 w-6" />Research Proposals</h1>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Authors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {proposals.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="max-w-md truncate font-medium">{p.title}</TableCell>
                                        <TableCell>{p.research_type?.name ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                p.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                p.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                                                p.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{p.status}</span>
                                        </TableCell>
                                        <TableCell>{p.authors?.length ?? 0}</TableCell>
                                    </TableRow>
                                ))}
                                {proposals.length === 0 && (
                                    <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No proposals found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}