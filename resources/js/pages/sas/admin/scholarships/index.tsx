import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MoreHorizontal, Edit, Trash2, Users, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface Scholarship {
    id: number;
    scholarship_code: string;
    scholarship_name: string;
    scholarship_type: string;
    provider: string;
    is_active: boolean;
    recipients_count: number;
    total_amount: number;
}

interface Props {
    scholarships: {
        data: Scholarship[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search: string;
        type: string;
        status: string;
    };
    scholarshipTypes: string[];
}

export default function ScholarshipsIndex({ scholarships, filters, scholarshipTypes }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || 'all');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    const handleSearch = () => {
        router.get('/sas/admin/scholarships', { search, type: typeFilter, status: statusFilter }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this scholarship?')) {
            router.delete(`/sas/admin/scholarships/${id}`);
        }
    };

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            'TES': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
            'TDP': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            'CHED Merit': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
            'Private': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
            'University': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
        };
        return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'SAS Admin', href: '/sas/admin/dashboard' },
            { title: 'Scholarships', href: '/sas/admin/scholarships' },
        ]}>
            <Head title="Scholarships" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Scholarship Programs</h1>
                        <p className="text-sm text-muted-foreground sm:text-base">Manage all scholarship programs and their recipients</p>
                    </div>
                    <Link href="/sas/admin/scholarships/create">
                        <Button><Plus className="mr-2 h-4 w-4" />Add Scholarship</Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Total Programs</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{scholarships.total}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Active</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{scholarships.data.filter(s => s.is_active).length}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Recipients</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">{scholarships.data.reduce((sum, s) => sum + s.recipients_count, 0)}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Total Amount</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold text-green-600 dark:text-green-400">₱{scholarships.data.reduce((sum, s) => sum + s.total_amount, 0).toLocaleString()}</div></CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter Scholarships</CardTitle>
                        <CardDescription>Search and filter scholarship programs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search by name or code..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="pl-8" />
                                </div>
                            </div>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-full md:w-[200px]"><SelectValue placeholder="Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    {scholarshipTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[200px]"><SelectValue placeholder="Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSearch}><Filter className="mr-2 h-4 w-4" />Apply</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Scholarship Programs</CardTitle>
                        <CardDescription>Manage all scholarship programs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {scholarships.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No scholarships found</h3>
                                <p className="text-sm text-muted-foreground mb-4">Get started by creating your first scholarship program.</p>
                                <Link href="/sas/admin/scholarships/create"><Button><Plus className="mr-2 h-4 w-4" />Add Scholarship</Button></Link>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Code</TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Provider</TableHead>
                                                <TableHead className="text-center">Recipients</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                                <TableHead className="text-center">Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {scholarships.data.map(scholarship => (
                                                <TableRow key={scholarship.id}>
                                                    <TableCell className="font-medium">{scholarship.scholarship_code}</TableCell>
                                                    <TableCell>{scholarship.scholarship_name}</TableCell>
                                                    <TableCell><Badge className={getTypeColor(scholarship.scholarship_type)}>{scholarship.scholarship_type}</Badge></TableCell>
                                                    <TableCell>{scholarship.provider}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Link href={`/sas/admin/scholarship-recipients?scholarship=${scholarship.id}`} className="text-blue-600 hover:underline dark:text-blue-400">{scholarship.recipients_count}</Link>
                                                    </TableCell>
                                                    <TableCell className="text-right font-medium">₱{scholarship.total_amount.toLocaleString()}</TableCell>
                                                    <TableCell className="text-center">
                                                        {scholarship.is_active ? (
                                                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
                                                        ) : (
                                                            <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">Inactive</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem asChild><Link href={`/sas/admin/scholarship-recipients?scholarship=${scholarship.id}`}><Users className="mr-2 h-4 w-4" />View Recipients</Link></DropdownMenuItem>
                                                                <DropdownMenuItem asChild><Link href={`/sas/admin/scholarships/${scholarship.id}/edit`}><Edit className="mr-2 h-4 w-4" />Edit</Link></DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem onClick={() => handleDelete(scholarship.id)} className="text-red-600 dark:text-red-400"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                {/* Pagination */}
                                {scholarships.last_page > 1 && (
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">Showing {scholarships.data.length} of {scholarships.total} results</div>
                                        <div className="flex gap-2">
                                            {scholarships.current_page > 1 && (
                                                <Button variant="outline" size="sm" onClick={() => router.get('/sas/admin/scholarships', { page: scholarships.current_page - 1 })}>Previous</Button>
                                            )}
                                            {scholarships.current_page < scholarships.last_page && (
                                                <Button variant="outline" size="sm" onClick={() => router.get('/sas/admin/scholarships', { page: scholarships.current_page + 1 })}>Next</Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
