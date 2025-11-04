import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Plus,
} from 'lucide-react';
import { useState } from 'react';

interface Event {
    id: number;
    title: string;
    event_date: string;
    event_time: string;
    status: 'draft' | 'published' | 'cancelled' | 'archived';
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
            days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
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
                    className={`aspect-square cursor-pointer rounded-lg border border-gray-200 p-2 transition-all hover:border-[var(--usg-primary)] hover:shadow-sm dark:border-gray-700 dark:hover:border-[var(--usg-accent)] ${
                        isSelected
                            ? 'border-[var(--usg-primary)] bg-[var(--usg-light)] dark:border-[var(--usg-accent)] dark:bg-[var(--usg-dark)]'
                            : 'bg-white dark:bg-gray-900'
                    } ${isToday ? 'ring-2 ring-[var(--usg-primary)] dark:ring-[var(--usg-accent)]' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    <div className="flex h-full flex-col">
                        <div
                            className={`text-sm font-semibold ${isToday ? 'text-[var(--usg-primary)] dark:text-[var(--usg-accent)]' : 'text-gray-900 dark:text-white'}`}
                        >
                            {day}
                        </div>
                        {dayEvents.length > 0 && (
                            <div className="mt-1 flex-1 space-y-1 overflow-hidden">
                                {dayEvents.slice(0, 2).map((event) => (
                                    <div
                                        key={event.id}
                                        className="cursor-pointer truncate rounded px-1.5 py-0.5 text-xs font-medium"
                                        style={{
                                            backgroundColor:
                                                event.color ||
                                                'var(--usg-primary)',
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
                                    <div className="px-1 text-xs text-gray-600 dark:text-gray-400">
                                        +{dayEvents.length - 2} more
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>,
            );
        }

        return days;
    };

    const selectedDateEvents = selectedDate
        ? getEventsForDate(selectedDate)
        : [];

    return (
        <Card className="w-full bg-white dark:bg-gray-900">
            <CardContent className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-[var(--usg-light)] p-2 dark:bg-[var(--usg-dark)]">
                            <CalendarIcon className="h-5 w-5 text-[var(--usg-primary)] dark:text-[var(--usg-accent)]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
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
                                className="border-[var(--usg-primary)] text-[var(--usg-primary)] hover:bg-[var(--usg-light)] dark:border-[var(--usg-accent)] dark:text-[var(--usg-accent)] dark:hover:bg-[var(--usg-dark)]"
                            >
                                <Plus className="mr-1 h-4 w-4" />
                                Add Event
                            </Button>
                        )}

                        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePrevMonth}
                                className="rounded-r-none hover:bg-[var(--usg-light)] hover:text-[var(--usg-primary)] dark:hover:bg-[var(--usg-dark)] dark:hover:text-[var(--usg-accent)]"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleNextMonth}
                                className="rounded-l-none hover:bg-[var(--usg-light)] hover:text-[var(--usg-primary)] dark:hover:bg-[var(--usg-dark)] dark:hover:text-[var(--usg-accent)]"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-6">
                    {/* Day headers */}
                    <div className="mb-2 grid grid-cols-7 gap-2">
                        {dayNames.map((day) => (
                            <div
                                key={day}
                                className="text-center text-sm font-bold text-gray-700 dark:text-gray-300"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-2">
                        {renderCalendarDays()}
                    </div>
                </div>

                {/* Selected date events */}
                {selectedDate && selectedDateEvents.length > 0 && (
                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                        <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
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
                                    className="flex cursor-pointer items-center gap-3 rounded-lg bg-white p-3 transition-all hover:shadow-md dark:bg-gray-900 dark:hover:bg-gray-700"
                                    onClick={() => onEventClick?.(event)}
                                >
                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            backgroundColor:
                                                event.color ||
                                                'var(--usg-primary)',
                                        }}
                                    />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {event.title}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
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
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-[var(--usg-primary)] dark:text-[var(--usg-accent)]" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
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
                            }{' '}
                            events this month
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
