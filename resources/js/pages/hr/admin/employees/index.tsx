import { Head, Link } from '@inertiajs/react';
import { Users, Plus, Edit, Trash2, Eye } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function EmployeeIndex({ employees }: { employees: any[] }) {
    return (
        <AppLayout>
            <Head title="Employees" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Employees</h1>
                    <Link href={route('hr.admin.employees.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Employee</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><Users className="mr-2 inline h-5 w-5" />All Employees</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((e: any) => (
                                    <TableRow key={e.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{e.first_name?.[0]}{e.last_name?.[0]}</span>
                                                <div>
                                                    <div className="font-medium">{e.first_name} {e.last_name}</div>
                                                    <div className="text-muted-foreground text-xs">{e.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{e.department?.name ?? '—'}</TableCell>
                                        <TableCell>{e.position?.title ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                e.employment_status === 'active' ? 'bg-green-100 text-green-800' :
                                                e.employment_status === 'on-leave' ? 'bg-yellow-100 text-yellow-800' :
                                                e.employment_status === 'terminated' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{e.employment_status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('hr.admin.employees.show', e.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('hr.admin.employees.edit', e.id)}><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                                                <Link as="button" method="delete" href={route('hr.admin.employees.destroy', e.id)} onClick={(ev: any) => { if (!confirm('Delete?')) ev.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {employees.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No employees found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}