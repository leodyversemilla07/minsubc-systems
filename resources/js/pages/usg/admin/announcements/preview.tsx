import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft } from 'lucide-react';

interface AnnouncementData {
    id: number; title: string; content: string; excerpt: string;
    category: string; status: string; publish_date: string;
}

interface Props extends PageProps { announcement: AnnouncementData }

export default function AnnouncementPreview({ announcement }: Props) {
    return (
        <AppLayout>
            <Head title={`Preview: ${announcement.title}`} />
            <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href={route('usg.admin.announcements.edit', announcement.id)}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Preview: {announcement.title}</h1>
                </div>
                <div className="flex gap-2">
                    <Badge variant="secondary">{announcement.category}</Badge>
                    <Badge variant="outline">{announcement.status}</Badge>
                </div>
                <Card><CardContent className="p-6">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: announcement.content }} />
                </CardContent></Card>
            </div>
        </AppLayout>
    );
}