import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import AppLayout from '@/layouts/app-layout';
import { auditLogs } from '@/routes/super-admin';
import { show } from '@/routes/super-admin/audit-logs';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Database, Eye, Filter, Search, User } from 'lucide-react';
import { useState } from 'react';

interface AuditLog {
    id: number;
    action: string;
    description: string;
    model_type: string | null;
    model_id: number | null;
    user_id: number | null;
    old_values: Record<string, unknown> | null;
    new_values: Record<string, unknown> | null;
    metadata: Record<string, unknown> | null;
    created_at: string;
    user?: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };
}

interface AuditLogsProps {
    auditLogs: {
        data: AuditLog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        action: string;
        user_id: string;
        model_type: string;
        date_from: string;
        date_to: string;
        search: string;
    };
    actions: string[];
    users: Array<{
        id: number;
        name: string;
        email: string;
    }>;
    modelTypes: string[];
}

export default function AuditLogs({
    auditLogs: logs,
    filters,
    actions,
    users,
    modelTypes,
}: AuditLogsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedAction, setSelectedAction] = useState(
        filters.action || 'all',
    );
    const [selectedUser, setSelectedUser] = useState(filters.user_id || 'all');
    const [selectedModelType, setSelectedModelType] = useState(
        filters.model_type || 'all',
    );
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Super Admin',
            href: auditLogs.url(),
        },
        {
            title: 'Audit Logs',
            href: '#',
        },
    ];

    const handleSearch = () => {
        router.get(
            auditLogs.url(),
            {
                search: searchTerm,
                action: selectedAction === 'all' ? '' : selectedAction,
                user_id: selectedUser === 'all' ? '' : selectedUser,
                model_type:
                    selectedModelType === 'all' ? '' : selectedModelType,
                date_from: dateFrom,
                date_to: dateTo,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleFilterChange = (key: string, value: string) => {
        const actualValue = value === 'all' ? '' : value;

        const newFilters = {
            search: searchTerm,
            action: selectedAction === 'all' ? '' : selectedAction,
            user_id: selectedUser === 'all' ? '' : selectedUser,
            model_type: selectedModelType === 'all' ? '' : selectedModelType,
            date_from: dateFrom,
            date_to: dateTo,
            [key]: actualValue,
        };

        // Update local state
        switch (key) {
            case 'action':
                setSelectedAction(value);
                break;
            case 'user_id':
                setSelectedUser(value);
                break;
            case 'model_type':
                setSelectedModelType(value);
                break;
            case 'date_from':
                setDateFrom(value);
                break;
            case 'date_to':
                setDateTo(value);
                break;
        }

        router.get(auditLogs.url(), newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const getActionBadgeVariant = (action: string) => {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive' | 'outline'
        > = {
            created: 'default',
            updated: 'secondary',
            deleted: 'destructive',
            login: 'outline',
            logout: 'outline',
        };
        return variants[action] || 'outline';
    };

    const formatModelType = (modelType: string | null) => {
        if (!modelType) return '-';
        return (
            modelType
                .split('\\')
                .pop()
                ?.replace(/([A-Z])/g, ' $1')
                .trim() || modelType
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Audit Logs" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Audit Logs
                    </h1>
                    <p className="text-muted-foreground">
                        View detailed system activity and change history
                    </p>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <div className="relative">
                                <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search logs..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                        e.key === 'Enter' && handleSearch()
                                    }
                                    className="pl-8"
                                />
                            </div>
                            <Select
                                value={selectedAction || 'all'}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        'action',
                                        value === 'all' ? '' : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Actions
                                    </SelectItem>
                                    {actions.map((action) => (
                                        <SelectItem key={action} value={action}>
                                            {action.charAt(0).toUpperCase() +
                                                action.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedUser || 'all'}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        'user_id',
                                        value === 'all' ? '' : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by user" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Users
                                    </SelectItem>
                                    {users.map((user) => (
                                        <SelectItem
                                            key={user.id}
                                            value={user.id.toString()}
                                        >
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedModelType || 'all'}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        'model_type',
                                        value === 'all' ? '' : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by model" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Models
                                    </SelectItem>
                                    {modelTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {formatModelType(type)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input
                                type="date"
                                placeholder="From date"
                                value={dateFrom}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'date_from',
                                        e.target.value,
                                    )
                                }
                            />
                            <Input
                                type="date"
                                placeholder="To date"
                                value={dateTo}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'date_to',
                                        e.target.value,
                                    )
                                }
                            />
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleSearch}
                                    className="flex-1"
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    Apply
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedAction('all');
                                        setSelectedUser('all');
                                        setSelectedModelType('all');
                                        setDateFrom('');
                                        setDateTo('');
                                        router.get(
                                            auditLogs.url(),
                                            {},
                                            {
                                                preserveState: true,
                                                replace: true,
                                            },
                                        );
                                    }}
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Audit Logs Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Audit Logs ({logs.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Action</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead className="w-[100px]">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.data.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell>
                                            <Badge
                                                variant={getActionBadgeVariant(
                                                    log.action,
                                                )}
                                            >
                                                {log.action}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {log.user ? (
                                                <div className="flex items-center space-x-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="font-medium">
                                                            {
                                                                log.user
                                                                    .first_name
                                                            }{' '}
                                                            {log.user.last_name}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {log.user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    System
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {log.model_type ? (
                                                <div className="flex items-center space-x-2">
                                                    <Database className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="font-medium">
                                                            {formatModelType(
                                                                log.model_type,
                                                            )}
                                                        </div>
                                                        {log.model_id && (
                                                            <div className="text-sm text-muted-foreground">
                                                                ID:{' '}
                                                                {log.model_id}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    -
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-xs">
                                            <div
                                                className="truncate"
                                                title={log.description}
                                            >
                                                {log.description}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <div className="text-sm">
                                                    {new Date(
                                                        log.created_at,
                                                    ).toLocaleString()}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={show.url(log.id)}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination would go here */}
                        {logs.last_page > 1 && (
                            <div className="flex items-center justify-between pt-4">
                                <p className="text-sm text-muted-foreground">
                                    Showing{' '}
                                    {(logs.current_page - 1) * logs.per_page +
                                        1}{' '}
                                    to{' '}
                                    {Math.min(
                                        logs.current_page * logs.per_page,
                                        logs.total,
                                    )}{' '}
                                    of {logs.total} audit logs
                                </p>
                                {/* Add pagination component here */}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
