import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Props extends PageProps {
    borrowing: {
        id: number; borrow_code: string; status: string; borrowed_at: string | null;
        due_date: string; returned_at: string | null; notes: string | null;
        book: { id: number; title: string; isbn: string; author: string; category: { name: string } | null };
        user: { id: number; name: string; email: string };
        processor: { name: string } | null;
        fine: { id: number; amount: number; paid_amount: number; status: string; reason: string } | null;
    };
}

export default function BorrowingShow({ borrowing }: Props) {
    const handleReturn = () => router.post(route('library.admin.borrowings.return', borrowing.id));
    const handleMarkLost = () => router.post(route('library.admin.borrowings.mark-lost', borrowing.id));
    const handleApprove = () => router.post(route('library.admin.borrowings.approve', borrowing.id));

    return (
        <AppLayout>
            <Head title={`Borrowing ${borrowing.borrow_code}`} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.borrowings.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold">Borrowing: {borrowing.borrow_code}</h1>
                    <Badge variant={borrowing.status === 'returned' ? 'secondary' : borrowing.status === 'active' ? 'default' : 'destructive'}>{borrowing.status}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Book Details</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="text-muted-foreground">Title:</span> {borrowing.book?.title}</p>
                            <p><span className="text-muted-foreground">ISBN:</span> {borrowing.book?.isbn}</p>
                            <p><span className="text-muted-foreground">Author:</span> {borrowing.book?.author}</p>
                            <p><span className="text-muted-foreground">Category:</span> {borrowing.book?.category?.name ?? '-'}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Borrower</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="text-muted-foreground">Name:</span> {borrowing.user?.name}</p>
                            <p><span className="text-muted-foreground">Email:</span> {borrowing.user?.email}</p>
                            <p><span className="text-muted-foreground">Processed by:</span> {borrowing.processor?.name ?? '-'}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <p><span className="text-muted-foreground">Borrowed:</span> {borrowing.borrowed_at ?? 'Not yet'}</p>
                            <p><span className="text-muted-foreground">Due:</span> {borrowing.due_date}</p>
                            <p><span className="text-muted-foreground">Returned:</span> {borrowing.returned_at ?? 'Not yet'}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Fine</CardTitle></CardHeader>
                        <CardContent>
                            {borrowing.fine ? (
                                <div className="space-y-2">
                                    <p><span className="text-muted-foreground">Amount:</span> ₱{borrowing.fine.amount}</p>
                                    <p><span className="text-muted-foreground">Reason:</span> {borrowing.fine.reason}</p>
                                    <p><span className="text-muted-foreground">Status:</span> <Badge variant={borrowing.fine.status === 'paid' ? 'secondary' : 'destructive'}>{borrowing.fine.status}</Badge></p>
                                </div>
                            ) : <p className="text-muted-foreground">No fine</p>}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                        {borrowing.status === 'pending' && <Button onClick={handleApprove}><CheckCircle className="mr-2 h-4 w-4" /> Approve</Button>}
                        {(borrowing.status === 'active' || borrowing.status === 'overdue') && (
                            <Button onClick={handleReturn} variant="secondary"><CheckCircle className="mr-2 h-4 w-4" /> Return Book</Button>
                        )}
                        {(borrowing.status === 'active' || borrowing.status === 'overdue') && (
                            <Button onClick={handleMarkLost} variant="destructive"><XCircle className="mr-2 h-4 w-4" /> Mark as Lost</Button>
                        )}
                        {borrowing.notes && <p className="text-sm text-muted-foreground w-full pt-2">Notes: {borrowing.notes}</p>}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}