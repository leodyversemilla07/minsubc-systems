import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Plus, Pencil, Search, Eye, ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface AnnouncementData {
    id: number;
    title: string;
    slug: string;
    category: string;
    status: string;
    publish_date: string;
    created_at: string;
}

interface Props extends PageProps {
    announcements: { data: AnnouncementData[]; links: any[] };
    categories: string[];
    filters: { search?: string; category?: string; status?: string };
}

export default function AnnouncementIndex({ announcements, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [category, setCategory] = useState(filters.category ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const handleFilter = () => {
        router.get(route('usg.admin.announcements.index'), { search, category, status }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this announcement?')) {
            router.delete(route('usg.admin.announcements.destroy', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Announcements" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Announcements</h1>
                    <Link href={route('usg.admin.announcements.create')}>
                        <Button><Plus className="mr-2 h-4 w-4" /> New Announcement</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1">
                                <Input placeholder="Search announcements..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} />
                            </div>
                            <Select value={category} onValueChange={v => { setCategory(v); router.get(route('usg.admin.announcements.index'), { ...filters, category: v }, { preserveState: true }); }}>
                                <SelectTrigger className="w-40"><SelectValue placeholder="All Categories" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Categories</SelectItem>
                                    {categories?.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select value={status} onValueChange={v => { setStatus(v); router.get(route('usg.admin.announcements.index'), { ...filters, status: v }, { preserveState: true }); }}>
                                <SelectTrigger className="w-40"><SelectValue placeholder="All Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Status</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
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
                                    <TableHead>Status</TableHead>
                                    <TableHead>Publish Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {announcements?.data?.map((a) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-medium">{a.title}</TableCell>
                                        <TableCell><Badge variant="secondary">{a.category}</Badge></TableCell>
                                        <TableCell><Badge variant={a.status === 'published' ? 'secondary' : 'outline'}>{a.status}</Badge></TableCell>
                                        <TableCell>{a.publish_date ? new Date(a.publish_date).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('usg.admin.announcements.show', a.id)}>
                                                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                                </Link>
                                                <Link href={route('usg.admin.announcements.edit', a.id)}>
                                                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!announcements?.data || announcements.data.length === 0) && (
                                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No announcements found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}