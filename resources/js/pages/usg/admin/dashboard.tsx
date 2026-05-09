import { Head } from '@inertiajs/react';
import { type PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Props extends PageProps {
    recentAnnouncements: any[];
    upcomingEvents: any[];
    stats: any;
}

export default function Dashboard({ recentAnnouncements, upcomingEvents, stats }: Props) {
    return (
        <AppLayout>
            <Head title="USG Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-2xl font-bold">USG Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">Total Announcements</p>
                        <p className="text-2xl font-bold">{stats?.total_announcements ?? 0}</p>
                    </div>
                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">Upcoming Events</p>
                        <p className="text-2xl font-bold">{stats?.upcoming_events ?? 0}</p>
                    </div>
                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">Active Officers</p>
                        <p className="text-2xl font-bold">{stats?.active_officers ?? 0}</p>
                    </div>
                    <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">Published Resolutions</p>
                        <p className="text-2xl font-bold">{stats?.published_resolutions ?? 0}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}