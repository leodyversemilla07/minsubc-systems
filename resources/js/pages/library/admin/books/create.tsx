import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {
    categories: { id: number; name: string }[];
}

export default function BookCreate({ categories }: Props) {
    const [form, setForm] = useState({
        isbn: '', title: '', author: '', publisher: '', publication_year: '',
        edition: '', description: '', category_id: '', total_copies: '1', shelf_location: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('library.admin.books.store'), form);
    };

    return (
        <AppLayout>
            <Head title="Add Book" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.books.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add New Book</h1>
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
                                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                        <SelectContent>
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
                                    <Label htmlFor="publication_year">Publication Year</Label>
                                    <Input id="publication_year" type="number" value={form.publication_year} onChange={e => setForm(f => ({ ...f, publication_year: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edition">Edition</Label>
                                    <Input id="edition" value={form.edition} onChange={e => setForm(f => ({ ...f, edition: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="total_copies">Total Copies *</Label>
                                    <Input id="total_copies" type="number" min="1" value={form.total_copies} onChange={e => setForm(f => ({ ...f, total_copies: e.target.value }))} required />
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
                                <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save Book</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}