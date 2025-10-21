import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/usg/status-badge';
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
    Share2,
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
    registration_deadline: string | null;
    image_path: string | null;
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    category?: string;
    requirements?: string;
    contact_info?: string;
    tags?: string[];
    created_at: string;
}

interface Props {
    event: Event;
    relatedEvents?: Event[];
    isRegistered?: boolean;
    canRegister?: boolean;
}

export default function EventShow({
    event,
    relatedEvents = [],
    isRegistered = false,
    canRegister = true,
}: Props) {
    const handleBack = () => {
        router.visit('/usg/events');
    };

    const handleRegister = () => {
        // This would typically make an API call to register the user
        router.post(`/usg/events/${event.id}/register`);
    };

    const handleUnregister = () => {
        // This would typically make an API call to unregister the user
        router.delete(`/usg/events/${event.id}/register`);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: `Join us for ${event.title} on ${formatDate(event.event_date)}`,
                    url: window.location.href,
                });
            } catch {
                console.log('Sharing cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
            'en-US',
            {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            },
        );
    };

    const isEventUpcoming = () => {
        const eventDateTime = new Date(
            `${event.event_date}T${event.event_time}`,
        );
        const now = new Date();
        return eventDateTime > now;
    };

    const isRegistrationOpen = () => {
        if (!event.registration_deadline) return isEventUpcoming();
        const deadline = new Date(event.registration_deadline);
        const now = new Date();
        return (
            now < deadline && event.status === 'published' && isEventUpcoming()
        );
    };

    const isEventFull = () => {
        return (
            event.max_participants &&
            (event.current_participants || 0) >= event.max_participants
        );
    };

    const getRegistrationStatus = () => {
        if (event.status === 'cancelled') return 'cancelled';
        if (event.status === 'completed') return 'completed';
        if (!isEventUpcoming()) return 'past';
        if (isEventFull()) return 'full';
        if (!isRegistrationOpen()) return 'closed';
        return 'open';
    };

    const registrationStatus = getRegistrationStatus();

    return (
        <USGLayout>
            <Head title={`${event.title} - USG Events`} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white">
                <div className="relative container mx-auto px-4 py-12">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="mb-4 text-white hover:bg-white/10"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Events
                    </Button>

                    <div className="mb-6 flex items-center justify-center">
                        <div className="inline-flex items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-sm">
                            <PartyPopper className="h-8 w-8" />
                        </div>
                    </div>

                    <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
                        {event.title}
                    </h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-4xl px-4">
                    <article className="space-y-8">
                        {/* Header */}
                        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <StatusBadge
                                        status={event.status}
                                        showIcon
                                    />
                                    {event.category && (
                                        <Badge variant="outline">
                                            {event.category}
                                        </Badge>
                                    )}
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleShare}
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-6 text-gray-600 md:grid-cols-2 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>
                                        {formatDate(event.event_date)} at{' '}
                                        {formatTime(event.event_time)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    <span>{event.location}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    <span>Organized by {event.organizer}</span>
                                </div>

                                {event.max_participants && (
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        <span>
                                            {event.current_participants || 0} /{' '}
                                            {event.max_participants}{' '}
                                            participants
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Registration Status Alert */}
                        {registrationStatus !== 'open' && (
                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
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

                                    {registrationStatus === 'completed' && (
                                        <>
                                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                                            <div>
                                                <p className="font-medium text-blue-900 dark:text-blue-100">
                                                    Event Completed
                                                </p>
                                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                                    This event has already taken
                                                    place.
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

                                    {registrationStatus === 'closed' && (
                                        <>
                                            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                                            <div>
                                                <p className="font-medium text-yellow-900 dark:text-yellow-100">
                                                    Registration Closed
                                                </p>
                                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                                    The registration deadline
                                                    has passed.
                                                    {event.registration_deadline &&
                                                        ` Deadline was ${formatDate(event.registration_deadline)}.`}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Event Image */}
                        {event.image_path && (
                            <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
                                <img
                                    src={event.image_path}
                                    alt={event.title}
                                    className="h-64 w-full object-cover sm:h-80"
                                />
                            </div>
                        )}

                        {/* Event Description */}
                        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
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

                        {/* Registration Section */}
                        {registrationStatus === 'open' && (
                            <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                                    Registration
                                </h2>

                                {isRegistered ? (
                                    <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="font-medium text-green-900 dark:text-green-100">
                                                    You're registered!
                                                </p>
                                                <p className="text-sm text-green-700 dark:text-green-300">
                                                    We look forward to seeing
                                                    you at the event.
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={handleUnregister}
                                            className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                                        >
                                            Unregister
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {event.registration_deadline && (
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Registration deadline:{' '}
                                                {formatDate(
                                                    event.registration_deadline,
                                                )}
                                            </p>
                                        )}

                                        {canRegister ? (
                                            <Button
                                                onClick={handleRegister}
                                                className="w-full bg-green-600 hover:bg-green-700 sm:w-auto"
                                                size="lg"
                                            >
                                                Register for This Event
                                            </Button>
                                        ) : (
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Please log in to register for
                                                this event.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Requirements */}
                        {event.requirements && (
                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
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
                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
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
                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
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
                                            <StatusBadge
                                                status={related.status}
                                            />
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
                    <div className="mt-12 rounded-lg bg-gradient-to-br from-green-600 to-teal-600 p-12 text-center text-white shadow-lg">
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
                                className="bg-white text-green-600 hover:bg-gray-100"
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
