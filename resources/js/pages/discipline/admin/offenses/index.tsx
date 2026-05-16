import { Head, Link } from '@inertiajs/react';
import { ListChecks } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function OffensesIndex({ offenses, categories }: { offenses: any; categories: any }) {
    return (
        <AppLayout>
            <Head title="Offenses" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><ListChecks className="mr-2 inline h-6 w-6" />Offenses</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Tier</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {offenses.data?.map((o: any) => (
                                    <TableRow key={o.id}>
                                        <TableCell className="font-mono">{o.code}</TableCell>
                                        <TableCell className="font-medium">{o.name}</TableCell>
                                        <TableCell>{o.category?.name ?? '—'}</TableCell>
                                        <TableCell><Badge className={`capitalize ${o.category?.tier === 'minor' ? 'bg-green-100 text-green-800' : o.category?.tier === 'major' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{o.category?.tier ?? '—'}</Badge></TableCell>
                                        <TableCell><span className="text-sm text-muted-foreground">View</span></TableCell>
                                    </TableRow>
                                ))}
                                {(!offenses.data || offenses.data.length === 0) && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No offenses.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}