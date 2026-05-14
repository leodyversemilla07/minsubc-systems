import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EmploymentRecordEdit({ record }: { record: any }) {
    const { data, setData, put, processing, errors } = useForm({
        company_name: record.company_name, position: record.position ?? '',
        industry: record.industry ?? '', is_current: record.is_current,
        end_date: record.end_date ?? '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('alumni.admin.employment-records.update', record.id)); };
    return (
        <AppLayout>
            <Head title="Edit Employment Record" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.employment-records.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Employment Record</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>{record.alumnus?.first_name} {record.alumnus?.last_name} — {record.company_name}</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Company</Label><Input value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} /></div>
                                <div><Label>Position</Label><Input value={data.position} onChange={(e) => setData('position', e.target.value)} /></div>
                            </div>
                            <div><Label>Industry</Label>
                                <Select value={data.industry} onValueChange={(v) => setData('industry', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IT">IT</SelectItem>
                                        <SelectItem value="Education">Education</SelectItem>
                                        <SelectItem value="Finance">Finance</SelectItem>
                                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-2 pt-6"><input type="checkbox" checked={data.is_current} onChange={(e) => setData('is_current', e.target.checked)} className="h-4 w-4 rounded border-gray-300" /> Current Job</label>
                                <div><Label>End Date</Label><Input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} /></div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('alumni.admin.employment-records.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}