import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {
    book: {
        id: number; isbn: string; title: string; author: string; publisher: string;
        publication_year: number | null; edition: string | null; description: string | null;
        category: { id: number; name: string } | null;
        total_copies: number; available_copies: number;
        shelf_location: string | null; is_active: boolean;
    };
    categories: { id: number; name: string }[];
}

export default function BookEdit({ book, categories }: Props) {
    const [form, setForm] = useState({
        isbn: book.isbn, title: book.title, author: book.author,
        publisher: book.publisher ?? '', publication_year: book.publication_year?.toString() ?? '',
        edition: book.edition ?? '', description: book.description ?? '',
        category_id: book.category?.id?.toString() ?? '',
        total_copies: book.total_copies.toString(),
        available_copies: book.available_copies.toString(),
        shelf_location: book.shelf_location ?? '', is_active: book.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('library.admin.books.update', book.id), form);
    };

    return (
        <AppLayout>
            <Head title={`Edit ${book.title}`} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.books.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="h-6 w-6" /> Edit: {book.title}</h1>
                    <Badge variant={book.is_active ? 'secondary' : 'destructive'}>
                        {book.is_active ? <><CheckCircle className="mr-1 h-3 w-3" /> Active</> : <><XCircle className="mr-1 h-3 w-3" /> Inactive</>}
                    </Badge>
                </div>

                <Card>
                    <CardHeader><CardTitle>Book Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="isbn">ISBN *</Label>
                                    <Input id="isbn" value={form.isbn} onChange={e => setForm(f => ({ ...f, isbn: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={form.category_id} onValueChange={v => setForm(f => ({ ...f, category_id: v }))}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">No Category</SelectItem>
                                            {categories?.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input id="title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="author">Author *</Label>
                                    <Input id="author" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="publisher">Publisher</Label>
                                    <Input id="publisher" value={form.publisher} onChange={e => setForm(f => ({ ...f, publisher: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="total_copies">Total Copies *</Label>
                                    <Input id="total_copies" type="number" min="1" value={form.total_copies} onChange={e => setForm(f => ({ ...f, total_copies: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="available_copies">Available Copies *</Label>
                                    <Input id="available_copies" type="number" min="0" value={form.available_copies} onChange={e => setForm(f => ({ ...f, available_copies: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shelf_location">Shelf Location</Label>
                                    <Input id="shelf_location" value={form.shelf_location} onChange={e => setForm(f => ({ ...f, shelf_location: e.target.value }))} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Link href={route('library.admin.books.index')}><Button type="button" variant="outline">Cancel</Button></Link>
                                <Button type="submit"><CheckCircle className="mr-2 h-4 w-4" /> Update Book</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}