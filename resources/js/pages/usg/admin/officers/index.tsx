import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PageProps } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface OfficerData { id: number; name: string; position: string; department: string; email: string; order: number; }

interface Props extends PageProps { officers: OfficerData[] }

export default function OfficerIndex({ officers }: Props) {
    const handleDelete = (id: number) => { if (confirm('Delete this officer?')) router.delete(route('usg.admin.officers.destroy', id)); };

    return (
        <AppLayout>
            <Head title="Officers" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Officers</h1>
                    <Link href={route('usg.admin.officers.create')}><Button><Plus className="mr-2 h-4 w-4" /> New Officer</Button></Link>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {officers?.map(o => (
                                    <TableRow key={o.id}>
                                        <TableCell>{o.order}</TableCell>
                                        <TableCell className="font-medium">{o.name}</TableCell>
                                        <TableCell>{o.position}</TableCell>
                                        <TableCell>{o.department}</TableCell>
                                        <TableCell>{o.email}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('usg.admin.officers.edit', o.id)}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></Link>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(o.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}