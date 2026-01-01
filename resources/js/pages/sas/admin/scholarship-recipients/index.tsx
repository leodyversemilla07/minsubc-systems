import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    FilterField,
    SearchFilters,
} from '@/components/search-filters';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, router } from '@inertiajs/react';
import {
    Edit,
    FileText,
    MoreHorizontal,
    Plus,
    Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';

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

interface Scholarship {
    id: number;
    scholarship_name: string;
}

interface Props {
    recipients: {
        data: Recipient[];
        current_page: number;
        last_page: number;
        total: number;
    };
    scholarships: Scholarship[];
    filters: {
        search?: string;
        scholarship_id?: string;
        status?: string;
        academic_year?: string;
        semester?: string;
    };
}

export default function RecipientsIndex({
    recipients,
    scholarships,
    filters,
}: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            Active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            Suspended:
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            Completed:
                'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
            Cancelled:
                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        };
        return (
            colors[status] ||
            'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
        );
    };

    // Generate academic year options (current year and 5 years back)
    const academicYearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 6 }, (_, i) => {
            const year = currentYear - i;
            return {
                value: `${year}-${year + 1}`,
                label: `${year}-${year + 1}`,
            };
        });
    }, []);

    const filterFields: FilterField[] = [
        {
            name: 'search',
            label: 'Search',
            type: 'text',
            placeholder: 'Student name or ID...',
        },
        {
            name: 'scholarship_id',
            label: 'Scholarship',
            type: 'select',
            placeholder: 'Select scholarship',
            options: scholarships.map((s) => ({
                value: s.id.toString(),
                label: s.scholarship_name,
            })),
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            placeholder: 'Select status',
            options: [
                { value: 'Active', label: 'Active' },
                { value: 'Suspended', label: 'Suspended' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' },
            ],
        },
        {
            name: 'academic_year',
            label: 'Academic Year',
            type: 'select',
            placeholder: 'Select year',
            options: academicYearOptions,
        },
        {
            name: 'semester',
            label: 'Semester',
            type: 'select',
            placeholder: 'Select semester',
            options: [
                { value: '1st Semester', label: '1st Semester' },
                { value: '2nd Semester', label: '2nd Semester' },
                { value: 'Summer', label: 'Summer' },
            ],
        },
    ];

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(recipients.data.map((r) => r.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds((prev) => [...prev, id]);
        } else {
            setSelectedIds((prev) => prev.filter((i) => i !== id));
        }
    };

    const handleBulkDelete = () => {
        if (
            selectedIds.length > 0 &&
            confirm(
                `Are you sure you want to delete ${selectedIds.length} recipient(s)?`,
            )
        ) {
            router.delete('/sas/admin/scholarship-recipients/bulk-delete', {
                data: { ids: selectedIds },
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: '/sas/admin/dashboard' },
                {
                    title: 'Scholarship Recipients',
                    href: '/sas/admin/scholarship-recipients',
                },
            ]}
        >
            <Head title="Scholarship Recipients" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                            Scholarship Recipients
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Manage scholarship recipients and requirements
                        </p>
                    </div>
                    <Link href={sas.admin.scholarshipRecipients.create.url()}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Recipient
                        </Button>
                    </Link>
                </div>

                {/* Advanced Search Filters */}
                <SearchFilters
                    fields={filterFields}
                    filters={filters as Record<string, string>}
                    baseUrl="/sas/admin/scholarship-recipients"
                    title="Filter Recipients"
                    description="Search and filter scholarship recipients by various criteria"
                />

                {/* Bulk Actions Bar */}
                {selectedIds.length > 0 && (
                    <Card className="border-primary/50 bg-primary/5">
                        <CardContent className="flex items-center justify-between py-3">
                            <span className="text-sm font-medium">
                                {selectedIds.length} recipient(s) selected
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleBulkDelete}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Selected
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedIds([])}
                                >
                                    Clear Selection
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Recipients</CardTitle>
                        <CardDescription>
                            {recipients.data.length > 0
                                ? `Showing ${recipients.data.length} of ${recipients.total || recipients.data.length} recipients`
                                : 'No recipients found'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={
                                                    recipients.data.length > 0 &&
                                                    selectedIds.length ===
                                                        recipients.data.length
                                                }
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Scholarship</TableHead>
                                        <TableHead>Academic Year</TableHead>
                                        <TableHead className="text-right">
                                            Amount
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Requirements
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recipients.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No scholarship recipients found.
                                                Try adjusting your filters.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        recipients.data.map((recipient) => (
                                            <TableRow key={recipient.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedIds.includes(
                                                            recipient.id,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) =>
                                                            handleSelectOne(
                                                                recipient.id,
                                                                checked as boolean,
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">
                                                            {recipient.student.name}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {recipient.student.email}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {recipient.scholarship.scholarship_name}
                                                </TableCell>
                                                <TableCell>
                                                    {recipient.academic_year} -{' '}
                                                    {recipient.semester}
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    ₱{recipient.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    className={getStatusColor(
                                                        recipient.status,
                                                    )}
                                                >
                                                    {recipient.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {recipient.requirements_complete ? (
                                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                        Complete
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        Incomplete
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/sas/admin/scholarship-recipients/${recipient.id}/requirements`}
                                                            >
                                                                <FileText className="mr-2 h-4 w-4" />
                                                                Manage
                                                                Requirements
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/sas/admin/scholarship-recipients/${recipient.id}/edit`}
                                                            >
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                confirm(
                                                                    'Delete?',
                                                                ) &&
                                                                router.delete(
                                                                    `/sas/admin/scholarship-recipients/${recipient.id}`,
                                                                )
                                                            }
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
