import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import sas from '@/routes/sas';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    Edit,
    Mail,
    MapPin,
    Phone,
    Shield,
    Users,
} from 'lucide-react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    program?: string;
    year_level?: string;
}

interface Officer {
    id: number;
    position: string;
    student: Student;
    start_date: string;
    end_date?: string;
    is_current: boolean;
}

interface Organization {
    id: number;
    organization_name: string;
    organization_code: string;
    organization_type: string;
    category: string;
    mission?: string;
    vision?: string;
    establishment_date?: string;
    contact_email?: string;
    contact_phone?: string;
    office_location?: string;
    status: string;
    adviser?: User;
    currentOfficers?: Officer[];
}

interface Props {
    organization: Organization;
}

export default function OrganizationsShow({ organization }: Props) {
    function getStatusBadge(status: string) {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive' | 'outline'
        > = {
            Active: 'default',
            Inactive: 'secondary',
            Suspended: 'destructive',
        };

        return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: '/sas/admin/dashboard' },
                { title: 'Organizations', href: '/sas/admin/organizations' },
                {
                    title: organization.organization_code,
                    href: `/sas/admin/organizations/${organization.id}`,
                },
            ]}
        >
            <Head title={organization.organization_name} />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                                {organization.organization_name}
                            </h1>
                            {getStatusBadge(organization.status)}
                        </div>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            {organization.organization_code} •{' '}
                            {organization.organization_type} Organization
                        </p>
                    </div>
                    <Button asChild>
                        <Link
                            href={sas.admin.organizations.edit.url(
                                organization.id,
                            )}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Organization
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Column - Main Info */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Mission & Vision */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Mission & Vision</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="mb-2 font-medium">
                                        Mission
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {organization.mission ||
                                            'No mission statement provided.'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-medium">Vision</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {organization.vision ||
                                            'No vision statement provided.'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Officers */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Current Officers</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                {organization.currentOfficers &&
                                organization.currentOfficers.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Position</TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Program</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {organization.currentOfficers.map(
                                                (officer) => (
                                                    <TableRow key={officer.id}>
                                                        <TableCell className="font-medium">
                                                            {officer.position}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                officer.student
                                                                    .first_name
                                                            }{' '}
                                                            {
                                                                officer.student
                                                                    .last_name
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                officer.student
                                                                    .program
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No officers assigned yet.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        {/* Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {organization.adviser && (
                                    <div className="flex items-start gap-3">
                                        <Shield className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">
                                                Adviser
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {
                                                    organization.adviser
                                                        .first_name
                                                }{' '}
                                                {organization.adviser.last_name}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start gap-3">
                                    <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Category</p>
                                        <p className="text-sm text-muted-foreground">
                                            {organization.category}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">
                                            Established
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {organization.establishment_date
                                                ? new Date(
                                                      organization.establishment_date,
                                                  ).toLocaleDateString()
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground">
                                            {organization.contact_email ||
                                                'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <p className="text-sm text-muted-foreground">
                                            {organization.contact_phone ||
                                                'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-sm text-muted-foreground">
                                            {organization.office_location ||
                                                'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
