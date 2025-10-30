import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, FileText, ArrowLeft } from 'lucide-react';

interface Scholarship {
    id: number;
    scholarship_code: string;
    scholarship_name: string;
    description: string | null;
    scholarship_type: string;
    provider: string | null;
    is_active: boolean;
}

interface Props {
    scholarship: Scholarship;
    relatedScholarships: Scholarship[];
}

export default function ScholarshipShow({
    scholarship,
    relatedScholarships,
}: Props) {
    return (
        <SASLayout>
            <Head title={`${scholarship.scholarship_name} - SAS`} />

            {/* Header */}
            <section className="bg-gradient-to-br from-green-700 to-green-900 px-4 py-12 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href={sas.scholarships.index.url()}
                        className="mb-6 inline-flex items-center gap-2 text-green-100 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Scholarships
                    </Link>

                    <div className="flex items-start gap-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                            <GraduationCap className="h-10 w-10" />
                        </div>

                        <div className="flex-1">
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                                    {scholarship.scholarship_type}
                                </span>
                                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                                    {scholarship.scholarship_code}
                                </span>
                            </div>

                            <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
                                {scholarship.scholarship_name}
                            </h1>

                            {scholarship.provider && (
                                <div className="text-green-100">
                                    <span className="font-medium">
                                        Provider:
                                    </span>{' '}
                                    {scholarship.provider}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-white px-4 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Description */}
                            {scholarship.description && (
                                <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                                        <FileText className="h-5 w-5 text-green-600" />
                                        Description
                                    </h2>
                                    <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">
                                        {scholarship.description}
                                    </p>
                                </div>
                            )}

                            {/* Related Scholarships */}
                            {relatedScholarships &&
                                relatedScholarships.length > 0 && (
                                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                            Related Scholarships
                                        </h2>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {relatedScholarships.map(
                                                (related) => (
                                                    <Link
                                                        key={related.id}
                                                        href={`/sas/scholarships/${related.id}`}
                                                        className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                                                    >
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                                            {
                                                                related.scholarship_name
                                                            }
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {
                                                                related.scholarship_type
                                                            }
                                                        </p>
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 space-y-6">
                                {/* Quick Info Card */}
                                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
                                        Quick Information
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                                Code
                                            </div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {scholarship.scholarship_code}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                                Type
                                            </div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                {scholarship.scholarship_type}
                                            </div>
                                        </div>

                                        {scholarship.provider && (
                                            <div>
                                                <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Provider
                                                </div>
                                                <div className="font-semibold text-gray-900 dark:text-white">
                                                    {scholarship.provider}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                                Status
                                            </div>
                                            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
                                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                                        Need Help?
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Contact the Student Affairs and Services
                                        Office for more information about this
                                        scholarship.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SASLayout>
    );
}
