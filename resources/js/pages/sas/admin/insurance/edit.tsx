import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {
    insurance: {
        id: number; student_id: number; insurance_provider: string;
        policy_number: string; policy_type: string | null;
        coverage_amount: number | null; effective_date: string; expiration_date: string;
        status: string; beneficiary_name: string | null; beneficiary_relationship: string | null;
        review_notes: string | null;
        student: { id: number; name: string; email: string } | null;
    };
}

export default function InsuranceEdit({ insurance }: Props) {
    const [form, setForm] = useState({
        student_id: insurance.student_id.toString(),
        insurance_provider: insurance.insurance_provider,
        policy_number: insurance.policy_number,
        policy_type: insurance.policy_type ?? '',
        coverage_amount: insurance.coverage_amount?.toString() ?? '',
        effective_date: insurance.effective_date,
        expiration_date: insurance.expiration_date,
        status: insurance.status,
        beneficiary_name: insurance.beneficiary_name ?? '',
        beneficiary_relationship: insurance.beneficiary_relationship ?? '',
        review_notes: insurance.review_notes ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('sas.admin.insurance.update', insurance.id), form);
    };

    return (
        <AppLayout>
            <Head title="Edit Insurance" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('sas.admin.insurance.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Insurance Record</h1>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <p className="text-sm text-muted-foreground mb-4">Student: <strong>{insurance.student?.name}</strong></p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="insurance_provider">Insurance Provider *</Label>
                                    <Input id="insurance_provider" value={form.insurance_provider} onChange={e => setForm(f => ({ ...f, insurance_provider: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="policy_number">Policy Number *</Label>
                                    <Input id="policy_number" value={form.policy_number} onChange={e => setForm(f => ({ ...f, policy_number: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="policy_type">Policy Type</Label>
                                    <Input id="policy_type" value={form.policy_type} onChange={e => setForm(f => ({ ...f, policy_type: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="coverage_amount">Coverage Amount</Label>
                                    <Input id="coverage_amount" type="number" value={form.coverage_amount} onChange={e => setForm(f => ({ ...f, coverage_amount: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="effective_date">Effective Date *</Label>
                                    <Input id="effective_date" type="date" value={form.effective_date} onChange={e => setForm(f => ({ ...f, effective_date: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="expiration_date">Expiration Date *</Label>
                                    <Input id="expiration_date" type="date" value={form.expiration_date} onChange={e => setForm(f => ({ ...f, expiration_date: e.target.value }))} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="beneficiary_name">Beneficiary Name</Label>
                                    <Input id="beneficiary_name" value={form.beneficiary_name} onChange={e => setForm(f => ({ ...f, beneficiary_name: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="beneficiary_relationship">Relationship</Label>
                                    <Input id="beneficiary_relationship" value={form.beneficiary_relationship} onChange={e => setForm(f => ({ ...f, beneficiary_relationship: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending Review">Pending Review</SelectItem>
                                            <SelectItem value="Approved">Approved</SelectItem>
                                            <SelectItem value="Rejected">Rejected</SelectItem>
                                            <SelectItem value="Expired">Expired</SelectItem>
                                            <SelectItem value="Renewed">Renewed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="review_notes">Review Notes</Label>
                                <Textarea id="review_notes" rows={3} value={form.review_notes} onChange={e => setForm(f => ({ ...f, review_notes: e.target.value }))} />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Link href={route('sas.admin.insurance.index')}><Button type="button" variant="outline">Cancel</Button></Link>
                                <Button type="submit"><Save className="mr-2 h-4 w-4" /> Update</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}