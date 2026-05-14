import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SurveyCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '', description: '', survey_type: 'graduate_tracer', target_year: '', starts_at: '', ends_at: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('alumni.admin.surveys.store')); };
    return (
        <AppLayout>
            <Head title="Add Survey" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.surveys.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Survey</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Survey Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Title</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)} />{errors.title && <p className="text-sm text-red-600">{errors.title}</p>}</div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Type</Label>
                                    <Select value={data.survey_type} onValueChange={(v) => setData('survey_type', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="graduate_tracer">Graduate Tracer</SelectItem>
                                            <SelectItem value="satisfaction">Satisfaction</SelectItem>
                                            <SelectItem value="feedback">Feedback</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Target Year</Label><Input type="number" value={data.target_year} onChange={(e) => setData('target_year', e.target.value)} /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Start Date</Label><Input type="date" value={data.starts_at} onChange={(e) => setData('starts_at', e.target.value)} /></div>
                                <div><Label>End Date</Label><Input type="date" value={data.ends_at} onChange={(e) => setData('ends_at', e.target.value)} /></div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('alumni.admin.surveys.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}