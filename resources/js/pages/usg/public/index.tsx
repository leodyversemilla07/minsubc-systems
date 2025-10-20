import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { type BreadcrumbItem } from '@/types';
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

interface Props {
    announcements: Announcement[];
    upcomingEvents: Event[];
    _featuredOfficers: Officer[];
    stats: {
        totalOfficers: number;
        totalResolutions: number;
        upcomingEvents: number;
        recentAnnouncements: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'USG Portal',
        href: '/usg',
    },
];

export default function USGHomepage({
    announcements,
    upcomingEvents,
    stats,
}: Props) {
    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title="USG Information Portal" />

            {/* Hero Section */}
            <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white dark:from-blue-800 dark:to-blue-900">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-4 text-4xl font-bold">
                        University Student Government
                    </h1>
                    <p className="mb-6 text-xl text-blue-100">
                        Serving the MinSUBC community with transparency,
                        leadership, and dedication
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="secondary">
                            <Link href="/usg/vmgo">
                                <FileText className="mr-2 h-4 w-4" />
                                Our Vision & Mission
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-blue-600"
                        >
                            <Link href="/usg/officers">
                                <Users className="mr-2 h-4 w-4" />
                                Meet Our Officers
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-2xl font-semibold">
                                    {stats.totalOfficers}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Active Officers
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <FileText className="h-8 w-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-2xl font-semibold">
                                    {stats.totalResolutions}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Resolutions Passed
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-purple-600" />
                            <div className="ml-4">
                                <p className="text-2xl font-semibold">
                                    {stats.upcomingEvents}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Upcoming Events
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Megaphone className="h-8 w-8 text-orange-600" />
                            <div className="ml-4">
                                <p className="text-2xl font-semibold">
                                    {stats.recentAnnouncements}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Recent Announcements
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Featured Announcements */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center">
                                    <Megaphone className="mr-2 h-5 w-5" />
                                    Latest Announcements
                                </CardTitle>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/usg/announcements">
                                        View All
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {announcements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                    >
                                        {announcement.featured_image && (
                                            <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-muted">
                                                <img
                                                    src={
                                                        announcement.featured_image
                                                    }
                                                    alt={announcement.title}
                                                    className="h-full w-full rounded-lg object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <Badge
                                                    variant={
                                                        announcement.priority ===
                                                        'high'
                                                            ? 'destructive'
                                                            : announcement.priority ===
                                                                'medium'
                                                              ? 'default'
                                                              : 'secondary'
                                                    }
                                                >
                                                    {announcement.priority}
                                                </Badge>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {new Date(
                                                        announcement.publish_date,
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/usg/announcements/${announcement.slug}`}
                                                className="group block"
                                            >
                                                <h3 className="mb-1 font-semibold transition-colors group-hover:text-blue-600">
                                                    {announcement.title}
                                                </h3>
                                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                                    {announcement.excerpt}
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Upcoming Events */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                Upcoming Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {upcomingEvents.map((event) => (
                                    <Link
                                        key={event.id}
                                        href={`/usg/events/${event.slug}`}
                                        className="block rounded-lg border p-3 transition-colors hover:bg-muted/50"
                                    >
                                        <h4 className="mb-1 text-sm font-medium">
                                            {event.title}
                                        </h4>
                                        <div className="text-xs text-muted-foreground">
                                            {new Date(
                                                event.start_date,
                                            ).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            📍 {event.location}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="mt-4 w-full"
                            >
                                <Link href="/usg/events">View All Events</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Access</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start"
                                >
                                    <Link href="/usg/resolutions">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Browse Resolutions
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start"
                                >
                                    <Link href="/usg/events/calendar">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Event Calendar
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start"
                                >
                                    <Link href="/usg/officers">
                                        <Users className="mr-2 h-4 w-4" />
                                        Officer Directory
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PublicLayout>
    );
}
