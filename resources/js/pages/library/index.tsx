import { Head, Link } from '@inertiajs/react';
import { BookOpen, FolderOpen, Search, BookCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index() {
    return (
        <AppLayout>
            <Head title="Library" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><BookOpen className="mr-2 inline h-6 w-6" />Library</h1>
                <p className="text-muted-foreground">Book catalog, borrowing, and fine management.</p>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/library/books'}>
                        <CardHeader><CardTitle><BookCheck className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Browse Books</h3>
                            <p className="text-muted-foreground text-sm">Search and browse the library catalog</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/library/student/borrowings'}>
                        <CardHeader><CardTitle><Search className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">My Borrowings</h3>
                            <p className="text-muted-foreground text-sm">View your borrowed books and due dates</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/library/student/fines'}>
                        <CardHeader><CardTitle><FolderOpen className="h-8 w-8 text-green-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">My Fines</h3>
                            <p className="text-muted-foreground text-sm">View and pay your library fines</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}