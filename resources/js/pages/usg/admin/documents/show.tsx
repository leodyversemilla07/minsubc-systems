import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Download, Pencil } from 'lucide-react';

interface DocumentData {
    id: number; title: string; description: string; file_name: string;
    category: string; file_size: number; downloads: number;
    created_at: string; uploader?: { id: number; name: string };
}

interface Props extends PageProps { document: DocumentData }

export default function DocumentShow({ document: doc }: Props) {
    const formatSize = (bytes: number) => bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`;

    return (
        <AppLayout>
            <Head title={doc.title} />
            <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={route('usg.admin.documents.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                        <h1 className="text-2xl font-bold">{doc.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('usg.admin.documents.edit', doc.id)}><Button variant="outline"><Pencil className="mr-2 h-4 w-4" /> Edit</Button></Link>
                    </div>
                </div>
                <div className="flex gap-2"><Badge variant="secondary">{doc.category}</Badge></div>
                <Card><CardContent className="p-6">
                    {doc.description && <p className="mb-4">{doc.description}</p>}
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>File: {doc.file_name}</span>
                        <span>Size: {formatSize(doc.file_size)}</span>
                        <span>Downloads: {doc.downloads}</span>
                        <span>Uploaded: {new Date(doc.created_at).toLocaleDateString()}</span>
                    </div>
                </CardContent></Card>
            </div>
        </AppLayout>
    );
}