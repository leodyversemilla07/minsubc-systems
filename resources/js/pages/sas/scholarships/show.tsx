import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    FileText,
    GraduationCap,
    CheckCircle,
    Calendar,
    Building,
    Tag,
    ArrowRight,
    Mail
} from 'lucide-react';

interface Scholarship {
    id: number;
    scholarship_code: string;
    scholarship_name: string;
    description: string | null;
    scholarship_type: string;
    provider: string | null;
    is_active: boolean;
    deadline?: string;
    requirements?: string[];
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
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-white px-4 py-12 text-slate-900 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-green-950/20 dark:to-slate-950 dark:text-white border-b border-green-100 dark:border-slate-800">
                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.15] dark:opacity-[0.07]">
                    <svg
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="hero-pattern"
                                x="0"
                                y="0"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="1.5"
                                    fill="currentColor"
                                    className="text-green-600"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#hero-pattern)"
                        />
                    </svg>
                </div>

                <div className="relative mx-auto max-w-7xl">
                    {/* Back Link */}
                    <Link
                        href={sas.scholarships.index.url()}
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-green-700 dark:text-slate-400 dark:hover:text-green-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Scholarships
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 lg:gap-8">
                        {/* Icon Box */}
                        <div className="flex-shrink-0">
                            <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-xl dark:from-green-900 dark:to-green-800">
                                <GraduationCap className="h-10 w-10 md:h-12 md:w-12 text-green-700 dark:text-green-300" />
                            </div>
                        </div>

                        {/* Title & Meta */}
                        <div className="flex-1">
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    {scholarship.scholarship_type}
                                </span>
                                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                    {scholarship.scholarship_code}
                                </span>
                                {scholarship.is_active && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        <span className="relative flex h-2 w-2">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Active
                                    </span>
                                )}
                            </div>

                            <h1 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                                {scholarship.scholarship_name}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300">
                                {scholarship.provider && (
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        <span className="font-semibold">Provider:</span> {scholarship.provider}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="font-semibold">Deadline:</span> {scholarship.deadline || 'TBA'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-3">

                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Description Card */}
                            {scholarship.description && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                    <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-4 dark:border-slate-800">
                                        <div className="p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        Description
                                    </h2>
                                    <div className="prose prose-slate max-w-none dark:prose-invert text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                                        {scholarship.description}
                                    </div>
                                </div>
                            )}

                            {/* Requirements Card */}
                            {scholarship.requirements && scholarship.requirements.length > 0 && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                    <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-4 dark:border-slate-800">
                                        <div className="p-2 bg-green-50 rounded-lg dark:bg-green-900/20">
                                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        Requirements
                                    </h2>
                                    <ul className="grid gap-3 sm:grid-cols-2">
                                        {scholarship.requirements.map((req, index) => (
                                            <li key={index} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                                                <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                                                <span className="text-sm text-slate-700 dark:text-slate-300">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Related Scholarships */}
                            {relatedScholarships && relatedScholarships.length > 0 && (
                                <div className="pt-8">
                                    <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Other Programs You Might Like</h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {relatedScholarships.map((related) => (
                                            <Link
                                                key={related.id}
                                                href={sas.scholarships.show.url({ id: related.id })}
                                                className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-green-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-green-700"
                                            >
                                                {/* Top Gradient Line */}
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                <h4 className="font-bold text-slate-900 group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400 transition-colors">
                                                    {related.scholarship_name}
                                                </h4>
                                                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                    <Tag className="h-3 w-3" />
                                                    {related.scholarship_type}
                                                </div>
                                                <div className="mt-4 flex items-center text-xs font-bold text-green-600 opacity-0 transition-all group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 dark:text-green-400">
                                                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 space-y-6">

                                {/* Status Card */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Application Status
                                    </h3>

                                    <div className="flex flex-col gap-4">
                                        {scholarship.is_active ? (
                                            <div className="rounded-xl bg-green-50 p-4 text-center dark:bg-green-900/20 border border-green-100 dark:border-green-900/50">
                                                <span className="text-2xl font-black text-green-600 dark:text-green-400">Open</span>
                                                <p className="text-xs font-medium text-green-700 dark:text-green-300 mt-1">Accepting Applications</p>
                                            </div>
                                        ) : (
                                            <div className="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-800">
                                                <span className="text-xl font-bold text-slate-500 dark:text-slate-400">Closed</span>
                                            </div>
                                        )}

                                        <button className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5 border border-transparent px-8 py-3 text-lg">
                                            Apply Now
                                        </button>

                                        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                                            Requires student login to proceed.
                                        </p>
                                    </div>
                                </div>

                                {/* Info Card */}
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Quick Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Scholarship Code</div>
                                            <div className="font-mono text-sm font-medium text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 inline-block">
                                                {scholarship.scholarship_code}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Provider</div>
                                            <div className="font-semibold text-slate-900 dark:text-white">{scholarship.provider}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Type</div>
                                            <div className="font-semibold text-slate-900 dark:text-white">{scholarship.scholarship_type}</div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Need Help?</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                                            Contact the Student Affairs Office for more details.
                                        </p>
                                        <a href="mailto:sas@minsu.edu.ph" className="text-sm font-bold text-green-600 hover:text-green-700 dark:text-green-400 flex items-center gap-1">
                                            <Mail className="h-3 w-3" /> sas@minsu.edu.ph
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </SASLayout>
    );
}
