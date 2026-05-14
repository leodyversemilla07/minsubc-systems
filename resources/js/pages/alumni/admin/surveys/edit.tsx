import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SurveyEdit({ survey }: { survey: any }) {
    const { data, setData, put, processing, errors } = useForm({
        title: survey.title, is_active: survey.is_active,
        ends_at: survey.ends_at?.slice(0, 10) ?? '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('alumni.admin.surveys.update', survey.id)); };
    return (
        <AppLayout>
            <Head title="Edit Survey" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.surveys.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Survey</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Survey Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Title</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>End Date</Label><Input type="date" value={data.ends_at} onChange={(e) => setData('ends_at', e.target.value)} /></div>
                                <label className="flex items-center gap-2 pt-6"><input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300" /> Active</label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('alumni.admin.surveys.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}