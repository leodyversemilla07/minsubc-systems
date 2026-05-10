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

interface Position {
    id: number;
    title: string;
    category: string;
    employment_type: string;
    description: string;
    salary_grade_min: number;
    salary_grade_max: number;
    is_active: boolean;
}

export default function Edit({ position }: { position: Position }) {
    const [form, setForm] = useState({
        title: position.title,
        category: position.category,
        employment_type: position.employment_type,
        description: position.description || '',
        salary_grade_min: String(position.salary_grade_min || ''),
        salary_grade_max: String(position.salary_grade_max || ''),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('hr.admin.positions.update', position.id), form);
    };

    return (
        <AppLayout>
            <Head title="Edit Position" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('hr.admin.positions.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Position</h1>
                </div>
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Title *</Label>
                                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="faculty">Faculty</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                        <SelectItem value="executive">Executive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Employment Type</Label>
                                <Select value={form.employment_type} onValueChange={(v) => setForm({ ...form, employment_type: v ?? "" })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full-time">Full Time</SelectItem>
                                        <SelectItem value="part-time">Part Time</SelectItem>
                                        <SelectItem value="contractual">Contractual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Salary Grade Min</Label>
                                <Input type="number" value={form.salary_grade_min} onChange={(e) => setForm({ ...form, salary_grade_min: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Salary Grade Max</Label>
                                <Input type="number" value={form.salary_grade_max} onChange={(e) => setForm({ ...form, salary_grade_max: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Link href={route('hr.admin.positions.index')}><Button variant="outline">Cancel</Button></Link>
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}