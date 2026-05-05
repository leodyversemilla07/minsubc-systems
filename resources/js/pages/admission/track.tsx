import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AdmissionLayout from '@/layouts/admission-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type PageProps } from '@/types';
import { ApplicationStatusBadge } from '@/components/admission/status-badge';

interface Applicant {
    id: number;
    application_number: string;
    full_name: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    status_label: string;
    created_at: string;
    program: { course: { code: string; name: string } } | null;
    documents: Array<{ id: number; name: string; status: string }>;
}

interface TrackPageProps extends PageProps {
    applicant?: Applicant;
}

export default function Track({ applicant }: TrackPageProps) {
    return (
        <>
            <Head title="Track Application" />
            <TrackContent applicant={applicant} />
        </>
    );
}

Track.layout = (page: React.ReactNode) => <AdmissionLayout>{page}</AdmissionLayout>;

function TrackContent({ applicant }: TrackPageProps) {
    const { data, setData, post, processing, errors } = useForm({
        application_number: '',
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admission/track');
    };

    return (
        <>
            {/* Hero */}
            <div className="border-b border-blue-100 bg-white dark:border-blue-900/50 dark:bg-gray-900">
                <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                    <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Track Application Status
                    </h1>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                        Enter your application number and email to check your admission status
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Search Form */}
                {!applicant && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="application_number">Application Number</Label>
                                <Input
                                    id="application_number"
                                    value={data.application_number}
                                    onChange={(e) => setData('application_number', e.target.value)}
                                    placeholder="e.g. ADM2025-00001"
                                    required
                                />
                                {errors.application_number && (
                                    <p className="text-sm text-red-600">{errors.application_number}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? 'Searching...' : 'Track Application'}
                            </Button>
                        </form>
                    </div>
                )}

                {/* Results */}
                {applicant && (
                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Application #</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {applicant.application_number}
                                    </p>
                                </div>
                                <ApplicationStatusBadge status={applicant.status} label={applicant.status_label} />
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{applicant.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{applicant.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Program</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {applicant.program?.course?.name ?? 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {new Date(applicant.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Documents */}
                        {applicant.documents.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Documents</h2>
                                <div className="space-y-3">
                                    {applicant.documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{doc.name}</span>
                                            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                                {doc.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}