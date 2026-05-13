import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function InterventionCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '', intervention_type: '', description: '', start_date: '', end_date: '', status: 'planned',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('guidance.admin.interventions.store')); };

    return (
        <AppLayout>
            <Head title="Create Intervention" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.interventions.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Intervention</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Intervention Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Title</Label><Input value={data.title} onChange={(e) => setData('title', e.target.value)} />{errors.title && <p className="text-sm text-red-600">{errors.title}</p>}</div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Type</Label>
                                    <Select value={data.intervention_type} onValueChange={(v) => setData('intervention_type', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="counseling">Counseling</SelectItem>
                                            <SelectItem value="workshop">Workshop</SelectItem>
                                            <SelectItem value="mentoring">Mentoring</SelectItem>
                                            <SelectItem value="referral">Referral Program</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.intervention_type && <p className="text-sm text-red-600">{errors.intervention_type}</p>}
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="planned">Planned</SelectItem>
                                            <SelectItem value="ongoing">Ongoing</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Start Date</Label><Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} /></div>
                                <div><Label>End Date</Label><Input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} /></div>
                            </div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} />{errors.description && <p className="text-sm text-red-600">{errors.description}</p>}</div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('guidance.admin.interventions.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}