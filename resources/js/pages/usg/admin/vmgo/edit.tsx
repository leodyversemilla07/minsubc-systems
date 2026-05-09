import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { ArrowLeft, History } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VMGOData {
    id?: number;
    vision: string;
    mission: string;
    goal: string;
    objectives: string;
    core_values: string;
}

interface Props extends PageProps {
    vmgo: VMGOData | null;
}

export default function VMGOEdit({ vmgo }: Props) {
    const [form, setForm] = useState({ vision: '', mission: '', goal: '', objectives: '', core_values: '' });

    useEffect(() => {
        if (vmgo) {
            setForm({
                vision: vmgo.vision ?? '',
                mission: vmgo.mission ?? '',
                goal: vmgo.goal ?? '',
                objectives: vmgo.objectives ?? '',
                core_values: vmgo.core_values ?? '',
            });
        }
    }, [vmgo]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.patch(route('usg.admin.vmgo.update'), form);
    };

    return (
        <AppLayout>
            <Head title="Edit VMGO" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">Vision, Mission, Goals & Objectives</h1>
                    </div>
                    <Link href={route('usg.admin.vmgo.history')}>
                        <Button variant="outline"><History className="mr-2 h-4 w-4" /> View History</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>Edit VMGO</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium">Vision</label>
                                <textarea className="w-full rounded-md border p-2" rows={3} value={form.vision}
                                    onChange={e => setForm({ ...form, vision: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Mission</label>
                                <textarea className="w-full rounded-md border p-2" rows={3} value={form.mission}
                                    onChange={e => setForm({ ...form, mission: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Goal</label>
                                <textarea className="w-full rounded-md border p-2" rows={3} value={form.goal}
                                    onChange={e => setForm({ ...form, goal: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Objectives</label>
                                <textarea className="w-full rounded-md border p-2" rows={4} value={form.objectives}
                                    onChange={e => setForm({ ...form, objectives: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Core Values</label>
                                <textarea className="w-full rounded-md border p-2" rows={3} value={form.core_values}
                                    onChange={e => setForm({ ...form, core_values: e.target.value })} />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}