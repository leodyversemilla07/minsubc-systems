import { Head, Link } from '@inertiajs/react';
import { Briefcase, Plus, Edit } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PositionIndex({ positions }: { positions: any[] }) {
    return (
        <AppLayout>
            <Head title="Positions" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Positions</h1>
                    <Link href={route('hr.admin.positions.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Position</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><Briefcase className="mr-2 inline h-5 w-5" />All Positions</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Employees</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {positions.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.title}</TableCell>
                                        <TableCell className="capitalize">
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${p.category === 'faculty' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{p.category}</span>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-muted-foreground">{p.description ?? '—'}</TableCell>
                                        <TableCell className="text-right">{p.employees_count ?? p.employees?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <Link href={route('hr.admin.positions.edit', p.id)}><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {positions.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No positions found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}