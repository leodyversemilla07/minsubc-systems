import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    Calendar,
    CreditCard,
    Clock,
    GraduationCap,
    ArrowRight,
    Plus,
    FileText,
    TrendingUp,
    CheckCircle,
    XCircle,
} from 'lucide-react';

interface Enrollment {
    id: number;
    academic_year: string;
    semester: string;
    year_level: string;
    status: string;
    program: string;
    section_name: string;
    total_subjects: number;
    total_units: number;
    total_fees: number;
    balance: number;
    gpa: number | null;
}

interface HistoryItem {
    id: number;
    academic_year: string;
    semester: string;
    program: string;
    status: string;
    gpa: number | null;
}

interface Stats {
    average: number | null;
    passed: number;
    failed: number;
    total: number;
}

interface StudentPortalPageProps extends PageProps {
    currentEnrollment: Enrollment | null;
    enrollmentHistory: HistoryItem[];
    canReEnroll: boolean;
    stats: Stats | null;
}

export default function StudentPortalIndex({
    currentEnrollment,
    enrollmentHistory,
    canReEnroll,
    stats,
}: StudentPortalPageProps) {
    return (
        <>
            <Head title="My Enrollments" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Enrollments</h1>
                    <p className="text-muted-foreground">Manage your course enrollments and view your academic records</p>
                </div>

                {/* Current Enrollment */}
                {currentEnrollment ? (
                    <Card>
                        <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 dark:from-blue-950/30 dark:to-indigo-950/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold">Current Enrollment</h2>
                                    <p className="text-sm text-muted-foreground">{currentEnrollment.academic_year} — {currentEnrollment.semester} Semester</p>
                                </div>
                                <Badge variant={currentEnrollment.status === 'enrolled' ? 'success' : currentEnrollment.status === 'confirmed' ? 'default' : 'secondary'}>
                                    {currentEnrollment.status.charAt(0).toUpperCase() + currentEnrollment.status.slice(1)}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid gap-6 md:grid-cols-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Program</p>
                                    <p className="text-lg font-semibold">{currentEnrollment.program || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Year Level</p>
                                    <p className="text-lg font-semibold">{currentEnrollment.year_level}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Section</p>
                                    <p className="text-lg font-semibold">{currentEnrollment.section_name}</p>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-4">
                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                                    <p className="text-sm text-blue-600 dark:text-blue-400">Total Subjects</p>
                                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{currentEnrollment.total_subjects}</p>
                                </div>
                                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
                                    <p className="text-sm text-green-600 dark:text-green-400">Total Units</p>
                                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{currentEnrollment.total_units}</p>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950/30">
                                    <p className="text-sm text-purple-600 dark:text-purple-400">Total Fees</p>
                                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">₱{currentEnrollment.total_fees.toLocaleString()}</p>
                                </div>
                                <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-950/30">
                                    <p className="text-sm text-orange-600 dark:text-orange-400">Balance</p>
                                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">₱{currentEnrollment.balance.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button asChild>
                                    <Link href={route('student.enrollment.show', currentEnrollment.id)}>
                                        View Details
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route('student.enrollment.schedule')}>
                                        <Calendar className="mr-2 h-4 w-4" />
                                        View Schedule
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No Active Enrollment</h3>
                            <p className="mt-2 text-sm text-muted-foreground">You don't have an active enrollment for this semester.</p>
                            {canReEnroll && (
                                <Button className="mt-6" asChild>
                                    <Link href={route('student.enrollment.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Enroll Now
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Stats */}
                {stats && (
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardContent className="p-4 flex items-center gap-3">
                                <GraduationCap className="h-8 w-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Average Grade</p>
                                    <p className="text-2xl font-bold">{stats.average?.toFixed(1) ?? 'N/A'}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-3">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Passed</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-3">
                                <XCircle className="h-8 w-8 text-red-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Failed</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-3">
                                <TrendingUp className="h-8 w-8 text-orange-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Subjects</p>
                                    <p className="text-2xl font-bold">{stats.total}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Quick Links */}
                <div className="grid gap-6 md:grid-cols-4">
                    <Link href={route('student.enrollment.grades')} className="group rounded-xl border bg-card p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-3 text-green-600 group-hover:bg-green-200 dark:bg-green-900/30">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">My Grades</h3>
                                <p className="text-sm text-muted-foreground">View your grades and GPA</p>
                            </div>
                        </div>
                    </Link>
                    <Link href={route('student.enrollment.schedule')} className="group rounded-xl border bg-card p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-blue-100 p-3 text-blue-600 group-hover:bg-blue-200 dark:bg-blue-900/30">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Class Schedule</h3>
                                <p className="text-sm text-muted-foreground">View your weekly schedule</p>
                            </div>
                        </div>
                    </Link>
                    <Link href={route('student.enrollment.payment', currentEnrollment?.id)} className="group rounded-xl border bg-card p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-orange-100 p-3 text-orange-600 group-hover:bg-orange-200 dark:bg-orange-900/30">
                                <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Payments</h3>
                                <p className="text-sm text-muted-foreground">Manage your payments</p>
                            </div>
                        </div>
                    </Link>
                    <Link href={route('student.enrollment.history')} className="group rounded-xl border bg-card p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-purple-100 p-3 text-purple-600 group-hover:bg-purple-200 dark:bg-purple-900/30">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">History</h3>
                                <p className="text-sm text-muted-foreground">Past enrollments</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Enrollment History */}
                {enrollmentHistory.length > 0 && (
                    <Card>
                        <div className="border-b px-6 py-4">
                            <h3 className="text-lg font-semibold">Enrollment History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Academic Year</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Semester</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Program</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">GPA</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {enrollmentHistory.map((item) => (
                                        <tr key={item.id} className="hover:bg-muted/30">
                                            <td className="px-4 py-3 text-sm">{item.academic_year}</td>
                                            <td className="px-4 py-3 text-sm">{item.semester}</td>
                                            <td className="px-4 py-3 text-sm">{item.program || 'N/A'}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant={item.status === 'enrolled' ? 'success' : 'secondary'}>
                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{item.gpa?.toFixed(2) ?? 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
}

StudentPortalIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;