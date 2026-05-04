import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { ApplicationStatusBadge } from '@/components/admission/status-badge';

interface ApplicantDetail {
    id: number;
    application_number: string;
    full_name: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: string | null;
    address: string | null;
    city: string | null;
    province: string | null;
    zip_code: string | null;
    last_school_attended: string | null;
    strand: string | null;
    gpa: number | null;
    status: string;
    submitted_at: string | null;
    created_at: string;
    program: {
        id: number;
        name: string;
        academic_year: string;
        semester: string;
        course: { code: string; name: string };
        requirements: Array<{ id: number; name: string; is_required: boolean }>;
    } | null;
    documents: Array<{
        id: number;
        name: string;
        original_name: string;
        status: string;
        admin_notes: string | null;
        created_at: string;
        reviewer: { first_name: string; last_name: string } | null;
    }>;
    evaluations: Array<{
        id: number;
        decision: string;
        notes: string | null;
        score: number | null;
        created_at: string;
        evaluator: { first_name: string; last_name: string };
    }>;
    enrollment: { id: number; status: string; academic_year: string; semester: string; student_id: string | null } | null;
    auditLogs: Array<{
        id: number;
        action: string;
        from_status: string | null;
        to_status: string | null;
        description: string | null;
        created_at: string;
        user: { first_name: string; last_name: string } | null;
    }>;
}

interface StatusOption {
    value: string;
    label: string;
    color: string;
}

interface ApplicantShowPageProps extends PageProps {
    applicant: ApplicantDetail;
    statuses: StatusOption[];
}

export default function ApplicantShow({ applicant, statuses }: ApplicantShowPageProps) {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [remarks, setRemarks] = useState('');
    const [decision, setDecision] = useState('');
    const [score, setScore] = useState('');
    const [evalNotes, setEvalNotes] = useState('');

    function updateStatus() {
        if (!selectedStatus) return;
        router.patch(route('admission.admin.applicants.update-status', applicant.id), {
            status: selectedStatus,
            remarks,
        }, { preserveScroll: true, onSuccess: () => { setSelectedStatus(''); setRemarks(''); } });
    }

    function submitEvaluation() {
        if (!decision) return;
        router.post(route('admission.admin.evaluations.store', applicant.id), {
            decision,
            score: score || null,
            notes: evalNotes,
        }, { preserveScroll: true, onSuccess: () => { setDecision(''); setScore(''); setEvalNotes(''); } });
    }

    return (
        <>
            <Head title={`Applicant - ${applicant.full_name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link href={route('admission.admin.applicants.index')} className="mb-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                            ← Back to Applicants
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{applicant.full_name}</h1>
                        <p className="mt-1 text-sm text-gray-500">{applicant.application_number}</p>
                    </div>
                    <ApplicationStatusBadge status={applicant.status} />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Personal Info */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div><dt className="text-gray-500">Name</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.full_name}</dd></div>
                                <div><dt className="text-gray-500">Email</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.email}</dd></div>
                                <div><dt className="text-gray-500">Phone</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.phone}</dd></div>
                                <div><dt className="text-gray-500">Date of Birth</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.date_of_birth}</dd></div>
                                <div><dt className="text-gray-500">Gender</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.gender || 'N/A'}</dd></div>
                                <div><dt className="text-gray-500">Program</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.program?.course?.name} ({applicant.program?.academic_year})</dd></div>
                                <div className="col-span-2"><dt className="text-gray-500">Address</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.address || 'N/A'}</dd></div>
                                <div><dt className="text-gray-500">Last School</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.last_school_attended || 'N/A'}</dd></div>
                                <div><dt className="text-gray-500">GPA</dt><dd className="font-medium text-gray-900 dark:text-white">{applicant.gpa || 'N/A'}</dd></div>
                            </dl>
                        </div>

                        {/* Documents */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Documents ({applicant.documents.length})</h2>
                            {applicant.documents.length === 0 ? (
                                <p className="mt-4 text-sm text-gray-500">No documents uploaded.</p>
                            ) : (
                                <ul className="mt-4 space-y-2">
                                    {applicant.documents.map((doc) => (
                                        <li key={doc.id} className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm dark:border-gray-700">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{doc.original_name}</p>
                                            </div>
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                doc.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>{doc.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Evaluations */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Evaluations</h2>
                            {applicant.evaluations.length === 0 ? (
                                <p className="mt-4 text-sm text-gray-500">No evaluations yet.</p>
                            ) : (
                                <div className="mt-4 space-y-3">
                                    {applicant.evaluations.map((eval_) => (
                                        <div key={eval_.id} className="rounded-lg border px-4 py-3 text-sm dark:border-gray-700">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-gray-900 dark:text-white capitalize">{eval_.decision}</p>
                                                <p className="text-xs text-gray-500">{eval_.evaluator.first_name} {eval_.evaluator.last_name} • {eval_.created_at}</p>
                                            </div>
                                            {eval_.notes && <p className="mt-1 text-gray-600 dark:text-gray-400">{eval_.notes}</p>}
                                            {eval_.score && <p className="mt-1 text-xs text-gray-500">Score: {eval_.score}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Audit Log */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h2>
                            {applicant.auditLogs.length === 0 ? (
                                <p className="mt-4 text-sm text-gray-500">No activity recorded.</p>
                            ) : (
                                <div className="mt-4 space-y-2">
                                    {applicant.auditLogs.map((log) => (
                                        <div key={log.id} className="flex items-start gap-3 text-sm">
                                            <div className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-900 dark:text-white capitalize">{log.action.replace(/_/g, ' ')}</p>
                                                <p className="text-xs text-gray-500">
                                                    {log.user ? `${log.user.first_name} ${log.user.last_name}` : 'System'} • {log.created_at}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">
                        {/* Update Status */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Update Status</h3>
                            <div className="mt-4 space-y-3">
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((s) => (
                                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks (optional)" rows={2} />
                                <Button onClick={updateStatus} disabled={!selectedStatus} className="w-full" size="sm">
                                    Update Status
                                </Button>
                            </div>
                        </div>

                        {/* Evaluate */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Evaluate</h3>
                            <div className="mt-4 space-y-3">
                                <Select value={decision} onValueChange={setDecision}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Decision..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="accepted">Accept</SelectItem>
                                        <SelectItem value="rejected">Reject</SelectItem>
                                        <SelectItem value="waitlisted">Waitlist</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input type="number" min={0} max={100} value={score} onChange={(e) => setScore(e.target.value)} placeholder="Score (0-100)" />
                                <Textarea value={evalNotes} onChange={(e) => setEvalNotes(e.target.value)} placeholder="Evaluation notes..." rows={2} />
                                <Button onClick={submitEvaluation} disabled={!decision} className="w-full" size="sm">
                                    Submit Evaluation
                                </Button>
                            </div>
                        </div>

                        {/* Enrollment */}
                        {applicant.status === 'accepted' && (
                            <Link href={route('admission.admin.enrollments.index')}
                                className="block rounded-xl border border-teal-200 bg-teal-50 p-6 text-center text-sm font-medium text-teal-700 hover:bg-teal-100 dark:border-teal-800 dark:bg-teal-900/20 dark:text-teal-400">
                                Enroll this Applicant →
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

ApplicantShow.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;