import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import AdmissionLayout from '@/layouts/admission-layout';
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
    created_at: string;
    submitted_at: string | null;
    program: { course: { code: string; name: string } } | null;
    documents: Document[];
}

interface ManagePageProps extends PageProps {
    applicant: Applicant;
    requirements: Requirement[];
}

export default function Manage({ applicant, requirements }: ManagePageProps) {
    return (
        <>
            <Head title="Manage Application" />
            <ManageContent applicant={applicant} requirements={requirements} />
        </>
    );
}

Manage.layout = (page: React.ReactNode) => <AdmissionLayout>{page}</AdmissionLayout>;

function ManageContent({ applicant, requirements }: ManagePageProps) {
    const { data, setData, post, processing, errors } = useForm<{
        document_type: string;
        file: File | null;
    }>({
        document_type: '',
        file: null,
    });

    const isDraft = applicant.status === 'draft';
    const isSubmitted = applicant.status !== 'draft';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('file', e.target.files[0]);
        }
    };

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.file || !data.document_type) return;
        post(`/admission/apply/${applicant.application_number}/documents`);
    };

    const handleSubmit = () => {
        post(`/admission/apply/${applicant.application_number}/submit`);
    };

    return (
        <>
            {/* Hero */}
            <div className="border-b border-blue-100 bg-white dark:border-blue-900/50 dark:bg-gray-900">
                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                    <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                My Application
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {applicant.application_number}
                            </p>
                        </div>
                        <ApplicationStatusBadge status={applicant.status} label={applicant.status_label} />
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Application Details */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Application Details</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{applicant.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{applicant.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Program</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {applicant.program?.course?.name ?? 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Documents</h2>

                            {applicant.documents.length > 0 ? (
                                <div className="mb-4 space-y-2">
                                    {applicant.documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{doc.original_name}</p>
                                            </div>
                                            <span className="text-xs font-medium text-green-600 dark:text-green-400">{doc.status}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mb-4 text-sm text-gray-500">No documents uploaded yet.</p>
                            )}

                            {isDraft && (
                                <form onSubmit={handleUpload} className="space-y-4 rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-600">
                                    <div className="space-y-2">
                                        <Label htmlFor="document_type">Document Type</Label>
                                        <select
                                            id="document_type"
                                            value={data.document_type}
                                            onChange={(e) => setData('document_type', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Select document type...</option>
                                            {requirements.map((req) => (
                                                <option key={req.id} value={req.name}>
                                                    {req.name} {req.is_required ? '*' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file">File</Label>
                                        <Input
                                            id="file"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".pdf,.jpg,.jpeg,.png"
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing || !data.file || !data.document_type}>
                                        {processing ? 'Uploading...' : 'Upload Document'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">Status</h3>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                <span className="font-medium text-gray-900 dark:text-white">{applicant.status_label}</span>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Created: {new Date(applicant.created_at).toLocaleDateString()}
                            </p>
                            {applicant.submitted_at && (
                                <p className="text-xs text-gray-500">
                                    Submitted: {new Date(applicant.submitted_at).toLocaleDateString()}
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
        </>
    );
}