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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Scholarship {
    id: number;
    scholarship_name: string;
    scholarship_code: string;
    scholarship_type: string;
    description: string;
    provider: string;
    is_active: boolean;
}

interface Props {
    scholarship: Scholarship;
    scholarshipTypes: string[];
}

export default function EditScholarship({
    scholarship,
    scholarshipTypes,
}: Props) {
    const { data, setData, put, processing, errors } = useForm({
        scholarship_name: scholarship.scholarship_name,
        scholarship_code: scholarship.scholarship_code,
        scholarship_type: scholarship.scholarship_type,
        description: scholarship.description || '',
        provider: scholarship.provider,
        is_active: scholarship.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/sas/admin/scholarships/${scholarship.id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: '/sas/admin/dashboard' },
                { title: 'Scholarships', href: '/sas/admin/scholarships' },
                {
                    title: 'Edit',
                    href: `/sas/admin/scholarships/${scholarship.id}/edit`,
                },
            ]}
        >
            <Head title={`Edit ${scholarship.scholarship_name}`} />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                <div className="flex items-center gap-4">
                    <Link href={sas.admin.scholarships.index.url()}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">
                            Edit Scholarship Program
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Update scholarship details
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Scholarship Information</CardTitle>
                        <CardDescription>
                            Update the scholarship program details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="scholarship_name">
                                        Scholarship Name *
                                    </Label>
                                    <Input
                                        id="scholarship_name"
                                        value={data.scholarship_name}
                                        onChange={(e) =>
                                            setData(
                                                'scholarship_name',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.scholarship_name && (
                                        <p className="text-sm text-red-600">
                                            {errors.scholarship_name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="scholarship_code">
                                        Scholarship Code *
                                    </Label>
                                    <Input
                                        id="scholarship_code"
                                        value={data.scholarship_code}
                                        onChange={(e) =>
                                            setData(
                                                'scholarship_code',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.scholarship_code && (
                                        <p className="text-sm text-red-600">
                                            {errors.scholarship_code}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="scholarship_type">
                                        Scholarship Type *
                                    </Label>
                                    <Select
                                        value={data.scholarship_type}
                                        onValueChange={(value) =>
                                            setData('scholarship_type', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {scholarshipTypes.map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.scholarship_type && (
                                        <p className="text-sm text-red-600">
                                            {errors.scholarship_type}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="provider">Provider *</Label>
                                    <Input
                                        id="provider"
                                        value={data.provider}
                                        onChange={(e) =>
                                            setData('provider', e.target.value)
                                        }
                                    />
                                    {errors.provider && (
                                        <p className="text-sm text-red-600">
                                            {errors.provider}
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
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) =>
                                        setData('is_active', checked)
                                    }
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href={sas.admin.scholarships.index.url()}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Updating...'
                                        : 'Update Scholarship'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
