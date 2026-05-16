import { Head } from '@inertiajs/react';
import { Tags } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function CategoriesIndex({ categories }: { categories: any }) {
    return (
        <AppLayout>
            <Head title="Ticket Categories" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Tags className="mr-2 inline h-6 w-6" />Ticket Categories</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Tickets</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data?.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium"><span className="inline-block h-3 w-3 rounded-full mr-2" style={{ backgroundColor: c.color }} />{c.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{c.description ?? '—'}</TableCell>
                                        <TableCell>{c.tickets_count ?? 0}</TableCell>
                                        <TableCell><Badge className={c.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{c.is_active ? 'Active' : 'Inactive'}</Badge></TableCell>
                                    </TableRow>
                                ))}
                                {(!categories.data || categories.data.length === 0) && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No categories.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}