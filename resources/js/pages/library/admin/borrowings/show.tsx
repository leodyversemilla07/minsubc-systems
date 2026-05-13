import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, BookX, BookOpen } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function BorrowingShow({ borrowing }: { borrowing: any }) {
    return (
        <AppLayout>
            <Head title="Borrowing Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.borrowings.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Borrowing Details</h1>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${borrowing.status === 'active' ? 'bg-blue-100 text-blue-800' : borrowing.status === 'returned' ? 'bg-green-100 text-green-800' : borrowing.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{borrowing.status}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><BookOpen className="mr-2 inline h-5 w-5" />Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Book</dt><dd className="font-medium max-w-xs truncate">{borrowing.book?.title ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Borrower</dt><dd>{borrowing.user?.name ?? borrowing.student_id ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Borrowed At</dt><dd>{borrowing.borrowed_at ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Due Date</dt><dd>{borrowing.due_date ?? '—'}</dd></div>
                            {borrowing.returned_at && <div className="flex justify-between"><dt className="text-muted-foreground">Returned</dt><dd>{borrowing.returned_at}</dd></div>}
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex flex-wrap gap-2">
                            {borrowing.status === 'active' && (
                                <>
                                    <Link as="button" method="post" href={route('library.admin.borrowings.return', borrowing.id)}>
                                        <Button><CheckCircle className="mr-2 h-4 w-4" /> Mark Returned</Button>
                                    </Link>
                                    <Link as="button" method="post" href={route('library.admin.borrowings.mark-lost', borrowing.id)}>
                                        <Button variant="outline" className="text-red-600"><BookX className="mr-2 h-4 w-4" /> Mark Lost</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}