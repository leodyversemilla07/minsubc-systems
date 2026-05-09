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

interface ReportData {
    id: number; title: string; slug: string; type: string; status: string; year: number;
    period_start: string; period_end: string; downloads: number; created_at: string;
}

interface Props extends PageProps {
    reports: { data: ReportData[] };
    types: string[];
    years: number[];
    statistics: any;
    filters: { search?: string; type?: string; status?: string; year?: string };
}

export default function TransparencyIndex({ reports, types, years, statistics, filters }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [type, setType] = useState(filters?.type ?? '');
    const [status, setStatus] = useState(filters?.status ?? '');

    const handleFilter = () => router.get(route('usg.admin.transparency.index'), { search, type, status }, { preserveState: true });
    const handleDelete = (id: number) => { if (confirm('Delete this report?')) router.delete(route('usg.admin.transparency.destroy', id)); };

    return (
        <AppLayout>
            <Head title="Transparency Reports" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Transparency Reports</h1>
                    <Link href={route('usg.admin.transparency.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Report</Button></Link>
                </div>
                {statistics && (
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total</p><p className="text-2xl font-bold">{statistics.total ?? 0}</p></CardContent></Card>
                        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Published</p><p className="text-2xl font-bold">{statistics.published ?? 0}</p></CardContent></Card>
                        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Views</p><p className="text-2xl font-bold">{statistics.total_views ?? 0}</p></CardContent></Card>
                        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Downloads</p><p className="text-2xl font-bold">{statistics.total_downloads ?? 0}</p></CardContent></Card>
                    </div>
                )}
                <Card>
                    <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Input placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter()} className="flex-1" />
                            <Select value={type} onValueChange={v => { setType(v); router.get(route('usg.admin.transparency.index'), { ...filters, type: v }, { preserveState: true }); }}>
                                <SelectTrigger className="w-40"><SelectValue placeholder="All Types" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Types</SelectItem>
                                    {types?.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select value={status} onValueChange={v => { setStatus(v); router.get(route('usg.admin.transparency.index'), { ...filters, status: v }, { preserveState: true }); }}>
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
                                    <TableHead>Type</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Downloads</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports?.data?.map(r => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.title}</TableCell>
                                        <TableCell><Badge variant="secondary">{r.type}</Badge></TableCell>
                                        <TableCell>{r.year}</TableCell>
                                        <TableCell><Badge variant={r.status === 'published' ? 'secondary' : 'outline'}>{r.status}</Badge></TableCell>
                                        <TableCell className="text-sm">{r.period_start ? new Date(r.period_start).toLocaleDateString() : '-'} - {r.period_end ? new Date(r.period_end).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell>{r.downloads}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('usg.admin.transparency.show', r.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('usg.admin.transparency.edit', r.id)}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
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