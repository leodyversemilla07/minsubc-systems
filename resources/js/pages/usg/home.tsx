import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Carousel from '@/components/usg/carousel';
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
}

export default function USGHomepage({
    featuredOfficers,
    recentAnnouncements,
}: Props) {
    return (
        <USGLayout>
            <Head title="USG Information Portal" />

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
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/20 px-6 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            Empowering Students Since Day One
                        </div>
                        <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight drop-shadow-md sm:text-5xl lg:text-6xl">
                            Your Voice. Your Campus.
                            <br />
                            <span className="text-green-200 dark:text-green-400">
                                Your Future.
                            </span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-green-50 sm:text-xl lg:text-2xl dark:text-gray-200">
                            We're here to represent you, amplify your concerns,
                            and create meaningful change in our university
                            community.
                        </p>

                        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/usg/about"
                                className="inline-flex h-14 items-center justify-center rounded-lg bg-white px-8 text-lg font-bold text-green-700 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-2xl"
                            >
                                Get Involved
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href={usg.announcements.index.url()}
                                className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-white/30 bg-green-900/80 px-8 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-green-950"
                            >
                                View Latest Updates
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="bg-white py-16 dark:bg-gray-950">
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
                        <Card className="group border-0 bg-green-50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-green-700 p-4 dark:bg-green-900">
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
                        <Card className="group border-0 bg-green-50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-purple-700 p-4 dark:bg-purple-900">
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
                        <Card className="group border-0 bg-green-50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-blue-700 p-4 dark:bg-blue-900">
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
                        <Card className="group border-0 bg-green-50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-orange-700 p-4 dark:bg-orange-900">
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

            {/* Call to Action Section */}
            <section className="relative overflow-hidden bg-green-700 py-20 text-white dark:bg-green-900">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                        Ready to Make a Difference?
                    </h2>
                    <p className="mb-10 text-xl text-green-100 dark:text-green-200">
                        Join us in shaping the future of MinSUBC. Your voice
                        matters, and we want to hear it.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/usg/contact"
                            className="inline-flex h-14 items-center justify-center rounded-lg bg-white px-8 text-lg font-bold text-green-700 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-2xl"
                        >
                            Contact Us
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="/usg/about"
                            className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-green-700"
                        >
                            Learn More About USG
                        </Link>
                    </div>
                </div>
            </section>

            {/* Meet Our Officers Section */}
            <section
                className="bg-gray-50 py-16 dark:bg-gray-900"
                id="officers"
            >
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
                                        className="group mx-2 border-0 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
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
                                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-700 shadow-md ring-4 ring-white dark:bg-green-900/50 dark:text-green-300 dark:ring-gray-700">
                                                        <Users className="h-12 w-12" />
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                                {officer.name}
                                            </h3>
                                            <p className="text-sm font-medium tracking-wide text-green-700 uppercase dark:text-green-400">
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
                            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
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
            <section
                className="bg-white py-16 dark:bg-gray-950"
                id="announcements"
            >
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
                                    color: 'bg-green-700 dark:bg-green-900',
                                },
                                Welfare: {
                                    icon: Calendar,
                                    color: 'bg-purple-700 dark:bg-purple-900',
                                },
                                Scholarship: {
                                    icon: FileText,
                                    color: 'bg-blue-700 dark:bg-blue-900',
                                },
                                Events: {
                                    icon: Calendar,
                                    color: 'bg-orange-700 dark:bg-orange-900',
                                },
                            };

                            const config = categoryConfig[
                                announcement.category
                            ] || {
                                icon: Megaphone,
                                color: 'bg-green-700 dark:bg-green-900',
                            };
                            const IconComponent = config.icon;

                            return (
                                <Card
                                    key={announcement.id}
                                    className="group flex h-full flex-col border-0 bg-gray-50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
                                >
                                    <CardContent className="flex flex-1 flex-col p-6">
                                        <div
                                            className={`mb-4 inline-block w-fit rounded-full ${config.color} p-3 shadow-md`}
                                        >
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 dark:text-white">
                                            {announcement.title}
                                        </h3>
                                        <p className="mb-4 line-clamp-3 flex-1 text-gray-600 dark:text-gray-400">
                                            {announcement.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                                            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                                                {announcement.publish_date}
                                            </span>
                                            <Link
                                                href={usg.announcements.show.url(
                                                    announcement.slug,
                                                )}
                                                className="flex items-center text-sm font-bold text-green-700 hover:text-green-800 hover:underline dark:text-green-400 dark:hover:text-green-300"
                                            >
                                                Read More{' '}
                                                <ArrowRight
                                                    size={14}
                                                    className="ml-1"
                                                />
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-green-700 text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-2xl dark:bg-green-600 dark:hover:bg-green-500"
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
            <section
                className="bg-green-50 py-16 dark:bg-gray-900"
                id="transparency"
            >
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
                            className="bg-green-800 hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-600"
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
