import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Organization } from '@/types/sas';
import { Link } from '@inertiajs/react';
import { Calendar, Mail, Phone, Users } from 'lucide-react';

interface OrganizationCardProps {
    organization: Organization;
}

export default function OrganizationCard({
    organization,
}: OrganizationCardProps) {
    return (
        <Link href={`/sas/organizations/${organization.organization_code}`}>
            <Card className="group h-full border-0 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
                <CardContent className="p-6">
                    {/* Logo & Status Badge */}
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-blue-100 dark:bg-blue-900">
                            {organization.logo_path ? (
                                <img
                                    src={organization.logo_path}
                                    alt={organization.organization_name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Users className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                            )}
                        </div>
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

                    {/* Organization Name & Code */}
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                        {organization.organization_name}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {organization.organization_code}
                    </p>

                    {/* Type & Category */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                            {organization.organization_type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {organization.category}
                        </Badge>
                    </div>

                    {/* Mission (truncated) */}
                    {organization.mission && (
                        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                            {organization.mission}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="mb-4 grid grid-cols-3 gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <div className="text-center">
                            <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                {organization.officers_count || 0}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Officers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                {organization.members_count || 0}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Members
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                {organization.activities_count || 0}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                Activities
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                        {organization.contact_email && (
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <Mail className="h-3 w-3 shrink-0" />
                                <span className="truncate">
                                    {organization.contact_email}
                                </span>
                            </div>
                        )}
                        {organization.contact_phone && (
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <Phone className="h-3 w-3 shrink-0" />
                                <span>{organization.contact_phone}</span>
                            </div>
                        )}
                        {organization.establishment_date && (
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <Calendar className="h-3 w-3 shrink-0" />
                                <span>
                                    Est.{' '}
                                    {new Date(
                                        organization.establishment_date,
                                    ).getFullYear()}
                                </span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
