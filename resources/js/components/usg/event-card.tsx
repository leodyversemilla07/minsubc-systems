import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import usg from '@/routes/usg';
import { Link } from '@inertiajs/react';
import { Calendar, MapPin, Users } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    description: string;
    slug?: string;
    event_date: string;
    event_time: string;
    location: string;
    organizer: string;
    max_participants: number | null;
    current_participants?: number;
    registration_deadline: string | null;
    image_path: string | null;
    status: 'draft' | 'published' | 'cancelled' | 'archived';
    created_at: string;
}

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'draft':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
            case 'cancelled':
                return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
            case 'archived':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Date TBA';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return 'Time TBA';
        try {
            return new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
                'en-US',
                {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                },
            );
        } catch {
            return 'Time TBA';
        }
    };

    const formatStatus = (status: string) => {
        switch (status) {
            case 'published':
                return 'Published';
            case 'draft':
                return 'Draft';
            case 'cancelled':
                return 'Cancelled';
            case 'archived':
                return 'Archived';
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
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

    const getEventUrl = () => {
        if (event.slug) {
            return usg.events.show.url({ event: event.slug });
        }
        return `/usg/events/${event.id}`;
    };

    return (
        <Card className="flex flex-col overflow-hidden bg-white transition-shadow duration-300 hover:shadow-lg dark:bg-gray-900">
            {/* Event Image */}
            {event.image_path && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                        src={event.image_path}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                        <Badge className={getStatusColor(event.status)}>
                            {formatStatus(event.status)}
                        </Badge>
                    </div>
                </div>
            )}

            <CardHeader className="pb-3">
                {/* Status badge - only show if no image */}
                {!event.image_path && (
                    <Badge
                        variant="outline"
                        className={`w-fit ${getStatusColor(event.status)}`}
                    >
                        {formatStatus(event.status)}
                    </Badge>
                )}

                <Link href={getEventUrl()} className="group/title">
                    <CardTitle className="line-clamp-2 transition-colors group-hover/title:text-primary">
                        {event.title}
                    </CardTitle>
                </Link>

                <CardDescription className="space-y-1">
                    <div className="flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>
                            {formatDate(event.event_date)} at{' '}
                            {formatTime(event.event_time)}
                        </span>
                    </div>
                    {event.location && (
                        <div className="flex items-center gap-1 text-xs">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1 text-xs">
                        <Users className="h-3 w-3" />
                        <span>by {event.organizer}</span>
                    </div>
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow space-y-3">
                <p className="line-clamp-3 text-sm leading-relaxed">
                    {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 border-t border-border pt-3">
                    {event.max_participants && (
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                                Participants
                            </span>
                            <span className="font-medium">
                                {event.current_participants || 0} /{' '}
                                {event.max_participants}
                            </span>
                        </div>
                    )}

                    {event.registration_deadline && (
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                                Registration Deadline
                            </span>
                            <span className="font-medium">
                                {formatDate(event.registration_deadline)}
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={getEventUrl()}>View Details</Link>
                </Button>

                {isRegistrationOpen() &&
                    isEventUpcoming() &&
                    event.max_participants && (
                        <Button
                            size="sm"
                            className="flex-1"
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
            </CardFooter>
        </Card>
    );
}
