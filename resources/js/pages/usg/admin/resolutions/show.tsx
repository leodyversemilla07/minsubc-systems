import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Download, Pencil } from 'lucide-react';

interface ResolutionData {
    id: number; title: string; resolution_number: string; content: string; description: string;
    category: string; status: string; date_passed: string; file_path: string | null;
    created_at: string; author?: { name: string };
}

interface Props extends PageProps { resolution: ResolutionData }

export default function ResolutionShow({ resolution }: Props) {
    return (
        <AppLayout>
            <Head title={resolution.title} />
            <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('usg.admin.resolutions.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                        <h1 className="text-2xl font-bold">{resolution.resolution_number}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('usg.admin.resolutions.edit', resolution.id)}><Button variant="outline"><Pencil className="mr-2 h-4 w-4" /> Edit</Button></Link>
                    </div>
                </div>
                <h2 className="text-xl">{resolution.title}</h2>
                <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{resolution.category}</Badge>
                    <Badge variant={resolution.status === 'published' ? 'secondary' : 'outline'}>{resolution.status}</Badge>
                </div>
                {resolution.date_passed && <p className="text-sm text-muted-foreground">Date Passed: {new Date(resolution.date_passed).toLocaleDateString()}</p>}
                {resolution.description && <p>{resolution.description}</p>}
                <Card><CardContent className="p-6"><div className="prose max-w-none">{resolution.content}</div></CardContent></Card>
            </div>
        </AppLayout>
    );
}