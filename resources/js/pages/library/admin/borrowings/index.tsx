import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BorrowingIndex({ borrowings }: { borrowings: any[] }) {
    return (
        <AppLayout>
            <Head title="Borrowings" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Borrowings</h1>
                    <Link href={route('library.admin.borrowings.create')}><Button>New Borrowing</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><BookOpen className="mr-2 inline h-5 w-5" />All Borrowings</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Book</TableHead>
                                    <TableHead>Borrower</TableHead>
                                    <TableHead>Borrowed</TableHead>
                                    <TableHead>Due</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {borrowings.map((b: any) => (
                                    <TableRow key={b.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{b.book?.title ?? '—'}</TableCell>
                                        <TableCell>{b.user?.name ?? b.student_id ?? '—'}</TableCell>
                                        <TableCell>{b.borrowed_at ?? '—'}</TableCell>
                                        <TableCell>{b.due_date ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${b.status === 'active' ? 'bg-blue-100 text-blue-800' : b.status === 'returned' ? 'bg-green-100 text-green-800' : b.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{b.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('library.admin.borrowings.show', b.id)}><Button variant="ghost" size="sm">View</Button></Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {borrowings.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No borrowings found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}