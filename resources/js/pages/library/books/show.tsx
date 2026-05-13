import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function BookShow({ book }: { book: any }) {
    return (
        <AppLayout>
            <Head title={book.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.books.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">{book.title}</h1>
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
                            <div className="flex justify-between"><dt className="text-muted-foreground">Available</dt><dd className={`font-bold ${book.available_copies > 0 ? 'text-green-600' : 'text-red-600'}`}>{book.available_copies} / {book.total_copies}</dd></div>
                        </dl>
                    </Card>
                    {book.description && (
                        <Card className="p-6">
                            <h2 className="mb-2 text-lg font-semibold">Description</h2>
                            <p className="text-muted-foreground text-sm">{book.description}</p>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}