import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { systemSettings } from '@/routes/super-admin';
import { update } from '@/routes/super-admin/system-settings';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Edit, Filter, Save, Search, X } from 'lucide-react';
import { useState } from 'react';

interface SystemSetting {
    id: number;
    setting_key: string;
    value: string;
    type: string;
    description: string | null;
    updated_by: number | null;
    updated_at: string;
    user?: {
        first_name: string;
        last_name: string;
    };
}

interface SystemSettingsProps {
    settings: {
        data: SystemSetting[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        type: string;
    };
    types: string[];
}

export default function SystemSettings({
    settings,
    filters,
    types,
}: SystemSettingsProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(
        filters.type === '' ? 'all' : filters.type,
    );
    const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(
        null,
    );

    const form = useForm({
        value: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Super Admin',
            href: systemSettings.url(),
        },
        {
            title: 'System Settings',
            href: '#',
        },
    ];

    const handleSearch = () => {
        const backendType = selectedType === 'all' ? '' : selectedType;
        router.get(
            systemSettings.url(),
            {
                search: searchTerm,
                type: backendType,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleTypeFilter = (type: string) => {
        const backendType = type === 'all' ? '' : type;
        setSelectedType(type);
        router.get(
            systemSettings.url(),
            {
                search: searchTerm,
                type: backendType,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleEditSetting = (setting: SystemSetting) => {
        setEditingSetting(setting);
        form.setData('value', setting.value);
    };

    const handleUpdateSetting = () => {
        if (!editingSetting) return;

        form.put(update.url(editingSetting.id), {
            onSuccess: () => {
                setEditingSetting(null);
                form.reset();
            },
        });
    };

    const getTypeBadgeVariant = (type: string) => {
        const variants: Record<
            string,
            'default' | 'secondary' | 'destructive' | 'outline'
        > = {
            system: 'default',
            security: 'destructive',
            email: 'secondary',
            notification: 'outline',
        };
        return variants[type] || 'outline';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Settings" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        System Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Manage global system configuration and parameters
                    </p>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search settings..."
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
                            </div>
                            <Select
                                value={selectedType}
                                onValueChange={handleTypeFilter}
                            >
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Types
                                    </SelectItem>
                                    {types.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type.charAt(0).toUpperCase() +
                                                type.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSearch}>
                                <Filter className="mr-2 h-4 w-4" />
                                Apply
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            System Settings ({settings.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Setting Key</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className="w-[100px]">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {settings.data.map((setting) => (
                                    <TableRow key={setting.id}>
                                        <TableCell className="font-medium">
                                            <code className="rounded bg-muted px-2 py-1 text-sm">
                                                {setting.setting_key}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={getTypeBadgeVariant(
                                                    setting.type,
                                                )}
                                            >
                                                {setting.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="max-w-xs">
                                            <div
                                                className="truncate"
                                                title={setting.value}
                                            >
                                                {setting.value.length > 50
                                                    ? `${setting.value.substring(0, 50)}...`
                                                    : setting.value}
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-xs">
                                            {setting.description ? (
                                                <div
                                                    className="truncate text-sm text-muted-foreground"
                                                    title={setting.description}
                                                >
                                                    {setting.description}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    -
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>
                                                    {new Date(
                                                        setting.updated_at,
                                                    ).toLocaleDateString()}
                                                </div>
                                                {setting.user && (
                                                    <div className="text-muted-foreground">
                                                        by{' '}
                                                        {
                                                            setting.user
                                                                .first_name
                                                        }{' '}
                                                        {setting.user.last_name}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleEditSetting(setting)
                                                }
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination would go here */}
                        {settings.last_page > 1 && (
                            <div className="flex items-center justify-between pt-4">
                                <p className="text-sm text-muted-foreground">
                                    Showing{' '}
                                    {(settings.current_page - 1) *
                                        settings.per_page +
                                        1}{' '}
                                    to{' '}
                                    {Math.min(
                                        settings.current_page *
                                            settings.per_page,
                                        settings.total,
                                    )}{' '}
                                    of {settings.total} settings
                                </p>
                                {/* Add pagination component here */}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Edit Setting Dialog */}
                <Dialog
                    open={!!editingSetting}
                    onOpenChange={() => setEditingSetting(null)}
                >
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit System Setting</DialogTitle>
                            <DialogDescription>
                                Update the value for{' '}
                                <code className="rounded bg-muted px-1">
                                    {editingSetting?.setting_key}
                                </code>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="setting_key">Setting Key</Label>
                                <Input
                                    id="setting_key"
                                    value={editingSetting?.setting_key || ''}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Type</Label>
                                <Input
                                    id="type"
                                    value={editingSetting?.type || ''}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                            {editingSetting?.description && (
                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <div className="rounded bg-muted p-3 text-sm text-muted-foreground">
                                        {editingSetting.description}
                                    </div>
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="value">Value</Label>
                                {editingSetting?.value &&
                                editingSetting.value.length > 100 ? (
                                    <Textarea
                                        id="value"
                                        value={form.data.value}
                                        onChange={(e) =>
                                            form.setData(
                                                'value',
                                                e.target.value,
                                            )
                                        }
                                        rows={4}
                                        placeholder="Enter new value..."
                                    />
                                ) : (
                                    <Input
                                        id="value"
                                        value={form.data.value}
                                        onChange={(e) =>
                                            form.setData(
                                                'value',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter new value..."
                                    />
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setEditingSetting(null)}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpdateSetting}
                                disabled={form.processing}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Update Setting
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
