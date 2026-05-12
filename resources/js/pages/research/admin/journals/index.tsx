import { Head, Link } from '@inertiajs/react';
import { BookCheck, Eye, Plus, Edit } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ journals }: { journals: any[] }) {
    return (
        <AppLayout>
            <Head title="Journals" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Journals</h1>
                    <Link href={route('research.admin.journals.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> New Journal</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle><BookCheck className="mr-2 inline h-5 w-5" />All Journals</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>ISSN</TableHead>
                                    <TableHead>Issues</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {journals.map((j: any) => (
                                    <TableRow key={j.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{j.title}</TableCell>
                                        <TableCell className="font-mono text-sm">{j.issn ?? '—'}</TableCell>
                                        <TableCell>{j.issues?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('research.admin.journals.show', j.id)}>
                                                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                                </Link>
                                                <Link href={route('research.admin.journals.edit', j.id)}>
                                                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {journals.length === 0 && (
                                    <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No journals found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}