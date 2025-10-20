import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Filter,
    Plus,
} from 'lucide-react';
import { useState } from 'react';

interface Event {
    id: number;
    title: string;
    event_date: string;
    event_time: string;
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    category?: string;
    color?: string;
}

interface CalendarWidgetProps {
    events: Event[];
    onDateSelect?: (date: Date) => void;
    onEventClick?: (event: Event) => void;
    showAddButton?: boolean;
    onAddEvent?: () => void;
}

export default function CalendarWidget({
    events,
    onDateSelect,
    onEventClick,
    showAddButton = false,
    onAddEvent,
}: CalendarWidgetProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getEventsForDate = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        return events.filter((event) => event.event_date === dateString);
    };

    const handlePrevMonth = () => {
        setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
        );
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
        );
        setSelectedDate(clickedDate);
        onDateSelect?.(clickedDate);
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day,
            );
            const dayEvents = getEventsForDate(date);
            const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.getFullYear() === currentDate.getFullYear();
            const isToday = new Date().toDateString() === date.toDateString();

            days.push(
                <div
                    key={day}
                    className={`min-h-[2.5rem] cursor-pointer rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''
                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    <div className="text-sm font-medium">{day}</div>
                    {dayEvents.length > 0 && (
                        <div className="mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                                <div
                                    key={event.id}
                                    className="cursor-pointer truncate rounded px-1 py-0.5 text-xs"
                                    style={{
                                        backgroundColor:
                                            event.color || '#3b82f6',
                                        color: 'white',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEventClick?.(event);
                                    }}
                                >
                                    {event.title}
                                </div>
                            ))}
                            {dayEvents.length > 2 && (
                                <div className="px-1 text-xs text-muted-foreground">
                                    +{dayEvents.length - 2} more
                                </div>
                            )}
                        </div>
                    )}
                </div>,
            );
        }

        return days;
    };

    const selectedDateEvents = selectedDate
        ? getEventsForDate(selectedDate)
        : [];

    return (
        <Card className="w-full">
            <CardContent className="p-4">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        <h3 className="font-semibold">
                            {monthNames[currentDate.getMonth()]}{' '}
                            {currentDate.getFullYear()}
                        </h3>
                    </div>

                    <div className="flex items-center gap-2">
                        {showAddButton && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onAddEvent}
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                Add
                            </Button>
                        )}

                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePrevMonth}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleNextMonth}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-4 grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {dayNames.map((day) => (
                        <div
                            key={day}
                            className="p-2 text-center text-sm font-medium text-muted-foreground"
                        >
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {renderCalendarDays()}
                </div>

                {/* Selected date events */}
                {selectedDate && selectedDateEvents.length > 0 && (
                    <div className="border-t pt-4">
                        <h4 className="mb-2 font-medium">
                            Events on{' '}
                            {selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </h4>

                        <div className="space-y-2">
                            {selectedDateEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    onClick={() => onEventClick?.(event)}
                                >
                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            backgroundColor:
                                                event.color || '#3b82f6',
                                        }}
                                    />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">
                                            {event.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {event.event_time}
                                        </div>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        {event.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Event summary */}
                <div className="mt-4 border-t pt-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            Total events this month:{' '}
                            {
                                events.filter((event) => {
                                    const eventDate = new Date(
                                        event.event_date,
                                    );
                                    return (
                                        eventDate.getMonth() ===
                                            currentDate.getMonth() &&
                                        eventDate.getFullYear() ===
                                            currentDate.getFullYear()
                                    );
                                }).length
                            }
                        </span>

                        <Button variant="ghost" size="sm">
                            <Filter className="mr-1 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
