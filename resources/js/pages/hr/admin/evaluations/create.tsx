import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, ClipboardList } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EvaluationCreate({ employees }: { employees: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '', evaluation_type: '', period: '', rating: '3', comments: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('hr.admin.evaluations.store')); };

    return (
        <AppLayout>
            <Head title="Create Evaluation" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.evaluations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Evaluation</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle><ClipboardList className="mr-2 inline h-5 w-5" />Evaluation Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>Employee</Label>
                                <Select value={data.employee_id} onValueChange={(v) => setData('employee_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                                    <SelectContent>{employees.map((e: any) => <SelectItem key={e.id} value={String(e.id)}>{e.first_name} {e.last_name}</SelectItem>)}</SelectContent>
                                </Select>
                                {errors.employee_id && <p className="text-sm text-red-600">{errors.employee_id}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Type</Label>
                                    <Select value={data.evaluation_type} onValueChange={(v) => setData('evaluation_type', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="annual">Annual</SelectItem>
                                            <SelectItem value="quarterly">Quarterly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="probationary">Probationary</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.evaluation_type && <p className="text-sm text-red-600">{errors.evaluation_type}</p>}
                                </div>
                                <div>
                                    <Label>Period</Label>
                                    <Select value={data.period} onValueChange={(v) => setData('period', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select period" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Q1-2026">Q1 2026</SelectItem>
                                            <SelectItem value="Q2-2026">Q2 2026</SelectItem>
                                            <SelectItem value="Q3-2026">Q3 2026</SelectItem>
                                            <SelectItem value="Q4-2026">Q4 2026</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.period && <p className="text-sm text-red-600">{errors.period}</p>}
                                </div>
                            </div>
                            <div>
                                <Label>Rating (1-5)</Label>
                                <Select value={data.rating} onValueChange={(v) => setData('rating', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map((r) => <SelectItem key={r} value={String(r)}>{r} — {r === 5 ? 'Excellent' : r === 4 ? 'Good' : r === 3 ? 'Satisfactory' : r === 2 ? 'Needs Improvement' : 'Poor'}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                {errors.rating && <p className="text-sm text-red-600">{errors.rating}</p>}
                            </div>
                            <div><Label>Comments</Label><Textarea value={data.comments} onChange={(e) => setData('comments', e.target.value)} rows={4} placeholder="Evaluation comments..." />{errors.comments && <p className="text-sm text-red-600">{errors.comments}</p>}</div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('hr.admin.evaluations.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}