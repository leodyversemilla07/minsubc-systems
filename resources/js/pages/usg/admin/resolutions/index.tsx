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
import { Plus, Pencil, Eye, Search, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ResolutionData {
    id: number; title: string; resolution_number: string; category: string; status: string;
    date_passed: string; created_at: string;
}

interface Props extends PageProps {
    resolutions: { data: ResolutionData[] };
    categories: string[];
    statistics: any;
    filters: { search?: string; category?: string };
}

export default function ResolutionIndex({ resolutions, categories, statistics, filters }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [category, setCategory] = useState(filters?.category ?? '');
    const handleDelete = (id: number) => { if (confirm('Delete this resolution?')) router.delete(route('usg.admin.resolutions.destroy', id)); };

    return (
        <AppLayout>
            <Head title="Resolutions" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Resolutions</h1>
                    <Link href={route('usg.admin.resolutions.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Resolution</Button></Link>
                </div>
                {statistics && (
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total</p><p className="text-2xl font-bold">{statistics.total ?? 0}</p></CardContent></Card>
                        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Published</p><p className="text-2xl font-bold">{statistics.published ?? 0}</p></CardContent></Card>
                        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Archived</p><p className="text-2xl font-bold">{statistics.archived ?? 0}</p></CardContent></Card>
                    </div>
                )}
                <Card>
                    <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Input placeholder="Search resolutions..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && router.get(route('usg.admin.resolutions.index'), { search, category }, { preserveState: true })} />
                            <Select value={category} onValueChange={v => { setCategory(v); router.get(route('usg.admin.resolutions.index'), { search, category: v }, { preserveState: true }); }}>
                                <SelectTrigger className="w-40"><SelectValue placeholder="All Categories" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Categories</SelectItem>
                                    {categories?.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={() => router.get(route('usg.admin.resolutions.index'), { search, category }, { preserveState: true })}><Search className="mr-2 h-4 w-4" /> Search</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Resolution #</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date Passed</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {resolutions?.data?.map(r => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.resolution_number}</TableCell>
                                        <TableCell>{r.title}</TableCell>
                                        <TableCell><Badge variant="secondary">{r.category}</Badge></TableCell>
                                        <TableCell><Badge variant={r.status === 'published' ? 'secondary' : 'outline'}>{r.status}</Badge></TableCell>
                                        <TableCell>{r.date_passed ? new Date(r.date_passed).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('usg.admin.resolutions.show', r.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('usg.admin.resolutions.edit', r.id)}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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