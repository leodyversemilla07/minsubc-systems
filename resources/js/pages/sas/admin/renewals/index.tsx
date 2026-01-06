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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Bell,
    Calendar,
    CheckCircle,
    GraduationCap,
    RefreshCw,
    Send,
    Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface Student {
    id: number;
    name: string;
    email: string;
    student_id?: string;
}

interface Scholarship {
    id: number;
    scholarship_name: string;
}

interface ScholarshipRecipient {
    id: number;
    student: Student;
    scholarship: Scholarship;
    academic_year: string;
    semester: string;
    amount: number;
    status: string;
    expiration_date: string | null;
    requirements_complete: boolean;
}

interface Stats {
    total_eligible: number;
    expiring_soon: number;
    renewed_this_period: number;
    total_active: number;
}

interface Props {
    eligibleScholars: ScholarshipRecipient[];
    scholarsNeedingRenewal: ScholarshipRecipient[];
    recentRenewals: ScholarshipRecipient[];
    stats: Stats;
    scholarships: Scholarship[];
    filters: {
        academic_year: string;
        semester: string;
    };
}

export default function RenewalsIndex({
    eligibleScholars,
    scholarsNeedingRenewal,
    recentRenewals,
    stats,
    filters,
}: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
    const [isBulkRenewDialogOpen, setIsBulkRenewDialogOpen] = useState(false);

    const reminderForm = useForm({
        academic_year: filters.academic_year,
        semester: filters.semester,
    });

    const bulkRenewForm = useForm({
        recipient_ids: [] as number[],
        academic_year: filters.academic_year,
        semester: filters.semester,
    });

    // Generate academic year options
    const academicYearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 6 }, (_, i) => {
            const year = currentYear - i + 1;
            return `${year}-${year + 1}`;
        });
    }, []);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(eligibleScholars.map((s) => s.id));
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

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            '/sas/admin/renewals',
            { ...filters, [key]: value },
            { preserveState: true },
        );
    };

    const handleSendReminders = () => {
        reminderForm.post('/sas/admin/renewals/send-reminders', {
            onSuccess: () => {
                setIsReminderDialogOpen(false);
            },
        });
    };

    const handleBulkRenew = () => {
        bulkRenewForm.data.recipient_ids = selectedIds;
        bulkRenewForm.post('/sas/admin/renewals/bulk-renew', {
            onSuccess: () => {
                setSelectedIds([]);
                setIsBulkRenewDialogOpen(false);
            },
        });
    };

    const handleSingleRenewal = (recipientId: number) => {
        router.post(`/sas/admin/renewals/${recipientId}/create`, {
            academic_year: filters.academic_year,
            semester: filters.semester,
        });
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return 'No expiration';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isExpiringSoon = (dateStr: string | null) => {
        if (!dateStr) return false;
        const expDate = new Date(dateStr);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return expDate <= thirtyDaysFromNow && expDate >= new Date();
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: '/sas/admin/dashboard' },
                { title: 'Scholarship Renewals', href: '/sas/admin/renewals' },
            ]}
        >
            <Head title="Scholarship Renewals" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                            Scholarship Renewals
                        </h1>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Manage scholarship renewals and send reminders to
                            eligible scholars
                        </p>
                    </div>

                    <Dialog
                        open={isReminderDialogOpen}
                        onOpenChange={setIsReminderDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Send className="mr-2 h-4 w-4" />
                                Send Reminders
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Send Renewal Reminders
                                </DialogTitle>
                                <DialogDescription>
                                    Send email and in-app notifications to all
                                    eligible scholars for the selected period.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Academic Year</Label>
                                    <Select
                                        value={reminderForm.data.academic_year}
                                        onValueChange={(v) =>
                                            reminderForm.setData(
                                                'academic_year',
                                                v,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {academicYearOptions.map((year) => (
                                                <SelectItem
                                                    key={year}
                                                    value={year}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Semester</Label>
                                    <Select
                                        value={reminderForm.data.semester}
                                        onValueChange={(v) =>
                                            reminderForm.setData('semester', v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st">
                                                1st Semester
                                            </SelectItem>
                                            <SelectItem value="2nd">
                                                2nd Semester
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="rounded-lg border bg-muted/50 p-3">
                                    <p className="text-sm text-muted-foreground">
                                        This will send notifications to{' '}
                                        <strong>
                                            {stats.total_eligible} eligible
                                            scholar(s)
                                        </strong>{' '}
                                        reminding them to renew their
                                        scholarship.
                                    </p>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsReminderDialogOpen(false)
                                    }
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSendReminders}
                                    disabled={reminderForm.processing}
                                >
                                    {reminderForm.processing
                                        ? 'Sending...'
                                        : 'Send Reminders'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Eligible for Renewal
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_eligible}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Scholars ready to renew
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Expiring Soon
                            </CardTitle>
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                {stats.expiring_soon}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Within 30 days
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Renewed This Period
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.renewed_this_period}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {filters.semester} Semester{' '}
                                {filters.academic_year}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Active
                            </CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_active}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active scholarships
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Period Filter */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Select Period
                        </CardTitle>
                        <CardDescription>
                            Choose the academic period for renewal management
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <div className="w-48">
                                <Label className="mb-2 block text-sm">
                                    Academic Year
                                </Label>
                                <Select
                                    value={filters.academic_year}
                                    onValueChange={(v) =>
                                        handleFilterChange('academic_year', v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {academicYearOptions.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-48">
                                <Label className="mb-2 block text-sm">
                                    Semester
                                </Label>
                                <Select
                                    value={filters.semester}
                                    onValueChange={(v) =>
                                        handleFilterChange('semester', v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st">
                                            1st Semester
                                        </SelectItem>
                                        <SelectItem value="2nd">
                                            2nd Semester
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bulk Actions Bar */}
                {selectedIds.length > 0 && (
                    <Card className="border-primary/50 bg-primary/5">
                        <CardContent className="flex items-center justify-between py-3">
                            <span className="text-sm font-medium">
                                {selectedIds.length} scholar(s) selected
                            </span>
                            <div className="flex gap-2">
                                <Dialog
                                    open={isBulkRenewDialogOpen}
                                    onOpenChange={setIsBulkRenewDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button size="sm">
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Bulk Renew
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Bulk Renew Scholarships
                                            </DialogTitle>
                                            <DialogDescription>
                                                Create renewal applications for{' '}
                                                {selectedIds.length} selected
                                                scholar(s).
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label>
                                                    New Academic Year
                                                </Label>
                                                <Select
                                                    value={
                                                        bulkRenewForm.data
                                                            .academic_year
                                                    }
                                                    onValueChange={(v) =>
                                                        bulkRenewForm.setData(
                                                            'academic_year',
                                                            v,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {academicYearOptions.map(
                                                            (year) => (
                                                                <SelectItem
                                                                    key={year}
                                                                    value={year}
                                                                >
                                                                    {year}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Semester</Label>
                                                <Select
                                                    value={
                                                        bulkRenewForm.data
                                                            .semester
                                                    }
                                                    onValueChange={(v) =>
                                                        bulkRenewForm.setData(
                                                            'semester',
                                                            v,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1st">
                                                            1st Semester
                                                        </SelectItem>
                                                        <SelectItem value="2nd">
                                                            2nd Semester
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsBulkRenewDialogOpen(
                                                        false,
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleBulkRenew}
                                                disabled={
                                                    bulkRenewForm.processing
                                                }
                                            >
                                                {bulkRenewForm.processing
                                                    ? 'Processing...'
                                                    : 'Create Renewals'}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
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

                {/* Eligible Scholars Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Eligible for Renewal
                        </CardTitle>
                        <CardDescription>
                            Scholars who can renew their scholarship for{' '}
                            {filters.semester} Semester {filters.academic_year}
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
                                                    eligibleScholars.length >
                                                        0 &&
                                                    selectedIds.length ===
                                                        eligibleScholars.length
                                                }
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Scholarship</TableHead>
                                        <TableHead>Current Period</TableHead>
                                        <TableHead className="text-right">
                                            Amount
                                        </TableHead>
                                        <TableHead>Expiration</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {eligibleScholars.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="py-8 text-center text-muted-foreground"
                                            >
                                                No scholars eligible for renewal
                                                in this period.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        eligibleScholars.map((scholar) => (
                                            <TableRow key={scholar.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedIds.includes(
                                                            scholar.id,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) =>
                                                            handleSelectOne(
                                                                scholar.id,
                                                                checked as boolean,
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">
                                                            {scholar.student.name}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {scholar.student.email}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {scholar.scholarship.scholarship_name}
                                                </TableCell>
                                                <TableCell>
                                                    {scholar.academic_year} -{' '}
                                                    {scholar.semester}
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    ₱
                                                    {scholar.amount?.toLocaleString() ??
                                                        '0'}
                                                </TableCell>
                                                <TableCell>
                                                    {isExpiringSoon(
                                                        scholar.expiration_date,
                                                    ) ? (
                                                        <Badge
                                                            variant="destructive"
                                                            className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                                                        >
                                                            {formatDate(
                                                                scholar.expiration_date,
                                                            )}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-muted-foreground">
                                                            {formatDate(
                                                                scholar.expiration_date,
                                                            )}
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleSingleRenewal(
                                                                scholar.id,
                                                            )
                                                        }
                                                    >
                                                        <RefreshCw className="mr-2 h-4 w-4" />
                                                        Renew
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Scholars Expiring Soon */}
                {scholarsNeedingRenewal.length > 0 && (
                    <Card className="border-orange-200 dark:border-orange-900/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                <AlertCircle className="h-5 w-5" />
                                Expiring Soon
                            </CardTitle>
                            <CardDescription>
                                Scholarships expiring within the next 30 days
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student</TableHead>
                                            <TableHead>Scholarship</TableHead>
                                            <TableHead>
                                                Expiration Date
                                            </TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {scholarsNeedingRenewal.map(
                                            (scholar) => (
                                                <TableRow key={scholar.id}>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">
                                                                {
                                                                    scholar
                                                                        .student
                                                                        .name
                                                                }
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {
                                                                    scholar
                                                                        .student
                                                                        .email
                                                                }
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            scholar.scholarship
                                                                .scholarship_name
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="destructive">
                                                            {formatDate(
                                                                scholar.expiration_date,
                                                            )}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            className={
                                                                scholar.status ===
                                                                'Active'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : ''
                                                            }
                                                        >
                                                            {scholar.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Recent Renewals */}
                {recentRenewals.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                Recent Renewals
                            </CardTitle>
                            <CardDescription>
                                Recently processed scholarship renewals
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student</TableHead>
                                            <TableHead>Scholarship</TableHead>
                                            <TableHead>Period</TableHead>
                                            <TableHead className="text-right">
                                                Amount
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentRenewals.map((renewal) => (
                                            <TableRow key={renewal.id}>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">
                                                            {
                                                                renewal.student
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {
                                                                renewal.student
                                                                    .email
                                                            }
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        renewal.scholarship
                                                            .scholarship_name
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {renewal.academic_year} -{' '}
                                                    {renewal.semester}
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    ₱
                                                    {renewal.amount?.toLocaleString() ??
                                                        '0'}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
