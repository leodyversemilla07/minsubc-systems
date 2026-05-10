import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { DollarSign } from 'lucide-react';

interface Props extends PageProps {
    fines: { data: any[]; links: any[] };
    stats: { total_unpaid: number; total_collected: number; unpaid_count: number };
    filters: { status?: string };
}

export default function FineIndex({ fines, stats, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Fines" />
            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-2xl font-bold flex items-center gap-2"><DollarSign className="h-6 w-6" /> Fines Management</h1>

                <div className="grid grid-cols-3 gap-4">
                    <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-red-600">₱{stats?.total_unpaid?.toFixed(2)}</p><p className="text-sm">Unpaid</p></CardContent></Card>
                    <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-green-600">₱{stats?.total_collected?.toFixed(2)}</p><p className="text-sm">Collected</p></CardContent></Card>
                    <Card><CardContent className="pt-6"><p className="text-2xl font-bold">{stats?.unpaid_count}</p><p className="text-sm">Unpaid Count</p></CardContent></Card>
                </div>

                <div className="flex gap-2">
                    <Select value={filters?.status ?? ''} onValueChange={v => router.get(route('library.admin.fines.index'), { status: v }, { preserveState: true })}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All</SelectItem>
                            <SelectItem value="unpaid">Unpaid</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="waived">Waived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Book</TableHead>
                                    <TableHead>Borrower</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Paid</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fines?.data?.map((f: any) => (
                                    <TableRow key={f.id}>
                                        <TableCell>{f.borrowing?.book?.title ?? 'N/A'}</TableCell>
                                        <TableCell>{f.borrowing?.user?.name}</TableCell>
                                        <TableCell>₱{f.amount}</TableCell>
                                        <TableCell>₱{f.paid_amount}</TableCell>
                                        <TableCell><Badge variant="outline">{f.reason}</Badge></TableCell>
                                        <TableCell><Badge variant={f.status === 'paid' ? 'secondary' : f.status === 'waived' ? 'outline' : 'destructive'}>{f.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            {f.status === 'unpaid' && (
                                                <div className="flex justify-end gap-1">
                                                    <Button size="sm" variant="outline" onClick={() => router.post(route('library.admin.fines.pay', f.id))}>Pay</Button>
                                                    <Button size="sm" variant="ghost" onClick={() => router.post(route('library.admin.fines.waive', f.id))}>Waive</Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}