import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    const [form, setForm] = useState({ name: '', code: '', description: '', is_required: true });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('accounting.admin.fee-categories.store'), form);
    };

    return (
        <AppLayout>
            <Head title="Create Fee Category" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('accounting.admin.fee-categories.index')}><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Create Fee Category</h1>
                </div>
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Code *</Label>
                                <Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. TUITION" />
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
                        <div className="flex justify-end gap-4">
                            <Link href={route('accounting.admin.fee-categories.index')}><Button variant="outline">Cancel</Button></Link>
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}