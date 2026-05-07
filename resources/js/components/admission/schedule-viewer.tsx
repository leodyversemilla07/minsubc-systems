import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, MapPin, User } from 'lucide-react';

interface ScheduleItem {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    room: string | null;
    type: 'lec' | 'lab';
    subject: {
        id: number;
        code: string;
        name: string;
        units: number;
    };
    instructor: {
        id: number;
        first_name: string;
        last_name: string;
    } | null;
}

interface ScheduleViewerProps {
    schedules: ScheduleItem[];
    className?: string;
    compact?: boolean;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ScheduleViewer({ schedules, className, compact = false }: ScheduleViewerProps) {
    const scheduleByDay = useMemo(() => {
        const grouped: Record<string, ScheduleItem[]> = {};
        DAYS.forEach((day) => (grouped[day] = []));

        schedules.forEach((schedule) => {
            if (grouped[schedule.day]) {
                grouped[schedule.day].push(schedule);
            }
        });

        // Sort by start time
        Object.keys(grouped).forEach((day) => {
            grouped[day].sort((a, b) =>
                a.start_time.localeCompare(b.start_time)
            );
        });

        return grouped;
    }, [schedules]);

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const getTypeColor = (type: 'lec' | 'lab') => {
        return type === 'lab' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400';
    };

    if (compact) {
        return (
            <div className={cn('space-y-2', className)}>
                {DAYS.map((day) => {
                    const daySchedules = scheduleByDay[day];
                    if (daySchedules.length === 0) return null;

                    return (
                        <div key={day} className="text-sm">
                            <p className="font-medium text-gray-600 dark:text-gray-400">
                                {day}
                            </p>
                            <div className="ml-2 space-y-1">
                                {daySchedules.map((schedule) => (
                                    <div key={schedule.id} className="flex items-center gap-2 text-gray-500">
                                        <span className="font-mono">
                                            {formatTime(schedule.start_time)}
                                        </span>
                                        <span>-</span>
                                        <span className="font-mono">
                                            {formatTime(schedule.end_time)}
                                        </span>
                                        <span className="font-medium">
                                            {schedule.subject.code}
                                        </span>
                                        {schedule.room && (
                                            <span className="text-gray-400">
                                                ({schedule.room})
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {schedules.length === 0 && (
                    <p className="text-sm text-gray-500">No classes scheduled</p>
                )}
            </div>
        );
    }

    return (
        <div className={cn('space-y-4', className)}>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2">
                {DAYS.map((day) => {
                    const daySchedules = scheduleByDay[day];
                    return (
                        <div
                            key={day}
                            className={cn(
                                'rounded-lg border p-2 text-center text-sm font-medium',
                                daySchedules.length > 0
                                    ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400'
                                    : 'border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400'
                            )}
                        >
                            <span className="hidden lg:inline">{day.slice(0, 3)}</span>
                            <span className="lg:hidden">{day.slice(0, 1)}</span>
                            {daySchedules.length > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="ml-1 h-5 w-5 p-0 text-xs"
                                >
                                    {daySchedules.length}
                                </Badge>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Schedule Cards */}
            <div className="grid grid-cols-7 gap-2">
                {DAYS.map((day) => {
                    const daySchedules = scheduleByDay[day];

                    return (
                        <div
                            key={day}
                            className="space-y-2 rounded-lg border bg-gray-50 p-2 dark:bg-gray-900"
                        >
                            {daySchedules.length === 0 ? (
                                <p className="py-4 text-center text-xs text-gray-400">
                                    -
                                </p>
                            ) : (
                                daySchedules.map((schedule) => (
                                    <div
                                        key={schedule.id}
                                        className="rounded-lg border bg-white p-2 text-xs shadow-sm dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                                                {schedule.subject.code}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    'text-[10px]',
                                                    getTypeColor(schedule.type)
                                                )}
                                            >
                                                {schedule.type.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <p className="mb-1 truncate font-medium leading-tight">
                                            {schedule.subject.name}
                                        </p>
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <Clock className="h-3 w-3" />
                                            <span>
                                                {formatTime(schedule.start_time)} -{' '}
                                                {formatTime(schedule.end_time)}
                                            </span>
                                        </div>
                                        {schedule.room && (
                                            <div className="mt-1 flex items-center gap-1 text-gray-500">
                                                <MapPin className="h-3 w-3" />
                                                <span>{schedule.room}</span>
                                            </div>
                                        )}
                                        {schedule.instructor && (
                                            <div className="mt-1 flex items-center gap-1 text-gray-500">
                                                <User className="h-3 w-3" />
                                                <span className="truncate">
                                                    {schedule.instructor.first_name[0]}.{' '}
                                                    {schedule.instructor.last_name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-blue-100 dark:bg-blue-900" />
                    <span>Lecture (LEC)</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-green-100 dark:bg-green-900" />
                    <span>Laboratory (LAB)</span>
                </div>
            </div>
        </div>
    );
}