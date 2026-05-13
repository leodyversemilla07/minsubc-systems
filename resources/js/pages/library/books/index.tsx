import { Head, Link } from '@inertiajs/react';
import { BookOpen, BookCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BooksIndex({ books, categories }: { books: any[]; categories: any[] }) {
    return (
        <AppLayout>
            <Head title="Library Books" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BookOpen className="mr-2 inline h-6 w-6" />Library Catalog</h1>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Available</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {books.map((b: any) => (
                                    <TableRow key={b.id}>
                                        <TableCell className="max-w-xs truncate font-medium">
                                            <Link href={route('library.books.show', b.id)} className="hover:text-blue-600 hover:underline">{b.title}</Link>
                                        </TableCell>
                                        <TableCell>{b.author ?? '—'}</TableCell>
                                        <TableCell>{b.category?.name ?? '—'}</TableCell>
                                        <TableCell className="text-right">
                                            <span className={`font-bold ${b.available_copies > 0 ? 'text-green-600' : 'text-red-600'}`}>{b.available_copies}/{b.total_copies}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {books.length === 0 && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No books found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}