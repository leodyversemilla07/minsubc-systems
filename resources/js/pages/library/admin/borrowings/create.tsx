import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { useState } from 'react';

interface Props extends PageProps {
    books: { id: number; title: string; isbn: string; author: string }[];
}

export default function BorrowingCreate({ books }: Props) {
    const [form, setForm] = useState({ book_id: '', user_id: '', due_date: '', notes: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('library.admin.borrowings.store'), form);
    };

    return (
        <AppLayout>
            <Head title="New Borrowing" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.borrowings.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold">New Borrowing</h1>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Book *</Label>
                                <Select value={form.book_id} onValueChange={v => setForm(f => ({ ...f, book_id: v }))}>
                                    <SelectTrigger><SelectValue placeholder="Select book" /></SelectTrigger>
                                    <SelectContent>
                                        {books?.map(b => <SelectItem key={b.id} value={b.id.toString()}>{b.title} ({b.isbn})</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Borrower ID or Name *</Label>
                                <Input placeholder="Enter user ID" value={form.user_id} onChange={e => setForm(f => ({ ...f, user_id: e.target.value }))} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Due Date *</Label>
                                <Input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Link href={route('library.admin.borrowings.index')}><Button type="button" variant="outline">Cancel</Button></Link>
                                <Button type="submit">Create Borrowing</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}