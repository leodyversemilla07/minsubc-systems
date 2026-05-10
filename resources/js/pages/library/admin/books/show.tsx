import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, BookOpen, CheckCircle, XCircle, Pencil, Plus } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {
    book: {
        id: number; isbn: string; title: string; author: string; publisher: string | null;
        publication_year: number | null; edition: string | null; description: string | null;
        category: { id: number; name: string } | null;
        total_copies: number; available_copies: number;
        shelf_location: string | null; is_active: boolean;
        borrowings: { id: number; user: { id: number; name: string }; status: string; due_date: string }[];
    };
}

export default function BookShow({ book }: Props) {
    const [copies, setCopies] = useState('1');

    const addCopies = () => {
        router.post(route('library.admin.books.add-copies', book.id), { copies: parseInt(copies) });
    };

    return (
        <AppLayout>
            <Head title={book.title} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.books.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="h-6 w-6" /> {book.title}</h1>
                    <Badge variant={book.is_active ? 'secondary' : 'destructive'}>
                        {book.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div><span className="text-sm text-muted-foreground">ISBN</span><p className="font-mono">{book.isbn}</p></div>
                            <div><span className="text-sm text-muted-foreground">Author</span><p>{book.author}</p></div>
                            <div><span className="text-sm text-muted-foreground">Publisher</span><p>{book.publisher ?? '-'}</p></div>
                            <div><span className="text-sm text-muted-foreground">Year</span><p>{book.publication_year ?? '-'}</p></div>
                            <div><span className="text-sm text-muted-foreground">Edition</span><p>{book.edition ?? '-'}</p></div>
                            <div><span className="text-sm text-muted-foreground">Category</span><p>{book.category?.name ?? '-'}</p></div>
                            <div><span className="text-sm text-muted-foreground">Shelf</span><p>{book.shelf_location ?? '-'}</p></div>
                            {book.description && <div><span className="text-sm text-muted-foreground">Description</span><p className="text-sm">{book.description}</p></div>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Inventory</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-2xl font-bold">{book.total_copies}</p><p className="text-sm text-muted-foreground">Total Copies</p></div>
                                <div className="text-center p-4 bg-muted rounded-lg"><p className="text-2xl font-bold text-green-600">{book.available_copies}</p><p className="text-sm text-muted-foreground">Available</p></div>
                            </div>
                            <div className="space-y-2 pt-2">
                                <p className="text-sm font-medium">Add Copies</p>
                                <div className="flex gap-2">
                                    <Input type="number" min="1" value={copies} onChange={e => setCopies(e.target.value)} className="w-24" />
                                    <Button size="sm" onClick={addCopies}><Plus className="mr-1 h-4 w-4" /> Add</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <Link href={route('library.admin.books.edit', book.id)} className="block">
                                <Button className="w-full"><Pencil className="mr-2 h-4 w-4" /> Edit Book</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader><CardTitle>Borrowing History ({book.borrowings?.length ?? 0})</CardTitle></CardHeader>
                    <CardContent>
                        {book.borrowings?.length > 0 ? (
                            <div className="space-y-2">
                                {book.borrowings.map(b => (
                                    <div key={b.id} className="flex items-center justify-between p-2 border rounded">
                                        <span>{b.user.name}</span>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={b.status === 'returned' ? 'secondary' : b.status === 'active' ? 'default' : 'destructive'}>{b.status}</Badge>
                                            <span className="text-sm text-muted-foreground">Due: {b.due_date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="text-muted-foreground">No borrowing history.</p>}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}