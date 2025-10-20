import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StatusBadge from '@/components/usg/status-badge';
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    MapPin,
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
            } catch (error) {
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
        <>
            <Head title={`${event.title} - USG Events`} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="mb-2"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Events
                        </Button>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Main Content */}
                    <article className="space-y-6">
                        {/* Header */}
                        <Card>
                            <CardHeader>
                                <div className="mb-4 flex items-start justify-between">
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

                                <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                    {event.title}
                                </h1>

                                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(event.event_date)} at{' '}
                                        {formatTime(event.event_time)}
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {event.location}
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        Organized by {event.organizer}
                                    </div>

                                    {event.max_participants && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Users className="h-4 w-4" />
                                            {event.current_participants ||
                                                0} / {event.max_participants}{' '}
                                            participants
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Registration Status Alert */}
                        {registrationStatus !== 'open' && (
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        {registrationStatus === 'cancelled' && (
                                            <>
                                                <AlertCircle className="h-5 w-5 text-red-600" />
                                                <div>
                                                    <p className="font-medium text-red-900 dark:text-red-100">
                                                        Event Cancelled
                                                    </p>
                                                    <p className="text-red-700 dark:text-red-300">
                                                        This event has been
                                                        cancelled. Please check
                                                        for alternative
                                                        arrangements.
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {registrationStatus === 'completed' && (
                                            <>
                                                <CheckCircle className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="font-medium text-blue-900 dark:text-blue-100">
                                                        Event Completed
                                                    </p>
                                                    <p className="text-blue-700 dark:text-blue-300">
                                                        This event has already
                                                        taken place.
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {registrationStatus === 'past' && (
                                            <>
                                                <Clock className="h-5 w-5 text-gray-600" />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        Past Event
                                                    </p>
                                                    <p className="text-gray-700 dark:text-gray-300">
                                                        This event has already
                                                        occurred.
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {registrationStatus === 'full' && (
                                            <>
                                                <Users className="h-5 w-5 text-orange-600" />
                                                <div>
                                                    <p className="font-medium text-orange-900 dark:text-orange-100">
                                                        Event Full
                                                    </p>
                                                    <p className="text-orange-700 dark:text-orange-300">
                                                        This event has reached
                                                        maximum capacity. You
                                                        may join the waitlist.
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {registrationStatus === 'closed' && (
                                            <>
                                                <Clock className="h-5 w-5 text-yellow-600" />
                                                <div>
                                                    <p className="font-medium text-yellow-900 dark:text-yellow-100">
                                                        Registration Closed
                                                    </p>
                                                    <p className="text-yellow-700 dark:text-yellow-300">
                                                        The registration
                                                        deadline has passed.
                                                        {event.registration_deadline &&
                                                            ` Deadline was ${formatDate(event.registration_deadline)}.`}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Event Image */}
                        {event.image_path && (
                            <Card>
                                <CardContent className="p-0">
                                    <img
                                        src={event.image_path}
                                        alt={event.title}
                                        className="h-64 w-full rounded-t-lg object-cover sm:h-80"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Event Description */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="mb-4 text-xl font-semibold">
                                    About This Event
                                </h2>
                                <div
                                    className="prose prose-gray dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: event.description,
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Registration Section */}
                        {registrationStatus === 'open' && (
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="mb-4 text-xl font-semibold">
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
                                                    <p className="text-green-700 dark:text-green-300">
                                                        We look forward to
                                                        seeing you at the event.
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                onClick={handleUnregister}
                                                className="border-red-200 text-red-700 hover:bg-red-50"
                                            >
                                                Unregister
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {event.registration_deadline && (
                                                <p className="text-muted-foreground">
                                                    Registration deadline:{' '}
                                                    {formatDate(
                                                        event.registration_deadline,
                                                    )}
                                                </p>
                                            )}

                                            {canRegister ? (
                                                <Button
                                                    onClick={handleRegister}
                                                    className="w-full sm:w-auto"
                                                    size="lg"
                                                >
                                                    Register for This Event
                                                </Button>
                                            ) : (
                                                <p className="text-muted-foreground">
                                                    Please log in to register
                                                    for this event.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Requirements */}
                        {event.requirements && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-3 font-semibold">
                                        Requirements
                                    </h3>
                                    <div
                                        className="prose prose-sm prose-gray dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: event.requirements,
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Contact Information */}
                        {event.contact_info && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-3 font-semibold">
                                        Contact Information
                                    </h3>
                                    <div
                                        className="prose prose-sm prose-gray dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: event.contact_info,
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Tags */}
                        {event.tags && event.tags.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="mb-3 font-semibold">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {event.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </article>

                    {/* Related Events */}
                    {relatedEvents.length > 0 && (
                        <div className="mt-12">
                            <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                                Related Events
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {relatedEvents.slice(0, 4).map((related) => (
                                    <Card
                                        key={related.id}
                                        className="cursor-pointer transition-shadow hover:shadow-lg"
                                        onClick={() =>
                                            router.visit(
                                                `/usg/events/${related.id}`,
                                            )
                                        }
                                    >
                                        <CardContent className="p-4">
                                            <div className="mb-2 flex items-center gap-2">
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
                                            <h4 className="mb-2 line-clamp-2 font-semibold">
                                                {related.title}
                                            </h4>
                                            <div className="space-y-1 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(
                                                        related.event_date,
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {related.location}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    Explore More Events
                                </h3>
                                <p className="mb-4 text-gray-600 dark:text-gray-300">
                                    Discover more exciting events and activities
                                    organized by the USG.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Button
                                        onClick={() =>
                                            router.visit('/usg/events')
                                        }
                                    >
                                        View All Events
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            router.visit('/usg/events/calendar')
                                        }
                                    >
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Event Calendar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
