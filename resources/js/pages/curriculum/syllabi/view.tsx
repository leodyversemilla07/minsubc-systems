import { Head } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';

export default function ViewSyllabus({ syllabus }: { syllabus: any }) {
    return (
        <AppLayout>
            <Head title={syllabus?.title ?? 'Syllabus'} />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><FileText className="mr-2 inline h-6 w-6" />{syllabus?.title ?? 'Syllabus'}</h1>
                {syllabus ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="p-6">
                            <h2 className="mb-2 text-lg font-semibold">Details</h2>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between"><dt className="text-muted-foreground">Course</dt><dd className="font-medium">{syllabus.course?.code} — {syllabus.course?.name}</dd></div>
                                <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{syllabus.status}</dd></div>
                            </dl>
                        </Card>
                        {syllabus.description && (
                            <Card className="p-6">
                                <h2 className="mb-2 text-lg font-semibold">Description</h2>
                                <p className="text-muted-foreground text-sm">{syllabus.description}</p>
                            </Card>
                        )}
                    </div>
                ) : <Card className="p-6"><p className="text-muted-foreground">Syllabus not found.</p></Card>}
            </div>
        </AppLayout>
    );
}