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
import { ArrowRight, FileText, GraduationCap, Vote } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="Mindoro State University Bongabong Campus - Student Portal" />

            {/* Hero Section */}
            <section className="gradient-subtle relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
                <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
                            <img
                                src="/minsu-logo.png"
                                alt="MinSU Logo"
                                className="relative h-16 w-16 rounded-full object-contain shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24"
                            />
                        </div>
                    </div>
                    <h1 className="mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                        Welcome to{' '}
                        <span className="text-gradient-primary">
                            Mindoro State University Bongabong Campus Systems
                        </span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:mb-12 sm:text-lg md:text-xl">
                        Your comprehensive student portal for University Student
                        Government, Academic Records, and Student Services.
                        Access all your university resources in one unified
                        platform.
                    </p>
                </div>
            </section>

            {/* Modules Section */}
            <section className="section-spacing bg-background px-4 sm:px-6 lg:px-8">
                <div className="container-wide">
                    <div className="mb-8 text-center sm:mb-12">
                        <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
                            Choose Your Portal
                        </h2>
                        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                            Select the service you need to access your
                            university resources and manage your academic
                            journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
                        {/* USG Card */}
                        <Card className="card-interactive group relative overflow-hidden border shadow-lg">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-primary/10 opacity-50" />
                            <CardHeader className="relative pb-4">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/20 shadow-lg">
                                    <img
                                        src="/usg-logo.png"
                                        alt="USG Logo"
                                        className="h-10 w-10 rounded-full object-contain"
                                    />
                                </div>
                                <CardTitle className="text-xl font-bold">
                                    USG Portal
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative pb-4">
                                <CardDescription className="leading-relaxed">
                                    University Student Government information,
                                    announcements, events, resolutions, and
                                    transparency reports.
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="relative pt-4">
                                <Button asChild className="w-full gradient-primary shadow-primary">
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
                        <Card className="card-interactive group relative overflow-hidden border shadow-lg">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-primary/10 opacity-50" />
                            <CardHeader className="relative pb-4">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/20 shadow-lg">
                                    <FileText className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl font-bold">
                                    Registrar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative pb-4">
                                <CardDescription className="leading-relaxed">
                                    Document requests, transcript applications,
                                    certificate processing, and academic record
                                    management.
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="relative pt-4">
                                <Button asChild className="w-full gradient-primary shadow-primary">
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
                        <Card className="card-interactive group relative overflow-hidden border shadow-lg">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-primary/10 opacity-50" />
                            <CardHeader className="relative pb-4">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/20 shadow-lg">
                                    <GraduationCap className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-xl font-bold">
                                    Student Affairs & Services
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative pb-4">
                                <CardDescription className="leading-relaxed">
                                    Scholarships, insurance, student
                                    organizations, calendar of activities, and
                                    student support services.
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="relative pt-4">
                                <Button asChild className="w-full gradient-primary shadow-primary">
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
                        <Card className="card-interactive group relative overflow-hidden border shadow-lg">
                            <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-accent/20 opacity-50" />
                            <CardHeader className="relative pb-4">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-accent/20 to-accent/30 shadow-lg">
                                    <Vote className="h-8 w-8 text-accent-foreground" />
                                </div>
                                <CardTitle className="text-xl font-bold">
                                    Voting System
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative pb-4">
                                <CardDescription className="leading-relaxed">
                                    Cast your vote in university elections, view
                                    candidates, and participate in democratic
                                    processes.
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="relative pt-4">
                                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
                                    <a
                                        href="/voting"
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
            <footer className="border-t bg-muted/50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
                <div className="container-wide">
                    <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <img
                                src="/minsu-logo.png"
                                alt="MinSU Logo"
                                className="h-6 w-6 rounded-full object-contain sm:h-8 sm:w-8"
                            />
                            <span className="text-base font-semibold sm:text-lg">
                                Mindoro State University Bongabong Campus
                                Systems
                            </span>
                        </div>
                        <div className="flex items-center space-x-6 text-xs text-muted-foreground sm:text-sm">
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
