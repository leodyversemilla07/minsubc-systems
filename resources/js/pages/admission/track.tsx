import { Head, Link, usePage, useForm } from '@inertiajs/react';
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
    const { data, setData, post, processing, errors } = useForm({
        application_number: '',
        email: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admission.track.lookup'));
    }

    return (
        <>
            <Head title="Track Application" />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="border-b border-blue-100 bg-white dark:border-blue-900/50 dark:bg-gray-900">
                    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                        <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back to Home
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Track Your Application
                        </h1>
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                            Enter your application number and email to check your status.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                    {!applicant ? (
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="application_number">Application Number *</Label>
                                    <Input
                                        id="application_number"
                                        value={data.application_number}
                                        onChange={(e) => setData('application_number', e.target.value)}
                                        placeholder="ADM2026-00001"
                                        className="mt-1"
                                    />
                                    {errors.application_number && <p className="mt-1 text-sm text-red-600">{errors.application_number}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? 'Looking up...' : 'Track Application'}
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{applicant.full_name}</h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {applicant.application_number}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {applicant.program?.course?.name ?? 'N/A'}
                                        </p>
                                    </div>
                                    <ApplicationStatusBadge status={applicant.status} />
                                </div>
                            </div>

                            {applicant.documents.length > 0 && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Submitted Documents</h3>
                                    <ul className="mt-4 space-y-2">
                                        {applicant.documents.map((doc) => (
                                            <li key={doc.id} className="flex items-center justify-between rounded-lg border px-4 py-2 text-sm dark:border-gray-700">
                                                <span>{doc.name}</span>
                                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                    doc.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    doc.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Submitted on: {applicant.created_at}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}