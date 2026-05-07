import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    FileText,
} from 'lucide-react';

interface Subject {
    code: string;
    name: string;
    units: number;
    grade: number | null;
    points: number | null;
    status: 'passed' | 'failed' | 'incomplete' | string;
}

interface GradeRecord {
    id: number;
    academic_year: string;
    semester: string;
    section: string | null;
    gpa: number;
    average: number | null;
    subjects: Subject[];
}

interface Stats {
    passed: number;
    failed: number;
    total: number;
    average: number | null;
    academic_standing: string;
}

interface StudentGradesPageProps extends PageProps {
    gradeRecords: GradeRecord[];
    cumulativeGPA: number;
    stats: Stats;
}

export default function StudentGrades({
    gradeRecords,
    cumulativeGPA,
    stats,
}: StudentGradesPageProps) {
    return (
        <>
            <Head title="My Grades" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="mb-2">
                            <Link href={route('student.enrollment.index')} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">My Grades</h1>
                        <p className="text-muted-foreground">View your academic grades and performance</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Cumulative GPA</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{cumulativeGPA.toFixed(2)}</p>
                    </div>
                </div>

                {/* Academic Standing */}
                <Card>
                    <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Academic Standing</p>
                                <p className="text-2xl font-bold">{stats.academic_standing}</p>
                            </div>
                            <div className="flex gap-8">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-green-600">{stats.passed}</p>
                                    <p className="text-sm text-muted-foreground">Passed</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
                                    <p className="text-sm text-muted-foreground">Failed</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-muted-foreground">{stats.total}</p>
                                    <p className="text-sm text-muted-foreground">Total</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Grade Records by Semester */}
                {gradeRecords.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No Grade Records Yet</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Your academic grades will appear here once they are posted.</p>
                        </CardContent>
                    </Card>
                )}

                {gradeRecords.map((record) => (
                    <Card key={record.id}>
                        <div className="border-b bg-muted/50 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">{record.academic_year} — {record.semester} Semester</h3>
                                    <p className="text-sm text-muted-foreground">{record.section || 'N/A'}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Semester GPA</p>
                                        <p className={`text-xl font-bold ${
                                            record.gpa >= 3.0 ? 'text-green-600' :
                                            record.gpa >= 2.0 ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                            {record.gpa.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Avg Grade</p>
                                        <p className="text-xl font-bold">
                                            {record.average?.toFixed(1) ?? 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/30">
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Subject</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">Units</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">Grade</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">Points</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {record.subjects.map((subject, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4">
                                                <p className="font-medium">{subject.code}</p>
                                                <p className="text-sm text-muted-foreground">{subject.name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm">{subject.units}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-lg font-bold ${
                                                    subject.grade !== null && subject.grade >= 75
                                                        ? 'text-green-600'
                                                        : subject.grade !== null
                                                        ? 'text-red-600'
                                                        : ''
                                                }`}>
                                                    {subject.grade !== null ? subject.grade.toFixed(0) : 'INC'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm">
                                                {subject.points !== null ? subject.points.toFixed(1) : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {subject.status === 'passed' && (
                                                    <Badge variant="success">Passed</Badge>
                                                )}
                                                {subject.status === 'failed' && (
                                                    <Badge variant="destructive">Failed</Badge>
                                                )}
                                                {subject.status === 'incomplete' && (
                                                    <Badge variant="warning">Incomplete</Badge>
                                                )}
                                                {!['passed', 'failed', 'incomplete'].includes(subject.status) && (
                                                    <Badge variant="secondary">{subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}</Badge>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                ))}

                {/* Grade Scale Legend */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-medium">Grade Scale</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="mb-2 text-sm font-medium">Grading System (4.0 Scale)</h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>98-100 = 4.0 | 95-97 = 3.9 | 92-94 = 3.7 | 89-91 = 3.5</p>
                                    <p>86-88 = 3.2 | 83-85 = 3.0 | 80-82 = 2.7 | 77-79 = 2.5</p>
                                    <p>75-76 = 2.3 | Below 75 = 0.0 (Failed)</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="mb-2 text-sm font-medium">Academic Standing</h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>3.5+ = Dean's Lister | 3.0-3.49 = Honors</p>
                                    <p>2.5-2.99 = Good | 2.0-2.49 = Satisfactory</p>
                                    <p>1.5-1.99 = Warning | Below 1.5 = Academic Probation</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

StudentGrades.layout = (page: React.ReactNode) => <AppLayout children={page} />;