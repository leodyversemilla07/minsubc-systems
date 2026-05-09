import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Download, Pencil } from 'lucide-react';

interface ReportData {
    id: number; title: string; content: string; type: string; status: string;
    period_start: string; period_end: string; year: number; file_path: string | null;
    views: number; downloads: number;
    created_at: string; created_by?: { id: number; first_name: string; last_name: string };
}

interface Props extends PageProps { report: ReportData }

export default function TransparencyShow({ report }: Props) {
    const author = report.created_by ? `${report.created_by.first_name} ${report.created_by.last_name}` : 'Unknown';

    return (
        <AppLayout>
            <Head title={report.title} />
            <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('usg.admin.transparency.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                        <h1 className="text-2xl font-bold">{report.title}</h1>
                    </div>
                    <Link href={route('usg.admin.transparency.edit', report.id)}><Button variant="outline"><Pencil className="mr-2 h-4 w-4" /> Edit</Button></Link>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{report.type}</Badge>
                    <Badge variant={report.status === 'published' ? 'secondary' : 'outline'}>{report.status}</Badge>
                    <Badge variant="outline">{report.year}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                    Period: {new Date(report.period_start).toLocaleDateString()} - {new Date(report.period_end).toLocaleDateString()}
                    &nbsp;|&nbsp; Views: {report.views} | Downloads: {report.downloads} | By: {author}
                </p>
                {report.content && <Card><CardContent className="p-6"><div className="prose max-w-none">{report.content}</div></CardContent></Card>}
            </div>
        </AppLayout>
    );
}