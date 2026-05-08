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
import { Plus, Eye, Edit, Search } from 'lucide-react';

interface AcademicTerm {
    id: number;
    academic_year: string;
    semester: string;
    status: string;
    is_active: boolean;
    enrollment_start: string;
    enrollment_end: string;
    classes_start: string | null;
    classes_end: string | null;
}

interface Props extends PageProps {
    terms: { data: AcademicTerm[]; links: any[] };
    filters: { search?: string; status?: string };
}

export default function AcademicTermIndex({ terms, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get(route('admission.admin.terms.index'), {
            ...filters,
            [key]: value || undefined,
        }, { preserveState: true, preserveScroll: true });
    };

    const statusColors: Record<string, string> = {
        upcoming: 'secondary',
        enrollment: 'default',
        ongoing: 'default',
        ended: 'secondary',
    };

    return (
        <>
            <Head title="Academic Terms" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Academic Terms</h1>
                        <p className="text-muted-foreground">Manage academic years and semesters</p>
                    </div>
                    <Link href={route('admission.admin.terms.create')} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        New Term
                    </Link>
                </div>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap gap-3">
                            <div className="relative flex-1 min-w-[200px]">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search academic year..."
                                    className="pl-9"
                                    defaultValue={filters.search ?? ''}
                                    onChange={(e) => handleFilter('search', e.target.value)}
                                />
                            </div>
                            <Select
                                value={filters.status ?? ''}
                                onValueChange={(v: string | null) => handleFilter('status', v ?? '')}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Statuses</SelectItem>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="enrollment">Enrollment</SelectItem>
                                    <SelectItem value="ongoing">Ongoing</SelectItem>
                                    <SelectItem value="ended">Ended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">All Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Academic Year</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Active</TableHead>
                                    <TableHead>Enrollment Period</TableHead>
                                    <TableHead>Classes</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {terms.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                                            No academic terms found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    terms.data.map((term) => (
                                        <TableRow key={term.id}>
                                            <TableCell className="font-medium">{term.academic_year}</TableCell>
                                            <TableCell>{term.semester}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={(statusColors[term.status] || 'secondary') as 'default' | 'secondary'}>
                                                    {term.status.charAt(0).toUpperCase() + term.status.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {term.is_active ? <Badge variant="secondary">Active</Badge> : '-'}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {term.enrollment_start ? new Date(term.enrollment_start).toLocaleDateString() : '-'}
                                                {' → '}
                                                {term.enrollment_end ? new Date(term.enrollment_end).toLocaleDateString() : '-'}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {term.classes_start ? new Date(term.classes_start).toLocaleDateString() : '-'}
                                                {term.classes_end ? ` → ${new Date(term.classes_end).toLocaleDateString()}` : ''}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Link href={route('admission.admin.terms.show', term.id)} className="p-2 hover:bg-accent rounded-md">
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <Link href={route('admission.admin.terms.edit', term.id)} className="p-2 hover:bg-accent rounded-md">
                                                        <Edit className="h-4 w-4" />
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

                {terms.links && terms.links.length > 3 && (
                    <div className="flex justify-center gap-1">
                        {terms.links.map((link: any, i: number) => (
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

AcademicTermIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;