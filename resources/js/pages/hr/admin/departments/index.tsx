import { Head, Link } from '@inertiajs/react';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DepartmentIndex({ departments }: { departments: any[] }) {
    return (
        <AppLayout>
            <Head title="Departments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Departments</h1>
                    <Link href={route('hr.admin.departments.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Department</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><Building2 className="mr-2 inline h-5 w-5" />All Departments</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">Employees</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {departments.map((d: any) => (
                                    <TableRow key={d.id}>
                                        <TableCell className="font-mono text-sm">{d.code}</TableCell>
                                        <TableCell className="font-medium">{d.name}</TableCell>
                                        <TableCell className="text-right">{d.employees_count ?? d.employees?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('hr.admin.departments.edit', d.id)}><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                                                <Link as="button" method="delete" href={route('hr.admin.departments.destroy', d.id)} onClick={(e: any) => { if (!confirm('Delete?')) e.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {departments.length === 0 && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No departments found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}