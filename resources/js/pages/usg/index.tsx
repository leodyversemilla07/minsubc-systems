import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import USGLayout from '@/layouts/usg-layout';
import usg from '@/routes/usg';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Calendar,
    Clock,
    FileText,
    Megaphone,
    Users,
} from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    priority: 'low' | 'medium' | 'high';
    publish_date: string;
    featured_image?: string;
}

interface Event {
    id: number;
    title: string;
    description: string;
    slug: string;
    start_date: string;
    location: string;
}

interface Officer {
    id: number;
    name: string;
    position: string;
    photo?: string;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    announcements: PaginatedData<Announcement>;
    upcomingEvents: Event[]; // This is a plain array, not paginated
    _featuredOfficers: Officer[];
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
    announcements,
    upcomingEvents,
    stats,
}: Props) {
    return (
        <USGLayout>
            <Head title="USG Information Portal" />

            {/* Hero Section - Clear Value Proposition */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-green-700 py-20 text-white dark:from-green-800 dark:via-green-700 dark:to-green-900 lg:py-28">
                <div className="absolute inset-0 opacity-10 dark:opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                </div>
                <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mb-6 inline-block rounded-full bg-white/20 px-6 py-2 text-sm font-semibold backdrop-blur-sm">
                            🎓 Empowering MinSUBC Students Since Day One
                        </div>
                        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Your Voice. Your Campus.<br />
                            <span className="text-green-200">Your Future.</span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-lg text-green-50 sm:text-xl lg:text-2xl">
                            We're here to represent you, amplify your concerns, and create meaningful change in our university community.
                        </p>
                        
                        {/* Primary CTAs */}
                        <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-green-700 shadow-2xl transition-all hover:bg-green-50 hover:-translate-y-0.5 hover:shadow-green-300/50"
                            >
                                <Link href="/usg/about" className="px-10 py-4 text-lg font-bold">
                                    Get Involved
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-2 border-white/30 bg-green-800/80 text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-green-900"
                            >
                                <Link href={usg.announcements.index.url()} className="px-10 py-4 text-lg font-bold">
                                    View Latest Updates
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        {/* Social Proof - Impact Statistics */}
                        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 border-t border-white/20 pt-10 md:grid-cols-4">
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold lg:text-5xl">{stats.totalStudents ? stats.totalStudents.toLocaleString() : '2,500+'}</div>
                                <div className="text-sm uppercase tracking-wide text-green-100">Students Represented</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold lg:text-5xl">{stats.activeProjects || '12'}</div>
                                <div className="text-sm uppercase tracking-wide text-green-100">Active Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold lg:text-5xl">{stats.eventsThisYear || stats.upcomingEvents}</div>
                                <div className="text-sm uppercase tracking-wide text-green-100">Events This Year</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold lg:text-5xl">{stats.volunteersActive || stats.totalOfficers}</div>
                                <div className="text-sm uppercase tracking-wide text-green-100">Active Volunteers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section - Our Purpose */}
            <section className="bg-white py-16 dark:bg-gray-900">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                            What We Do For You
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            From advocacy to events, we're dedicated to enhancing student life at MinSUBC
                        </p>
                    </div>
                    
                    <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Student Representation */}
                        <Card className="group border-0 bg-gradient-to-br from-green-50 to-green-100/50 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 dark:from-green-900/30 dark:to-green-800/20">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-green-700 p-4 dark:bg-green-600">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Student Advocacy</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Representing your voice in university matters and fighting for student rights
                                </p>
                            </CardContent>
                        </Card>

                        {/* Events & Programs */}
                        <Card className="group border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 dark:from-purple-900/30 dark:to-purple-800/20">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-purple-700 p-4 dark:bg-purple-600">
                                    <Calendar className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Events & Programs</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Organizing activities that bring our community together and enrich campus life
                                </p>
                            </CardContent>
                        </Card>

                        {/* Policy & Resolutions */}
                        <Card className="group border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 dark:from-blue-900/30 dark:to-blue-800/20">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-blue-700 p-4 dark:bg-blue-600">
                                    <FileText className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Policy Making</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Creating and passing resolutions that improve student experience
                                </p>
                            </CardContent>
                        </Card>

                        {/* Communication */}
                        <Card className="group border-0 bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 dark:from-orange-900/30 dark:to-orange-800/20">
                            <CardContent className="p-8">
                                <div className="mb-4 inline-block rounded-full bg-orange-700 p-4 dark:bg-orange-600">
                                    <Megaphone className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Communication</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Keeping you informed with updates, announcements, and campus news
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Bar - By The Numbers */}
            <section className="bg-gradient-to-r from-green-700 to-green-600 py-12 dark:from-green-800 dark:to-green-700">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 text-center text-white md:grid-cols-4">
                        <div>
                            <div className="mb-2 text-4xl font-bold">{stats.totalOfficers}</div>
                            <div className="text-sm uppercase tracking-wide text-green-100">Dedicated Officers</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold">{stats.totalResolutions}</div>
                            <div className="text-sm uppercase tracking-wide text-green-100">Resolutions Passed</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold">{stats.upcomingEvents}</div>
                            <div className="text-sm uppercase tracking-wide text-green-100">Upcoming Events</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold">{stats.recentAnnouncements}</div>
                            <div className="text-sm uppercase tracking-wide text-green-100">Recent Updates</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Content Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-10 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                            Stay Updated
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Get the latest news, announcements, and upcoming events from your student government
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Featured Announcements */}
                        <div className="lg:col-span-2">
                            <Card className="border-0 shadow-xl dark:bg-gray-900">
                                <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center text-2xl font-bold dark:text-white">
                                            <div className="mr-3 rounded-lg bg-green-700 p-3 dark:bg-green-600">
                                                <Megaphone className="h-6 w-6 text-white" />
                                            </div>
                                            Latest Announcements
                                        </CardTitle>
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className="text-green-700 hover:bg-green-100 hover:text-green-800"
                                        >
                                            <Link href="/usg/announcements">
                                                View All
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {announcements?.data?.length > 0 ? (
                                            announcements.data.slice(0, 4).map((announcement) => (
                                                <Link
                                                    key={announcement.id}
                                                    href={`/usg/announcements/${announcement.slug}`}
                                                    className="group block"
                                                >
                                                    <div className="flex items-start space-x-4 rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-green-200 hover:bg-green-50/50 hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:border-green-700 dark:hover:bg-green-900/20">
                                                        {announcement.featured_image && (
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                                                                <img
                                                                    src={announcement.featured_image}
                                                                    alt={announcement.title}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="min-w-0 flex-1">
                                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                                <Badge
                                                                    variant={
                                                                        announcement.priority === 'high'
                                                                            ? 'destructive'
                                                                            : announcement.priority === 'medium'
                                                                              ? 'default'
                                                                              : 'secondary'
                                                                    }
                                                                    className="font-semibold"
                                                                >
                                                                    {announcement.priority.toUpperCase()}
                                                                </Badge>
                                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                                    <Clock className="mr-1 h-3 w-3" />
                                                                    {new Date(announcement.publish_date).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                            <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-green-700 dark:text-white dark:group-hover:text-green-400">
                                                                {announcement.title}
                                                            </h3>
                                                            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                                                                {announcement.excerpt}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="py-16 text-center">
                                                <div className="mx-auto mb-4 inline-block rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                                                    <Megaphone className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                                </div>
                                                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">No announcements yet</p>
                                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Check back soon for updates!</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Upcoming Events */}
                            <Card className="border-0 shadow-xl dark:bg-gray-900">
                                <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20">
                                    <CardTitle className="flex items-center text-xl font-bold dark:text-white">
                                        <div className="mr-3 rounded-lg bg-purple-700 p-3 dark:bg-purple-600">
                                            <Calendar className="h-5 w-5 text-white" />
                                        </div>
                                        Upcoming Events
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-5">
                                    <div className="space-y-3">
                                        {upcomingEvents?.length > 0 ? (
                                            upcomingEvents.slice(0, 3).map((event) => (
                                                <Link
                                                    key={event.id}
                                                    href={`/usg/events/${event.slug}`}
                                                    className="group block rounded-xl border-2 border-gray-100 bg-white p-4 transition-all hover:border-purple-200 hover:bg-purple-50 hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:hover:border-purple-700 dark:hover:bg-purple-900/20"
                                                >
                                                    <h4 className="mb-2 font-bold text-gray-900 transition-colors group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-400">
                                                        {event.title}
                                                    </h4>
                                                    <div className="mb-1 flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        {new Date(event.start_date).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                        <span className="mr-2">📍</span>
                                                        {event.location}
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="py-10 text-center">
                                                <div className="mx-auto mb-3 inline-block rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                                                    <Calendar className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                                                </div>
                                                <p className="font-medium text-gray-600 dark:text-gray-300">No upcoming events</p>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Stay tuned!</p>
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        asChild
                                        className="mt-5 w-full bg-purple-700 hover:bg-purple-800"
                                    >
                                        <Link href={usg.events.index.url()}>
                                            View All Events
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Quick Links */}
                            <Card className="border-0 shadow-xl dark:bg-gray-900">
                                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                                    <CardTitle className="text-xl font-bold dark:text-white">Quick Access</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="space-y-2">
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className="w-full justify-start text-base font-medium hover:bg-green-50 hover:text-green-700"
                                        >
                                            <Link href={usg.vmgo.show.url()}>
                                                <FileText className="mr-3 h-5 w-5" />
                                                Vision & Mission
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className="w-full justify-start text-base font-medium hover:bg-purple-50 hover:text-purple-700"
                                        >
                                            <Link href={usg.officers.index.url()}>
                                                <Users className="mr-3 h-5 w-5" />
                                                Our Officers
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className="w-full justify-start text-base font-medium hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            <Link href={usg.resolutions.index.url()}>
                                                <FileText className="mr-3 h-5 w-5" />
                                                Resolutions
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 py-20 text-white dark:from-green-800 dark:via-green-700 dark:to-emerald-800">
                <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                        Ready to Make a Difference?
                    </h2>
                    <p className="mb-10 text-xl text-green-50 dark:text-green-100">
                        Join us in shaping the future of MinSUBC. Your voice matters, and we want to hear it.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-green-700 shadow-xl transition-all hover:bg-green-50 hover:-translate-y-0.5 hover:shadow-2xl"
                        >
                            <Link href="/usg/contact" className="px-10 py-4 text-lg font-bold">
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
                            <Link href="/usg/about" className="px-10 py-4 text-lg font-bold">
                                Learn More About USG
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </USGLayout>
    );
}
