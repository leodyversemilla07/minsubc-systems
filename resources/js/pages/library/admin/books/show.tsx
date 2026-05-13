import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen, BookCheck, History } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BookShow({ book, borrowings }: { book: any; borrowings: any[] }) {
    return (
        <AppLayout>
            <Head title={book.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.books.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{book.title}</h1>
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${book.is_active ? 'bg-green-500' : 'bg-red-400'}`} />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold"><BookOpen className="mr-2 inline h-5 w-5" />Details</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-muted-foreground">Author</dt><dd>{book.author ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">ISBN</dt><dd className="font-mono">{book.isbn ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Category</dt><dd>{book.category?.name ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Publisher</dt><dd>{book.publisher ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground">Year</dt><dd>{book.publication_year ?? '—'}</dd></div>
                            <div className="flex justify-between"><dt className="text-muted-foreground"><BookCheck className="mr-1 inline h-3 w-3" /> Copies</dt><dd>{book.available_copies} / {book.total_copies} available</dd></div>
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Actions</h2>
                        <div className="flex flex-wrap gap-2">
                            <Link href={route('library.admin.books.edit', book.id)}><Button variant="outline">Edit Book</Button></Link>
                            <Link href={route('library.admin.borrowings.create', { book_id: book.id })}><Button>Create Borrowing</Button></Link>
                        </div>
                    </Card>
                </div>

                {book.description && (
                    <Card className="p-6">
                        <h2 className="mb-2 text-lg font-semibold">Description</h2>
                        <p className="text-muted-foreground text-sm">{book.description}</p>
                    </Card>
                )}

                <Card className="p-6">
                    <CardHeader className="px-0 pt-0"><h2 className="text-lg font-semibold"><History className="mr-2 inline h-5 w-5" />Borrowing History</h2></CardHeader>
                    {borrowings?.length ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Borrower</TableHead>
                                    <TableHead>Borrowed</TableHead>
                                    <TableHead>Due</TableHead>
                                    <TableHead>Returned</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {borrowings.slice(0, 10).map((b: any) => (
                                    <TableRow key={b.id}>
                                        <TableCell className="font-medium">{b.user?.name ?? b.student_id ?? '—'}</TableCell>
                                        <TableCell>{b.borrowed_at ?? '—'}</TableCell>
                                        <TableCell>{b.due_date ?? '—'}</TableCell>
                                        <TableCell>{b.returned_at ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${b.status === 'active' ? 'bg-blue-100 text-blue-800' : b.status === 'returned' ? 'bg-green-100 text-green-800' : b.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{b.status}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : <p className="text-muted-foreground text-sm">No borrowing history.</p>}
                </Card>
            </div>
        </AppLayout>
    );
}