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
import { Plus, Pencil, Eye, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface EventData {
    id: number; title: string; slug: string; event_date: string; location: string;
    category: string; status: string;
}

interface Props extends PageProps {
    events: { data: EventData[]; links: any[] };
    categories: string[];
    filters: any;
}

export default function EventIndex({ events, categories, filters }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const handleDelete = (id: number) => {
        if (confirm('Delete this event?')) router.delete(route('usg.admin.events.destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Events" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Events</h1>
                    <Link href={route('usg.admin.events.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Event</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && router.get(route('usg.admin.events.index'), { search }, { preserveState: true })} />
                            <Button variant="outline" onClick={() => router.get(route('usg.admin.events.index'), { search }, { preserveState: true })}><Search className="mr-2 h-4 w-4" /> Search</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events?.data?.map(e => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-medium">{e.title}</TableCell>
                                        <TableCell>{new Date(e.event_date).toLocaleDateString()}</TableCell>
                                        <TableCell>{e.location}</TableCell>
                                        <TableCell><Badge variant="secondary">{e.category}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('usg.admin.events.show', e.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('usg.admin.events.edit', e.id)}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(e.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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