import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type PageProps } from '@/types';
import { ApplicationStatusBadge } from '@/components/admission/status-badge';

interface Requirement {
    id: number;
    name: string;
    description: string | null;
    is_required: boolean;
}

interface Document {
    id: number;
    name: string;
    status: string;
    original_name: string;
    created_at: string;
}

interface Applicant {
    id: number;
    application_number: string;
    full_name: string;
    first_name: string;
    email: string;
    status: string;
    status_label: string;
    submitted_at: string | null;
    created_at: string;
    program: { course: { code: string; name: string }; name: string; academic_year: string; semester: string } | null;
    documents: Document[];
}

interface ManagePageProps extends PageProps {
    applicant: Applicant;
    requirements: Requirement[];
}

export default function Manage({ applicant, requirements }: ManagePageProps) {
    const { data, setData, post, processing, errors } = useForm({
        file: null as File | null,
        name: '',
        requirement_id: '',
    });

    function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        post(route('admission.application.documents.upload', applicant.application_number));
    }

    function handleSubmit() {
        router.post(route('admission.application.submit', applicant.application_number), {}, {
            preserveScroll: true,
        });
    }

    const isDraft = applicant.status === 'draft';

    return (
        <>
            <Head title={`Application - ${applicant.application_number}`} />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="border-b border-blue-100 bg-white dark:border-blue-900/50 dark:bg-gray-900">
                    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                        <Link href={route('admission.track')} className="mb-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back to Tracking
                        </Link>
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{applicant.full_name}</h1>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {applicant.application_number}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {applicant.program?.course?.name} — {applicant.program?.academic_year} ({applicant.program?.semester})
                                </p>
                            </div>
                            <ApplicationStatusBadge status={applicant.status} />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Documents */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Upload Document */}
                            {isDraft && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Document</h2>
                                    <form onSubmit={handleUpload} className="mt-4 space-y-4">
                                        <div>
                                            <Label htmlFor="doc_name">Document Name *</Label>
                                            <Input id="doc_name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" placeholder="e.g., Report Card, Good Moral" />
                                        </div>
                                        <div>
                                            <Label htmlFor="doc_file">File *</Label>
                                            <Input id="doc_file" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                setData('file', file);
                                                if (file && !data.name) setData('name', file.name.replace(/\.[^/.]+$/, ''));
                                            }} className="mt-1" />
                                            <p className="mt-1 text-xs text-gray-500">Accepted: PDF, JPG, PNG (max 10MB)</p>
                                        </div>
                                        <Button type="submit" disabled={processing} size="sm">
                                            {processing ? 'Uploading...' : 'Upload'}
                                        </Button>
                                    </form>
                                </div>
                            )}

                            {/* Uploaded Documents */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Documents ({applicant.documents.length}{requirements.length > 0 ? ` / ${requirements.length} required` : ''})
                                </h2>
                                {applicant.documents.length === 0 ? (
                                    <p className="mt-4 text-sm text-gray-500">No documents uploaded yet.</p>
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
                                                }`}>
                                                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Required Documents Checklist */}
                            {requirements.length > 0 && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Requirements Checklist</h2>
                                    <ul className="mt-4 space-y-2">
                                        {requirements.map((req) => {
                                            const uploaded = applicant.documents.some(d => d.name.toLowerCase() === req.name.toLowerCase());
                                            return (
                                                <li key={req.id} className="flex items-center gap-3 text-sm">
                                                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
                                                        uploaded ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                                                    }`}>
                                                        {uploaded ? '✓' : '·'}
                                                    </span>
                                                    <span className={uploaded ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                                                        {req.name}
                                                        {req.is_required && <span className="ml-1 text-red-500">*</span>}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Status Info */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</h3>
                                <div className="mt-3">
                                    <ApplicationStatusBadge status={applicant.status} />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Created: {applicant.created_at}
                                </p>
                                {applicant.submitted_at && (
                                    <p className="text-xs text-gray-500">
                                        Submitted: {applicant.submitted_at}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            {isDraft && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                        Once submitted, you can no longer modify your application or upload documents.
                                    </p>
                                    <Button onClick={handleSubmit} className="w-full" variant="default">
                                        Submit Application
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}