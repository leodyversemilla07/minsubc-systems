import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, ArrowLeft, Save, FileText } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SurveyIndex({ surveys }: { surveys: any }) {
    return (
        <AppLayout>
            <Head title="Surveys" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold"><FileText className="mr-2 inline h-6 w-6" />Graduate Tracer Surveys</h1>
                    <Link href={route('alumni.admin.surveys.create')}><Button><Plus className="mr-2 h-4 w-4" /> Add Survey</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Target Year</TableHead>
                                    <TableHead className="text-center">Responses</TableHead>
                                    <TableHead className="text-center">Active</TableHead>
                                    <TableHead className="w-28">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {surveys.data?.map((s: any) => (
                                    <TableRow key={s.id}>
                                        <TableCell className="max-w-xs truncate font-medium">{s.title}</TableCell>
                                        <TableCell className="capitalize">{s.survey_type}</TableCell>
                                        <TableCell>{s.target_year ?? '—'}</TableCell>
                                        <TableCell className="text-center">{s.responses_count ?? 0}</TableCell>
                                        <TableCell className="text-center">{s.is_active ? '✅' : '❌'}</TableCell>
                                        <TableCell><Link href={route('alumni.admin.surveys.show', s.id)}><Button variant="ghost" size="sm">View</Button></Link></TableCell>
                                    </TableRow>
                                ))}
                                {(!surveys.data || surveys.data.length === 0) && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No surveys found.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}