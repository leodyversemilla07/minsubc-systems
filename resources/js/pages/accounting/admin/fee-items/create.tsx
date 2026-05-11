import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface Category { id: number; name: string; code: string; }

export default function Create({ categories }: { categories: Category[] }) {
    const [form, setForm] = useState({
        fee_category_id: '', name: '', code: '', amount: '', type: 'tuition', billing_cycle: 'per_term', description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('accounting.admin.fee-items.store'), form);
    };

    return (
        <AppLayout>
            <Head title="Create Fee Item" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.fee-items.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Fee Item</h1>
                </div>
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Code *</Label>
                                <Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Name *</Label>
                                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Category *</Label>
                                <Select value={form.fee_category_id} onValueChange={(v) => setForm({ ...form, fee_category_id: v ?? '' })}>
                                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Amount *</Label>
                                <Input type="number" step="0.01" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v ?? '' })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tuition">Tuition</SelectItem>
                                        <SelectItem value="laboratory">Laboratory</SelectItem>
                                        <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Billing Cycle</Label>
                                <Select value={form.billing_cycle} onValueChange={(v) => setForm({ ...form, billing_cycle: v ?? '' })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="per_term">Per Term</SelectItem>
                                        <SelectItem value="per_year">Per Year</SelectItem>
                                        <SelectItem value="one_time">One Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Link href={route('accounting.admin.fee-items.index')}><Button variant="outline">Cancel</Button></Link>
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}