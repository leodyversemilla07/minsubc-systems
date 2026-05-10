import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

interface Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
}

export default function Create({ employees }: { employees: Employee[] }) {
    const [form, setForm] = useState({
        employee_id: '',
        evaluator_id: '',
        type: 'periodic',
        period: '',
        rating: '',
        comments: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('hr.admin.evaluations.store'), form);
    };

    return (
        <AppLayout>
            <Head title="New Evaluation" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.evaluations.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">New Evaluation</h1>
                </div>
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Employee *</Label>
                                <Select value={form.employee_id} onValueChange={(v) => setForm({ ...form, employee_id: v ?? "" })}>
                                    <SelectTrigger><SelectValue placeholder="Select employee..." /></SelectTrigger>
                                    <SelectContent>
                                        {employees.map((e) => <SelectItem key={e.id} value={String(e.id)}>{e.first_name} {e.last_name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Evaluator *</Label>
                                <Select value={form.evaluator_id} onValueChange={(v) => setForm({ ...form, evaluator_id: v ?? "" })}>
                                    <SelectTrigger><SelectValue placeholder="Select evaluator..." /></SelectTrigger>
                                    <SelectContent>
                                        {employees.map((e) => <SelectItem key={e.id} value={String(e.id)}>{e.first_name} {e.last_name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="periodic">Periodic</SelectItem>
                                        <SelectItem value="performance">Performance</SelectItem>
                                        <SelectItem value="peer">Peer</SelectItem>
                                        <SelectItem value="self">Self</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Period *</Label>
                                <Select value={form.period} onValueChange={(v) => setForm({ ...form, period: v ?? "" })}>
                                    <SelectTrigger><SelectValue placeholder="Select period..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Q1 2026">Q1 2026</SelectItem>
                                        <SelectItem value="Q2 2026">Q2 2026</SelectItem>
                                        <SelectItem value="Q3 2026">Q3 2026</SelectItem>
                                        <SelectItem value="Q4 2026">Q4 2026</SelectItem>
                                        <SelectItem value="AY 2025-2026">AY 2025-2026</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Rating (1-5)</Label>
                                <Select value={form.rating} onValueChange={(v) => setForm({ ...form, rating: v ?? "" })}>
                                    <SelectTrigger><SelectValue placeholder="Rate..." /></SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map((r) => <SelectItem key={r} value={String(r)}>{r}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Comments</Label>
                            <Textarea value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Link href={route('hr.admin.evaluations.index')}><Button variant="outline">Cancel</Button></Link>
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}