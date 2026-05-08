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
import { Plus, Pencil, Search, Eye, ArrowLeft } from 'lucide-react';

interface Subject {
    id: number;
    code: string;
    name: string;
    units: number;
    semester: string;
    year_level: number;
    type: string;
    is_active: boolean;
    course: { id: number; code: string; name: string };
}

interface Course {
    id: number;
    code: string;
    name: string;
}

interface Props extends PageProps {
    subjects: { data: Subject[]; links: any[] };
    courses: Course[];
    filters: { course_id?: string; year_level?: string; semester?: string; search?: string };
}

export default function SubjectIndex({ subjects, courses, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get(route('admission.admin.subjects.index'), {
            ...filters,
            [key]: value || undefined,
        }, { preserveState: true, preserveScroll: true });
    };

    return (
        <>
            <Head title="Subjects" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
                        <p className="text-muted-foreground">Manage course subjects and curriculum</p>
                    </div>
                    <Link href={route('admission.admin.subjects.create')} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" />
                            New Subject
                        </Link>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-3">
                            <div className="relative flex-1 min-w-[200px]">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by code or name..."
                                    className="pl-9"
                                    defaultValue={filters.search ?? ''}
                                    onChange={(e) => handleFilter('search', e.target.value)}
                                />
                            </div>
                            <Select
                                value={filters.course_id ?? ''}
                                onValueChange={(v: string | null) => handleFilter('course_id', v ?? '')}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Courses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Courses</SelectItem>
                                    {courses.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>{c.code}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={filters.year_level ?? ''}
                                onValueChange={(v: string | null) => handleFilter('year_level', v ?? '')}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Year Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Years</SelectItem>
                                    {[1, 2, 3, 4].map((y) => (
                                        <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={filters.semester ?? ''}
                                onValueChange={(v: string | null) => handleFilter('semester', v ?? '')}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Semesters</SelectItem>
                                    <SelectItem value="1st">1st</SelectItem>
                                    <SelectItem value="2nd">2nd</SelectItem>
                                    <SelectItem value="Summer">Summer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">All Subjects</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead className="text-center">Units</TableHead>
                                    <TableHead className="text-center">Year</TableHead>
                                    <TableHead className="text-center">Semester</TableHead>
                                    <TableHead className="text-center">Type</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                                            No subjects found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    subjects.data.map((subject) => (
                                        <TableRow key={subject.id}>
                                            <TableCell className="font-mono text-sm font-medium">{subject.code}</TableCell>
                                            <TableCell>{subject.name}</TableCell>
                                            <TableCell className="text-sm">{subject.course?.code ?? '-'}</TableCell>
                                            <TableCell className="text-center">{subject.units}</TableCell>
                                            <TableCell className="text-center">{subject.year_level}</TableCell>
                                            <TableCell className="text-center">{subject.semester}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="secondary" className="uppercase text-xs">{subject.type}</Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={subject.is_active ? 'secondary' : 'secondary'}>
                                                    {subject.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Link href={route('admission.admin.subjects.show', subject.id)} className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent">
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    <Link href={route('admission.admin.subjects.edit', subject.id)} className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent">
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {subjects.links && subjects.links.length > 3 && (
                    <div className="flex justify-center gap-1">
                        {subjects.links.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'border border-input bg-background hover:bg-accent'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

SubjectIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;