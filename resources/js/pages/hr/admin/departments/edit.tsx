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

interface Department {
    id: number;
    code: string;
    name: string;
    type: string;
    description: string;
    head_id: number;
    is_active: boolean;
}

export default function Edit({ department, heads }: { department: Department; heads: Array<{ id: number; first_name: string; last_name: string; employee_id: string }> }) {
    const [form, setForm] = useState({
        code: department.code,
        name: department.name,
        type: department.type,
        description: department.description || '',
        head_id: String(department.head_id || ''),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('hr.admin.departments.update', department.id), form);
    };

    const handleDelete = () => {
        if (confirm('Are you sure? This cannot be undone.')) {
            router.delete(route('hr.admin.departments.destroy', department.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Department" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.departments.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Department</h1>
                </div>
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Code *</Label>
                                <Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
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
                                <Label>Head</Label>
                                <Select value={form.head_id} onValueChange={(v) => setForm({ ...form, head_id: v ?? "" })}>
                                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                                    <SelectContent>
                                        {heads.map((h) => <SelectItem key={h.id} value={String(h.id)}>{h.first_name} {h.last_name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Description</Label>
                                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
                            <div className="flex gap-4">
                                <Link href={route('hr.admin.departments.index')}><Button variant="outline">Cancel</Button></Link>
                                <Button type="submit">Update</Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}