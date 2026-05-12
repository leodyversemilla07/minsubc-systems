import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ gradeReport }: { gradeReport: any }) {
    const { data, setData, put, processing, errors } = useForm({
        grade: String(gradeReport.grade ?? ''),
        remarks: gradeReport.remarks ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('research.admin.grade-reports.update', gradeReport.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Grade Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('research.admin.grade-reports.index')}>
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Grade Report</h1>
                </div>

                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Grade Details</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm">Proposal: <span className="font-medium">{gradeReport.proposal?.title ?? '—'}</span></p>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="grade">Grade</Label>
                                <Input id="grade" type="number" step="0.5" min="1.0" max="5.0" value={data.grade} onChange={(e) => setData('grade', e.target.value)} />
                                {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade}</p>}
                            </div>
                            <div>
                                <Label htmlFor="remarks">Remarks</Label>
                                <Textarea id="remarks" value={data.remarks} onChange={(e) => setData('remarks', e.target.value)} />
                                {errors.remarks && <p className="mt-1 text-sm text-red-600">{errors.remarks}</p>}
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('research.admin.grade-reports.index')}>
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}