import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Enrollment {
    id: number;
    application_number: string;
    applicant_name: string;
    student_id: string | null;
    program: string;
    academic_year: string;
    semester: string;
    status: string;
    enrolled_at: string | null;
}

interface AcceptedApplicant {
    id: number;
    application_number: string;
    name: string;
    program: string;
    program_name: string;
}

interface EnrollmentsPageProps extends PageProps {
    enrollments: { data: Enrollment[] };
    acceptedApplicants: AcceptedApplicant[];
    filters: Record<string, string>;
}

export default function EnrollmentsIndex({ enrollments, acceptedApplicants, filters }: EnrollmentsPageProps) {
    const [showForm, setShowForm] = useState(false);

    // Enrollment form state
    const [applicantId, setApplicantId] = useState('');
    const [academicYear, setAcademicYear] = useState(new Date().getFullYear() + '-' + (new Date().getFullYear() + 1));
    const [semester, setSemester] = useState('1st');
    const [yearLevel, setYearLevel] = useState('1');
    const [campus, setCampus] = useState('Main');
    const [submitting, setSubmitting] = useState(false);

    function confirmEnrollment(e: React.FormEvent) {
        e.preventDefault();
        if (!applicantId) return;
        setSubmitting(true);
        router.post(route('admission.admin.enrollments.confirm'), {
            applicant_id: applicantId,
            academic_year: academicYear,
            semester,
            year_level: yearLevel,
            campus,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setShowForm(false);
                setApplicantId('');
                setSubmitting(false);
            },
            onError: () => setSubmitting(false),
        });
    }

    return (
        <>
            <Head title="Enrollments" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enrollments</h1>
                    {acceptedApplicants.length > 0 && (
                        <Button onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cancel' : 'New Enrollment'}
                        </Button>
                    )}
                </div>

                {/* Enrollment Form */}
                {showForm && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Enrollment</h2>
                        <form onSubmit={confirmEnrollment} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <Label htmlFor="applicant">Applicant *</Label>
                                <Select value={applicantId} onValueChange={setApplicantId}>
                                    <SelectTrigger id="applicant" className="mt-1">
                                        <SelectValue placeholder="Select an accepted applicant..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {acceptedApplicants.map((a) => (
                                            <SelectItem key={a.id} value={String(a.id)}>
                                                {a.name} — {a.application_number} ({a.program})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="academic_year">Academic Year *</Label>
                                <Input id="academic_year" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="semester">Semester *</Label>
                                <Select value={semester} onValueChange={setSemester}>
                                    <SelectTrigger id="semester" className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">1st Semester</SelectItem>
                                        <SelectItem value="2nd">2nd Semester</SelectItem>
                                        <SelectItem value="Summer">Summer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="year_level">Year Level *</Label>
                                <Select value={yearLevel} onValueChange={setYearLevel}>
                                    <SelectTrigger id="year_level" className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1st Year</SelectItem>
                                        <SelectItem value="2">2nd Year</SelectItem>
                                        <SelectItem value="3">3rd Year</SelectItem>
                                        <SelectItem value="4">4th Year</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="campus">Campus</Label>
                                <Input id="campus" value={campus} onChange={(e) => setCampus(e.target.value)} className="mt-1" />
                            </div>
                            <div className="sm:col-span-2">
                                <Button type="submit" disabled={!applicantId || submitting} className="w-full">
                                    {submitting ? 'Confirming...' : 'Confirm Enrollment'}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Enrollments Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Applicant</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Student ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Program</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Period</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Enrolled</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {enrollments.data.map((e) => (
                                <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900 dark:text-white">{e.applicant_name}</p>
                                        <p className="text-xs text-gray-500">{e.application_number}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-mono text-gray-500">{e.student_id || '—'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{e.program}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{e.academic_year} ({e.semester})</td>
                                    <td className="px-4 py-3">
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                            e.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                                            e.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>{e.status}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">{e.enrolled_at || '—'}</td>
                                </tr>
                            ))}
                            {enrollments.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-sm text-gray-500">No enrollments yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

EnrollmentsIndex.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;