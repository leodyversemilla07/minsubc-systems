import { Head, Link, router, usePage } from '@inertiajs/react';
import AdmissionLayout from '@/layouts/admission-layout';
import { ApplicationForm } from '@/components/admission/application-form';
import { type PageProps } from '@/types';

interface Program {
    id: number;
    name: string;
    course: string;
    course_code: string;
    academic_year: string;
    semester: string;
    slots_available: number;
    description: string | null;
}

interface ApplyPageProps extends PageProps {
    programs: Program[];
}

export default function Apply({ programs }: ApplyPageProps) {
    return (
        <>
            <Head title="Apply for Admission" />
            <ApplyContent programs={programs} />
        </>
    );
}

Apply.layout = (page: React.ReactNode) => <AdmissionLayout>{page}</AdmissionLayout>;

function ApplyContent({ programs }: ApplyPageProps) {
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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Apply for Admission
                    </h1>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                        Mindoro State University – Bongabong Campus
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
                    {programs.length === 0 ? (
                        <div className="py-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No Open Programs</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                There are currently no open programs for application. Please check back later.
                            </p>
                            <Link href="/" className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        <ApplicationForm programs={programs} />
                    )}
                </div>
            </div>
        </>
    );
}