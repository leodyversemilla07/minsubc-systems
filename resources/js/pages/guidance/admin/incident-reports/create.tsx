import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function IncidentCreate() {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '', type: '', severity: 'moderate', incident_date: '', location: '', description: '', actions_taken: '', status: 'open',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('guidance.admin.incident-reports.store')); };

    return (
        <AppLayout>
            <Head title="Create Incident Report" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.incident-reports.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Incident Report</h1>
                </div>
                <Card className="max-w-2xl">
                    <CardHeader><CardTitle><AlertTriangle className="mr-2 inline h-5 w-5" />Incident Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Student ID</Label><Input value={data.student_id} onChange={(e) => setData('student_id', e.target.value)} />{errors.student_id && <p className="text-sm text-red-600">{errors.student_id}</p>}</div>
                                <div><Label>Incident Date</Label><Input type="date" value={data.incident_date} onChange={(e) => setData('incident_date', e.target.value)} />{errors.incident_date && <p className="text-sm text-red-600">{errors.incident_date}</p>}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Type</Label>
                                    <Select value={data.type} onValueChange={(v) => setData('type', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bullying">Bullying</SelectItem>
                                            <SelectItem value="harassment">Harassment</SelectItem>
                                            <SelectItem value="violence">Violence</SelectItem>
                                            <SelectItem value="disciplinary">Disciplinary</SelectItem>
                                            <SelectItem value="mental_health">Mental Health</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                                </div>
                                <div>
                                    <Label>Severity</Label>
                                    <Select value={data.severity} onValueChange={(v) => setData('severity', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="critical">Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div><Label>Location</Label><Input value={data.location} onChange={(e) => setData('location', e.target.value)} placeholder="Where did it occur?" /></div>
                            <div><Label>Description</Label><Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} placeholder="Detailed description of the incident" />{errors.description && <p className="text-sm text-red-600">{errors.description}</p>}</div>
                            <div><Label>Actions Taken</Label><Textarea value={data.actions_taken} onChange={(e) => setData('actions_taken', e.target.value)} rows={3} placeholder="Immediate actions taken" /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('guidance.admin.incident-reports.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}