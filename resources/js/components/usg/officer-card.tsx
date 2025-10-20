import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Building, Mail, Phone, User } from 'lucide-react';

interface Officer {
    id: number;
    name: string;
    position: string;
    department?: string;
    email?: string;
    phone?: string;
    photo?: string;
    bio?: string;
    term_start?: string;
    term_end?: string;
    is_active: boolean;
}

interface OfficerCardProps {
    officer: Officer;
    showContactInfo?: boolean;
    showBio?: boolean;
    compact?: boolean;
}

export default function OfficerCard({
    officer,
    showContactInfo = true,
    showBio = false,
    compact = false,
}: OfficerCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatTermPeriod = () => {
        if (!officer.term_start || !officer.term_end) {
            return 'Current Term';
        }

        const start = new Date(officer.term_start);
        const end = new Date(officer.term_end);

        if (start.getFullYear() === end.getFullYear()) {
            return `${start.getFullYear()}`;
        }

        return `${start.getFullYear()}-${end.getFullYear()}`;
    };

    return (
        <Card className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <CardContent className={`p-${compact ? '4' : '6'} text-center`}>
                {/* Avatar */}
                <div className="mb-4">
                    <Avatar
                        className={`mx-auto ${compact ? 'h-16 w-16' : 'h-20 w-20'}`}
                    >
                        <AvatarImage src={officer.photo} alt={officer.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            {getInitials(officer.name)}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Name and Status */}
                <div className="mb-3">
                    <h3
                        className={`mb-1 font-semibold ${compact ? 'text-base' : 'text-lg'}`}
                    >
                        {officer.name}
                    </h3>
                    <div className="mb-2 flex items-center justify-center gap-2">
                        <Badge
                            variant={
                                officer.is_active ? 'default' : 'secondary'
                            }
                        >
                            {officer.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                </div>

                {/* Position */}
                <div className="mb-3">
                    <p
                        className={`font-medium text-blue-600 dark:text-blue-400 ${
                            compact ? 'text-sm' : 'text-base'
                        }`}
                    >
                        {officer.position}
                    </p>
                    {officer.department && (
                        <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            <Building className="h-3 w-3" />
                            <span>{officer.department}</span>
                        </div>
                    )}
                </div>

                {/* Term Period */}
                <div className="mb-4">
                    <p className="text-xs text-muted-foreground">
                        Term: {formatTermPeriod()}
                    </p>
                </div>

                {/* Bio */}
                {showBio && officer.bio && !compact && (
                    <div className="mb-4">
                        <p className="line-clamp-3 text-left text-sm text-muted-foreground">
                            {officer.bio}
                        </p>
                    </div>
                )}

                {/* Contact Information */}
                {showContactInfo &&
                    (officer.email || officer.phone) &&
                    !compact && (
                        <div className="mb-4 space-y-2">
                            {officer.email && (
                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-3 w-3" />
                                    <a
                                        href={`mailto:${officer.email}`}
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        {officer.email}
                                    </a>
                                </div>
                            )}
                            {officer.phone && (
                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-3 w-3" />
                                    <a
                                        href={`tel:${officer.phone}`}
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        {officer.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                {/* Action Button */}
                {!compact && (
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                    >
                        <Link href={`/usg/officers/${officer.id}`}>
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                        </Link>
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
