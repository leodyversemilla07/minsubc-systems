import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, useForm } from '@inertiajs/react';

interface Adviser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

interface Organization {
    id: number;
    organization_name: string;
    organization_code: string;
    organization_type: string;
    category?: string;
    mission?: string;
    vision?: string;
    establishment_date?: string;
    adviser_id?: number;
    contact_email?: string;
    contact_phone?: string;
    office_location?: string;
    status: string;
}

interface Props {
    organization: Organization;
    advisers: Adviser[];
}

export default function OrganizationsEdit({ organization, advisers }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        organization_name: organization.organization_name,
        organization_code: organization.organization_code,
        organization_type: organization.organization_type,
        category: organization.category || '',
        mission: organization.mission || '',
        vision: organization.vision || '',
        establishment_date: organization.establishment_date || '',
        adviser_id: organization.adviser_id?.toString() || '',
        contact_email: organization.contact_email || '',
        contact_phone: organization.contact_phone || '',
        office_location: organization.office_location || '',
        status: organization.status,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/sas/admin/organizations/${organization.id}`);
    }

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: '/sas/admin/dashboard' },
                { title: 'Organizations', href: '/sas/admin/organizations' },
                { title: 'Edit', href: '#' },
            ]}
        >
            <Head title={`Edit ${organization.organization_name}`} />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                        Edit Organization
                    </h1>
                    <p className="text-sm text-muted-foreground sm:text-base">
                        Update organization information
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Core details about the organization
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="organization_name">
                                        Organization Name *
                                    </Label>
                                    <Input
                                        id="organization_name"
                                        value={data.organization_name}
                                        onChange={(e) =>
                                            setData(
                                                'organization_name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {errors.organization_name && (
                                        <p className="text-sm text-destructive">
                                            {errors.organization_name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="organization_code">
                                        Organization Code *
                                    </Label>
                                    <Input
                                        id="organization_code"
                                        value={data.organization_code}
                                        onChange={(e) =>
                                            setData(
                                                'organization_code',
                                                e.target.value.toUpperCase(),
                                            )
                                        }
                                        required
                                    />
                                    {errors.organization_code && (
                                        <p className="text-sm text-destructive">
                                            {errors.organization_code}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="organization_type">
                                        Organization Type *
                                    </Label>
                                    <Select
                                        value={data.organization_type}
                                        onValueChange={(value) =>
                                            setData('organization_type', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Major">
                                                Major
                                            </SelectItem>
                                            <SelectItem value="Minor">
                                                Minor
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.organization_type && (
                                        <p className="text-sm text-destructive">
                                            {errors.organization_type}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData('category', e.target.value)
                                        }
                                    />
                                    {errors.category && (
                                        <p className="text-sm text-destructive">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="establishment_date">
                                        Established Date
                                    </Label>
                                    <Input
                                        id="establishment_date"
                                        type="date"
                                        value={data.establishment_date}
                                        onChange={(e) =>
                                            setData(
                                                'establishment_date',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.establishment_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.establishment_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="adviser_id">Adviser</Label>
                                    <Select
                                        value={data.adviser_id}
                                        onValueChange={(value) =>
                                            setData('adviser_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select adviser" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {advisers.map((adviser) => (
                                                <SelectItem
                                                    key={adviser.id}
                                                    value={adviser.id.toString()}
                                                >
                                                    {adviser.first_name}{' '}
                                                    {adviser.last_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.adviser_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.adviser_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) =>
                                            setData('status', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">
                                                Active
                                            </SelectItem>
                                            <SelectItem value="Inactive">
                                                Inactive
                                            </SelectItem>
                                            <SelectItem value="Suspended">
                                                Suspended
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-destructive">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mission & Vision */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Mission & Vision</CardTitle>
                            <CardDescription>
                                Organization's purpose and goals
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="mission">
                                    Mission Statement
                                </Label>
                                <Textarea
                                    id="mission"
                                    value={data.mission}
                                    onChange={(e) =>
                                        setData('mission', e.target.value)
                                    }
                                    rows={4}
                                />
                                {errors.mission && (
                                    <p className="text-sm text-destructive">
                                        {errors.mission}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="vision">Vision Statement</Label>
                                <Textarea
                                    id="vision"
                                    value={data.vision}
                                    onChange={(e) =>
                                        setData('vision', e.target.value)
                                    }
                                    rows={4}
                                />
                                {errors.vision && (
                                    <p className="text-sm text-destructive">
                                        {errors.vision}
                                    </p>
                                )}
                            </div>
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
                                    />
                                    {errors.contact_email && (
                                        <p className="text-sm text-destructive">
                                            {errors.contact_email}
                                        </p>
                                    )}
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
                                    />
                                    {errors.contact_phone && (
                                        <p className="text-sm text-destructive">
                                            {errors.contact_phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="office_location">
                                    Office Location
                                </Label>
                                <Input
                                    id="office_location"
                                    value={data.office_location}
                                    onChange={(e) =>
                                        setData(
                                            'office_location',
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.office_location && (
                                    <p className="text-sm text-destructive">
                                        {errors.office_location}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Actions */}
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button" asChild>
                            <Link href={sas.admin.organizations.index.url()}>
                                Cancel
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
