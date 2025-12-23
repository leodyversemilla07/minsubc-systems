import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { InsuranceRecord } from '@/types/sas';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ChevronRight, Clock, Plus, ShieldCheck } from 'lucide-react';

interface Props {
    insuranceRecords: InsuranceRecord[];
}

const statusColors = {
    Pending:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Approved:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export default function Index({ insuranceRecords }: Props) {
    const activeCount = insuranceRecords.filter(
        (i) => i.status === 'Approved',
    ).length;
    const pendingCount = insuranceRecords.filter(
        (i) => i.status === 'Pending',
    ).length;

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'My Insurance', href: sas.student.insurance.index.url() },
            ]}
        >
            <Head title="My Insurance - Student Portal" />

            <div className="flex-1 space-y-6 p-6 md:p-8">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                            <ShieldCheck className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl dark:text-white">
                                My Insurance Records
                            </h1>
                            <p className="text-muted-foreground dark:text-slate-400">
                                View and manage your insurance coverage
                            </p>
                        </div>
                    </div>

                    <Link href={sas.student.insurance.create.url()}>
                        <Button className="bg-purple-700 hover:bg-purple-800">
                            <Plus className="mr-2 h-4 w-4" />
                            Submit New Insurance
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/20">
                                    <ShieldCheck className="h-6 w-6 text-green-700 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">
                                        Active Insurance
                                    </p>
                                    <p className="text-2xl font-bold dark:text-white">
                                        {activeCount}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-500/20">
                                    <Clock className="h-6 w-6 text-yellow-700 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">
                                        Pending Review
                                    </p>
                                    <p className="text-2xl font-bold dark:text-white">
                                        {pendingCount}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-800/50">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-500/20">
                                    <Calendar className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground dark:text-slate-400">
                                        Total Records
                                    </p>
                                    <p className="text-2xl font-bold dark:text-white">
                                        {insuranceRecords.length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Insurance Records List */}
                <div>
                    {insuranceRecords.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {insuranceRecords.map((insurance) => (
                                <Card
                                    key={insurance.id}
                                    className="group overflow-hidden transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50"
                                >
                                    <CardHeader className="pb-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl text-purple-900 dark:text-white">
                                                    {insurance.insurance_provider ||
                                                        'Insurance Policy'}
                                                </CardTitle>
                                                <div className="mt-1 flex items-center gap-2">
                                                    {insurance.policy_number && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {
                                                                insurance.policy_number
                                                            }
                                                        </Badge>
                                                    )}
                                                    <Badge
                                                        className={
                                                            statusColors[
                                                            insurance.status
                                                            ]
                                                        }
                                                    >
                                                        {insurance.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="space-y-3">
                                            {insurance.coverage_type && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                        Coverage Type:
                                                    </span>
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        {
                                                            insurance.coverage_type
                                                        }
                                                    </span>
                                                </div>
                                            )}

                                            {insurance.coverage_amount && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                        Coverage Amount:
                                                    </span>
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        ₱
                                                        {insurance.coverage_amount.toLocaleString()}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    Valid:{' '}
                                                    {new Date(
                                                        insurance.start_date,
                                                    ).toLocaleDateString()}{' '}
                                                    -{' '}
                                                    {new Date(
                                                        insurance.expiry_date,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>

                                            {insurance.remarks && (
                                                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {insurance.remarks}
                                                </p>
                                            )}

                                            <Link
                                                href={sas.student.insurance.show.url(
                                                    { id: insurance.id },
                                                )}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900"
                                                >
                                                    View Details
                                                    <ChevronRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="dark:border-slate-800 dark:bg-slate-800/50">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <ShieldCheck className="mb-4 h-16 w-16 text-gray-400" />
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    No Insurance Records
                                </h3>
                                <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
                                    You don't have any insurance records yet.
                                    <br />
                                    Submit your first insurance policy to get
                                    started.
                                </p>
                                <Link href={sas.student.insurance.create.url()}>
                                    <Button className="bg-purple-700 hover:bg-purple-800">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Submit New Insurance
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
