import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { Calendar, Clock, Eye, MapPin, Users } from 'lucide-react';

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
    created_at: string;
}

interface EventCardProps {
    event: Event;
    variant?: 'full' | 'compact';
    showActions?: boolean;
}

export default function EventCard({
    event,
    variant = 'full',
    showActions = true,
}: EventCardProps) {
    const handleViewEvent = () => {
        router.visit(`/usg/events/${event.id}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'draft':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
            case 'cancelled':
                return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
            case 'completed':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
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

    const isRegistrationOpen = () => {
        if (!event.registration_deadline) return false;
        const deadline = new Date(event.registration_deadline);
        const now = new Date();
        return now < deadline && event.status === 'published';
    };

    const isEventUpcoming = () => {
        const eventDateTime = new Date(
            `${event.event_date}T${event.event_time}`,
        );
        const now = new Date();
        return eventDateTime > now;
    };

    if (variant === 'compact') {
        return (
            <Card
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={handleViewEvent}
            >
                <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <h3 className="line-clamp-2 text-sm font-semibold">
                                    {event.title}
                                </h3>
                                <Badge
                                    className={getStatusColor(event.status)}
                                    variant="secondary"
                                >
                                    {event.status}
                                </Badge>
                            </div>

                            <div className="mb-2 flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(event.event_date)}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatTime(event.event_time)}
                                </div>
                            </div>

                            {event.location && (
                                <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {event.location}
                                </div>
                            )}
                        </div>

                        {event.image_path && (
                            <img
                                src={event.image_path}
                                alt={event.title}
                                className="ml-4 h-16 w-16 rounded object-cover"
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            {event.image_path && (
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={event.image_path}
                        alt={event.title}
                        className="h-full w-full object-cover"
                    />
                    <Badge
                        className={`absolute top-3 right-3 ${getStatusColor(event.status)}`}
                        variant="secondary"
                    >
                        {event.status}
                    </Badge>
                </div>
            )}

            <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                    <h3 className="line-clamp-2 text-xl font-semibold">
                        {event.title}
                    </h3>
                    {!event.image_path && (
                        <Badge
                            className={getStatusColor(event.status)}
                            variant="secondary"
                        >
                            {event.status}
                        </Badge>
                    )}
                </div>

                <p className="mb-4 line-clamp-3 text-muted-foreground">
                    {event.description}
                </p>

                <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(event.event_date)} at{' '}
                        {formatTime(event.event_time)}
                    </div>

                    {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Organized by {event.organizer}
                    </div>

                    {event.max_participants && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {event.current_participants || 0} /{' '}
                            {event.max_participants} participants
                        </div>
                    )}

                    {event.registration_deadline && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Registration deadline:{' '}
                            {formatDate(event.registration_deadline)}
                        </div>
                    )}
                </div>

                {showActions && (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleViewEvent}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Button>

                        {isRegistrationOpen() &&
                            isEventUpcoming() &&
                            event.max_participants && (
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700"
                                    disabled={
                                        (event.current_participants || 0) >=
                                        event.max_participants
                                    }
                                >
                                    {(event.current_participants || 0) >=
                                    event.max_participants
                                        ? 'Full'
                                        : 'Register'}
                                </Button>
                            )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
