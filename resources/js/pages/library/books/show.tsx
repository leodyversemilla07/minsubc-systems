import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, BookOpen, Library } from 'lucide-react';

interface Props extends PageProps {
    book: {
        id: number; isbn: string; title: string; author: string; publisher: string | null;
        publication_year: number | null; edition: string | null; description: string | null;
        category: { id: number; name: string } | null;
        total_copies: number; available_copies: number;
        shelf_location: string | null;
    };
    relatedBooks: { id: number; title: string; author: string }[];
}

export default function PublicBookShow({ book, relatedBooks }: Props) {
    return (
        <AppLayout>
            <Head title={book.title} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.books.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <BookOpen className="h-6 w-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div><span className="text-sm text-muted-foreground">ISBN</span><p className="font-mono">{book.isbn}</p></div>
                            <div><span className="text-sm text-muted-foreground">Publisher</span><p>{book.publisher ?? '-'}</p></div>
                            <div><span className="text-sm text-muted-foreground">Year</span><p>{book.publication_year ?? '-'}</p></div>
                            <div><span className="text-sm text-muted-foreground">Edition</span><p>{book.edition ?? '-'}</p></div>
                            <div><span className="text-sm text-muted-foreground">Category</span><p>{book.category?.name ?? '-'}</p></div>
                            <div><span className="text-sm text-muted-foreground">Shelf</span><p>{book.shelf_location ?? '-'}</p></div>
                        </div>

                        {book.description && (
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Description</h3>
                                <p className="text-muted-foreground">{book.description}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <Card>
                            <CardHeader><CardTitle>Availability</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <p className="text-3xl font-bold text-green-600">{book.available_copies}</p>
                                    <p className="text-sm text-muted-foreground">of {book.total_copies} available</p>
                                </div>
                                {book.available_copies > 0 ? (
                                    <Badge variant="secondary" className="w-full justify-center py-2">Available for Borrowing</Badge>
                                ) : (
                                    <Badge variant="destructive" className="w-full justify-center py-2">All Copies Checked Out</Badge>
                                )}
                                <p className="text-xs text-center text-muted-foreground">Ask the librarian to borrow this book.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {relatedBooks?.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Related Books</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {relatedBooks.map(rb => (
                                <Link key={rb.id} href={route('library.books.show', rb.id)}>
                                    <Card className="hover:shadow-md transition-shadow">
                                        <CardContent className="pt-4">
                                            <p className="font-medium truncate">{rb.title}</p>
                                            <p className="text-sm text-muted-foreground">{rb.author}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}