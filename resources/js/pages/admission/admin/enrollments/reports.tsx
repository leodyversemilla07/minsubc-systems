import { Head, Link, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface ReportData {
    total_enrollments: number;
    by_status: Record<string, number>;
    by_year_level: Record<string, number>;
    by_course: Record<string, number>;
    by_section: Array<{ section_name: string; count: number; course_code: string }>;
    enrollment_trend: Array<{ academic_year: string; semester: string; count: number }>;
}

interface Term { id: number; academic_year: string; semester: string }

interface Props extends PageProps {
    reports: ReportData;
    terms: Term[];
    academicYears: string[];
    filters: { term_id?: string; academic_year?: string };
}

export default function EnrollmentReports({ reports, terms, academicYears, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        router.get(route('admission.admin.enrollments.reports'), { ...filters, [key]: value || undefined }, { preserveState: true });
    };

    const statusColors: Record<string, string> = { pending: 'bg-yellow-500', confirmed: 'bg-blue-500', enrolled: 'bg-green-500', dropped: 'bg-red-500', cancelled: 'bg-gray-500' };

    const chartData = reports.enrollment_trend?.length
        ? reports.enrollment_trend
        : [];

    const sectionChartData = reports.by_section?.length
        ? reports.by_section.map((s) => ({ name: `${s.course_code} - ${s.section_name}`, count: s.count }))
        : [];

    return (
        <>
            <Head title="Enrollment Reports" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('admission.admin.enrollments.index')} className="p-2 hover:bg-accent rounded-md"><ArrowLeft className="h-5 w-5" /></Link>
                        <div><h1 className="text-2xl font-bold tracking-tight">Enrollment Reports</h1><p className="text-muted-foreground">Summary and analytics</p></div>
                    </div>
                    <div className="flex gap-2">
                        <Select value={filters.term_id ?? ''} onValueChange={(v: string | null) => handleFilter('term_id', v ?? '')}>
                            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Term" /></SelectTrigger>
                            <SelectContent><SelectItem value="">All</SelectItem>{terms.map((t) => (<SelectItem key={t.id} value={String(t.id)}>{t.academic_year} — {t.semester}</SelectItem>))}</SelectContent>
                        </Select>
                        <Select value={filters.academic_year ?? ''} onValueChange={(v: string | null) => handleFilter('academic_year', v ?? '')}>
                            <SelectTrigger className="w-[130px]"><SelectValue placeholder="Year" /></SelectTrigger>
                            <SelectContent><SelectItem value="">All</SelectItem>{academicYears.map((y) => (<SelectItem key={y} value={y}>{y}</SelectItem>))}</SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Enrollments</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{reports.total_enrollments}</p></CardContent></Card>
                    {Object.entries(reports.by_status ?? {}).map(([status, count]) => (
                        <Card key={status}>
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground capitalize">{status}</CardTitle></CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-block w-3 h-3 rounded-full ${statusColors[status] ?? 'bg-gray-500'}`} />
                                    <p className="text-2xl font-bold">{count}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {chartData.length > 0 && (
                        <Card><CardHeader><CardTitle>Enrollment Trend</CardTitle></CardHeader>
                            <CardContent className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="academic_year" /><YAxis /><Tooltip /><Bar dataKey="count" fill="hsl(var(--primary))" /></BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    )}
                    {sectionChartData.length > 0 && (
                        <Card><CardHeader><CardTitle>By Section</CardTitle></CardHeader>
                            <CardContent className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={sectionChartData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={120} /><Tooltip /><Bar dataKey="count" fill="hsl(var(--primary))" /></BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {reports.by_year_level && Object.keys(reports.by_year_level).length > 0 && (
                        <Card><CardHeader><CardTitle>By Year Level</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(reports.by_year_level).map(([year, count]) => (
                                        <div key={year} className="flex items-center justify-between">
                                            <span className="text-sm">Year {year}</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-2 bg-primary rounded-full" style={{ width: `${(count / reports.total_enrollments) * 200}px` }} />
                                                <span className="text-sm font-medium w-8 text-right">{count}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    {reports.by_course && Object.keys(reports.by_course).length > 0 && (
                        <Card><CardHeader><CardTitle>By Course</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(reports.by_course).map(([code, count]) => (
                                        <div key={code} className="flex items-center justify-between border-b pb-2 last:border-0">
                                            <span className="font-medium text-sm">{code}</span>
                                            <Badge variant="secondary">{count}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}

EnrollmentReports.layout = (page: React.ReactNode) => <AppLayout children={page} />;