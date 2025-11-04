import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Carousel from '@/components/usg/carousel';
import CountUp from '@/components/usg/count-up';
import { OfficerCardSkeleton } from '@/components/usg/skeleton';
import USGLayout from '@/layouts/usg-layout';
import usg from '@/routes/usg';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Calendar,
    FileText,
    GraduationCap,
    Megaphone,
    Users,
} from 'lucide-react';

interface Officer {
    id: number;
    name: string;
    position: string;
    photo?: string;
}

interface Announcement {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    featured_image?: string;
    publish_date: string;
}

interface Props {
    featuredOfficers: Officer[];
    recentAnnouncements: Announcement[];
    stats: {
        totalOfficers: number;
        totalResolutions: number;
        upcomingEvents: number;
        recentAnnouncements: number;
        totalStudents?: number;
        activeProjects?: number;
        eventsThisYear?: number;
        volunteersActive?: number;
    };
}

export default function USGHomepage({
    stats,
    featuredOfficers,
    recentAnnouncements,
}: Props) {
    return (
        <USGLayout>
            <Head title="USG Information Portal" />

            {/* Hero Section - Clear Value Proposition */}
            <section className="relative -mt-28 overflow-hidden bg-gradient-to-br from-[var(--usg-primary)] via-[var(--usg-primary)] to-[var(--usg-dark)] pt-36 pb-20 text-white sm:pt-48">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>

                <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-semibold backdrop-blur-sm">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            Empowering Students Since Day One
                        </div>
                        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Your Voice. Your Campus.
                            <br />
                            <span className="text-[var(--usg-light)]">
                                Your Future.
                            </span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-lg text-[var(--usg-hero-text)] sm:text-xl lg:text-2xl">
                            We're here to represent you, amplify your concerns,
                            and create meaningful change in our university
                            community.
                        </p>

                        {/* Primary CTAs */}
                        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-[var(--usg-primary)] shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-[var(--usg-light)] hover:shadow-green-300/50"
                            >
                                <Link
                                    href="/usg/about"
                                    className="px-10 py-4 text-lg font-bold"
                                >
                                    Get Involved
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-2 border-white/30 bg-[var(--usg-dark)]/80 text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-[var(--usg-very-dark)]"
                            >
                                <Link
                                    href={usg.announcements.index.url()}
                                    className="px-10 py-4 text-lg font-bold"
                                >
                                    View Latest Updates
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        {/* Social Proof - Impact Statistics */}
                        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 border-t border-white/20 pt-10 md:grid-cols-4">
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
                                    <CountUp
                                        end={stats.totalStudents || 2500}
                                        suffix="+"
                                        duration={2000}
                                    />
                                </div>
                                <div className="text-sm tracking-wide text-[var(--usg-hero-text)] uppercase">
                                    Students Represented
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
                                    <CountUp
                                        end={stats.activeProjects || 12}
                                        duration={2000}
                                    />
                                </div>
                                <div className="text-sm tracking-wide text-[var(--usg-hero-text)] uppercase">
                                    Active Projects
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
                                    <CountUp
                                        end={
                                            stats.eventsThisYear ||
                                            stats.upcomingEvents
                                        }
                                        duration={2000}
                                    />
                                </div>
                                <div className="text-sm tracking-wide text-[var(--usg-hero-text)] uppercase">
                                    Events This Year
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
                                    <CountUp
                                        end={
                                            stats.volunteersActive ||
                                            stats.totalOfficers
                                        }
                                        duration={2000}
                                    />
                                </div>
                                <div className="text-sm tracking-wide text-[var(--usg-hero-text)] uppercase">
                                    Active Volunteers
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section - Our Purpose */}
            <section className="bg-white py-16 dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                            What We Do For You
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            From advocacy to events, we're dedicated to
                            enhancing student life at MinSUBC
                        </p>
                    </div>

                    <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Student Representation */}
                        <Card className="group border-0 bg-[var(--usg-light)] shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800/50">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-[var(--usg-primary)] p-4 dark:bg-[var(--usg-dark)]">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                    Student Advocacy
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Representing your voice in university
                                    matters and fighting for student rights
                                </p>
                            </CardContent>
                        </Card>

                        {/* Events & Programs */}
                        <Card className="group border-0 bg-[var(--usg-light)] shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800/50">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-purple-700 p-4 dark:bg-purple-600">
                                    <Calendar className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                    Events & Programs
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Organizing activities that bring our
                                    community together and enrich campus life
                                </p>
                            </CardContent>
                        </Card>

                        {/* Policy & Resolutions */}
                        <Card className="group border-0 bg-[var(--usg-light)] shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800/50">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-blue-700 p-4 dark:bg-blue-600">
                                    <FileText className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                    Policy Making
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Creating and passing resolutions that
                                    improve student experience
                                </p>
                            </CardContent>
                        </Card>

                        {/* Communication */}
                        <Card className="group border-0 bg-[var(--usg-light)] shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800/50">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-orange-700 p-4 dark:bg-orange-600">
                                    <Megaphone className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                    Communication
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Keeping you informed with updates,
                                    announcements, and campus news
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Bar - By The Numbers */}
            <section className="bg-[var(--usg-primary)] py-12">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 text-center text-white md:grid-cols-4">
                        <div>
                            <div className="mb-2 text-3xl font-bold sm:text-4xl">
                                <CountUp
                                    end={stats.totalOfficers}
                                    duration={2000}
                                />
                            </div>
                            <div className="text-sm tracking-wide text-[var(--usg-hero-text)] uppercase">
                                Dedicated Officers
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold sm:text-4xl">
                                <CountUp
                                    end={stats.totalResolutions}
                                    duration={2000}
                                />
                            </div>
                            <div className="text-sm tracking-wide text-[var(--usg-hero-text)] uppercase">
                                Resolutions Passed
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold sm:text-4xl">
                                <CountUp
                                    end={stats.upcomingEvents}
                                    duration={2000}
                                />
                            </div>
                            <div className="text-sm tracking-wide text-[var(--usg-hero-text)] uppercase">
                                Upcoming Events
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-3xl font-bold sm:text-4xl">
                                <CountUp
                                    end={stats.recentAnnouncements}
                                    duration={2000}
                                />
                            </div>
                            <div className="text-sm tracking-wide text-[var(--usg-hero-text)] uppercase">
                                Recent Updates
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-[var(--usg-primary)] py-20 text-white">
                <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                        Ready to Make a Difference?
                    </h2>
                    <p className="mb-10 text-xl text-[var(--usg-light)] dark:text-[var(--usg-hero-text)]">
                        Join us in shaping the future of MinSUBC. Your voice
                        matters, and we want to hear it.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-[var(--usg-primary)] shadow-xl transition-all hover:-translate-y-0.5 hover:bg-[var(--usg-very-light)] hover:shadow-2xl"
                        >
                            <Link
                                href="/usg/contact"
                                className="px-10 py-4 text-lg font-bold"
                            >
                                Contact Us
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-white bg-transparent text-white backdrop-blur-sm hover:bg-white hover:text-green-700"
                        >
                            <Link
                                href="/usg/about"
                                className="px-10 py-4 text-lg font-bold"
                            >
                                Learn More About USG
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Meet Our Officers Section */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                            Meet Our Officers
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Get to know the dedicated leaders working to make
                            MinSUBC better for everyone
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredOfficers && featuredOfficers.length > 0 ? (
                            <Carousel
                                items={featuredOfficers.map((officer) => (
                                    <Card
                                        key={officer.id}
                                        className="group mx-2 border-0 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
                                    >
                                        <CardContent className="p-6 text-center">
                                            <div className="mb-4">
                                                {officer.photo ? (
                                                    <img
                                                        src={officer.photo}
                                                        alt={officer.name}
                                                        className="mx-auto h-24 w-24 rounded-full object-cover shadow-md"
                                                    />
                                                ) : (
                                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--usg-primary)] text-white shadow-md">
                                                        <Users className="h-12 w-12" />
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                                {officer.name}
                                            </h3>
                                            <p className="text-sm font-medium text-[var(--usg-primary)]">
                                                {officer.position}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                                autoplay
                                interval={5000}
                                className="col-span-full"
                            />
                        ) : (
                            <>
                                <OfficerCardSkeleton />
                                <OfficerCardSkeleton />
                                <OfficerCardSkeleton />
                            </>
                        )}
                    </div>

                    <div className="mt-12 text-center">
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-[var(--usg-primary)] text-[var(--usg-primary)] hover:bg-[var(--usg-primary)] hover:text-white"
                        >
                            <Link href={usg.officers.index.url()}>
                                View All Officers
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Latest Announcements Section */}
            <section className="bg-white py-16 dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                            Latest Announcements
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            Stay updated with the most recent news and updates
                            from the USG
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {recentAnnouncements.map((announcement) => {
                            // Map category to appropriate icon and color
                            const categoryConfig: Record<
                                string,
                                { icon: React.ElementType; color: string }
                            > = {
                                Academic: {
                                    icon: Megaphone,
                                    color: 'bg-[var(--usg-primary)]',
                                },
                                Welfare: {
                                    icon: Calendar,
                                    color: 'bg-purple-700 dark:bg-purple-600',
                                },
                                Scholarship: {
                                    icon: FileText,
                                    color: 'bg-blue-700 dark:bg-blue-600',
                                },
                                Events: {
                                    icon: Calendar,
                                    color: 'bg-orange-700 dark:bg-orange-600',
                                },
                            };

                            const config = categoryConfig[
                                announcement.category
                            ] || {
                                icon: Megaphone,
                                color: 'bg-[var(--usg-primary)]',
                            };
                            const IconComponent = config.icon;

                            return (
                                <Card
                                    key={announcement.id}
                                    className="group border-0 bg-gray-50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
                                >
                                    <CardContent className="p-6">
                                        <div
                                            className={`mb-4 inline-block rounded-full ${config.color} p-3`}
                                        >
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                            {announcement.title}
                                        </h3>
                                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                                            {announcement.excerpt}
                                        </p>
                                        <Link
                                            href={usg.announcements.show.url(
                                                announcement.slug,
                                            )}
                                            className="text-sm font-medium text-[var(--usg-primary)] hover:underline"
                                        >
                                            Read More →
                                        </Link>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-[var(--usg-primary)] text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-[var(--usg-dark)] hover:shadow-2xl"
                        >
                            <Link href={usg.announcements.index.url()}>
                                View All Announcements
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Transparency Section Teaser */}
            <section className="bg-[var(--usg-light)] py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
                            Transparency & Accountability
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            We believe in open governance. Access our financial
                            reports, meeting minutes, and more.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-[var(--usg-primary)] text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-[var(--usg-dark)] hover:shadow-2xl"
                        >
                            <Link href={usg.transparency.index.url()}>
                                Explore Transparency
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </USGLayout>
    );
}
