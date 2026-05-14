import { Head, Link } from '@inertiajs/react';
import { Wrench } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function EquipmentIndex({ equipment }: { equipment: any }) {
    return (
        <AppLayout>
            <Head title="Equipment" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Tool className="mr-2 inline h-6 w-6" />Equipment</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Facility</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {equipment.data?.map((e: any) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-mono">{e.code}</TableCell>
                                        <TableCell className="font-medium">{e.name}</TableCell>
                                        <TableCell>{e.facility?.name ?? '—'}</TableCell>
                                        <TableCell>{e.quantity}</TableCell>
                                        <TableCell>{e.available_quantity}</TableCell>
                                        <TableCell className="capitalize">{e.condition}</TableCell>
                                        <TableCell>
                                            <Link href={route('facilities.admin.facilities.show', e.facility_id)}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!equipment.data || equipment.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No equipment.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}