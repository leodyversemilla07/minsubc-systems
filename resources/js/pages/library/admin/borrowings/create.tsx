import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, BookOpen } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BorrowingCreate({ books, students }: { books: any[]; students: any[] }) {
    const { data, setData, post, processing, errors } = useForm({ book_id: '', student_id: '', due_date: '' });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('library.admin.borrowings.store')); };

    return (
        <AppLayout>
            <Head title="Create Borrowing" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.borrowings.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Borrowing</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle><BookOpen className="mr-2 inline h-5 w-5" />Borrowing Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>Book</Label>
                                <Select value={data.book_id} onValueChange={(v) => setData('book_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select book" /></SelectTrigger>
                                    <SelectContent>{books.map((b: any) => <SelectItem key={b.id} value={String(b.id)}>{b.title} ({b.available_copies} avail)</SelectItem>)}</SelectContent>
                                </Select>
                                {errors.book_id && <p className="text-sm text-red-600">{errors.book_id}</p>}
                            </div>
                            <div>
                                <Label>Student</Label>
                                <Select value={data.student_id} onValueChange={(v) => setData('student_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                                    <SelectContent>{students.map((s: any) => <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>)}</SelectContent>
                                </Select>
                                {errors.student_id && <p className="text-sm text-red-600">{errors.student_id}</p>}
                            </div>
                            <div><Label>Due Date</Label><Input type="date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)} />{errors.due_date && <p className="text-sm text-red-600">{errors.due_date}</p>}</div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('library.admin.borrowings.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}