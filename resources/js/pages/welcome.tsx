import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, FileText, Users, Vote } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="Mindoro State University Bongabong Campus - Student Portal" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 dark:from-green-900 dark:via-gray-900 dark:to-green-900">
                <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-green-200 opacity-30 blur-xl dark:bg-green-800"></div>
                            <img
                                src="/minsu-logo.png"
                                alt="MinSU Logo"
                                className="relative h-16 w-16 rounded-full object-contain shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24"
                            />
                        </div>
                    </div>
                    <h1 className="mb-4 text-3xl font-bold tracking-tight text-green-900 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
                        Welcome to{' '}
                        <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent dark:from-green-400 dark:to-green-600">
                            Mindoro State University Bongabong Campus Systems
                        </span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:mb-12 sm:text-lg md:text-xl dark:text-gray-300">
                        Your comprehensive student portal for University Student
                        Government, Academic Records, and Student Services.
                        Access all your university resources in one unified
                        platform.
                    </p>
                </div>
            </section>

            {/* Modules Section */}
            <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 text-center sm:mb-12">
                        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl dark:text-white">
                            Choose Your Portal
                        </h2>
                        <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-300">
                            Select the service you need to access your
                            university resources and manage your academic
                            journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
                        {/* USG Card */}
                        <Card className="group relative overflow-hidden border-0 bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800 dark:shadow-gray-900/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-green-900/20" />
                            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-green-100 opacity-20 dark:bg-green-800/30" />
                            <CardHeader className="relative pb-4">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-green-200 shadow-lg dark:from-green-800 dark:to-green-700">
                                    <img
                                        src="/usg-logo.png"
                                        alt="USG Logo"
                                        className="h-10 w-10 rounded-full object-contain"
                                    />
                                </div>
                                <CardTitle className="text-xl font-bold text-green-900 dark:text-white">
                                    USG Portal
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative pb-4">
                                <CardDescription className="leading-relaxed text-gray-600 dark:text-gray-300">
                                    University Student Government information,
                                    announcements, events, resolutions, and
                                    transparency reports.
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="relative pt-4">
                                <Button
                                    asChild
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-green-800 hover:shadow-xl dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700"
                                >
                                    <Link
                                        href="/usg"
                                        className="flex items-center justify-center"
                                    >
                                        <span className="hidden sm:inline">
                                            Visit USG Portal
                                        </span>
                                        <span className="sm:hidden">
                                            USG Portal
                                        </span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Registrar Card */}
                        <Card className="group relative overflow-hidden border-0 bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800 dark:shadow-gray-900/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-900/20" />
                            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-blue-100 opacity-20 dark:bg-blue-800/30" />
                            <CardHeader className="relative pb-4">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg dark:from-blue-800 dark:to-blue-700">
                                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <CardTitle className="text-xl font-bold text-blue-900 dark:text-white">
                                    Registrar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative pb-4">
                                <CardDescription className="leading-relaxed text-gray-600 dark:text-gray-300">
                                    Document requests, transcript applications,
                                    certificate processing, and academic record
                                    management.
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="relative pt-4">
                                <Button
                                    asChild
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
                                >
                                    <Link
                                        href="/register"
                                        className="flex items-center justify-center"
                                    >
                                        <span className="hidden sm:inline">
                                            Access Registrar
                                        </span>
                                        <span className="sm:hidden">
                                            Registrar
                                        </span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* SAS Card */}
                        <Card className="group relative overflow-hidden border-0 bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800 dark:shadow-gray-900/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-purple-900/20" />
                            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-purple-100 opacity-20 dark:bg-purple-800/30" />
                            <CardHeader className="relative pb-4">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 shadow-lg dark:from-purple-800 dark:to-purple-700">
                                    <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <CardTitle className="text-xl font-bold text-purple-900 dark:text-white">
                                    Student Affairs & Services
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative pb-4">
                                <CardDescription className="leading-relaxed text-gray-600 dark:text-gray-300">
                                    Scholarships, insurance, student
                                    organizations, calendar of activities, and
                                    student support services.
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="relative pt-4">
                                <Button
                                    asChild
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-purple-800 hover:shadow-xl dark:from-purple-500 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-700"
                                >
                                    <Link
                                        href="/sas"
                                        className="flex items-center justify-center"
                                    >
                                        <span className="hidden sm:inline">
                                            Visit SAS Portal
                                        </span>
                                        <span className="sm:hidden">
                                            SAS Portal
                                        </span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Voting System Card */}
                        <Card className="group relative overflow-hidden border-0 bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-800 dark:shadow-gray-900/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-amber-900/20" />
                            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-amber-100 opacity-20 dark:bg-amber-800/30" />
                            <CardHeader className="relative pb-4">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 shadow-lg dark:from-amber-800 dark:to-amber-700">
                                    <Vote className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                                </div>
                                <CardTitle className="text-xl font-bold text-amber-900 dark:text-white">
                                    Voting System
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative pb-4">
                                <CardDescription className="leading-relaxed text-gray-600 dark:text-gray-300">
                                    Cast your vote in university elections, view
                                    candidates, and participate in democratic
                                    processes.
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="relative pt-4">
                                <Button
                                    asChild
                                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg transition-all duration-200 hover:from-amber-700 hover:to-amber-800 hover:shadow-xl dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-600 dark:hover:to-amber-700"
                                >
                                    <a
                                        href="/votingsystem/index.php"
                                        className="flex items-center justify-center"
                                    >
                                        <span className="hidden sm:inline">
                                            Access Voting System
                                        </span>
                                        <span className="sm:hidden">
                                            Voting System
                                        </span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <img
                                src="/minsu-logo.png"
                                alt="MinSU Logo"
                                className="h-6 w-6 rounded-full object-contain sm:h-8 sm:w-8"
                            />
                            <span className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                                Mindoro State University Bongabong Campus
                                Systems
                            </span>
                        </div>
                        <div className="flex items-center space-x-6 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                            <span>
                                © 2025 Mindoro State University Bongabong
                                Campus
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
