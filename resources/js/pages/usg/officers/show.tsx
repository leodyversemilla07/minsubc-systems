import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import USGLayout from '@/layouts/usg-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building, Mail, Phone } from 'lucide-react';

interface Officer {
    id: number;
    name: string;
    position: string;
    department?: string;
    email?: string;
    phone?: string;
    photo?: string;
    bio?: string;
    term_start?: string;
    term_end?: string;
    is_active: boolean;
}

interface Props {
    officer: Officer;
}

export default function OfficerShow({ officer }: Props) {
    const formatTermPeriod = () => {
        if (!officer.term_start || !officer.term_end) {
            return 'Current Term';
        }

        const start = new Date(officer.term_start);
        const end = new Date(officer.term_end);

        if (start.getFullYear() === end.getFullYear()) {
            return `${start.getFullYear()}`;
        }

        return `${start.getFullYear()}-${end.getFullYear()}`;
    };

    return (
        <USGLayout>
            <Head title={`${officer.name} - USG Officer`} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[var(--usg-primary)] via-[var(--usg-primary)] to-[var(--usg-dark)] py-20 text-white">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <Button
                            asChild
                            variant="ghost"
                            className="mb-6 text-white hover:bg-white/10"
                        >
                            <Link href="/usg/officers">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Officers
                            </Link>
                        </Button>

                        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
                            {/* Profile Picture */}
                            <div className="shrink-0">
                                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 bg-white/10 shadow-xl backdrop-blur-sm md:h-40 md:w-40">
                                    {officer.photo ? (
                                        <img
                                            src={officer.photo}
                                            alt={officer.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white md:text-5xl">
                                            {officer.name
                                                .split(' ')
                                                .map((word) => word[0])
                                                .join('')
                                                .toUpperCase()
                                                .slice(0, 2)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Officer Info */}
                            <div className="flex-1">
                                <div className="mb-4">
                                    <Badge
                                        variant={
                                            officer.is_active
                                                ? 'default'
                                                : 'secondary'
                                        }
                                        className="bg-white/10 text-white backdrop-blur-sm"
                                    >
                                        {officer.is_active
                                            ? 'Active'
                                            : 'Inactive'}
                                    </Badge>
                                </div>

                                <h1 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
                                    {officer.name}
                                </h1>

                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-white/90">
                                        {officer.position}
                                    </h3>
                                    {officer.department && (
                                        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-white/80 sm:justify-start">
                                            <Building className="h-4 w-4" />
                                            <span>{officer.department}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="text-sm text-white/80">
                                    <span className="font-semibold">Term:</span>{' '}
                                    {formatTermPeriod()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        {/* Officer Details Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            {/* Bio */}
                            {officer.bio && (
                                <div className="mb-8">
                                    <h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                        About
                                    </h4>
                                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                        {officer.bio}
                                    </p>
                                </div>
                            )}

                            {/* Contact Information */}
                            {(officer.email || officer.phone) && (
                                <div>
                                    <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Contact Information
                                    </h4>
                                    <div className="space-y-3">
                                        {officer.email && (
                                            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                <a
                                                    href={`mailto:${officer.email}`}
                                                    className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {officer.email}
                                                </a>
                                            </div>
                                        )}
                                        {officer.phone && (
                                            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                                <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                <a
                                                    href={`tel:${officer.phone}`}
                                                    className="transition-colors hover:text-green-600 dark:hover:text-green-400"
                                                >
                                                    {officer.phone}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </USGLayout>
    );
}
