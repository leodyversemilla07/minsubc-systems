import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Plus, Pencil, Eye, Search, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

interface DocumentData {
    id: number; title: string; file_name: string; category: string; file_size: number; downloads: number;
    created_at: string; uploader?: { name: string };
}

interface Props extends PageProps {
    documents: { data: DocumentData[] };
    categories: string[];
    filters: { search?: string; category?: string };
}

export default function DocumentIndex({ documents, categories, filters }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [category, setCategory] = useState(filters?.category ?? '');

    const handleFilter = () => router.get(route('usg.admin.documents.index'), { search, category }, { preserveState: true });
    const handleDelete = (id: number) => { if (confirm('Delete this document?')) router.delete(route('usg.admin.documents.destroy', id)); };

    const formatSize = (bytes: number) => bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;

    return (
        <AppLayout>
            <Head title="Documents" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Documents</h1>
                    <Link href={route('usg.admin.documents.create')}><Button><Plus className="mr-2 h-4 w-4" /> Upload Document</Button></Link>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <Input placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} />
                            <Select value={category} onValueChange={v => { setCategory(v); router.get(route('usg.admin.documents.index'), { ...filters, category: v }, { preserveState: true }); }}>
                                <SelectTrigger className="w-40"><SelectValue placeholder="All Categories" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Categories</SelectItem>
                                    {categories?.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={handleFilter}><Search className="mr-2 h-4 w-4" /> Search</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Downloads</TableHead>
                                    <TableHead>Uploaded By</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documents?.data?.map(d => (
                                    <TableRow key={d.id}>
                                        <TableCell className="font-medium">{d.title}</TableCell>
                                        <TableCell><Badge variant="secondary">{d.category}</Badge></TableCell>
                                        <TableCell>{formatSize(d.file_size)}</TableCell>
                                        <TableCell>{d.downloads}</TableCell>
                                        <TableCell>{d.uploader?.name ?? '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('usg.admin.documents.show', d.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('usg.admin.documents.edit', d.id)}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(d.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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