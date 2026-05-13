import { Head } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Programs({ programs }: { programs: any[] }) {
    return (
        <AppLayout>
            <Head title="Programs" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><GraduationCap className="mr-2 inline h-6 w-6" />Academic Programs</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {programs.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-mono text-sm">{p.code}</TableCell>
                                        <TableCell className="font-medium">{p.name}</TableCell>
                                        <TableCell className="max-w-md text-muted-foreground truncate">{p.description ?? '—'}</TableCell>
                                    </TableRow>
                                ))}
                                {programs.length === 0 && <TableRow><TableCell colSpan={3} className="py-8 text-center text-muted-foreground">No programs found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}