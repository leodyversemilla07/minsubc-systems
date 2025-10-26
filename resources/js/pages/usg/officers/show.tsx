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
            <section className="relative bg-[var(--usg-primary)] py-20 text-white">
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            Officer Profile
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Meet {officer.name}, our dedicated{' '}
                            {officer.position}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        {/* Back Button */}
                        <div className="mb-8">
                            <Button asChild variant="outline" className="mb-4">
                                <Link href="/usg/officers">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Officers
                                </Link>
                            </Button>
                        </div>

                        {/* Officer Profile Card */}
                        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                            <div className="text-center">
                                {/* Avatar */}
                                <div className="mb-6">
                                    <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                        {officer.photo ? (
                                            <img
                                                src={officer.photo}
                                                alt={officer.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-400">
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

                                {/* Name and Status */}
                                <div className="mb-4">
                                    <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                                        {officer.name}
                                    </h2>
                                    <div className="mb-4 flex items-center justify-center gap-2">
                                        <Badge
                                            variant={
                                                officer.is_active
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {officer.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Position */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                                        {officer.position}
                                    </h3>
                                    {officer.department && (
                                        <div className="mt-2 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                                            <Building className="h-4 w-4" />
                                            <span>{officer.department}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Term Period */}
                                <div className="mb-8">
                                    <p className="text-lg text-gray-600 dark:text-gray-300">
                                        <span className="font-semibold">
                                            Term:
                                        </span>{' '}
                                        {formatTermPeriod()}
                                    </p>
                                </div>

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
                                    <div className="mb-8">
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                            Contact Information
                                        </h4>
                                        <div className="space-y-3">
                                            {officer.email && (
                                                <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
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
                                                <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300">
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
                </div>
            </section>
        </USGLayout>
    );
}
