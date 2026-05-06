import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Link, router, usePage } from '@inertiajs/react';
import {
    GraduationCap,
    Download,
    Upload,
    Users,
    CheckCircle,
    XCircle,
    TrendingUp,
} from 'lucide-react';

interface Grade {
    id: number;
    grade: number | null;
    status: string;
    subject: {
        id: number;
        code: string;
        name: string;
        units: number;
    };
}

interface Enrollment {
    id: number;
    full_name: string;
    student_id: string | null;
    section: {
        name: string;
        course?: { name: string };
    } | null;
    academic_year: string;
    semester: string;
    status: string;
    gpa: number | null;
    subjects: Grade[];
}

interface Section {
    id: number;
    name: string;
    course?: { name: string };
}

export default function GradesIndex() {
    const { enrollments, academicYears, sections, stats, filters } = usePage<{
        enrollments: { data: Enrollment[]; links: any[] };
        academicYears: string[];
        sections: Section[];
        stats: {
            total_students: number;
            total_grades: number;
            passed: number;
            failed: number;
            pass_rate: number;
        };
        filters: Record<string, string>;
    }>().props;

    const handleFilter = (key: string, value: string) => {
        router.get(route('admission.admin.grades.index'), {
            ...filters,
            [key]: value || undefined,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Grade Management
                    </h1>
                    <p className="text-muted-foreground">
                        Enter and manage student grades
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        asChild
                    >
                        <a href={route('admission.admin.grades.export', filters)}>
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </a>
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-end gap-4">
                        <div className="flex-1 min-w-[150px]">
                            <label className="text-sm font-medium mb-1 block">
                                Academic Year
                            </label>
                            <Select
                                value={filters.academic_year || ''}
                                onValueChange={(v) =>
                                    handleFilter('academic_year', v)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Years" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Years</SelectItem>
                                    {academicYears.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="text-sm font-medium mb-1 block">
                                Section
                            </label>
                            <Select
                                value={filters.section_id || ''}
                                onValueChange={(v) =>
                                    handleFilter('section_id', v)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Sections" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Sections</SelectItem>
                                    {sections.map((section) => (
                                        <SelectItem
                                            key={section.id}
                                            value={String(section.id)}
                                        >
                                            {section.name} ({section.course?.name})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="text-sm font-medium mb-1 block">
                                Search Student
                            </label>
                            <Input
                                placeholder="Student name..."
                                value={filters.search || ''}
                                onChange={(e) =>
                                    handleFilter('search', e.target.value)
                                }
                            />
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() =>
                                router.get(route('admission.admin.grades.index'))
                            }
                        >
                            Clear
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Users className="h-8 w-8 text-blue-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Students
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.total_students}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-8 w-8 text-purple-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Grades Posted
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.total_grades}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Passed
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.passed}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <XCircle className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Failed
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {stats.failed}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-8 w-8 text-orange-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Pass Rate
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {stats.pass_rate}%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Students List */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                                    Student
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                                    Section
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase">
                                    Subjects
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase">
                                    Avg Grade
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase">
                                    GPA
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {enrollments.data.map((enrollment) => {
                                const grades = enrollment.subjects.filter(
                                    (s) => s.grade !== null
                                );
                                const avg =
                                    grades.length > 0
                                        ? grades.reduce(
                                              (sum, s) => sum + (s.grade || 0),
                                              0
                                          ) / grades.length
                                        : null;

                                return (
                                    <tr
                                        key={enrollment.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <td className="px-4 py-3">
                                            <p className="font-medium">
                                                {enrollment.full_name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {enrollment.student_id ||
                                                    'No ID'}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-sm">
                                                {enrollment.section?.name ||
                                                    'TBA'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {enrollment.academic_year} /{' '}
                                                {enrollment.semester}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm">
                                            {enrollment.subjects.length}{' '}
                                            subjects
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {avg !== null ? (
                                                <span
                                                    className={`text-lg font-bold ${
                                                        avg >= 75
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                    }`}
                                                >
                                                    {avg.toFixed(1)}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    N/A
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {enrollment.gpa ? (
                                                <span className="font-medium">
                                                    {enrollment.gpa.toFixed(2)}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link
                                                    href={route(
                                                        'admission.admin.grades.section',
                                                        enrollment.section?.id
                                                    )}
                                                >
                                                    Enter Grades
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {enrollments.links && (
                    <div className="border-t p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {enrollments.data.length} results
                            </p>
                            <div className="flex gap-1">
                                {enrollments.links.map(
                                    (link: any, index: number) => (
                                        <Button
                                            key={index}
                                            variant={
                                                link.active ? 'default' : 'ghost'
                                            }
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.get(link.url);
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}