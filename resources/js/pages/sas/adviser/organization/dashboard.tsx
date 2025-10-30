import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    Edit,
    Mail,
    Phone,
    Upload,
    Users,
} from 'lucide-react';

interface Student {
    id: number;
    student_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
}

interface Officer {
    id: number;
    position: string;
    term_start: string;
    term_end: string;
    is_current: boolean;
    student: Student;
}

interface Member {
    id: number;
    student_id: number;
    membership_date: string;
    status: string;
}

interface Organization {
    id: number;
    organization_code: string;
    organization_name: string;
    organization_type: string;
    category: string;
    status: string;
    description?: string;
    mission?: string;
    vision?: string;
    email?: string;
    contact_number?: string;
    office_location?: string;
    established_date?: string;
    recognition_date?: string;
    logo_path?: string;
    currentOfficers?: Officer[];
    members?: Member[];
}

interface Props {
    organization: Organization;
}

export default function AdviserOrganizationDashboard({ organization }: Props) {
    const activeMembers =
        organization.members?.filter((m) => m.status === 'Active').length || 0;
    const currentOfficers = organization.currentOfficers?.length || 0;

    return (
        <AppLayout>
            <Head title={`${organization.organization_name} - Dashboard`} />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {organization.organization_name}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {organization.organization_code} •{' '}
                            {organization.organization_type} •{' '}
                            {organization.category}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={sas.adviser.organization.edit.url()}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Organization
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Status
                        </CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            <Badge
                                variant={
                                    organization.status === 'Active'
                                        ? 'default'
                                        : 'secondary'
                                }
                            >
                                {organization.status}
                            </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Organization Status
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Officers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {currentOfficers}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Current Term
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Members
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {activeMembers}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Active Members
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Type
                        </CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {organization.organization_type}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {organization.category}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="officers">Officers</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Organization Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Organization Details</CardTitle>
                                <CardDescription>
                                    Basic information about the organization
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {organization.description && (
                                    <div>
                                        <h3 className="mb-2 font-semibold">
                                            Description
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {organization.description}
                                        </p>
                                    </div>
                                )}

                                {organization.established_date && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">
                                            Established:
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {new Date(
                                                organization.established_date,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}

                                {organization.recognition_date && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">
                                            Recognized:
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {new Date(
                                                organization.recognition_date,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}

                                {organization.office_location && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Building2 className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">
                                            Office:
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {organization.office_location}
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>
                                    How to reach the organization
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {organization.email && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">
                                            Email:
                                        </span>
                                        <a
                                            href={`mailto:${organization.email}`}
                                            className="text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            {organization.email}
                                        </a>
                                    </div>
                                )}

                                {organization.contact_number && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">
                                            Phone:
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {organization.contact_number}
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Mission */}
                        {organization.mission && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {organization.mission}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Vision */}
                        {organization.vision && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vision</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {organization.vision}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common tasks and management options
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <Link href={sas.adviser.organization.officers.url()}>
                                    <Button variant="outline" className="w-full">
                                        <Users className="mr-2 h-4 w-4" />
                                        Manage Officers
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full">
                                    <Users className="mr-2 h-4 w-4" />
                                    Manage Members
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Create Activity
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Document
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Officers Tab */}
                <TabsContent value="officers" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Current Officers</CardTitle>
                                <CardDescription>
                                    Organization officers for the current term
                                </CardDescription>
                            </div>
                            <Link href={sas.adviser.organization.officers.url()}>
                                <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Manage Officers
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {organization.currentOfficers &&
                            organization.currentOfficers.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Position</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Student ID</TableHead>
                                            <TableHead>Term</TableHead>
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
                                                        {officer.student
                                                            .first_name}{' '}
                                                        {officer.student
                                                            .middle_name &&
                                                            officer.student
                                                                .middle_name[0] +
                                                                '.'}{' '}
                                                        {
                                                            officer.student
                                                                .last_name
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            officer.student
                                                                .student_id
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            officer.term_start,
                                                        ).getFullYear()}{' '}
                                                        -{' '}
                                                        {new Date(
                                                            officer.term_end,
                                                        ).getFullYear()}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="py-12 text-center">
                                    <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <p className="text-gray-600 dark:text-gray-400">
                                        No officers assigned yet
                                    </p>
                                    <Link
                                        href={sas.adviser.organization.officers.url()}
                                        className="mt-4 inline-block"
                                    >
                                        <Button>Add Officers</Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Members Tab */}
                <TabsContent value="members" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Organization Members</CardTitle>
                                <CardDescription>
                                    All current members of the organization
                                </CardDescription>
                            </div>
                            <Button>
                                <Users className="mr-2 h-4 w-4" />
                                Add Member
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {organization.members &&
                            organization.members.length > 0 ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Members: {organization.members.length}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Active Members: {activeMembers}
                                    </p>
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                    <p className="text-gray-600 dark:text-gray-400">
                                        No members registered yet
                                    </p>
                                    <Button className="mt-4">
                                        Add Members
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AppLayout>
    );
}
