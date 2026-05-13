import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, TrendingUp, BookOpen } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PopularBooks({ books }: { books: any[] }) {
    return (
        <AppLayout>
            <Head title="Popular Books" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><TrendingUp className="mr-2 inline h-6 w-6" />Popular Books</h1>
                </div>
                <Card className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead className="text-right">Times Borrowed</TableHead>
                                <TableHead className="text-right">Available</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {books.map((b: any, i: number) => (
                                <TableRow key={b.id}>
                                    <TableCell className="font-bold text-muted-foreground">{i + 1}</TableCell>
                                    <TableCell className="max-w-xs truncate font-medium">{b.title}</TableCell>
                                    <TableCell>{b.author ?? '—'}</TableCell>
                                    <TableCell className="text-right font-bold">{b.borrowings_count ?? 0}</TableCell>
                                    <TableCell className="text-right">{b.available_copies}/{b.total_copies}</TableCell>
                                </TableRow>
                            ))}
                            {books.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No data available.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}