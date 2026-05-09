import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Pencil } from 'lucide-react';

interface AnnouncementData {
    id: number; title: string; slug: string; content: string; excerpt: string;
    category: string; status: string; publish_date: string; created_at: string;
    author?: { id: number; name: string };
}

interface Props extends PageProps {
    announcement: AnnouncementData;
}

export default function AnnouncementShow({ announcement }: Props) {
    return (
        <AppLayout>
            <Head title={announcement.title} />
            <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('usg.admin.announcements.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                        <h1 className="text-2xl font-bold">{announcement.title}</h1>
                    </div>
                    <Link href={route('usg.admin.announcements.edit', announcement.id)}>
                        <Button variant="outline"><Pencil className="mr-2 h-4 w-4" /> Edit</Button>
                    </Link>
                </div>
                <div className="flex gap-2">
                    <Badge variant="secondary">{announcement.category}</Badge>
                    <Badge variant={announcement.status === 'published' ? 'secondary' : 'outline'}>{announcement.status}</Badge>
                </div>
                {announcement.publish_date && <p className="text-sm text-muted-foreground">Published: {new Date(announcement.publish_date).toLocaleDateString()}</p>}
                <Card>
                    <CardContent className="p-6">
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: announcement.content }} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}