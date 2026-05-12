import { Head, Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Publications({ publications }: { publications: any[] }) {
    return (
        <AppLayout>
            <Head title="Publications" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BookOpen className="mr-2 inline h-6 w-6" />Publications</h1>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Authors</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {publications.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="max-w-md truncate font-medium">{p.title}</TableCell>
                                        <TableCell className="capitalize">{p.type ?? '—'}</TableCell>
                                        <TableCell>{p.publication_year ?? '—'}</TableCell>
                                        <TableCell>{p.authors?.length ?? 0}</TableCell>
                                    </TableRow>
                                ))}
                                {publications.length === 0 && (
                                    <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No publications found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}