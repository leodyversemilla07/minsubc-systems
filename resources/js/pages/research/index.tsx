import { Head, Link } from '@inertiajs/react';
import { BookOpen, FileText, Search } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ proposals, publications }: { proposals: any[]; publications: any[] }) {
    return (
        <AppLayout>
            <Head title="Research" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Research & Thesis Office</h1>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <CardTitle className="mb-4 text-lg"><FileText className="mr-2 inline h-5 w-5" />Recent Proposals</CardTitle>
                        {proposals?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {proposals.map((p: any) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="max-w-xs truncate font-medium">{p.title}</TableCell>
                                            <TableCell>
                                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                    p.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    p.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>{p.status}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground">No proposals yet.</p>}
                    </Card>

                    <Card className="p-6">
                        <CardTitle className="mb-4 text-lg"><BookOpen className="mr-2 inline h-5 w-5" />Recent Publications</CardTitle>
                        {publications?.length ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Year</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {publications.map((p: any) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="max-w-xs truncate font-medium">{p.title}</TableCell>
                                            <TableCell>{p.publication_year ?? '—'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-muted-foreground">No publications yet.</p>}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}