import { Head, Link } from '@inertiajs/react';
import { ClipboardList, Plus, Eye, Send } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CurriculaIndex({ curricula }: { curricula: any[] }) {
    return (
        <AppLayout>
            <Head title="Curricula" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Curricula</h1>
                    <Link href={route('curriculum.admin.curricula.create')}><Button><Plus className="mr-2 h-4 w-4" /> Create Curriculum</Button></Link>
                </div>
                <Card>
                    <CardHeader><CardTitle><ClipboardList className="mr-2 inline h-5 w-5" />All Curricula</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead>Version</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Courses</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {curricula.map((c: any) => (
                                    <TableRow key={c.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{c.name}</TableCell>
                                        <TableCell>{c.program?.code ?? '—'}</TableCell>
                                        <TableCell>{c.version ?? '—'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${c.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{c.status}</span>
                                        </TableCell>
                                        <TableCell>{c.courses_count ?? c.courses?.length ?? 0}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Link href={route('curriculum.admin.curricula.show', c.id)}><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></Link>
                                                {c.status !== 'published' && (
                                                    <Link as="button" method="post" href={route('curriculum.admin.curricula.publish', c.id)}>
                                                        <Button variant="ghost" size="icon" title="Publish"><Send className="h-4 w-4 text-green-600" /></Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {curricula.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No curricula found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}