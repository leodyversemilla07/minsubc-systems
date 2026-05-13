import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SessionCreate({ counselors }: { counselors: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '', counselor_id: '', session_type: '', risk_level: 'low', notes: '', recommendations: '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('guidance.admin.sessions.store')); };

    return (
        <AppLayout>
            <Head title="New Session" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.sessions.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">New Counseling Session</h1>
                </div>
                <Card className="max-w-2xl">
                    <CardHeader><CardTitle>Session Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Student ID</Label><Input value={data.student_id} onChange={(e) => setData('student_id', e.target.value)} placeholder="e.g. S2025-001" />{errors.student_id && <p className="text-sm text-red-600">{errors.student_id}</p>}</div>
                                <div>
                                    <Label>Counselor</Label>
                                    <Select value={data.counselor_id} onValueChange={(v) => setData('counselor_id', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select counselor" /></SelectTrigger>
                                        <SelectContent>{counselors.map((c: any) => <SelectItem key={c.id} value={String(c.id)}>{c.full_name ?? `${c.first_name} ${c.last_name}`}</SelectItem>)}</SelectContent>
                                    </Select>
                                    {errors.counselor_id && <p className="text-sm text-red-600">{errors.counselor_id}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Session Type</Label>
                                    <Select value={data.session_type} onValueChange={(v) => setData('session_type', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="individual">Individual</SelectItem>
                                            <SelectItem value="group">Group</SelectItem>
                                            <SelectItem value="family">Family</SelectItem>
                                            <SelectItem value="career">Career</SelectItem>
                                            <SelectItem value="crisis">Crisis Intervention</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.session_type && <p className="text-sm text-red-600">{errors.session_type}</p>}
                                </div>
                                <div>
                                    <Label>Risk Level</Label>
                                    <Select value={data.risk_level} onValueChange={(v) => setData('risk_level', v)}>
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
                            <div><Label>Notes</Label><Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={4} placeholder="Session notes and observations" />{errors.notes && <p className="text-sm text-red-600">{errors.notes}</p>}</div>
                            <div><Label>Recommendations</Label><Textarea value={data.recommendations} onChange={(e) => setData('recommendations', e.target.value)} rows={3} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('guidance.admin.sessions.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}