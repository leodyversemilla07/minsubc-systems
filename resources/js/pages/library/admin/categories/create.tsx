import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

interface Props extends PageProps {}

export default function CategoryCreate() {
    const [form, setForm] = useState({ name: '', description: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('library.admin.categories.store'), form);
    };

    return (
        <AppLayout>
            <Head title="Add Category" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('library.admin.categories.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <h1 className="text-2xl font-bold">Add Book Category</h1>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Category Name *</Label>
                                <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <Link href={route('library.admin.categories.index')}><Button type="button" variant="outline">Cancel</Button></Link>
                                <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}