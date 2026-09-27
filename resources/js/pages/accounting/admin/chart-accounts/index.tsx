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

interface ChartAccount {
    id: number;
    account_code: string;
    name: string;
    type: string;
    balance: number;
    is_active: boolean;
    children?: ChartAccount[];
}

function AccountRow({
    account,
    depth,
}: {
    account: ChartAccount;
    depth: number;
}) {
    return (
        <>
            <TableRow key={account.id}>
                <TableCell
                    className="font-mono text-sm"
                    style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
                >
                    {account.account_code}
                </TableCell>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell className="capitalize">{account.type}</TableCell>
                <TableCell className="text-right">
                    ₱{(account.balance ?? 0).toLocaleString()}
                </TableCell>
                <TableCell>
                    <Badge
                        variant={account.is_active ? 'default' : 'secondary'}
                    >
                        {account.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                </TableCell>
            </TableRow>
            {(account.children ?? []).map((child) => (
                <AccountRow key={child.id} account={child} depth={depth + 1} />
            ))}
        </>
    );
}

export default function Index({ accounts }: { accounts: ChartAccount[] }) {
    return (
        <AppLayout>
            <Head title="Chart of Accounts" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Chart of Accounts</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">
                                Balance
                            </TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accounts.map((a) => (
                            <AccountRow key={a.id} account={a} depth={0} />
                        ))}
                        {accounts.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    No accounts.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
