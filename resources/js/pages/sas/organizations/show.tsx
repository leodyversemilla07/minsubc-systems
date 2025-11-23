import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import type { Organization, OrganizationOfficer } from '@/types/sas';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Users,
    Target,
    Award,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Globe
} from 'lucide-react';

interface Props {
    organization: Organization & {
        officers?: OrganizationOfficer[];
        members?: Array<{
            id: number;
            student_id?: string;
            membership_date: string;
            status: string;
            student?: {
                id: number;
                first_name: string;
                middle_name?: string;
                last_name: string;
                email: string;
            };
        }>;
        activities?: Array<{
            id: number;
            activity_name: string;
            activity_date: string;
            description?: string;
            venue?: string;
        }>;
    };
}

export default function OrganizationShow({ organization }: Props) {
    const currentOfficers =
        organization.officers?.filter((officer) => officer.is_current) || [];

    return (
        <SASLayout>
            <Head title={`${organization.organization_name} - SAS`} />

            {/* Hero / Header Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-white pt-8 pb-12 dark:from-gray-900 dark:via-green-950/20 dark:to-gray-900 border-b border-green-100 dark:border-gray-800">

                {/* Background Pattern */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.15] dark:opacity-[0.07]">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-green-600" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                    </svg>
                </div>

                <div className="relative mx-auto max-w-7xl px-4">
                    {/* Back Link */}
                    <Link href={sas.organizations.index.url()} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Organizations
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-start gap-6 lg:gap-8">
                        {/* Logo Box */}
                        <div className="flex-shrink-0">
                            <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-xl dark:from-green-900 dark:to-green-800 ring-4 ring-white dark:ring-gray-900">
                                {organization.logo_path ? (
                                    <img src={organization.logo_path} alt={organization.organization_name} className="h-full w-full object-cover rounded-3xl" />
                                ) : (
                                    <Users className="h-12 w-12 md:h-16 md:w-16 text-green-700 dark:text-green-300" />
                                )}
                            </div>
                        </div>

                        {/* Title & Meta */}
                        <div className="flex-1">
                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {organization.status}
                                </Badge>
                                <Badge variant="outline">{organization.organization_code}</Badge>
                                <Badge variant="outline">{organization.organization_type}</Badge>
                                <Badge variant="outline">{organization.category}</Badge>
                            </div>

                            <h1 className="mb-4 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl dark:text-white tracking-tight">
                                {organization.organization_name}
                            </h1>

                            <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                {organization.org_name}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-4 py-8 bg-gray-50/50 dark:bg-gray-800/50 min-h-[60vh]">
                <div className="mx-auto max-w-7xl">

                    {/* Tabs Navigation */}
                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="officers">
                                Officers {organization.officers_count ? `(${organization.officers_count})` : ''}
                            </TabsTrigger>
                            {organization.members && (
                                <TabsTrigger value="members">
                                    Members ({organization.members.length})
                                </TabsTrigger>
                            )}
                            {organization.activities && (
                                <TabsTrigger value="activities">
                                    Activities ({organization.activities.length})
                                </TabsTrigger>
                            )}
                        </TabsList>

                        <div className="grid gap-8 lg:grid-cols-3 mt-8">

                            {/* Main Content Column */}
                            <div className="lg:col-span-2 space-y-8">

                                {/* About Tab */}
                                <TabsContent value="about" className="mt-0">
                                    <div className="space-y-6">
                                        {/* Mission */}
                                        {organization.mission && (
                                            <Card className="rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                                                        <Target className="h-5 w-5 text-green-600" /> Mission
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{organization.mission}</p>
                                                </CardContent>
                                            </Card>
                                        )}

                                        {/* Vision */}
                                        {organization.vision && (
                                            <Card className="rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                                                        <Globe className="h-5 w-5 text-green-600" /> Vision
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{organization.vision}</p>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                </TabsContent>

                                {/* Officers Tab */}
                                <TabsContent value="officers" className="mt-0">
                                    {organization.officers && organization.officers.length > 0 ? (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {currentOfficers.map((officer) => (
                                                <div key={officer.id} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-green-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-green-700">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                        <Users className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                                            {officer.officer_name || (officer.student ? `${officer.student.first_name} ${officer.student.last_name}` : 'Unknown Officer')}
                                                        </h4>
                                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">{officer.position}</p>
                                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                            <Mail className="h-3 w-3" /> {officer.contact_email || (officer.student ? officer.student.email : 'No email provided')}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                            Term: {new Date(officer.term_start).getFullYear()} - {new Date(officer.term_end).getFullYear()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card className="rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                            <CardContent className="pt-6">
                                                <p className="text-center text-gray-500 dark:text-gray-400">No officers found for this organization.</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </TabsContent>

                                {/* Members Tab */}
                                {organization.members && (
                                    <TabsContent value="members" className="mt-0">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {organization.members.map((member) => (
                                                <div key={member.id} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-green-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-green-700">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                                        <Users className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white">
                                                            {member.student ? `${member.student.first_name} ${member.student.last_name}` : 'Unknown Member'}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Student ID: {member.student_id || 'N/A'}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                            Member since: {new Date(member.membership_date).toLocaleDateString()}
                                                        </p>
                                                        <Badge variant="outline" className="mt-2 text-xs">
                                                            {member.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                )}

                                {/* Activities Tab */}
                                {organization.activities && (
                                    <TabsContent value="activities" className="mt-0">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {organization.activities.map((activity) => (
                                                <div key={activity.id} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-green-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-green-700">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                                                        <Calendar className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white">{activity.activity_name}</h4>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Date: {new Date(activity.activity_date).toLocaleDateString()}
                                                        </p>
                                                        {activity.venue && (
                                                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                                <MapPin className="h-3 w-3" /> {activity.venue}
                                                            </p>
                                                        )}
                                                        {activity.description && (
                                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                )}
                            </div>

                            {/* Sidebar Column */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 space-y-6">

                                    {/* Adviser Card */}
                                    {organization.adviser && (
                                        <Card className="rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                            <CardHeader>
                                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    Organization Adviser
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                                        <Award className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-white">{organization.adviser.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{organization.adviser.email}</div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Stats Card */}
                                    <Card className="rounded-2xl border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
                                        <CardHeader>
                                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Quick Stats
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div className="p-2 bg-white rounded-xl shadow-sm dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                                                    <div className="text-xl font-black text-green-600 dark:text-green-400">{organization.officers_count || 0}</div>
                                                    <div className="text-[10px] uppercase font-bold text-gray-400">Officers</div>
                                                </div>
                                                <div className="p-2 bg-white rounded-xl shadow-sm dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                                                    <div className="text-xl font-black text-green-600 dark:text-green-400">{organization.members_count || 0}</div>
                                                    <div className="text-[10px] uppercase font-bold text-gray-400">Members</div>
                                                </div>
                                                <div className="p-2 bg-white rounded-xl shadow-sm dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                                                    <div className="text-xl font-black text-green-600 dark:text-green-400">{organization.activities_count || 0}</div>
                                                    <div className="text-[10px] uppercase font-bold text-gray-400">Events</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Contact Card */}
                                    <Card className="rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                                        <CardHeader>
                                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Contact Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3 text-sm">
                                                {organization.contact_email && (
                                                    <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                                        <Mail className="h-4 w-4 text-green-600" />
                                                        <a href={`mailto:${organization.contact_email}`} className="hover:text-green-600 hover:underline">{organization.contact_email}</a>
                                                    </li>
                                                )}
                                                {organization.contact_phone && (
                                                    <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                                        <Phone className="h-4 w-4 text-green-600" />
                                                        <span>{organization.contact_phone}</span>
                                                    </li>
                                                )}
                                                {organization.establishment_date && (
                                                    <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                                        <Calendar className="h-4 w-4 text-green-600" />
                                                        <span>Est. {new Date(organization.establishment_date).getFullYear()}</span>
                                                    </li>
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </section>
        </SASLayout>
    );
}
