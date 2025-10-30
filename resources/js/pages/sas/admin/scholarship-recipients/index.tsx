import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MoreHorizontal, Edit, Trash2, FileText, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface Recipient {
    id: number;
    student: { id: number; name: string; email: string };
    scholarship: { id: number; scholarship_name: string };
    academic_year: string;
    semester: string;
    amount: number;
    status: string;
    date_awarded: string;
    expiration_date: string;
    requirements_complete: boolean;
}

interface Props {
    recipients: { data: Recipient[]; current_page: number; last_page: number; total: number };
    filters: { search: string; scholarship: string; status: string };
    scholarships: Array<{ id: number; scholarship_name: string }>;
}

export default function RecipientsIndex({ recipients, filters, scholarships }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'Active': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            'Suspended': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            'Completed': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
            'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'SAS Admin', href: '/sas/admin/dashboard' },
            { title: 'Scholarship Recipients', href: '/sas/admin/scholarship-recipients' },
        ]}>
            <Head title="Scholarship Recipients" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Scholarship Recipients</h1>
                        <p className="text-sm text-muted-foreground sm:text-base">Manage scholarship recipients and requirements</p>
                    </div>
                    <Link href="/sas/admin/scholarship-recipients/create">
                        <Button><Plus className="mr-2 h-4 w-4" />Add Recipient</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader><CardTitle>Filter Recipients</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search by student name..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
                            </div>
                            <Button onClick={() => router.get('/sas/admin/scholarship-recipients', { search })}><Filter className="mr-2 h-4 w-4" />Apply</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Recipients</CardTitle><CardDescription>All scholarship recipients</CardDescription></CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Scholarship</TableHead>
                                        <TableHead>Academic Year</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead className="text-center">Requirements</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recipients.data.map(recipient => (
                                        <TableRow key={recipient.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{recipient.student.name}</div>
                                                    <div className="text-sm text-muted-foreground">{recipient.student.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{recipient.scholarship.scholarship_name}</TableCell>
                                            <TableCell>{recipient.academic_year} - {recipient.semester}</TableCell>
                                            <TableCell className="text-right font-medium">₱{recipient.amount.toLocaleString()}</TableCell>
                                            <TableCell className="text-center"><Badge className={getStatusColor(recipient.status)}>{recipient.status}</Badge></TableCell>
                                            <TableCell className="text-center">
                                                {recipient.requirements_complete ? (
                                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Complete</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Incomplete</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild><Link href={`/sas/admin/scholarship-recipients/${recipient.id}/requirements`}><FileText className="mr-2 h-4 w-4" />Manage Requirements</Link></DropdownMenuItem>
                                                        <DropdownMenuItem asChild><Link href={`/sas/admin/scholarship-recipients/${recipient.id}/edit`}><Edit className="mr-2 h-4 w-4" />Edit</Link></DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => confirm('Delete?') && router.delete(`/sas/admin/scholarship-recipients/${recipient.id}`)} className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
