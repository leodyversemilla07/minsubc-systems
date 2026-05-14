import { Head } from '@inertiajs/react';
import { Users, Calendar, Search } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index() {
    return (
        <AppLayout>
            <Head title="Alumni" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><Users className="mr-2 inline h-6 w-6" />Alumni</h1>
                <p className="text-muted-foreground">Alumni relations, events, donations, and graduate tracer.</p>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/alumni/directory'}>
                        <CardHeader><CardTitle><Search className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Alumni Directory</h3>
                            <p className="text-muted-foreground text-sm">Search and browse verified alumni</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/alumni/events'}>
                        <CardHeader><CardTitle><Calendar className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Upcoming Events</h3>
                            <p className="text-muted-foreground text-sm">Homecomings, reunions, and networking</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}