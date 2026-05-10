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
import { Plus, Eye, Pencil, Search, GraduationCap, Users } from 'lucide-react';
import { useState } from 'react';

interface StudentData {
    id: number; student_id: string; first_name: string; last_name: string;
    course: string; year_level: number; campus: string; status: string;
    user: { name: string; email: string } | null;
}

interface Props extends PageProps {
    students: { data: StudentData[]; links: any[] };
    filters: { course?: string; year_level?: string; campus?: string; status?: string };
}

export default function StudentIndex({ students, filters }: Props) {
    const [search, setSearch] = useState('');

    const handleFilter = (key: string, value: string) => {
        router.get(route('registrar.students.index'), { ...filters, [key]: value }, { preserveState: true });
    };

    const statusColor = (s: string) => s === 'active' ? 'secondary' as const : s === 'graduated' ? 'default' as const : 'destructive' as const;

    return (
        <AppLayout>
            <Head title="Students" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2"><GraduationCap className="h-6 w-6" /> Students</h1>
                    <Link href={route('registrar.students.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Student</Button></Link>
                </div>

                <Card>
                    <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Input placeholder="Search name or ID..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFilter('search', search)} className="max-w-xs" />
                            <Select value={filters?.status ?? ''} onValueChange={v => handleFilter('status', v)}>
                                <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="graduated">Graduated</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filters?.campus ?? ''} onValueChange={v => handleFilter('campus', v)}>
                                <SelectTrigger className="w-32"><SelectValue placeholder="Campus" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="Main">Main</SelectItem>
                                    <SelectItem value="BC">BC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Campus</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students?.data?.map(s => (
                                    <TableRow key={s.id}>
                                        <TableCell className="font-mono text-sm">{s.student_id}</TableCell>
                                        <TableCell className="font-medium">{s.last_name}, {s.first_name}</TableCell>
                                        <TableCell>{s.course}</TableCell>
                                        <TableCell>{s.year_level}</TableCell>
                                        <TableCell>{s.campus}</TableCell>
                                        <TableCell><Badge variant={statusColor(s.status)}>{s.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Link href={route('registrar.students.show', s.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('registrar.students.edit', s.id)}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
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