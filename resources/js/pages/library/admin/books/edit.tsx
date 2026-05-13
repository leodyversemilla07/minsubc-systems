import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BookEdit({ book, categories }: { book: any; categories: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        title: book.title, author: book.author ?? '', isbn: book.isbn ?? '', publisher: book.publisher ?? '',
        publication_year: String(book.publication_year ?? ''), category_id: String(book.category_id ?? ''),
        total_copies: String(book.total_copies), available_copies: String(book.available_copies),
        description: book.description ?? '', is_active: book.is_active,
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('library.admin.books.update', book.id)); };

    return (
        <AppLayout>
            <Head title="Edit Book" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.books.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Book</h1>
                </div>
                <Card className="max-w-2xl">
                    <CardHeader><CardTitle>Book Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Title</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)} />{errors.title && <p className="text-sm text-red-600">{errors.title}</p>}</div>
                                <div><Label>Author</Label><Input value={data.author} onChange={(e) => setData('author', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div><Label>ISBN</Label><Input value={data.isbn} onChange={(e) => setData('isbn', e.target.value)} /></div>
                                <div><Label>Publisher</Label><Input value={data.publisher} onChange={(e) => setData('publisher', e.target.value)} /></div>
                                <div><Label>Year</Label><Input type="number" value={data.publication_year} onChange={(e) => setData('publication_year', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label>Category</Label>
                                    <Select value={data.category_id} onValueChange={(v) => setData('category_id', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>{categories.map((c: any) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Total Copies</Label><Input type="number" value={data.total_copies} onChange={(e) => setData('total_copies', e.target.value)} /></div>
                                <div><Label>Available</Label><Input type="number" value={data.available_copies} onChange={(e) => setData('available_copies', e.target.value)} /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('library.admin.books.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}