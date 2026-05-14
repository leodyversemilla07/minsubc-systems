import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DonationCreate({ alumni }: { alumni: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        alumnus_id: '', amount: '', donation_type: 'monetary',
        purpose: '', payment_method: '', donated_at: '',
    });
    const submit = (e: React.FormEvent) => { e.preventDefault(); post(route('alumni.admin.donations.store')); };
    return (
        <AppLayout>
            <Head title="Record Donation" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('alumni.admin.donations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Record Donation</h1>
                </div>
                <Card className="max-w-xl">
                    <CardHeader><CardTitle>Donation Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div><Label>Alumnus</Label>
                                <Select value={data.alumnus_id} onValueChange={(v) => setData('alumnus_id', v)}>
                                    <SelectTrigger><SelectValue placeholder="Select alumnus" /></SelectTrigger>
                                    <SelectContent>{alumni.map((a: any) => <SelectItem key={a.id} value={String(a.id)}>{a.first_name} {a.last_name}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Amount</Label><Input type="number" step="0.01" value={data.amount} onChange={(e) => setData('amount', e.target.value)} /></div>
                                <div><Label>Type</Label>
                                    <Select value={data.donation_type} onValueChange={(v) => setData('donation_type', v)}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent><SelectItem value="monetary">Monetary</SelectItem><SelectItem value="in-kind">In-Kind</SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Purpose</Label>
                                    <Select value={data.purpose} onValueChange={(v) => setData('purpose', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general fund">General Fund</SelectItem>
                                            <SelectItem value="scholarship">Scholarship</SelectItem>
                                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                            <SelectItem value="research">Research</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div><Label>Payment Method</Label>
                                    <Select value={data.payment_method} onValueChange={(v) => setData('payment_method', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="gcash">GCash</SelectItem>
                                            <SelectItem value="paymaya">PayMaya</SelectItem>
                                            <SelectItem value="cash">Cash</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div><Label>Date</Label><Input type="date" value={data.donated_at} onChange={(e) => setData('donated_at', e.target.value)} /></div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                <Link href={route('alumni.admin.donations.index')}><Button variant="outline">Cancel</Button></Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}