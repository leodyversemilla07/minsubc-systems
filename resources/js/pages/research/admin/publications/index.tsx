import { Head, Link } from '@inertiajs/react';
import { BookOpen, Eye, Plus, Edit } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ publications }: { publications: any[] }) {
    return (
        <AppLayout>
            <Head title="Publications" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Publications</h1>
                    <Link href={route('research.admin.publications.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> New Publication</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle><BookOpen className="mr-2 inline h-5 w-5" />All Publications</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Authors</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {publications.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{p.title}</TableCell>
                                        <TableCell className="capitalize">{p.type ?? '—'}</TableCell>
                                        <TableCell>{p.publication_year ?? '—'}</TableCell>
                                        <TableCell>{p.authors?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('research.admin.publications.show', p.id)}>
                                                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                                </Link>
                                                <Link href={route('research.admin.publications.edit', p.id)}>
                                                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {publications.length === 0 && (
                                    <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No publications yet.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}