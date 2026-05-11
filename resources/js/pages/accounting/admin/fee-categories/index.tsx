import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface FeeCategory {
    id: number;
    name: string;
    code: string;
    is_required: boolean;
    is_active: boolean;
    fee_items_count: number;
}

export default function Index({ categories }: { categories: FeeCategory[] }) {
    return (
        <AppLayout>
            <Head title="Fee Categories" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Fee Categories</h1>
                    <Link href={route('accounting.admin.fee-categories.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" />Add Category</Button>
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Fee Items</TableHead>
                            <TableHead>Required</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell className="font-mono text-sm">{cat.code}</TableCell>
                                <TableCell className="font-medium">{cat.name}</TableCell>
                                <TableCell>{cat.fee_items_count}</TableCell>
                                <TableCell>{cat.is_required ? 'Yes' : 'No'}</TableCell>
                                <TableCell><Badge variant={cat.is_active ? 'default' : 'secondary'}>{cat.is_active ? 'Active' : 'Inactive'}</Badge></TableCell>
                                <TableCell>
                                    <Link href={route('accounting.admin.fee-categories.edit', cat.id)}>
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