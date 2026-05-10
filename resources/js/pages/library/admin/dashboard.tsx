import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { BookOpen, Users, BookMarked, AlertTriangle, DollarSign, Library } from 'lucide-react';

interface Props extends PageProps {
    stats: {
        total_books: number; active_borrowings: number; overdue_borrowings: number;
        pending_borrowings: number; total_users_borrowed: number;
        unpaid_fines: number; total_fines_collected: number; active_reservations: number;
    };
    recentBorrowings: { id: number; borrow_code: string; book: { title: string; isbn: string }; user: { name: string }; status: string }[];
    overdueCount: number;
}

export default function LibraryDashboard({ stats, recentBorrowings, overdueCount }: Props) {
    const cards = [
        { title: 'Total Books', value: stats.total_books, icon: BookOpen, color: 'text-blue-600' },
        { title: 'Active Borrowings', value: stats.active_borrowings, icon: BookMarked, color: 'text-green-600' },
        { title: 'Overdue', value: overdueCount, icon: AlertTriangle, color: 'text-red-600' },
        { title: 'Pending', value: stats.pending_borrowings, icon: Users, color: 'text-yellow-600' },
        { title: 'Unpaid Fines (₱)', value: `₱${stats.unpaid_fines?.toFixed(2) ?? '0.00'}`, icon: DollarSign, color: 'text-orange-600' },
        { title: 'Active Reservations', value: stats.active_reservations, icon: Library, color: 'text-purple-600' },
    ];

    return (
        <AppLayout>
            <Head title="Library Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2"><Library className="h-6 w-6" /> Library Dashboard</h1>
                    <div className="flex gap-2">
                        <Link href={route('library.admin.books.create')}><Button variant="outline">Add Book</Button></Link>
                        <Link href={route('library.admin.borrowings.create')}><Button>New Borrowing</Button></Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {cards.map(c => (
                        <Card key={c.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{c.title}</CardTitle>
                                <c.icon className={`h-5 w-5 ${c.color}`} />
                            </CardHeader>
                            <CardContent><p className="text-2xl font-bold">{c.value}</p></CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader><CardTitle>Recent Borrowings</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Book</TableHead>
                                    <TableHead>Borrower</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentBorrowings?.map(b => (
                                    <TableRow key={b.id}>
                                        <TableCell className="font-mono">{b.borrow_code}</TableCell>
                                        <TableCell>{b.book?.title ?? 'N/A'}</TableCell>
                                        <TableCell>{b.user?.name}</TableCell>
                                        <TableCell><Badge variant={b.status === 'active' ? 'default' : b.status === 'returned' ? 'secondary' : 'destructive'}>{b.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                                {(!recentBorrowings || recentBorrowings.length === 0) && (
                                    <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No recent borrowings.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}