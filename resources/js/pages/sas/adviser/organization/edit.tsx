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
import { ArrowLeft, Save } from 'lucide-react';

interface Organization {
    id: number;
    organization_code: string;
    organization_name: string;
    organization_type: string;
    category: string;
    status: string;
    description?: string;
    mission?: string;
    vision?: string;
    email?: string;
    contact_number?: string;
    office_location?: string;
    established_date?: string;
}

interface Props {
    organization: Organization;
}

export default function EditOrganization({ organization }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        organization_name: organization.organization_name || '',
        organization_code: organization.organization_code || '',
        organization_type: organization.organization_type || 'Minor',
        category: organization.category || '',
        description: organization.description || '',
        mission: organization.mission || '',
        vision: organization.vision || '',
        email: organization.email || '',
        contact_number: organization.contact_number || '',
        office_location: organization.office_location || '',
        established_date: organization.established_date || '',
        status: organization.status || 'Active',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put('/sas/adviser/organization');
    }

    return (
        <AppLayout>
            <Head title="Edit Organization" />

            {/* Header */}
            <div className="mb-6">
                <Link
                    href={sas.adviser.organization.dashboard.url()}
                    className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Edit Organization
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your organization's information
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Essential details about your organization
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
                                    placeholder="Enter organization name"
                                    required
                                />
                                {errors.organization_name && (
                                    <p className="text-sm text-red-500">
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
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g., SSG, CSC-CAS"
                                    required
                                />
                                {errors.organization_code && (
                                    <p className="text-sm text-red-500">
                                        {errors.organization_code}
                                    </p>
                                )}
                            </div>

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
                                    <p className="text-sm text-red-500">
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
                                    placeholder="e.g., Academic, Cultural, Sports"
                                />
                                {errors.category && (
                                    <p className="text-sm text-red-500">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="established_date">
                                    Established Date
                                </Label>
                                <Input
                                    id="established_date"
                                    type="date"
                                    value={data.established_date}
                                    onChange={(e) =>
                                        setData(
                                            'established_date',
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.established_date && (
                                    <p className="text-sm text-red-500">
                                        {errors.established_date}
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
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Brief description of the organization"
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Mission & Vision */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mission & Vision</CardTitle>
                        <CardDescription>
                            Your organization's purpose and goals
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="mission">Mission</Label>
                            <Textarea
                                id="mission"
                                value={data.mission}
                                onChange={(e) =>
                                    setData('mission', e.target.value)
                                }
                                placeholder="Organization's mission statement"
                                rows={4}
                            />
                            {errors.mission && (
                                <p className="text-sm text-red-500">
                                    {errors.mission}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vision">Vision</Label>
                            <Textarea
                                id="vision"
                                value={data.vision}
                                onChange={(e) =>
                                    setData('vision', e.target.value)
                                }
                                placeholder="Organization's vision statement"
                                rows={4}
                            />
                            {errors.vision && (
                                <p className="text-sm text-red-500">
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
                            How to reach your organization
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="organization@minsubongabong.edu.ph"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact_number">
                                    Contact Number
                                </Label>
                                <Input
                                    id="contact_number"
                                    value={data.contact_number}
                                    onChange={(e) =>
                                        setData(
                                            'contact_number',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="+63 XXX XXX XXXX"
                                />
                                {errors.contact_number && (
                                    <p className="text-sm text-red-500">
                                        {errors.contact_number}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2 md:col-span-2">
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
                                    placeholder="Building and room number"
                                />
                                {errors.office_location && (
                                    <p className="text-sm text-red-500">
                                        {errors.office_location}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Link href={sas.adviser.organization.dashboard.url()}>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" disabled={processing}>
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
