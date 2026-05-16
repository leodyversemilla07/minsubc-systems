import { Head, Link, useForm, router } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function TicketsShow({ ticket }: { ticket: any }) {
    const { data, setData, post, processing } = useForm({ body: '', is_internal: false });

    function addComment(e: React.FormEvent) {
        e.preventDefault();
        post(route('helpdesk.admin.tickets.comment', ticket.id), { preserveScroll: true, onSuccess: () => setData('body', '') });
    }

    const statusColors: Record<string, string> = { open: 'bg-yellow-100 text-yellow-800', in_progress: 'bg-blue-100 text-blue-800', resolved: 'bg-green-100 text-green-800', closed: 'bg-gray-100 text-gray-800' };
    const priorityColors: Record<string, string> = { low: 'bg-slate-100 text-slate-800', medium: 'bg-blue-100 text-blue-800', high: 'bg-orange-100 text-orange-800', urgent: 'bg-red-100 text-red-800' };

    return (
        <AppLayout>
            <Head title={ticket.title} />
            <div className="space-y-6 p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold"><Eye className="mr-2 inline h-6 w-6" />{ticket.title}</h1>
                        <div className="mt-1 flex gap-2">
                            <Badge className={statusColors[ticket.status]}>{ticket.status}</Badge>
                            <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                            <span className="text-sm text-muted-foreground">{ticket.category?.name}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {ticket.status === 'open' && (
                            <Button size="sm" onClick={() => router.patch(route('helpdesk.admin.tickets.assign', ticket.id), { assigned_to: ticket.reported_by })} disabled>Assign</Button>
                        )}
                        {['open', 'in_progress'].includes(ticket.status) && (
                            <Button size="sm" onClick={() => router.patch(route('helpdesk.admin.tickets.resolve', ticket.id))}>Resolve</Button>
                        )}
                        {ticket.status === 'resolved' && (
                            <Button size="sm" variant="outline" onClick={() => router.patch(route('helpdesk.admin.tickets.reopen', ticket.id))}>Reopen</Button>
                        )}
                    </div>
                </div>

                <Card><CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
                    <CardContent><p>{ticket.description}</p>
                        <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                            <span>Reported by: {ticket.reporter?.name ?? '—'}</span>
                            <span>Assigned to: {ticket.assignee?.name ?? 'Unassigned'}</span>
                            <span>Created: {ticket.created_at}</span>
                        </div>
                    </CardContent></Card>

                <Card><CardHeader><CardTitle className="text-base">Comments ({ticket.comments?.length ?? 0})</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {ticket.comments?.map((c: any) => (
                            <div key={c.id} className="rounded-lg border p-3">
                                <div className="flex justify-between"><span className="font-medium text-sm">{c.user?.name}</span>
                                    <span className="text-xs text-muted-foreground">{c.created_at}</span></div>
                                <p className="mt-1 text-sm">{c.body}</p>
                                {c.is_internal && <Badge variant="outline" className="mt-1 text-xs">Internal</Badge>}
                            </div>
                        ))}
                        {(!ticket.comments || ticket.comments.length === 0) && <p className="text-sm text-muted-foreground">No comments.</p>}
                        <form onSubmit={addComment} className="mt-4 space-y-2">
                            <Label>Add Comment</Label>
                            <Textarea value={data.body} onChange={e => setData('body', e.target.value)} rows={3} required />
                            <Button type="submit" size="sm" disabled={processing}>Post Comment</Button>
                        </form>
                    </CardContent></Card>
            </div>
        </AppLayout>
    );
}