import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    Calendar,
    BookOpen,
    Clock,
} from 'lucide-react';

interface ScheduleItem {
    subject: string;
    subject_code: string;
    day: string;
    start_time: string;
    end_time: string;
    room: string | null;
    instructor: string | null;
    color: string;
}

interface ScheduleStats {
    total_subjects: number;
    total_units: number;
    total_hours: number;
}

interface SchedulePageProps extends PageProps {
    scheduleDetails: ScheduleItem[];
    subjectColors: Record<string, string>;
    stats: ScheduleStats | null;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAY_LABELS: Record<string, string> = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
};

export default function StudentSchedule({ scheduleDetails, subjectColors, stats }: SchedulePageProps) {
    // Group schedule by day for the grid
    const scheduleByDay = DAYS.reduce<Record<string, ScheduleItem[]>>((acc, day) => {
        acc[day.toLowerCase()] = scheduleDetails.filter(
            (s) => s.day.toLowerCase() === day.toLowerCase()
        );
        return acc;
    }, {});

    return (
        <>
            <Head title="Class Schedule" />

            <div className="space-y-6 p-6">
                <div>
                    <Link
                        href={route('student.enrollment.index')}
                        className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">Class Schedule</h1>
                    <p className="text-muted-foreground">Your weekly class schedule</p>
                </div>

                {/* Legend */}
                {Object.keys(subjectColors).length > 0 && (
                    <div className="flex flex-wrap gap-4">
                        {Object.entries(subjectColors).map(([subject, color]) => (
                            <div key={subject} className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded" style={{ backgroundColor: color }} />
                                <span className="text-sm text-muted-foreground">{subject}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Schedule Cards by Day */}
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
                            {DAYS.slice(0, 6).map((day) => {
                                const dayItems = scheduleByDay[day.toLowerCase()] || [];
                                return (
                                    <div key={day} className="space-y-2 rounded-lg border bg-muted/30 p-3">
                                        <p className="text-center text-xs font-medium uppercase text-muted-foreground">
                                            {DAY_LABELS[day.toLowerCase()] || day.substring(0, 3)}
                                        </p>
                                        {dayItems.length === 0 ? (
                                            <p className="py-4 text-center text-xs text-muted-foreground">—</p>
                                        ) : (
                                            dayItems.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="rounded-lg p-2 text-xs"
                                                    style={{
                                                        backgroundColor: `${item.color}20`,
                                                        borderLeft: `3px solid ${item.color}`,
                                                    }}
                                                >
                                                    <p className="font-semibold">{item.subject_code || item.subject}</p>
                                                    <p className="text-muted-foreground">
                                                        {item.start_time} — {item.end_time}
                                                    </p>
                                                    {item.room && (
                                                        <p className="text-muted-foreground">{item.room}</p>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                {stats && (
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardContent className="flex items-center gap-3 p-4">
                                <BookOpen className="h-8 w-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Subjects</p>
                                    <p className="text-2xl font-bold">{stats.total_subjects}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center gap-3 p-4">
                                <Calendar className="h-8 w-8 text-green-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Units</p>
                                    <p className="text-2xl font-bold">{stats.total_units}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center gap-3 p-4">
                                <Clock className="h-8 w-8 text-orange-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Hours/Week</p>
                                    <p className="text-2xl font-bold">{stats.total_hours} hrs</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Detailed Schedule Table */}
                {scheduleDetails.length > 0 && (
                    <Card>
                        <div className="border-b px-6 py-4">
                            <h3 className="text-lg font-semibold">Detailed Schedule</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Subject</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Day</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Time</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Room</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-muted-foreground">Instructor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {scheduleDetails.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-muted/30">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-3 w-3 rounded-full"
                                                        style={{ backgroundColor: item.color }}
                                                    />
                                                    <span className="font-medium">{item.subject}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm capitalize">{item.day}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {item.start_time} &mdash; {item.end_time}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{item.room || 'TBA'}</td>
                                            <td className="px-4 py-3 text-sm">{item.instructor || 'TBA'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
}

StudentSchedule.layout = (page: React.ReactNode) => <AppLayout children={page} />;