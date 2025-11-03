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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import sas from '@/routes/sas';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Edit, Plus, Users } from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    student_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
}

interface Officer {
    id: number;
    organization_id: number;
    student_id: number;
    position: string;
    term_start: string;
    term_end: string;
    responsibilities?: string;
    contact_email?: string;
    contact_phone?: string;
    is_current: boolean;
    student: Student;
}

interface Organization {
    id: number;
    organization_code: string;
    organization_name: string;
}

interface Props {
    organization: Organization;
    officers: Officer[];
}

export default function ManageOfficers({ organization, officers }: Props) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        organization_id: organization.id,
        student_id: '',
        position: '',
        term_start: '',
        term_end: '',
        responsibilities: '',
        contact_email: '',
        contact_phone: '',
    });

    function handleAddOfficer(e: React.FormEvent) {
        e.preventDefault();
        post('/sas/adviser/organization/officers', {
            onSuccess: () => {
                reset();
                setIsAddDialogOpen(false);
            },
        });
    }

    function handleEditOfficer(e: React.FormEvent) {
        e.preventDefault();
        if (editingOfficer) {
            put(`/sas/adviser/organization/officers/${editingOfficer.id}`, {
                onSuccess: () => {
                    reset();
                    setEditingOfficer(null);
                },
            });
        }
    }

    function openEditDialog(officer: Officer) {
        setEditingOfficer(officer);
        setData({
            organization_id: officer.organization_id,
            student_id: officer.student_id.toString(),
            position: officer.position,
            term_start: officer.term_start,
            term_end: officer.term_end,
            responsibilities: officer.responsibilities || '',
            contact_email: officer.contact_email || '',
            contact_phone: officer.contact_phone || '',
        });
    }

    const currentOfficers = officers.filter((o) => o.is_current);
    const pastOfficers = officers.filter((o) => !o.is_current);

    return (
        <AppLayout>
            <Head
                title={`Manage Officers - ${organization.organization_name}`}
            />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={sas.adviser.organization.dashboard.url()}
                    className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Manage Officers
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {organization.organization_name}
                        </p>
                    </div>
                    <Dialog
                        open={isAddDialogOpen}
                        onOpenChange={setIsAddDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Officer
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Add New Officer</DialogTitle>
                                <DialogDescription>
                                    Add a new officer to the organization
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddOfficer}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="student_id">
                                            Student ID *
                                        </Label>
                                        <Input
                                            id="student_id"
                                            value={data.student_id}
                                            onChange={(e) =>
                                                setData(
                                                    'student_id',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter student ID"
                                            required
                                        />
                                        {errors.student_id && (
                                            <p className="text-sm text-red-500">
                                                {errors.student_id}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="position">
                                            Position *
                                        </Label>
                                        <Input
                                            id="position"
                                            value={data.position}
                                            onChange={(e) =>
                                                setData(
                                                    'position',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="e.g., President, Vice President"
                                            required
                                        />
                                        {errors.position && (
                                            <p className="text-sm text-red-500">
                                                {errors.position}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="term_start">
                                                Term Start *
                                            </Label>
                                            <Input
                                                id="term_start"
                                                type="date"
                                                value={data.term_start}
                                                onChange={(e) =>
                                                    setData(
                                                        'term_start',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.term_start && (
                                                <p className="text-sm text-red-500">
                                                    {errors.term_start}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="term_end">
                                                Term End
                                            </Label>
                                            <Input
                                                id="term_end"
                                                type="date"
                                                value={data.term_end}
                                                onChange={(e) =>
                                                    setData(
                                                        'term_end',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.term_end && (
                                                <p className="text-sm text-red-500">
                                                    {errors.term_end}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="responsibilities">
                                            Responsibilities
                                        </Label>
                                        <Textarea
                                            id="responsibilities"
                                            value={data.responsibilities}
                                            onChange={(e) =>
                                                setData(
                                                    'responsibilities',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Describe the officer's responsibilities"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="contact_email">
                                                Contact Email
                                            </Label>
                                            <Input
                                                id="contact_email"
                                                type="email"
                                                value={data.contact_email}
                                                onChange={(e) =>
                                                    setData(
                                                        'contact_email',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="officer@email.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="contact_phone">
                                                Contact Phone
                                            </Label>
                                            <Input
                                                id="contact_phone"
                                                value={data.contact_phone}
                                                onChange={(e) =>
                                                    setData(
                                                        'contact_phone',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="+63 XXX XXX XXXX"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsAddDialogOpen(false);
                                            reset();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Adding...'
                                            : 'Add Officer'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Current Officers */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Current Officers</CardTitle>
                    <CardDescription>
                        Officers currently serving in the organization
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {currentOfficers.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Term</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentOfficers.map((officer) => (
                                    <TableRow key={officer.id}>
                                        <TableCell className="font-medium">
                                            {officer.position}
                                        </TableCell>
                                        <TableCell>
                                            {officer.student.first_name}{' '}
                                            {officer.student.middle_name &&
                                                officer.student.middle_name[0] +
                                                    '.'}{' '}
                                            {officer.student.last_name}
                                        </TableCell>
                                        <TableCell>
                                            {officer.student.student_id}
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
                                        <TableCell>
                                            {officer.contact_email ||
                                                officer.student.email}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog
                                                open={
                                                    editingOfficer?.id ===
                                                    officer.id
                                                }
                                                onOpenChange={(open) =>
                                                    !open &&
                                                    setEditingOfficer(null)
                                                }
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            openEditDialog(
                                                                officer,
                                                            )
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Edit Officer
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Update officer
                                                            information
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <form
                                                        onSubmit={
                                                            handleEditOfficer
                                                        }
                                                    >
                                                        <div className="space-y-4 py-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit_position">
                                                                    Position *
                                                                </Label>
                                                                <Input
                                                                    id="edit_position"
                                                                    value={
                                                                        data.position
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            'position',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="grid gap-4 md:grid-cols-2">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit_term_start">
                                                                        Term
                                                                        Start *
                                                                    </Label>
                                                                    <Input
                                                                        id="edit_term_start"
                                                                        type="date"
                                                                        value={
                                                                            data.term_start
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setData(
                                                                                'term_start',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit_term_end">
                                                                        Term End
                                                                    </Label>
                                                                    <Input
                                                                        id="edit_term_end"
                                                                        type="date"
                                                                        value={
                                                                            data.term_end
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setData(
                                                                                'term_end',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit_responsibilities">
                                                                    Responsibilities
                                                                </Label>
                                                                <Textarea
                                                                    id="edit_responsibilities"
                                                                    value={
                                                                        data.responsibilities
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            'responsibilities',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    rows={3}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    setEditingOfficer(
                                                                        null,
                                                                    )
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                type="submit"
                                                                disabled={
                                                                    processing
                                                                }
                                                            >
                                                                {processing
                                                                    ? 'Saving...'
                                                                    : 'Save Changes'}
                                                            </Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="py-12 text-center">
                            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-400">
                                No current officers assigned
                            </p>
                            <Button
                                className="mt-4"
                                onClick={() => setIsAddDialogOpen(true)}
                            >
                                Add First Officer
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Past Officers */}
            {pastOfficers.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Past Officers</CardTitle>
                        <CardDescription>
                            Officers who have completed their term
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Term</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pastOfficers.map((officer) => (
                                    <TableRow key={officer.id}>
                                        <TableCell className="font-medium">
                                            {officer.position}
                                        </TableCell>
                                        <TableCell>
                                            {officer.student.first_name}{' '}
                                            {officer.student.middle_name &&
                                                officer.student.middle_name[0] +
                                                    '.'}{' '}
                                            {officer.student.last_name}
                                        </TableCell>
                                        <TableCell>
                                            {officer.student.student_id}
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
                                        <TableCell>
                                            <Badge variant="secondary">
                                                Completed
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </AppLayout>
    );
}
