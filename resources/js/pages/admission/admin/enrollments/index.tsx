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
import { Plus, Eye, Search, Users } from 'lucide-react';

interface Enrollment {
    id: number;
    student_id: string | null;
    academic_year: string;
    semester: string;
    year_level: string;
    status: string;
    created_at: string;
    applicant: { application_number: string; first_name: string; last_name: string } | null;
    user: { id: number; name: string } | null;
    section: { id: number; name: string; course: { code: string } } | null;
    academic_term: { id: number; academic_year: string; semester: string } | null;
}

interface Term { id: number; academic_year: string; semester: string }
interface Props extends PageProps {
    enrollments: { data: Enrollment[]; links: any[] };
    terms: Term[];
    academicYears: string[];
    statuses: string[];
    stats: { total: number; pending: number; confirmed: number; enrolled: number };
    filters: { term_id?: string; academic_year?: string; semester?: string; status?: string; year_level?: string; search?: string };
}

export default function EnrollmentIndex({ enrollments, terms, academicYears, statuses, stats, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get(route('admission.admin.enrollments.index'), { ...filters, [key]: value || undefined }, { preserveState: true, preserveScroll: true });
    };

    return (
        <>
            <Head title="Enrollments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div><h1 className="text-2xl font-bold tracking-tight">Enrollments</h1><p className="text-muted-foreground">Manage student enrollments</p></div>
                    <Link href={route('admission.admin.enrollments.create')} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" /> New Enrollment</Link>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{stats.total}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pending</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-yellow-600">{stats.pending}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Confirmed</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p></CardContent></Card>
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Enrolled</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-600">{stats.enrolled}</p></CardContent></Card>
                </div>

                <Card>
                    <CardContent className="p-4 flex flex-wrap gap-3">
                        <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search name, ID, app no..." className="pl-9" defaultValue={filters.search ?? ''} onChange={(e) => handleFilter('search', e.target.value)} /></div>
                        <Select value={filters.term_id ?? ''} onValueChange={(v: string | null) => handleFilter('term_id', v ?? '')}>
                            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Term" /></SelectTrigger>
                            <SelectContent><SelectItem value="">All</SelectItem>{terms.map((t) => (<SelectItem key={t.id} value={String(t.id)}>{t.academic_year} — {t.semester}</SelectItem>))}</SelectContent>
                        </Select>
                        <Select value={filters.status ?? ''} onValueChange={(v: string | null) => handleFilter('status', v ?? '')}>
                            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
                            <SelectContent><SelectItem value="">All</SelectItem>{statuses.map((s) => (<SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>))}</SelectContent>
                        </Select>
                        <Select value={filters.academic_year ?? ''} onValueChange={(v: string | null) => handleFilter('academic_year', v ?? '')}>
                            <SelectTrigger className="w-[130px]"><SelectValue placeholder="Year" /></SelectTrigger>
                            <SelectContent><SelectItem value="">All</SelectItem>{academicYears.map((y) => (<SelectItem key={y} value={y}>{y}</SelectItem>))}</SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <Card><CardHeader><CardTitle>All Enrollments</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Course / Section</TableHead>
                                    <TableHead>Term</TableHead>
                                    <TableHead className="text-center">Year</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {enrollments.data.length === 0 ? (
                                    <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No enrollments found</TableCell></TableRow>
                                ) : enrollments.data.map((e) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="font-medium">{e.applicant ? `${e.applicant.first_name} ${e.applicant.last_name}` : e.user?.name ?? '-'}</TableCell>
                                        <TableCell className="font-mono text-sm">{e.student_id ?? '-'}</TableCell>
                                        <TableCell className="text-sm">{e.section?.course?.code ?? '-'} — {e.section?.name ?? 'N/A'}</TableCell>
                                        <TableCell className="text-sm">{e.academic_term?.academic_year ?? e.academic_year}</TableCell>
                                        <TableCell className="text-center">{e.year_level}</TableCell>
                                        <TableCell className="text-center"><Badge variant={e.status === 'enrolled' ? 'default' : e.status === 'confirmed' ? 'default' : 'secondary'}>{e.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Link href={route('admission.admin.enrollments.show', e.id)} className="inline-flex items-center justify-center p-2 hover:bg-accent rounded-md"><Eye className="h-4 w-4" /></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {enrollments.links && enrollments.links.length > 3 && (
                    <div className="flex justify-center gap-1">
                        {enrollments.links.map((link: any, i: number) => (
                            <Link key={i} href={link.url || '#'} className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'border border-input bg-background hover:bg-accent'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

EnrollmentIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;