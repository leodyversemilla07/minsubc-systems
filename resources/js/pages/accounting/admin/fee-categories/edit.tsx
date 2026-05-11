import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

interface FeeCategory {
    id: number;
    name: string;
    code: string;
    description: string;
    is_required: boolean;
    is_active: boolean;
}

export default function Edit({ feeCategory }: { feeCategory: FeeCategory }) {
    const [form, setForm] = useState({
        name: feeCategory.name,
        code: feeCategory.code,
        description: feeCategory.description || '',
        is_required: feeCategory.is_required,
        is_active: feeCategory.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('accounting.admin.fee-categories.update', feeCategory.id), form);
    };

    const handleDelete = () => {
        if (confirm('Are you sure? This will also delete all fee items in this category.')) {
            router.delete(route('accounting.admin.fee-categories.destroy', feeCategory.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Fee Category" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.fee-categories.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Edit Fee Category</h1>
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
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={form.is_required} onChange={(e) => setForm({ ...form, is_required: e.target.checked })} />
                                Required
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                                Active
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
                            <div className="flex gap-4">
                                <Link href={route('accounting.admin.fee-categories.index')}><Button variant="outline">Cancel</Button></Link>
                                <Button type="submit">Update</Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}