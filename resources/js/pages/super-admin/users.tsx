import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Search,
    Filter,
    Edit,
    Trash2,
    MoreHorizontal,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { dashboard as dashboardRoute, users as usersRoute } from '@/routes/super-admin';
import { updateRoles } from '@/routes/super-admin/users';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
    roles: Array<{
        id: number;
        name: string;
        display_name: string;
    }>;
    created_at: string;
    last_login_at: string | null;
}

interface Role {
    id: number;
    name: string;
    display_name: string;
}

interface UsersProps {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    roles: Role[];
    filters: {
        search: string;
        role: string;
        status: string;
    };
}

export default function Users({ users, roles, filters }: UsersProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    // Use 'all' as the UI value for the "All" option (Radix Select requires non-empty values)
    const [selectedRole, setSelectedRole] = useState(filters.role || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

    const form = useForm({
        roles: [] as number[],
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Super Admin',
            href: dashboardRoute.url(),
        },
        {
            title: 'User Management',
            href: '#',
        },
    ];

    const handleSearch = () => {
        router.get(usersRoute.url(), {
            search: searchTerm,
            role: selectedRole === 'all' ? '' : selectedRole,
            status: selectedStatus === 'all' ? '' : selectedStatus,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleRoleFilter = (role: string) => {
        setSelectedRole(role);

        // Map the UI 'all' value to empty string so backend receives no role filter
        const roleParam = role === 'all' ? '' : role;

        router.get(usersRoute.url(), {
            search: searchTerm,
            role: roleParam,
            status: selectedStatus === 'all' ? '' : selectedStatus,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status);

        const statusParam = status === 'all' ? '' : status;

        router.get(usersRoute.url(), {
            search: searchTerm,
            role: selectedRole === 'all' ? '' : selectedRole,
            status: statusParam,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setSelectedRoles(user.roles.map(role => role.id));
        form.setData('roles', user.roles.map(role => role.id));
    };

    const handleUpdateRoles = () => {
        if (!editingUser) return;

        form.put(updateRoles.url(editingUser.id), {
            onSuccess: () => {
                setEditingUser(null);
                setSelectedRoles([]);
                form.reset();
            },
        });
    };

    const handleDeleteUser = (user: User) => {
        if (confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
            // Note: Delete route not implemented in backend yet
            // router.delete(route('super-admin.users.destroy', user.id));
            alert('Delete functionality not implemented yet');
        }
    };

    const getStatusBadge = (user: User) => {
        if (!user.email_verified_at) {
            return <Badge variant="destructive">Unverified</Badge>;
        }
        return <Badge variant="default">Active</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="flex-1 space-y-8 p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            User Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage system users, roles, and permissions
                        </p>
                    </div>
                    {/* <Link href={route('super-admin.users.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </Link> */}
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
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <Select value={selectedRole} onValueChange={handleRoleFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.name}>
                                            {role.display_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={handleStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="unverified">Unverified</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSearch}>
                                <Filter className="mr-2 h-4 w-4" />
                                Apply
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Users ({users.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Roles</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Login</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="w-[70px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.first_name} {user.last_name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles && user.roles.length > 0 ? (
                                                    user.roles.map(role => (
                                                        <Badge key={role.id} variant="secondary" className="mr-1">
                                                            {role.display_name}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-muted-foreground">No roles</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(user)}</TableCell>
                                        <TableCell>
                                            {user.last_login_at
                                                ? new Date(user.last_login_at).toLocaleDateString()
                                                : 'Never'
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit Roles
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteUser(user)}
                                                        className="text-destructive"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination would go here */}
                        {users.last_page > 1 && (
                            <div className="flex items-center justify-between pt-4">
                                <p className="text-sm text-muted-foreground">
                                    Showing {((users.current_page - 1) * users.per_page) + 1} to{' '}
                                    {Math.min(users.current_page * users.per_page, users.total)} of{' '}
                                    {users.total} users
                                </p>
                                {/* Add pagination component here */}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Edit Roles Dialog */}
                <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit User Roles</DialogTitle>
                            <DialogDescription>
                                Update roles for {editingUser?.first_name} {editingUser?.last_name}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="roles">Roles</Label>
                                <div className="space-y-2">
                                    {roles.map((role) => (
                                        <div key={role.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`role-${role.id}`}
                                                checked={selectedRoles.includes(role.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedRoles([...selectedRoles, role.id]);
                                                        form.setData('roles', [...form.data.roles, role.id]);
                                                    } else {
                                                        setSelectedRoles(selectedRoles.filter(id => id !== role.id));
                                                        form.setData('roles', form.data.roles.filter(id => id !== role.id));
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={`role-${role.id}`} className="text-sm">
                                                {role.display_name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingUser(null)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateRoles} disabled={form.processing}>
                                Update Roles
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}