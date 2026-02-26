import { Badge } from '@/components/ui/badge';
import OfficerCard from '@/components/usg/officer-card';
import USGLayout from '@/layouts/usg-layout';
import { Head } from '@inertiajs/react';
import { Mail, Phone } from 'lucide-react';

interface Officer {
    id: number;
    name: string;
    position: string;
    department?: string;
    email?: string;
    phone?: string;
    photo?: string;
    photo_url?: string;
    bio?: string;
    is_active: boolean;
    term_start?: string;
    term_end?: string;
    order?: number;
}

interface Props {
    officers?: Officer[];
    departments?: string[];
}

export default function OfficersIndex({ officers = [] }: Props) {
    const filteredOfficers = officers;

    const activeOfficers = filteredOfficers.filter(
        (officer) => officer.is_active,
    );
    const inactiveOfficers = filteredOfficers.filter(
        (officer) => !officer.is_active,
    );

    return (
        <USGLayout>
            <Head title="USG Officers" />

            {/* Hero Section */}
            <section className="relative -mt-28 overflow-hidden bg-gradient-to-br from-green-700 via-green-700 to-green-900 pt-32 pb-20 text-white sm:pt-40 dark:from-green-900 dark:via-green-900 dark:to-black">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>

                {/* Grid Pattern Background */}
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight drop-shadow-md sm:text-5xl lg:text-6xl">
                            USG Officers
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-green-50 sm:text-xl lg:text-2xl dark:text-gray-200">
                            Meet the dedicated leaders serving our campus
                            community
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4">
                    {/* Results Summary */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {filteredOfficers.length} Officer
                                {filteredOfficers.length !== 1 ? 's' : ''}
                            </h2>
                            <div className="flex gap-2">
                                <Badge
                                    variant="default"
                                    className="bg-[var(--usg-light)] text-[var(--usg-primary)]"
                                >
                                    {activeOfficers.length} Active
                                </Badge>
                                {inactiveOfficers.length > 0 && (
                                    <Badge variant="secondary">
                                        {inactiveOfficers.length} Inactive
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {filteredOfficers.length === 0 ? (
                        <div className="rounded-xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                No officers found
                            </h3>
                            <p className="mx-auto max-w-md text-center text-gray-600 dark:text-gray-300">
                                No officers are currently available.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Active Officers */}
                            {activeOfficers.length > 0 && (
                                <>
                                    <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                        Current Officers
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {activeOfficers
                                            .sort(
                                                (a, b) =>
                                                    (a.order || 999) -
                                                    (b.order || 999),
                                            )
                                            .map((officer) => (
                                                <OfficerCard
                                                    key={officer.id}
                                                    officer={officer}
                                                />
                                            ))}
                                    </div>
                                </>
                            )}

                            {/* Inactive Officers */}
                            {inactiveOfficers.length > 0 && (
                                <>
                                    <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                        Past Officers
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {inactiveOfficers
                                            .sort(
                                                (a, b) =>
                                                    new Date(
                                                        b.term_end ||
                                                            '1970-01-01',
                                                    ).getTime() -
                                                    new Date(
                                                        a.term_end ||
                                                            '1970-01-01',
                                                    ).getTime(),
                                            )
                                            .map((officer) => (
                                                <OfficerCard
                                                    key={officer.id}
                                                    officer={officer}
                                                />
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            {activeOfficers.length > 0 && (
                <section className="relative overflow-hidden bg-green-700 py-20 text-white dark:bg-green-900">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 container mx-auto px-4">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold">
                                Get in Touch
                            </h2>
                            <p className="mb-8 text-xl text-[var(--usg-hero-text)]">
                                Have questions or suggestions? Feel free to
                                reach out to any of our officers or contact the
                                USG office directly.
                            </p>
                            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg">
                                        usg@must.edu.ph
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <span className="text-lg">
                                        (088) 856-1738
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </USGLayout>
    );
}
