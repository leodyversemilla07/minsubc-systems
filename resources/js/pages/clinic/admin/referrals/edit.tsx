import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ReferralEdit({ referral }: { referral: any }) {
    const { data, setData, put, processing } = useForm({
        status: referral.status,
        follow_up_notes: referral.follow_up_notes ?? '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('clinic.admin.referrals.update', referral.id)); };
    return (
        <AppLayout>
            <Head title="Edit Referral" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.referrals.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Referral</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>{referral.medical_record?.first_name} {referral.medical_record?.last_name} → {referral.referred_to}</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Status</Label>
                                <Select value={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div><Label>Follow-up Notes</Label><textarea value={data.follow_up_notes} onChange={(e) => setData('follow_up_notes', e.target.value)} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs" rows={3} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                                <Link href={route('clinic.admin.referrals.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}