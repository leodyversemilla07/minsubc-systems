import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    FileText,
    Users,
    XCircle,
} from 'lucide-react';

interface Adviser {
    id: number;
    first_name: string;
    last_name: string;
}

interface Officer {
    id: number;
    position: string;
    is_current: boolean;
}

interface Organization {
    id: number;
    organization_code: string;
    organization_name: string;
    organization_type: string;
    category: string;
    status: string;
    adviser?: Adviser;
    current_officers?: Officer[];
}

interface Props {
    organizations: Organization[];
}

export default function OrganizationsCompliance({ organizations }: Props) {
    function getComplianceStatus(org: Organization) {
        const hasAdviser = !!org.adviser;
        const hasOfficers =
            org.current_officers && org.current_officers.length > 0;

        if (hasAdviser && hasOfficers) {
            return { status: 'Compliant', icon: CheckCircle, color: 'success' };
        }

        if (!hasAdviser && !hasOfficers) {
            return {
                status: 'Non-Compliant',
                icon: XCircle,
                color: 'destructive',
            };
        }

        return {
            status: 'Partial',
            icon: AlertCircle,
            color: 'warning',
        };
    }

    function getComplianceColor(color: string) {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive'
        > = {
            success: 'default',
            warning: 'secondary',
            destructive: 'destructive',
        };

        return variants[color] || 'secondary';
    }

    const stats = {
        total: organizations.length,
        compliant: organizations.filter(
            (o) => o.adviser && o.current_officers && o.current_officers.length,
        ).length,
        partial: organizations.filter(
            (o) =>
                (o.adviser && (!o.current_officers || !o.current_officers.length)) ||
                (!o.adviser && o.current_officers && o.current_officers.length),
        ).length,
        nonCompliant: organizations.filter(
            (o) =>
                !o.adviser && (!o.current_officers || !o.current_officers.length),
        ).length,
    };

    return (
        <AppLayout>
            <Head title="Organizations Compliance" />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/sas/admin/organizations"
                    className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Organizations
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Organizations Compliance Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Monitor organization compliance status and requirements
                </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Organizations
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
                            Compliant
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.compliant}
                        </div>
                        <p className="text-xs text-gray-600">
                            {stats.total > 0
                                ? Math.round(
                                      (stats.compliant / stats.total) * 100,
                                  )
                                : 0}
                            % of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Partial Compliance
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.partial}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Non-Compliant
                        </CardTitle>
                        <XCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.nonCompliant}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Compliance Requirements Info */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Compliance Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>
                                <strong>Compliant:</strong> Organization has an
                                assigned adviser and current officers
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <span>
                                <strong>Partial:</strong> Organization has
                                either an adviser OR officers, but not both
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span>
                                <strong>Non-Compliant:</strong> Organization has
                                no adviser and no current officers
                            </span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            {/* Compliance Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Organization Compliance Status</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Organization Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Adviser</TableHead>
                                <TableHead>Officers</TableHead>
                                <TableHead>Compliance Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {organizations.map((org) => {
                                const compliance = getComplianceStatus(org);
                                const Icon = compliance.icon;

                                return (
                                    <TableRow key={org.id}>
                                        <TableCell className="font-mono text-sm">
                                            {org.organization_code}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {org.organization_name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {org.organization_type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {org.adviser ? (
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                    <span>
                                                        {org.adviser.first_name}{' '}
                                                        {org.adviser.last_name}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <XCircle className="h-4 w-4" />
                                                    <span>No adviser</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {org.current_officers &&
                                            org.current_officers.length > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-green-600" />
                                                    <span>
                                                        {
                                                            org.current_officers
                                                                .length
                                                        }{' '}
                                                        officer
                                                        {org.current_officers
                                                            .length !== 1
                                                            ? 's'
                                                            : ''}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Users className="h-4 w-4" />
                                                    <span>No officers</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={getComplianceColor(
                                                    compliance.color,
                                                )}
                                                className="gap-1"
                                            >
                                                <Icon className="h-3 w-3" />
                                                {compliance.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
