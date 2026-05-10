import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Department {
    id: number;
    code: string;
    name: string;
    type: string;
    employees_count: number;
    is_active: boolean;
    head?: { id: number; first_name: string; last_name: string };
}

interface Props {
    departments: Department[];
}

export default function Index({ departments }: Props) {
    return (
        <AppLayout>
            <Head title="Departments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Departments</h1>
                    <Link href={route('hr.admin.departments.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" />Add Department</Button>
                    </Link>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Head</TableHead>
                            <TableHead>Employees</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {departments.map((dept) => (
                            <TableRow key={dept.id}>
                                <TableCell className="font-mono text-sm">{dept.code}</TableCell>
                                <TableCell className="font-medium">{dept.name}</TableCell>
                                <TableCell className="capitalize">{dept.type}</TableCell>
                                <TableCell>{dept.head ? `${dept.head.first_name} ${dept.head.last_name}` : '—'}</TableCell>
                                <TableCell>{dept.employees_count}</TableCell>
                                <TableCell>{dept.is_active ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Link href={route('hr.admin.departments.edit', dept.id)}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}