import { Head, Link } from '@inertiajs/react';
import { Tags } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function OffenseCategoriesIndex({ categories }: { categories: any }) {
    return (
        <AppLayout>
            <Head title="Offense Categories" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Tags className="mr-2 inline h-6 w-6" />Offense Categories</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Tier</TableHead>
                                    <TableHead>Offenses</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.data?.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">{c.name}</TableCell>
                                        <TableCell>
                                            <Badge className={`capitalize ${c.tier === 'minor' ? 'bg-green-100 text-green-800' : c.tier === 'major' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{c.tier}</Badge>
                                        </TableCell>
                                        <TableCell>{c.offenses_count ?? 0}</TableCell>
                                        <TableCell><span className="text-sm text-muted-foreground">View</span></TableCell>
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