import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TracerReport({ data, filters }: { data: any[]; filters: any }) {
    return (
        <AppLayout>
            <Head title="Graduate Tracer" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><TrendingUp className="mr-2 inline h-6 w-6" />Graduate Tracer Data</h1>
                </div>
                <Card className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>College</TableHead>
                                <TableHead className="text-center">Employed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((a: any) => (
                                <TableRow key={a.id}>
                                    <TableCell className="font-medium">{a.first_name} {a.last_name}</TableCell>
                                    <TableCell>{a.graduation_year ?? '—'}</TableCell>
                                    <TableCell>{a.degree_program ?? '—'}</TableCell>
                                    <TableCell>{a.college ?? '—'}</TableCell>
                                    <TableCell className="text-center">{a.is_employed ? '✅' : '❌'}</TableCell>
                                </TableRow>
                            ))}
                            {data.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No data for selected filters.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}