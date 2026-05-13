import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ReferralCreate() {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '', referred_to_name: '', reason: '', notes: '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('guidance.admin.referrals.store')); };

    return (
        <AppLayout>
            <Head title="Create Referral" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('guidance.admin.referrals.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Referral</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Referral Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Student ID</Label><Input value={data.student_id} onChange={(e) => setData('student_id', e.target.value)} />{errors.student_id && <p className="text-sm text-red-600">{errors.student_id}</p>}</div>
                                <div><Label>Referred To</Label><Input value={data.referred_to_name} onChange={(e) => setData('referred_to_name', e.target.value)} placeholder="Person or office" />{errors.referred_to_name && <p className="text-sm text-red-600">{errors.referred_to_name}</p>}</div>
                            </div>
                            <div><Label>Reason</Label><Textarea value={data.reason} onChange={(e) => setData('reason', e.target.value)} rows={3} placeholder="Reason for referral" />{errors.reason && <p className="text-sm text-red-600">{errors.reason}</p>}</div>
                            <div><Label>Notes</Label><Textarea value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={3} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('guidance.admin.referrals.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}