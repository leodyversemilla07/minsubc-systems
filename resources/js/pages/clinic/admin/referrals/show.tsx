import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Share2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

export default function ReferralShow({ referral }: { referral: any }) {
    const { data, setData, put, processing } = useForm({
        status: referral.status,
        follow_up_notes: referral.follow_up_notes ?? '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(route('clinic.admin.referrals.update', referral.id)); };
    return (
        <AppLayout>
            <Head title="Referral Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.referrals.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Share2 className="mr-2 inline h-6 w-6" />Referral</h1>
                </div>
                <Card className="max-w-xl p-6">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Patient</dt><dd className="font-medium">{referral.medical_record?.first_name} {referral.medical_record?.last_name}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Referred To</dt><dd>{referral.referred_to}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{referral.referral_date ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Reason</dt><dd>{referral.reason ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{referral.status}</dd></div>
                    </dl>
                    <form onSubmit={submit} className="mt-4 space-y-3 border-t pt-4">
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
                        <div><Label>Follow-up Notes</Label><Textarea value={data.follow_up_notes} onChange={(e) => setData('follow_up_notes', e.target.value)} rows={2} /></div>
                        <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Update</Button>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}