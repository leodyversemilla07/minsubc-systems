import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        policy_number: '',
        insurance_provider: '',
        coverage_type: '',
        coverage_amount: '',
        start_date: '',
        expiry_date: '',
        remarks: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(sas.student.insurance.store.url());
    };

    return (
        <SASLayout>
            <Head title="Submit Insurance - Student Portal" />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-purple-50 to-white px-4 py-12 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-3xl">
                    <Link href={sas.student.insurance.index.url()}>
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Insurance
                        </Button>
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                            <ShieldCheck className="h-6 w-6 text-purple-700 dark:text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Submit New Insurance
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Fill out the form to submit your insurance
                                policy
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="bg-white px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-900">
                <div className="mx-auto max-w-3xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Insurance Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Policy Number */}
                                <div>
                                    <Label htmlFor="policy_number">
                                        Policy Number
                                        <span className="text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="policy_number"
                                        type="text"
                                        value={data.policy_number}
                                        onChange={(e) =>
                                            setData(
                                                'policy_number',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                        placeholder="Enter policy number"
                                    />
                                    {errors.policy_number && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.policy_number}
                                        </p>
                                    )}
                                </div>

                                {/* Insurance Provider */}
                                <div>
                                    <Label htmlFor="insurance_provider">
                                        Insurance Provider
                                        <span className="text-red-600">*</span>
                                    </Label>
                                    <Input
                                        id="insurance_provider"
                                        type="text"
                                        value={data.insurance_provider}
                                        onChange={(e) =>
                                            setData(
                                                'insurance_provider',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                        placeholder="e.g., PhilHealth, SSS, Private Insurance"
                                    />
                                    {errors.insurance_provider && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.insurance_provider}
                                        </p>
                                    )}
                                </div>

                                {/* Coverage Type */}
                                <div>
                                    <Label htmlFor="coverage_type">
                                        Coverage Type
                                        <span className="text-red-600">*</span>
                                    </Label>
                                    <Select
                                        value={data.coverage_type}
                                        onValueChange={(value) =>
                                            setData('coverage_type', value)
                                        }
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select coverage type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Health">
                                                Health
                                            </SelectItem>
                                            <SelectItem value="Life">
                                                Life
                                            </SelectItem>
                                            <SelectItem value="Accident">
                                                Accident
                                            </SelectItem>
                                            <SelectItem value="Disability">
                                                Disability
                                            </SelectItem>
                                            <SelectItem value="Comprehensive">
                                                Comprehensive
                                            </SelectItem>
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.coverage_type && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.coverage_type}
                                        </p>
                                    )}
                                </div>

                                {/* Coverage Amount */}
                                <div>
                                    <Label htmlFor="coverage_amount">
                                        Coverage Amount (₱)
                                    </Label>
                                    <Input
                                        id="coverage_amount"
                                        type="number"
                                        step="0.01"
                                        value={data.coverage_amount}
                                        onChange={(e) =>
                                            setData(
                                                'coverage_amount',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                        placeholder="0.00"
                                    />
                                    {errors.coverage_amount && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.coverage_amount}
                                        </p>
                                    )}
                                </div>

                                {/* Date Range */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="start_date">
                                            Start Date
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) =>
                                                setData(
                                                    'start_date',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1"
                                        />
                                        {errors.start_date && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.start_date}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="expiry_date">
                                            Expiry Date
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="expiry_date"
                                            type="date"
                                            value={data.expiry_date}
                                            onChange={(e) =>
                                                setData(
                                                    'expiry_date',
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1"
                                        />
                                        {errors.expiry_date && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.expiry_date}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Remarks */}
                                <div>
                                    <Label htmlFor="remarks">
                                        Additional Information / Remarks
                                    </Label>
                                    <Textarea
                                        id="remarks"
                                        value={data.remarks}
                                        onChange={(e) =>
                                            setData('remarks', e.target.value)
                                        }
                                        className="mt-1"
                                        placeholder="Any additional information about the insurance policy..."
                                        rows={4}
                                    />
                                    {errors.remarks && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.remarks}
                                        </p>
                                    )}
                                </div>

                                {/* Form Actions */}
                                <div className="flex gap-4 pt-4">
                                    <Link
                                        href={sas.student.insurance.index.url()}
                                        className="flex-1"
                                    >
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            disabled={processing}
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-purple-700 hover:bg-purple-800"
                                        disabled={processing}
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        {processing
                                            ? 'Submitting...'
                                            : 'Submit Insurance'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Help Card */}
                    <Card className="mt-6 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20">
                        <CardContent className="p-6">
                            <h3 className="mb-2 font-semibold text-purple-900 dark:text-purple-300">
                                Need Help?
                            </h3>
                            <p className="text-sm text-purple-800 dark:text-purple-400">
                                Make sure all information is accurate. Your
                                submission will be reviewed by the Student
                                Affairs Office. You will be notified once your
                                insurance record is approved.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </SASLayout>
    );
}
