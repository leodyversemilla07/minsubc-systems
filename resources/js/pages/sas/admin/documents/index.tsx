import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, router } from '@inertiajs/react';
import {
    Eye,
    FileText,
    Plus,
    Search,
    Trash2,
    Upload,
    FileCheck,
    AlertCircle,
    Clock,
} from 'lucide-react';
import { useState } from 'react';

interface DigitalizedDocument {
    id: number;
    document_title: string;
    document_category: string;
    document_type: string | null;
    file_path: string;
    file_size: number;
    reference_number: string | null;
    original_date: string | null;
    academic_year: string | null;
    disposal_status: string;
    uploaded_at: string;
    uploader?: {
        name: string;
    };
}

interface PaginatedDocuments {
    data: DigitalizedDocument[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Filters {
    document_category?: string;
    document_type?: string;
    academic_year?: string;
    disposal_status?: string;
    search?: string;
}

interface Props {
    documents: PaginatedDocuments;
    filters: Filters;
}

export default function DocumentsIndex({ documents, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.document_category || '');
    const [disposalStatus, setDisposalStatus] = useState(
        filters.disposal_status || '',
    );
    const [academicYear, setAcademicYear] = useState(
        filters.academic_year || '',
    );

    function handleFilter() {
        router.get(
            '/sas/admin/documents',
            {
                document_category: category || undefined,
                disposal_status: disposalStatus || undefined,
                academic_year: academicYear || undefined,
                search: search || undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    }

    function handleReset() {
        setSearch('');
        setCategory('');
        setDisposalStatus('');
        setAcademicYear('');
        router.get(sas.admin.documents.index.url(), {}, { preserveState: true });
    }

    function handleDelete(id: number, title: string) {
        if (
            confirm(
                `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            )
        ) {
            router.delete(`/sas/admin/documents/${id}`, {
                preserveScroll: true,
            });
        }
    }

    const stats = {
        total: documents.total,
        physical:
            documents.data.filter(
                (d) => d.disposal_status === 'Physical Copy Exists',
            ).length,
        pending:
            documents.data.filter(
                (d) => d.disposal_status === 'Pending Disposal Approval',
            ).length,
        disposed:
            documents.data.filter((d) => d.disposal_status === 'Disposed')
                .length,
    };

    function getDisposalBadge(status: string) {
        type IconComponent = typeof FileCheck;
        const variants: Record<
            string,
            { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: IconComponent }
        > = {
            'Physical Copy Exists': { variant: 'default', icon: FileCheck },
            'Pending Disposal Approval': { variant: 'secondary', icon: Clock },
            'Approved for Disposal': { variant: 'outline', icon: AlertCircle },
            'Disposed': { variant: 'destructive', icon: Trash2 },
        };

        const config = variants[status] || { variant: 'outline' as const, icon: FileText };
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1">
                <Icon className="h-3 w-3" />
                {status}
            </Badge>
        );
    }

    function formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    return (
        <AppLayout>
            <Head title="Documents Management" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Documents Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Manage digitalized documents and disposal records
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={sas.admin.documents.manageDisposal.url()}>
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Manage Disposal
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={sas.admin.documents.create.url()}>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Document
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Documents
                        </CardTitle>
                        <FileText className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Physical Copies
                        </CardTitle>
                        <FileCheck className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.physical}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Disposal
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.pending}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Disposed
                        </CardTitle>
                        <Trash2 className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.disposed}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                <Input
                                    placeholder="Search documents..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9"
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleFilter()
                                    }
                                />
                            </div>
                        </div>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Categories</SelectItem>
                                <SelectItem value="Scholarship">
                                    Scholarship
                                </SelectItem>
                                <SelectItem value="Insurance">
                                    Insurance
                                </SelectItem>
                                <SelectItem value="Organization">
                                    Organization
                                </SelectItem>
                                <SelectItem value="Activity">
                                    Activity
                                </SelectItem>
                                <SelectItem value="Administrative">
                                    Administrative
                                </SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={disposalStatus}
                            onValueChange={setDisposalStatus}
                        >
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Status</SelectItem>
                                <SelectItem value="Physical Copy Exists">
                                    Physical Copy
                                </SelectItem>
                                <SelectItem value="Pending Disposal Approval">
                                    Pending Disposal
                                </SelectItem>
                                <SelectItem value="Approved for Disposal">
                                    Approved
                                </SelectItem>
                                <SelectItem value="Disposed">Disposed</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>Filter</Button>
                            <Button variant="outline" onClick={handleReset}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Documents Table */}
            <Card>
                <CardContent className="p-0">
                    {documents.data.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Reference #</TableHead>
                                    <TableHead>File Size</TableHead>
                                    <TableHead>Academic Year</TableHead>
                                    <TableHead>Disposal Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documents.data.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium">
                                            {doc.document_title}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {doc.document_category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {doc.reference_number || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {formatFileSize(doc.file_size)}
                                        </TableCell>
                                        <TableCell>
                                            {doc.academic_year || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {getDisposalBadge(
                                                doc.disposal_status,
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/sas/admin/documents/${doc.id}`}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            doc.id,
                                                            doc.document_title,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="py-12 text-center">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-400">
                                No documents found
                            </p>
                            <Button className="mt-4" asChild>
                                <Link href={sas.admin.documents.create.url()}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Upload First Document
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {documents.last_page > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing page {documents.current_page} of{' '}
                        {documents.last_page}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={documents.current_page === 1}
                            onClick={() =>
                                router.get(
                                    `/sas/admin/documents?page=${documents.current_page - 1}`,
                                    {
                                        document_category: category || undefined,
                                        disposal_status:
                                            disposalStatus || undefined,
                                        academic_year: academicYear || undefined,
                                        search: search || undefined,
                                    },
                                    { preserveState: true },
                                )
                            }
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={
                                documents.current_page === documents.last_page
                            }
                            onClick={() =>
                                router.get(
                                    `/sas/admin/documents?page=${documents.current_page + 1}`,
                                    {
                                        document_category: category || undefined,
                                        disposal_status:
                                            disposalStatus || undefined,
                                        academic_year: academicYear || undefined,
                                        search: search || undefined,
                                    },
                                    { preserveState: true },
                                )
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
