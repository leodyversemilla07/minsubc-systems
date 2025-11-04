import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import USGLayout from '@/layouts/usg-layout';
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    MapPin,
    PartyPopper,
    User,
    Users,
} from 'lucide-react';

interface Event {
    id: number;
    title: string;
    description: string;
    event_date: string;
    event_time: string;
    location: string;
    organizer: string;
    max_participants: number | null;
    current_participants?: number;
    image_path: string | null;
    status: 'draft' | 'published' | 'cancelled' | 'archived';
    category?: string;
    requirements?: string;
    contact_info?: string;
    tags?: string[];
    created_at: string;
}

interface Props {
    event: Event;
    relatedEvents?: Event[];
}

export default function EventShow({
    event,
    relatedEvents = [],
}: Props) {
    const handleBack = () => {
        router.visit('/usg/events');
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Date TBA';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return 'Time TBA';
        // Handle both HH:MM:SS and HH:MM formats
        const time = new Date(`2000-01-01T${timeString}`);
        if (isNaN(time.getTime())) return 'Invalid Time';
        return time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const isEventUpcoming = () => {
        const eventDateTime = new Date(
            `${event.event_date}T${event.event_time}`,
        );
        const now = new Date();
        return eventDateTime > now;
    };

    const isRegistrationOpen = () => {
        return event.status === 'published' && isEventUpcoming();
    };

    const isEventFull = () => {
        return (
            event.max_participants &&
            (event.current_participants || 0) >= event.max_participants
        );
    };

    const getRegistrationStatus = () => {
        if (event.status === 'cancelled') return 'cancelled';
        if (event.status === 'archived') return 'archived';
        if (!isEventUpcoming()) return 'past';
        if (isEventFull()) return 'full';
        if (!isRegistrationOpen()) return 'closed';
        return 'open';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'draft':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            case 'cancelled':
                return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
            case 'archived':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const formatStatus = (status: string) => {
        switch (status) {
            case 'published':
                return 'Published';
            case 'draft':
                return 'draft';
            case 'cancelled':
                return 'Cancelled';
            case 'archived':
                return 'Archived';
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    const registrationStatus = getRegistrationStatus();

    return (
        <USGLayout>
            <Head title={`${event.title} - USG Events`} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[var(--usg-primary)] via-[var(--usg-primary)] to-[var(--usg-dark)] py-20 text-white">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl"></div>
                </div>
                
                <div className="relative z-10 container mx-auto max-w-4xl px-4">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="mb-8 text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Events
                    </Button>

                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                            <PartyPopper className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                            <div className="mb-4 flex flex-wrap gap-2">
                                <Badge className={`${getStatusColor(event.status)} border-white/30 backdrop-blur-sm`}>
                                    {formatStatus(event.status)}
                                </Badge>
                                {event.category && (
                                    <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm">
                                        {event.category}
                                    </Badge>
                                )}
                            </div>

                            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap gap-4 text-sm text-white/90">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {formatDate(event.event_date)} at{' '}
                                        {formatTime(event.event_time)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{event.organizer}</span>
                                </div>
                                {event.max_participants && (
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        <span>
                                            {event.current_participants || 0} / {event.max_participants} participants
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-4xl px-4">
                    <article className="space-y-8">
                        {/* Registration Status Alert */}
                        {registrationStatus !== 'open' && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="flex items-start gap-3">
                                    {registrationStatus === 'cancelled' && (
                                        <>
                                            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                                            <div>
                                                <p className="font-medium text-red-900 dark:text-red-100">
                                                    Event Cancelled
                                                </p>
                                                <p className="text-sm text-red-700 dark:text-red-300">
                                                    This event has been
                                                    cancelled. Please check for
                                                    alternative arrangements.
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {registrationStatus === 'archived' && (
                                        <>
                                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                                            <div>
                                                <p className="font-medium text-blue-900 dark:text-blue-100">
                                                    Event Archived
                                                </p>
                                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                                    This event has been archived.
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {registrationStatus === 'past' && (
                                        <>
                                            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                                    Past Event
                                                </p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    This event has already
                                                    occurred.
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {registrationStatus === 'full' && (
                                        <>
                                            <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                                            <div>
                                                <p className="font-medium text-orange-900 dark:text-orange-100">
                                                    Event Full
                                                </p>
                                                <p className="text-sm text-orange-700 dark:text-orange-300">
                                                    This event has reached
                                                    maximum capacity. You may
                                                    join the waitlist.
                                                </p>
                                            </div>
                                        </>
                                    )}


                                </div>
                            </div>
                        )}

                        {/* Event Image */}
                        {event.image_path && (
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <img
                                    src={event.image_path}
                                    alt={event.title}
                                    className="h-64 w-full object-cover sm:h-80"
                                />
                            </div>
                        )}

                        {/* Event Description */}
                        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                About This Event
                            </h2>
                            <div
                                className="prose prose-gray dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: event.description,
                                }}
                            />
                        </div>



                        {/* Requirements */}
                        {event.requirements && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                    Requirements
                                </h3>
                                <div
                                    className="prose prose-sm prose-gray dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: event.requirements,
                                    }}
                                />
                            </div>
                        )}

                        {/* Contact Information */}
                        {event.contact_info && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                    Contact Information
                                </h3>
                                <div
                                    className="prose prose-sm prose-gray dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: event.contact_info,
                                    }}
                                />
                            </div>
                        )}

                        {/* Tags */}
                        {event.tags && event.tags.length > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {event.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Related Events */}
                    {relatedEvents.length > 0 && (
                        <div className="mt-12 space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Related Events
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {relatedEvents.slice(0, 4).map((related) => (
                                    <div
                                        key={related.id}
                                        className="cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-900"
                                        onClick={() =>
                                            router.visit(
                                                `/usg/events/${related.id}`,
                                            )
                                        }
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <Badge className={getStatusColor(related.status)}>
                                                {formatStatus(related.status)}
                                            </Badge>
                                            {related.category && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {related.category}
                                                </Badge>
                                            )}
                                        </div>
                                        <h3 className="mb-3 line-clamp-2 font-semibold text-gray-900 hover:text-green-600 dark:text-white dark:hover:text-green-500">
                                            {related.title}
                                        </h3>
                                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(related.event_date)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                {related.location}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-12 rounded-xl bg-gradient-to-br from-[var(--usg-primary)] to-[var(--usg-dark)] p-12 text-center text-white shadow-lg">
                        <h2 className="mb-4 text-3xl font-bold">
                            Explore More Events
                        </h2>
                        <p className="mb-6 text-lg text-white/90">
                            Discover more exciting events and activities
                            organized by the USG
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => router.visit('/usg/events')}
                                className="bg-white text-[var(--usg-primary)] hover:bg-gray-100"
                            >
                                View All Events
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() =>
                                    router.visit('/usg/events/calendar')
                                }
                                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Event Calendar
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </USGLayout>
    );
}
