import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Mail, Phone, User } from 'lucide-react';

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
}

export default function OfficerCard({ officer }: OfficerCardProps) {
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
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col bg-white dark:bg-gray-900">
            <div className="w-full h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                    src={officer.photo || '/placeholder.svg'}
                    alt={officer.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <CardHeader className="pb-3 bg-white dark:bg-gray-900">
                <div className="text-center">
                    <h3 className="text-lg font-bold text-foreground">
                        {officer.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mt-1">
                        {officer.position}
                    </p>
                    {officer.department && (
                        <p className="text-xs text-muted-foreground">
                            {officer.department}
                        </p>
                    )}
                    <div className="mt-2 flex items-center justify-center gap-2">
                        <Badge
                            variant={
                                officer.is_active ? 'default' : 'secondary'
                            }
                        >
                            {officer.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Term: {formatTermPeriod()}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-3 flex-grow flex flex-col bg-white dark:bg-gray-900">
                {officer.bio && (
                    <p className="text-sm text-foreground leading-relaxed text-center flex-grow">
                        {officer.bio}
                    </p>
                )}

                {(officer.email || officer.phone) && (
                    <div className="space-y-2 pt-3 border-t border-border">
                        {officer.email && (
                            <a
                                href={`mailto:${officer.email}`}
                                className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                <span className="break-all">{officer.email}</span>
                            </a>
                        )}
                        {officer.phone && (
                            <a
                                href={`tel:${officer.phone}`}
                                className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <Phone className="w-3 h-3 flex-shrink-0" />
                                <span>{officer.phone}</span>
                            </a>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="bg-white dark:bg-gray-900 pt-0">
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
            </CardFooter>
        </Card>
    );
}
