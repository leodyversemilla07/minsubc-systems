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
import { ClipboardList, Eye, Search } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {
    auditLogs: { data: any[]; links: any[] };
    filters: { search?: string; action?: string; user_id?: string; model_type?: string };
    actions: string[];
    users: { id: number; name: string; email: string }[];
}

export default function AuditLogs({ auditLogs, filters, actions, users }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');

    return (
        <AppLayout>
            <Head title="Audit Logs" />
            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-2xl font-bold flex items-center gap-2"><ClipboardList className="h-6 w-6" /> Audit Logs</h1>

                <Card>
                    <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
                            <Select value={filters?.action ?? ''} onValueChange={v => router.get(route('registrar.admin.audit-logs'), { ...filters, action: v }, { preserveState: true })}>
                                <SelectTrigger className="w-36"><SelectValue placeholder="Action" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Actions</SelectItem>
                                    {actions?.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select value={filters?.user_id ?? ''} onValueChange={v => router.get(route('registrar.admin.audit-logs'), { ...filters, user_id: v }, { preserveState: true })}>
                                <SelectTrigger className="w-40"><SelectValue placeholder="User" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Users</SelectItem>
                                    {users?.map(u => <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon" onClick={() => router.get(route('registrar.admin.audit-logs'), { search }, { preserveState: true })}><Search className="h-4 w-4" /></Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {auditLogs?.data?.map((log: any) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="text-sm">{log.created_at}</TableCell>
                                        <TableCell>{log.user?.name ?? 'System'}</TableCell>
                                        <TableCell><Badge variant="outline">{log.action}</Badge></TableCell>
                                        <TableCell className="text-sm">{log.model_type?.split('\\').pop()}</TableCell>
                                        <TableCell className="text-sm truncate max-w-[200px]">{log.description ?? '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('registrar.admin.audit-logs.show', log.id)}>
                                                <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                            </Link>
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