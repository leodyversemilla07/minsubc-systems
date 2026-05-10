import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Position {
    id: number;
    title: string;
    category: string;
    employment_type: string;
    employees_count: number;
    is_active: boolean;
}

export default function Index({ positions }: { positions: Position[] }) {
    return (
        <AppLayout>
            <Head title="Positions" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Positions</h1>
                    <Link href={route('hr.admin.positions.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" />Add Position</Button>
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Employment Type</TableHead>
                            <TableHead>Employees</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {positions.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.title}</TableCell>
                                <TableCell className="capitalize">{p.category}</TableCell>
                                <TableCell className="capitalize">{p.employment_type}</TableCell>
                                <TableCell>{p.employees_count}</TableCell>
                                <TableCell>{p.is_active ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>
                                    <Link href={route('hr.admin.positions.edit', p.id)}>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}