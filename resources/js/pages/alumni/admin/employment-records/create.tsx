import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EmploymentRecordCreate({ alumni }: { alumni: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        alumnus_id: '', company_name: '', position: '', industry: '',
        employment_type: 'full-time', monthly_income: '', start_date: '', is_current: false,
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('alumni.admin.employment-records.store')); };
    return (
        <AppLayout>
            <Head title="Add Employment Record" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.employment-records.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Employment Record</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Employment Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Alumnus</Label>
                                <Select value={data.alumnus_id} onValueChange={(v) => setData('alumnus_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select alumnus" /></SelectTrigger>
                                    <SelectContent>{alumni.map((a: any) => <SelectItem key={a.id} value={String(a.id)}>{a.first_name} {a.last_name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Company</Label><Input value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} />{errors.company_name && <p className="text-sm text-red-600">{errors.company_name}</p>}</div>
                                <div><Label>Position</Label><Input value={data.position} onChange={(e) => setData('position', e.target.value)} /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Industry</Label>
                                    <Select value={data.industry} onValueChange={(v) => setData('industry', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="IT">IT</SelectItem>
                                            <SelectItem value="Education">Education</SelectItem>
                                            <SelectItem value="Finance">Finance</SelectItem>
                                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Type</Label>
                                    <Select value={data.employment_type} onValueChange={(v) => setData('employment_type', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="full-time">Full Time</SelectItem>
                                            <SelectItem value="part-time">Part Time</SelectItem>
                                            <SelectItem value="contract">Contract</SelectItem>
                                            <SelectItem value="self-employed">Self-Employed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Start Date</Label><Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} /></div>
                                <div><Label>Monthly Income</Label><Input type="number" step="0.01" value={data.monthly_income} onChange={(e) => setData('monthly_income', e.target.value)} /></div>
                            </div>
                            <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_current} onChange={(e) => setData('is_current', e.target.checked)} className="h-4 w-4 rounded border-gray-300" /> Current Job</label>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('alumni.admin.employment-records.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}