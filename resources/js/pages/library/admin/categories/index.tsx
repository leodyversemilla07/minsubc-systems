import { Head, Link } from '@inertiajs/react';
import { FolderOpen, Plus, Edit, Trash2 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CategoryIndex({ categories }: { categories: any[] }) {
    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Book Categories</h1>
                    <Link href={route('library.admin.categories.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Category</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><FolderOpen className="mr-2 inline h-5 w-5" />All Categories</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Books</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">{c.name}</TableCell>
                                        <TableCell className="max-w-xs truncate text-muted-foreground">{c.description ?? '—'}</TableCell>
                                        <TableCell className="text-right">{c.books_count ?? c.books?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('library.admin.categories.edit', c.id)}><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                                                <Link as="button" method="delete" href={route('library.admin.categories.destroy', c.id)} onClick={(e: any) => { if (!confirm('Delete?')) e.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {categories.length === 0 && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No categories found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}