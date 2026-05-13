import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TextbookCreate() {
    const { data, setData, post, processing, errors } = useForm({ title: '', author: '', isbn: '', edition: '', publisher: '', publication_year: '' });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('curriculum.admin.textbooks.store')); };
    return (
        <AppLayout>
            <Head title="Add Textbook" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('curriculum.admin.textbooks.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Textbook</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Textbook Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Title</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)} />{errors.title && <p className="text-sm text-red-600">{errors.title}</p>}</div>
                                <div><Label>Author</Label><Input value={data.author} onChange={(e) => setData('author', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div><Label>ISBN</Label><Input value={data.isbn} onChange={(e) => setData('isbn', e.target.value)} /></div>
                                <div><Label>Edition</Label><Input value={data.edition} onChange={(e) => setData('edition', e.target.value)} placeholder="e.g. 3rd" /></div>
                                <div><Label>Year</Label><Input type="number" value={data.publication_year} onChange={(e) => setData('publication_year', e.target.value)} /></div>
                            </div>
                            <div><Label>Publisher</Label><Input value={data.publisher} onChange={(e) => setData('publisher', e.target.value)} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('curriculum.admin.textbooks.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}