import { Head, Link } from '@inertiajs/react';
import { BookOpen, Plus, Edit, Trash2, Eye } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BookIndex({ books }: { books: any[] }) {
    return (
        <AppLayout>
            <Head title="Books" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Books</h1>
                    <Link href={route('library.admin.books.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Book</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><BookOpen className="mr-2 inline h-5 w-5" />All Books</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>ISBN</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Copies</TableHead>
                                    <TableHead className="text-right">Available</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {books.map((b: any) => (
                                    <TableRow key={b.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{b.title}</TableCell>
                                        <TableCell className="max-w-[120px] truncate">{b.author ?? '—'}</TableCell>
                                        <TableCell className="font-mono text-sm">{b.isbn ?? '—'}</TableCell>
                                        <TableCell>{b.category?.name ?? '—'}</TableCell>
                                        <TableCell className="text-right">{b.total_copies}</TableCell>
                                        <TableCell className="text-right">
                                            <span className={`font-bold ${b.available_copies > 0 ? 'text-green-600' : 'text-red-600'}`}>{b.available_copies}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('library.admin.books.show', b.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('library.admin.books.edit', b.id)}><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                                                <Link as="button" method="delete" href={route('library.admin.books.destroy', b.id)} onClick={(e: any) => { if (!confirm('Delete?')) e.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {books.length === 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No books found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}