import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SASLayout from '@/layouts/sas-layout';
import type { Organization, OrganizationOfficer } from '@/types/sas';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Mail, Phone, Target, Users } from 'lucide-react';

interface Props {
    organization: Organization & {
        officers?: OrganizationOfficer[];
        members?: Array<{
            id: number;
            member_name: string;
            student_id?: string;
            contact_email?: string;
            membership_date: string;
            status: string;
        }>;
        activities?: Array<{
            id: number;
            activity_name: string;
            activity_date: string;
            activity_type: string;
            status: string;
        }>;
    };
}

export default function OrganizationShow({ organization }: Props) {
    const currentOfficers =
        organization.officers?.filter((officer) => officer.is_current) || [];

    return (
        <SASLayout>
            <Head title={`${organization.organization_name} - SAS`} />

            {/* Back Button & Header */}
            <section className="border-b bg-white px-4 py-6 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl">
                    <Link href="/sas/organizations">
                        <Button variant="ghost" size="sm" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Organizations
                        </Button>
                    </Link>

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                        {/* Logo */}
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-100 dark:bg-blue-900">
                            {organization.logo_path ? (
                                <img
                                    src={organization.logo_path}
                                    alt={organization.organization_name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Users className="h-12 w-12 text-blue-700 dark:text-blue-400" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {organization.organization_name}
                                </h1>
                                <Badge
                                    variant={
                                        organization.status === 'Active'
                                            ? 'default'
                                            : 'secondary'
                                    }
                                    className={
                                        organization.status === 'Active'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : ''
                                    }
                                >
                                    {organization.status}
                                </Badge>
                            </div>

                            <p className="mb-3 text-lg text-gray-600 dark:text-gray-400">
                                {organization.organization_code}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">
                                    {organization.organization_type}
                                </Badge>
                                <Badge variant="outline">
                                    {organization.category}
                                </Badge>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-1">
                            <div className="text-center sm:text-right">
                                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                    {organization.officers_count || 0}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Officers
                                </div>
                            </div>
                            <div className="text-center sm:text-right">
                                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                    {organization.members_count || 0}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Members
                                </div>
                            </div>
                            <div className="text-center sm:text-right">
                                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                    {organization.activities_count || 0}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Activities
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-gray-50 px-4 py-8 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl">
                    <Tabs defaultValue="about" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="officers">
                                Officers ({currentOfficers.length})
                            </TabsTrigger>
                            {organization.members && (
                                <TabsTrigger value="members">
                                    Members ({organization.members.length})
                                </TabsTrigger>
                            )}
                            {organization.activities && (
                                <TabsTrigger value="activities">
                                    Activities ({organization.activities.length}
                                    )
                                </TabsTrigger>
                            )}
                        </TabsList>

                        {/* About Tab */}
                        <TabsContent value="about" className="space-y-6">
                            <div className="grid gap-6 lg:grid-cols-3">
                                {/* Main Info */}
                                <div className="space-y-6 lg:col-span-2">
                                    {/* Mission */}
                                    {organization.mission && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Target className="h-5 w-5 text-blue-700" />
                                                    Mission
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {organization.mission}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Vision */}
                                    {organization.vision && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Target className="h-5 w-5 text-blue-700" />
                                                    Vision
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {organization.vision}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>

                                {/* Sidebar Info */}
                                <div className="space-y-6">
                                    {/* Contact Information */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Contact</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {organization.contact_email && (
                                                <div className="flex items-start gap-3">
                                                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                                                    <a
                                                        href={`mailto:${organization.contact_email}`}
                                                        className="text-sm text-blue-700 hover:underline dark:text-blue-400"
                                                    >
                                                        {
                                                            organization.contact_email
                                                        }
                                                    </a>
                                                </div>
                                            )}

                                            {organization.contact_phone && (
                                                <div className="flex items-start gap-3">
                                                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                                                    <a
                                                        href={`tel:${organization.contact_phone}`}
                                                        className="text-sm text-blue-700 hover:underline dark:text-blue-400"
                                                    >
                                                        {
                                                            organization.contact_phone
                                                        }
                                                    </a>
                                                </div>
                                            )}

                                            {organization.establishment_date && (
                                                <div className="flex items-start gap-3">
                                                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                                        <div className="font-medium">
                                                            Established
                                                        </div>
                                                        <div>
                                                            {new Date(
                                                                organization.establishment_date,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                },
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Adviser */}
                                    {organization.adviser && (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Adviser</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                                        <Users className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 dark:text-white">
                                                            {
                                                                organization
                                                                    .adviser
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                                            {
                                                                organization
                                                                    .adviser
                                                                    .email
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Officers Tab */}
                        <TabsContent value="officers">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Officers</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {currentOfficers.length > 0 ? (
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {currentOfficers.map((officer) => (
                                                <div
                                                    key={officer.id}
                                                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                                                >
                                                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                                        <Users className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                                                    </div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {officer.officer_name}
                                                    </h4>
                                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                                                        {officer.position}
                                                    </p>
                                                    {officer.contact_email && (
                                                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                                            {
                                                                officer.contact_email
                                                            }
                                                        </p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                                        {new Date(
                                                            officer.term_start,
                                                        ).getFullYear()}{' '}
                                                        -{' '}
                                                        {new Date(
                                                            officer.term_end,
                                                        ).getFullYear()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-600 dark:text-gray-400">
                                            No current officers listed
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Members Tab */}
                        {organization.members && (
                            <TabsContent value="members">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Members</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {organization.members.length > 0 ? (
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="border-b">
                                                            <th className="pb-2 text-left text-sm font-semibold">
                                                                Name
                                                            </th>
                                                            <th className="pb-2 text-left text-sm font-semibold">
                                                                Student ID
                                                            </th>
                                                            <th className="pb-2 text-left text-sm font-semibold">
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {organization.members.map(
                                                            (member) => (
                                                                <tr
                                                                    key={
                                                                        member.id
                                                                    }
                                                                    className="border-b"
                                                                >
                                                                    <td className="py-3">
                                                                        {
                                                                            member.member_name
                                                                        }
                                                                    </td>
                                                                    <td className="py-3 text-sm text-gray-600">
                                                                        {member.student_id ||
                                                                            'N/A'}
                                                                    </td>
                                                                    <td className="py-3">
                                                                        <Badge
                                                                            variant={
                                                                                member.status ===
                                                                                'Active'
                                                                                    ? 'default'
                                                                                    : 'secondary'
                                                                            }
                                                                        >
                                                                            {
                                                                                member.status
                                                                            }
                                                                        </Badge>
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-600 dark:text-gray-400">
                                                No members listed
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )}

                        {/* Activities Tab */}
                        {organization.activities && (
                            <TabsContent value="activities">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Activities</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {organization.activities.length > 0 ? (
                                            <div className="space-y-4">
                                                {organization.activities.map(
                                                    (activity) => (
                                                        <div
                                                            key={activity.id}
                                                            className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                                                        >
                                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                                                <Calendar className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                    {
                                                                        activity.activity_name
                                                                    }
                                                                </h4>
                                                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs"
                                                                    >
                                                                        {
                                                                            activity.activity_type
                                                                        }
                                                                    </Badge>
                                                                    <Badge className="text-xs">
                                                                        {
                                                                            activity.status
                                                                        }
                                                                    </Badge>
                                                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                                                        {new Date(
                                                                            activity.activity_date,
                                                                        ).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-center text-gray-600 dark:text-gray-400">
                                                No activities listed
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )}
                    </Tabs>
                </div>
            </section>
        </SASLayout>
    );
}
