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

interface Recipient {
    id: number;
    student: { name: string };
    scholarship: { scholarship_name: string };
    academic_year: string;
    semester: string;
    amount: number;
    status: string;
    date_awarded: string;
    expiration_date: string;
    renewal_status: string;
    requirements_complete: boolean;
    remarks: string;
}

interface Props {
    recipient: Recipient;
}

export default function EditRecipient({ recipient }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        academic_year: recipient.academic_year,
        semester: recipient.semester,
        amount: recipient.amount,
        status: recipient.status,
        date_awarded: recipient.date_awarded,
        expiration_date: recipient.expiration_date || '',
        renewal_status: recipient.renewal_status,
        requirements_complete: recipient.requirements_complete,
        remarks: recipient.remarks || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/sas/admin/scholarship-recipients/${recipient.id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'SAS Admin', href: '/sas/admin/dashboard' },
                {
                    title: 'Recipients',
                    href: '/sas/admin/scholarship-recipients',
                },
                {
                    title: 'Edit',
                    href: `/sas/admin/scholarship-recipients/${recipient.id}/edit`,
                },
            ]}
        >
            <Head title="Edit Scholarship Recipient" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-6 lg:p-8">
                <div className="flex items-center gap-4">
                    <Link href={sas.admin.scholarshipRecipients.index.url()}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">
                            Edit Scholarship Recipient
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {recipient.student.name} -{' '}
                            {recipient.scholarship.scholarship_name}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recipient Information</CardTitle>
                        <CardDescription>
                            Update recipient details and status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Academic Year</Label>
                                    <Input
                                        value={data.academic_year}
                                        onChange={(e) =>
                                            setData(
                                                'academic_year',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.academic_year && (
                                        <p className="text-sm text-red-600">
                                            {errors.academic_year}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Semester</Label>
                                    <Select
                                        value={data.semester}
                                        onValueChange={(value) =>
                                            setData('semester', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st">
                                                1st Semester
                                            </SelectItem>
                                            <SelectItem value="2nd">
                                                2nd Semester
                                            </SelectItem>
                                            <SelectItem value="Summer">
                                                Summer
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.semester && (
                                        <p className="text-sm text-red-600">
                                            {errors.semester}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Amount</Label>
                                    <Input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData(
                                                'amount',
                                                parseFloat(e.target.value),
                                            )
                                        }
                                    />
                                    {errors.amount && (
                                        <p className="text-sm text-red-600">
                                            {errors.amount}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Status</Label>
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
                                            <SelectItem value="Suspended">
                                                Suspended
                                            </SelectItem>
                                            <SelectItem value="Completed">
                                                Completed
                                            </SelectItem>
                                            <SelectItem value="Cancelled">
                                                Cancelled
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-600">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Date Awarded</Label>
                                    <Input
                                        type="date"
                                        value={data.date_awarded}
                                        onChange={(e) =>
                                            setData(
                                                'date_awarded',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.date_awarded && (
                                        <p className="text-sm text-red-600">
                                            {errors.date_awarded}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Expiration Date</Label>
                                    <Input
                                        type="date"
                                        value={data.expiration_date}
                                        onChange={(e) =>
                                            setData(
                                                'expiration_date',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.expiration_date && (
                                        <p className="text-sm text-red-600">
                                            {errors.expiration_date}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Renewal Status</Label>
                                    <Select
                                        value={data.renewal_status}
                                        onValueChange={(value) =>
                                            setData('renewal_status', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Not Applicable">
                                                Not Applicable
                                            </SelectItem>
                                            <SelectItem value="Pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="Approved">
                                                Approved
                                            </SelectItem>
                                            <SelectItem value="Denied">
                                                Denied
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.renewal_status && (
                                        <p className="text-sm text-red-600">
                                            {errors.renewal_status}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center space-y-2">
                                    <Switch
                                        id="requirements_complete"
                                        checked={data.requirements_complete}
                                        onCheckedChange={(checked) =>
                                            setData(
                                                'requirements_complete',
                                                checked,
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="requirements_complete"
                                        className="ml-2"
                                    >
                                        Requirements Complete
                                    </Label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Remarks</Label>
                                <Textarea
                                    value={data.remarks}
                                    onChange={(e) =>
                                        setData('remarks', e.target.value)
                                    }
                                    rows={3}
                                />
                                {errors.remarks && (
                                    <p className="text-sm text-red-600">
                                        {errors.remarks}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href={sas.admin.scholarshipRecipients.index.url()}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Updating...'
                                        : 'Update Recipient'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
