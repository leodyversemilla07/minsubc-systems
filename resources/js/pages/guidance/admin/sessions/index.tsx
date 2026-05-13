import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Eye, Printer, ArrowLeft, Save, ClipboardList } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// ---- Index ----
export default function SessionIndex({ sessions }: { sessions: any[] }) {
    return (
        <AppLayout>
            <Head title="Counseling Sessions" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Counseling Sessions</h1>
                    <Link href={route('guidance.admin.sessions.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Session</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><ClipboardList className="mr-2 inline h-5 w-5" />All Sessions</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Counselor</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Risk</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-24">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sessions.map((s: any) => (
                                    <TableRow key={s.id}>
                                        <TableCell className="font-medium">{s.student?.name ?? s.student_id ?? '—'}</TableCell>
                                        <TableCell>{s.counselor?.full_name ?? '—'}</TableCell>
                                        <TableCell>{s.session_date ?? s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}</TableCell>
                                        <TableCell className="capitalize">{s.session_type ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                s.risk_level === 'critical' ? 'bg-red-100 text-red-800' :
                                                s.risk_level === 'high' ? 'bg-orange-100 text-orange-800' :
                                                s.risk_level === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                                s.risk_level === 'low' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{s.risk_level ?? '—'}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                s.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                s.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>{s.status}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('guidance.admin.sessions.show', s.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                <Link href={route('guidance.admin.sessions.print', s.id)}><Button variant="ghost" size="icon"><Printer className="h-4 w-4" /></Button></Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {sessions.length === 0 && (
                                    <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">No sessions found.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}