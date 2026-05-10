import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Plus, Pencil, Eye, Search, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface BookData {
    id: number; title: string; author: string; isbn: string;
    category: { id: number; name: string } | null;
    total_copies: number; available_copies: number;
    is_active: boolean;
}

interface Props extends PageProps {
    books: { data: BookData[]; links: any[] };
    categories: { id: number; name: string }[];
    filters: { search?: string; category?: string; status?: string };
}

export default function BookIndex({ books, categories, filters }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const handleFilter = (key: string, value: string) => {
        router.get(route('library.admin.books.index'), { ...filters, [key]: value }, { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title="Library - Books" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="h-6 w-6" /> Books</h1>
                    <Link href={route('library.admin.books.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Book</Button></Link>
                </div>

                <Card>
                    <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1"><Input placeholder="Search by title, author, or ISBN..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter('search', search)} /></div>
                            <Select value={filters?.category ?? ''} onValueChange={v => handleFilter('category', v)}>
                                <SelectTrigger className="w-40"><SelectValue placeholder="All Categories" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Categories</SelectItem>
                                    {categories?.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select value={filters?.status ?? ''} onValueChange={v => handleFilter('status', v)}>
                                <SelectTrigger className="w-40"><SelectValue placeholder="All Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Status</SelectItem>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="unavailable">Unavailable</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={() => handleFilter('search', search)}><Search className="mr-2 h-4 w-4" /> Search</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ISBN</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Copies</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {books?.data?.map(b => (
                                    <TableRow key={b.id}>
                                        <TableCell className="font-mono text-sm">{b.isbn}</TableCell>
                                        <TableCell className="font-medium">{b.title}</TableCell>
                                        <TableCell>{b.author}</TableCell>
                                        <TableCell>{b.category?.name ?? '-'}</TableCell>
                                        <TableCell>{b.total_copies}</TableCell>
                                        <TableCell>
                                            <Badge variant={b.available_copies > 0 ? 'secondary' : 'destructive'}>
                                                {b.available_copies}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('library.admin.books.show', b.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('library.admin.books.edit', b.id)}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}