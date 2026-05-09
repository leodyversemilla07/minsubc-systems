import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    Download,
    Printer,
    Save,
    Upload,
    Search,
} from 'lucide-react';
import { useState } from 'react';

interface Subject {
    id: number;
    code: string;
    name: string;
    units: number;
}

interface EnrollmentGrade {
    id: number;
    full_name: string;
    student_id: string | null;
    status: string;
    gpa: number | null;
    subjects: Array<{
        id: number;
        subject_id: number;
        grade: number | null;
        status: string;
        remarks: string | null;
        subject: Subject;
    }>;
}

interface SectionInfo {
    id: number;
    name: string;
    academic_year: string;
    semester: string;
    course: { name: string } | null;
}

interface SectionGradesPageProps extends PageProps {
    section: SectionInfo;
    enrollments: EnrollmentGrade[];
    subjects: Subject[];
}

export default function SectionGrades({ section, enrollments, subjects }: SectionGradesPageProps) {
    const [search, setSearch] = useState('');
    const [gradeValues, setGradeValues] = useState<Record<string, Record<string, string>>>({});
    const [remarks, setRemarks] = useState<Record<string, Record<string, string>>>({});
    const [submitting, setSubmitting] = useState<number | null>(null);

    const filteredEnrollments = enrollments.filter((e) =>
        !search || e.full_name.toLowerCase().includes(search.toLowerCase())
    );

    const handleGradeChange = (enrollmentId: number, subjectId: number, value: string) => {
        setGradeValues((prev) => ({
            ...prev,
            [enrollmentId]: { ...(prev[enrollmentId] || {}), [subjectId]: value },
        }));
    };

    const handleRemarksChange = (enrollmentId: number, subjectId: number, value: string) => {
        setRemarks((prev) => ({
            ...prev,
            [enrollmentId]: { ...(prev[enrollmentId] || {}), [subjectId]: value },
        }));
    };

    const submitGrades = (enrollmentId: number) => {
        setSubmitting(enrollmentId);
        const grades = subjects.map((subject) => ({
            subject_id: subject.id,
            grade: gradeValues[enrollmentId]?.[subject.id]
                ? parseFloat(gradeValues[enrollmentId][subject.id])
                : null,
            remarks: remarks[enrollmentId]?.[subject.id] || null,
        }));

        router.post(
            route('admission.admin.grades.submit', enrollmentId),
            { grades },
            {
                preserveScroll: true,
                onFinish: () => setSubmitting(null),
            }
        );
    };

    return (
        <>
            <Head title={`Grades — ${section.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <Link
                            href={route('admission.admin.grades.index')}
                            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Grades
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight">Enter Grades — {section.name}</h1>
                        <p className="text-muted-foreground">
                            {section.course?.name || 'N/A'} | {section.academic_year} / {section.semester}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <a
                            href={route('admission.admin.grades.sheet', section.id)}
                            target="_blank"
                            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
                        >
                            <Printer className="mr-2 h-4 w-4" />
                            Print Sheet
                        </a>
                        <a
                            href={route('admission.admin.grades.export', { section_id: section.id })}
                            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </a>
                    </div>
                </div>

                {/* Subjects Info */}
                <div className="grid gap-4 md:grid-cols-4">
                    {subjects.map((subject) => (
                        <Card key={subject.id}>
                            <CardContent className="p-3">
                                <p className="text-xs font-medium text-muted-foreground">{subject.code}</p>
                                <p className="text-sm font-medium">{subject.name}</p>
                                <p className="text-xs text-muted-foreground">{subject.units} units</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Search */}
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search students..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grade Entry Forms */}
                {filteredEnrollments.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-muted-foreground">No students found.</p>
                        </CardContent>
                    </Card>
                )}

                {filteredEnrollments.map((enrollment) => (
                    <Card key={enrollment.id}>
                        <div className="border-b bg-muted/50 px-4 py-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">{enrollment.full_name}</h3>
                                    <p className="text-xs text-muted-foreground">Student ID: {enrollment.student_id || 'N/A'}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Current GPA</p>
                                        <p className="text-lg font-bold">{enrollment.gpa?.toFixed(2) ?? '0.00'}</p>
                                    </div>
                                    <Badge variant={enrollment.status === 'enrolled' ? 'default' : 'secondary'}>
                                        {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/30">
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Subject</th>
                                        <th className="w-20 px-3 py-2 text-center text-xs font-medium uppercase text-muted-foreground">Units</th>
                                        <th className="w-28 px-3 py-2 text-center text-xs font-medium uppercase text-muted-foreground">Grade</th>
                                        <th className="w-28 px-3 py-2 text-center text-xs font-medium uppercase text-muted-foreground">Status</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-muted-foreground">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {subjects.map((subject) => {
                                        const es = enrollment.subjects.find((s) => s.subject_id === subject.id);
                                        const currentGrade = gradeValues[enrollment.id]?.[subject.id] ?? es?.grade?.toString() ?? '';
                                        const numGrade = parseFloat(currentGrade);
                                        const hasGrade = currentGrade !== '' && !isNaN(numGrade);

                                        return (
                                            <tr key={subject.id}>
                                                <td className="px-3 py-2">
                                                    <p className="text-sm font-medium">{subject.code}</p>
                                                    <p className="text-xs text-muted-foreground">{subject.name}</p>
                                                </td>
                                                <td className="px-3 py-2 text-center text-sm">{subject.units}</td>
                                                <td className="px-3 py-2">
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        step={0.01}
                                                        placeholder="—"
                                                        value={currentGrade}
                                                        onChange={(e) => handleGradeChange(enrollment.id, subject.id, e.target.value)}
                                                        className={`h-8 w-24 text-center ${
                                                            hasGrade && numGrade >= 75
                                                                ? 'bg-green-50 dark:bg-green-950/30'
                                                                : hasGrade
                                                                ? 'bg-red-50 dark:bg-red-950/30'
                                                                : ''
                                                        }`}
                                                    />
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        !hasGrade
                                                            ? 'bg-muted text-muted-foreground'
                                                            : numGrade >= 75
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                                    }`}>
                                                        {!hasGrade ? 'No Grade' : numGrade >= 75 ? 'Passed' : 'Failed'}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <Input
                                                        type="text"
                                                        placeholder="Optional remarks..."
                                                        value={remarks[enrollment.id]?.[subject.id] ?? es?.remarks ?? ''}
                                                        onChange={(e) => handleRemarksChange(enrollment.id, subject.id, e.target.value)}
                                                        className="h-8 text-xs"
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-t bg-muted/30 px-4 py-3">
                            <Button
                                size="sm"
                                onClick={() => submitGrades(enrollment.id)}
                                disabled={submitting === enrollment.id}
                            >
                                {submitting === enrollment.id ? (
                                    <>Saving...</>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Grades for {enrollment.full_name}
                                    </>
                                )}
                            </Button>
                        </div>
                    </Card>
                ))}

                {/* Bulk Upload */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-medium">Bulk Upload Grades</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const formData = new FormData(form);
                                router.post(route('admission.admin.grades.bulk-upload'), formData, {
                                    preserveScroll: true,
                                });
                            }}
                            className="flex items-end gap-4"
                        >
                            <input type="hidden" name="section_id" value={section.id} />
                            <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium text-muted-foreground">CSV File</label>
                                <Input type="file" name="csv_file" accept=".csv,.txt" required />
                            </div>
                            <Button type="submit" variant="secondary">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload CSV
                            </Button>
                        </form>
                        <p className="mt-2 text-xs text-muted-foreground">
                            CSV Format: student_id, subject_code, grade, remarks
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SectionGrades.layout = (page: React.ReactNode) => <AppLayout children={page} />;