import { Head, Link, useForm, router } from '@inertiajs/react';
import { ClipboardPlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TicketsCreate({ categories }: { categories: any }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '', title: '', description: '', priority: 'medium',
    });

    function handleSubmit(e: React.FormEvent) { e.preventDefault(); post(route('helpdesk.admin.tickets.store')); }

    return (
        <AppLayout>
            <Head title="New Ticket" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold"><ClipboardPlus className="mr-2 inline h-6 w-6" />New Support Ticket</h1>
                <Card><CardHeader><CardTitle>Ticket Details</CardTitle></CardHeader>
                    <CardContent><form onSubmit={handleSubmit} className="space-y-4">
                        <div><Label>Title</Label><Input value={data.title} onChange={e => setData('title', e.target.value)} error={errors.title} /></div>
                        <div><Label>Category</Label>
                            <Select value={data.category_id} onValueChange={v => setData('category_id', v)}>
                                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>{categories?.map((c: any) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div><Label>Priority</Label>
                            <Select value={data.priority} onValueChange={v => setData('priority', v)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="urgent">Urgent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div><Label>Description</Label><Textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={5} error={errors.description} /></div>
                        <div className="flex gap-2"><Button type="submit" disabled={processing}>Create Ticket</Button>
                            <Link href={route('helpdesk.admin.tickets.index')}><Button variant="outline">Cancel</Button></Link></div>
                    </form></CardContent></Card>
            </div>
        </AppLayout>
    );
}