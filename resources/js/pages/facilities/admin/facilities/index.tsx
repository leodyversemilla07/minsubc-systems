import { Head, Link } from '@inertiajs/react';
import { Building2, Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function FacilitiesIndex({ facilities }: { facilities: any }) {
    return (
        <AppLayout>
            <Head title="Facilities" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><Building2 className="mr-2 inline h-6 w-6" />Facilities</h1>
                    <Link href={route('facilities.admin.facilities.create')}><Button><Plus className="mr-2 h-4 w-4" />New Facility</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-32">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {facilities.data?.map((f: any) => (
                                    <TableRow key={f.id}>
                                        <TableCell className="font-mono">{f.code}</TableCell>
                                        <TableCell className="font-medium">{f.name}</TableCell>
                                        <TableCell className="capitalize">{f.type}</TableCell>
                                        <TableCell>{f.location ?? '—'}</TableCell>
                                        <TableCell>{f.capacity ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${f.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{f.is_available ? 'Available' : 'Unavailable'}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={route('facilities.admin.facilities.show', f.id)}><Button variant="ghost" size="sm">View</Button></Link>
                                            <Link href={route('facilities.admin.facilities.edit', f.id)}><Button variant="ghost" size="sm">Edit</Button></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!facilities.data || facilities.data.length === 0) && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No facilities.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}