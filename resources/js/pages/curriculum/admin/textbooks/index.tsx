import { Head, Link } from '@inertiajs/react';
import { BookOpen, Plus, Edit, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TextbookIndex({ textbooks }: { textbooks: any[] }) {
    return (
        <AppLayout>
            <Head title="Textbooks" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Textbooks</h1>
                    <Link href={route('curriculum.admin.textbooks.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Textbook</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><BookOpen className="mr-2 inline h-5 w-5" />All Textbooks</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>ISBN</TableHead>
                                    <TableHead>Edition</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {textbooks.map((t: any) => (
                                    <TableRow key={t.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{t.title}</TableCell>
                                        <TableCell>{t.author ?? '—'}</TableCell>
                                        <TableCell className="font-mono text-sm">{t.isbn ?? '—'}</TableCell>
                                        <TableCell>{t.edition ?? '—'}</TableCell>
                                        <TableCell>{t.publication_year ?? '—'}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('curriculum.admin.textbooks.edit', t.id)}><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></Link>
                                                <Link as="button" method="delete" href={route('curriculum.admin.textbooks.destroy', t.id)} onClick={(e: any) => { if (!confirm('Delete?')) e.preventDefault(); }}>
                                                    <Button variant="ghost" size="icon" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {textbooks.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No textbooks found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}