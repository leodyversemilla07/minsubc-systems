import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Plus, Eye, BookMarked, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

interface BorrowingData {
    id: number; borrow_code: string; book: { title: string; isbn: string };
    user: { id: number; name: string };
    due_date: string; status: string;
    fine: { id: number; amount: number; status: string } | null;
}

interface Props extends PageProps {
    borrowings: { data: BorrowingData[]; links: any[] };
    stats: { active: number; overdue: number; pending: number; returned_today: number };
    filters: { search?: string; status?: string };
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    active: 'default', returned: 'secondary', overdue: 'destructive', pending: 'outline', lost: 'destructive',
};

export default function BorrowingIndex({ borrowings, stats, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Borrowings" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2"><BookMarked className="h-6 w-6" /> Borrowings</h1>
                    <Link href={route('library.admin.borrowings.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Borrowing</Button></Link>
                </div>

                {stats && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card><CardContent className="pt-6"><p className="text-2xl font-bold">{stats.active}</p><p className="text-sm">Active</p></CardContent></Card>
                        <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-red-600">{stats.overdue}</p><p className="text-sm">Overdue</p></CardContent></Card>
                        <Card><CardContent className="pt-6"><p className="text-2xl font-bold">{stats.pending}</p><p className="text-sm">Pending</p></CardContent></Card>
                        <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-green-600">{stats.returned_today}</p><p className="text-sm">Returned Today</p></CardContent></Card>
                    </div>
                )}

                <div className="flex gap-2">
                    <Link href={route('library.admin.borrowings.index')}><Button variant={!filters?.status ? 'default' : 'outline'} size="sm">All</Button></Link>
                    <Link href={route('library.admin.borrowings.active')}><Button variant={filters?.status === 'active' ? 'default' : 'outline'} size="sm">Active</Button></Link>
                    <Link href={route('library.admin.borrowings.overdue')}><Button variant={filters?.status === 'overdue' ? 'default' : 'outline'} size="sm">Overdue</Button></Link>
                    <Link href={route('library.admin.borrowings.history')}><Button variant={filters?.status === 'returned' ? 'default' : 'outline'} size="sm">History</Button></Link>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Book</TableHead>
                                    <TableHead>Borrower</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Fine</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {borrowings?.data?.map(b => (
                                    <TableRow key={b.id}>
                                        <TableCell className="font-mono text-sm">{b.borrow_code}</TableCell>
                                        <TableCell>{b.book?.title ?? 'N/A'}</TableCell>
                                        <TableCell>{b.user?.name}</TableCell>
                                        <TableCell>{b.due_date}</TableCell>
                                        <TableCell><Badge variant={statusColors[b.status] ?? 'outline'}>{b.status}</Badge></TableCell>
                                        <TableCell>
                                            {b.fine ? <Badge variant={b.fine.status === 'paid' ? 'secondary' : 'destructive'}>₱{b.fine.amount}</Badge> : '-'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('library.admin.borrowings.show', b.id)}>
                                                <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                            </Link>
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