import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface FeeItem {
    id: number;
    name: string;
    code: string;
    amount: number;
    type: string;
    billing_cycle: string;
    is_active: boolean;
    category?: { id: number; name: string; code: string };
}

export default function Index({ items }: { items: FeeItem[] }) {
    return (
        <AppLayout>
            <Head title="Fee Items" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Fee Items</h1>
                    <Link href={route('accounting.admin.fee-items.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" />Add Fee Item</Button>
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Billing</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-mono text-sm">{item.code}</TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.category?.name || '—'}</TableCell>
                                <TableCell className="text-right">₱{(item.amount ?? 0).toLocaleString()}</TableCell>
                                <TableCell className="capitalize">{item.type}</TableCell>
                                <TableCell className="capitalize">{item.billing_cycle.replace('_', ' ')}</TableCell>
                                <TableCell><Badge variant={item.is_active ? 'default' : 'secondary'}>{item.is_active ? 'Active' : 'Inactive'}</Badge></TableCell>
                                <TableCell>
                                    <Link href={route('accounting.admin.fee-items.edit', item.id)}>
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