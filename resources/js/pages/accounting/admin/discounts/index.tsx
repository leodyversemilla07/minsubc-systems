import { Head } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

interface Discount {
    id: number;
    name: string;
    code: string;
    type: string;
    value: number;
    description: string | null;
    is_active: boolean;
}

export default function Index({ discounts }: { discounts: Discount[] }) {
    return (
        <AppLayout>
            <Head title="Discounts" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Discounts</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {discounts.map((d) => (
                            <TableRow key={d.id}>
                                <TableCell className="font-medium">
                                    {d.name}
                                </TableCell>
                                <TableCell className="font-mono text-sm">
                                    {d.code}
                                </TableCell>
                                <TableCell className="capitalize">
                                    {d.type}
                                </TableCell>
                                <TableCell className="text-right">
                                    {d.value}
                                </TableCell>
                                <TableCell>{d.description || '—'}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            d.is_active
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {d.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        {discounts.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    No discounts.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
