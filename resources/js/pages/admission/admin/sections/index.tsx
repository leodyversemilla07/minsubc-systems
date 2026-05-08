import { Head, Link, router } from '@inertiajs/react';
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
import { Plus, Eye, Edit, Search, Users } from 'lucide-react';

interface Section {
    id: number;
    name: string;
    year_level: number;
    status: string;
    max_students: number | null;
    current_students?: number;
    room: string | null;
    course: { id: number; code: string; name: string };
    academic_term: { id: number; academic_year: string; semester: string };
    adviser: { id: number; name: string } | null;
}

interface Course {
    id: number;
    code: string;
    name: string;
}

interface Term {
    id: number;
    academic_year: string;
    semester: string;
}

interface Props extends PageProps {
    sections: { data: Section[]; links: any[] };
    terms: Term[];
    courses: Course[];
    stats: {
        total_sections: number;
        total_students: number;
        open_sections: number;
        full_sections: number;
    };
    filters: { term_id?: string; course_id?: string; year_level?: string; status?: string; search?: string };
}

export default function SectionIndex({ sections, terms, courses, stats, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get(route('admission.admin.sections.index'), {
            ...filters,
            [key]: value || undefined,
        }, { preserveState: true, preserveScroll: true });
    };

    return (
        <>
            <Head title="Sections" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Sections</h1>
                        <p className="text-muted-foreground">Manage class sections and advisory assignments</p>
                    </div>
                    <Link href={route('admission.admin.sections.create')} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        New Section
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Sections</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold">{stats.total_sections}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Students</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold">{stats.total_students}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Open</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold text-green-600">{stats.open_sections}</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Full</CardTitle></CardHeader>
                        <CardContent><p className="text-2xl font-bold text-orange-600">{stats.full_sections}</p></CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-3">
                            <div className="relative flex-1 min-w-[200px]">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search section name..."
                                    className="pl-9"
                                    defaultValue={filters.search ?? ''}
                                    onChange={(e) => handleFilter('search', e.target.value)}
                                />
                            </div>
                            <Select value={filters.term_id ?? ''} onValueChange={(v: string | null) => handleFilter('term_id', v ?? '')}>
                                <SelectTrigger className="w-[200px]"><SelectValue placeholder="All Terms" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Terms</SelectItem>
                                    {terms.map((t) => (
                                        <SelectItem key={t.id} value={String(t.id)}>{t.academic_year} — {t.semester}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={filters.course_id ?? ''} onValueChange={(v: string | null) => handleFilter('course_id', v ?? '')}>
                                <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Courses" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Courses</SelectItem>
                                    {courses.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>{c.code}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={filters.year_level ?? ''} onValueChange={(v: string | null) => handleFilter('year_level', v ?? '')}>
                                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Year" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Years</SelectItem>
                                    {[1, 2, 3, 4].map((y) => (<SelectItem key={y} value={String(y)}>Year {y}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            <Select value={filters.status ?? ''} onValueChange={(v: string | null) => handleFilter('status', v ?? '')}>
                                <SelectTrigger className="w=[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                    <SelectItem value="full">Full</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader><CardTitle>All Sections</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Term</TableHead>
                                    <TableHead className="text-center">Year</TableHead>
                                    <TableHead className="text-center">Students</TableHead>
                                    <TableHead>Room</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead>Adviser</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sections.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">No sections found</TableCell>
                                    </TableRow>
                                ) : (
                                    sections.data.map((section) => (
                                        <TableRow key={section.id}>
                                            <TableCell className="font-medium">{section.name}</TableCell>
                                            <TableCell className="text-sm">{section.course?.code ?? '-'}</TableCell>
                                            <TableCell className="text-sm">{section.academic_term?.academic_year ?? '-'}</TableCell>
                                            <TableCell className="text-center">{section.year_level}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Users className="h-3 w-3 text-muted-foreground" />
                                                    <span>{section.current_students ?? 0}{section.max_students ? `/${section.max_students}` : ''}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">{section.room ?? '-'}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={section.status === 'open' ? 'default' : 'secondary'}>{section.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm">{section.adviser?.name ?? '-'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Link href={route('admission.admin.sections.show', section.id)} className="p-2 hover:bg-accent rounded-md"><Eye className="h-4 w-4" /></Link>
                                                    <Link href={route('admission.admin.sections.edit', section.id)} className="p-2 hover:bg-accent rounded-md"><Edit className="h-4 w-4" /></Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {sections.links && sections.links.length > 3 && (
                    <div className="flex justify-center gap-1">
                        {sections.links.map((link: any, i: number) => (
                            <Link key={i} href={link.url || '#'}
                                className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'border border-input bg-background hover:bg-accent'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

SectionIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;