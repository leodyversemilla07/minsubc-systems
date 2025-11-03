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
import AppLayout from '@/layouts/app-layout';
import sas from '@/routes/sas';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
    scholarships: Array<{ id: number; scholarship_name: string }>;
    students: Array<{ id: number; name: string; email: string }>;
}

export default function CreateRecipient({ scholarships, students }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        scholarship_id: '',
        academic_year: '',
        semester: '',
        amount: '',
        date_awarded: '',
        expiration_date: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/sas/admin/scholarship-recipients');
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
                    title: 'Create',
                    href: '/sas/admin/scholarship-recipients/create',
                },
            ]}
        >
            <Head title="Add Scholarship Recipient" />

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
                            Add Scholarship Recipient
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Assign scholarship to a student
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recipient Information</CardTitle>
                        <CardDescription>
                            Enter recipient details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Student *</Label>
                                    <Select
                                        value={data.student_id}
                                        onValueChange={(value) =>
                                            setData('student_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select student" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {students.map((s) => (
                                                <SelectItem
                                                    key={s.id}
                                                    value={s.id.toString()}
                                                >
                                                    {s.name} ({s.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.student_id && (
                                        <p className="text-sm text-red-600">
                                            {errors.student_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Scholarship *</Label>
                                    <Select
                                        value={data.scholarship_id}
                                        onValueChange={(value) =>
                                            setData('scholarship_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select scholarship" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {scholarships.map((s) => (
                                                <SelectItem
                                                    key={s.id}
                                                    value={s.id.toString()}
                                                >
                                                    {s.scholarship_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.scholarship_id && (
                                        <p className="text-sm text-red-600">
                                            {errors.scholarship_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Academic Year *</Label>
                                    <Input
                                        value={data.academic_year}
                                        onChange={(e) =>
                                            setData(
                                                'academic_year',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g., 2024-2025"
                                    />
                                    {errors.academic_year && (
                                        <p className="text-sm text-red-600">
                                            {errors.academic_year}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Semester *</Label>
                                    <Select
                                        value={data.semester}
                                        onValueChange={(value) =>
                                            setData('semester', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select semester" />
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
                                    <Label>Amount *</Label>
                                    <Input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData('amount', e.target.value)
                                        }
                                        placeholder="0.00"
                                    />
                                    {errors.amount && (
                                        <p className="text-sm text-red-600">
                                            {errors.amount}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Date Awarded *</Label>
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
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link
                                    href={sas.admin.scholarshipRecipients.index.url()}
                                >
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Creating...'
                                        : 'Add Recipient'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
