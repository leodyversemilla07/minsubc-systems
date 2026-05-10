import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface HeadOpt {
    id: number;
    first_name: string;
    last_name: string;
    employee_id: string;
}

export default function Create({ heads }: { heads: HeadOpt[] }) {
    const [form, setForm] = useState({
        code: '', name: '', type: 'academic', description: '', head_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('hr.admin.departments.store'), form);
    };

    return (
        <AppLayout>
            <Head title="Create Department" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.departments.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Department</h1>
                </div>
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Code *</Label>
                                <Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. CAS, COE" />
                            </div>
                            <div className="space-y-2">
                                <Label>Name *</Label>
                                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="academic">Academic</SelectItem>
                                        <SelectItem value="administrative">Administrative</SelectItem>
                                        <SelectItem value="office">Office</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Department Head</Label>
                                <Select value={form.head_id} onValueChange={(v) => setForm({ ...form, head_id: v ?? "" })}>
                                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                                    <SelectContent>
                                        {heads.map((h) => <SelectItem key={h.id} value={String(h.id)}>{h.first_name} {h.last_name} ({h.employee_id})</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Description</Label>
                                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Link href={route('hr.admin.departments.index')}><Button variant="outline">Cancel</Button></Link>
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}