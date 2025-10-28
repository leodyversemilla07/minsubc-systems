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
import USGLayout from '@/layouts/usg-layout';
import foiRoutes from '@/routes/usg/foi';
import { Head, useForm } from '@inertiajs/react';
import { FileText, Send } from 'lucide-react';

export default function FOICreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        request_type: '',
        purpose: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(foiRoutes.store().url);
    };

    return (
        <USGLayout>
            <Head title="New FOI Request - USG" />

            {/* Hero Section */}
            <section className="relative bg-[var(--usg-primary)] py-20 text-white">
                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                            New FOI Request
                        </h1>
                        <p className="text-xl text-[var(--usg-hero-text)] md:text-2xl">
                            Submit a Freedom of Information request
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-gray-50 py-16 dark:bg-gray-800">
                <div className="container mx-auto max-w-3xl px-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-6 w-6 text-[var(--usg-primary)]" />
                                Request Information
                            </CardTitle>
                            <CardDescription>
                                Fill out the form below to submit your Freedom
                                of Information request. All fields are required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">
                                        Request Title *
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Brief title for your request"
                                        className={
                                            errors.title ? 'border-red-500' : ''
                                        }
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="request_type">
                                        Request Type *
                                    </Label>
                                    <Select
                                        value={data.request_type}
                                        onValueChange={(value) =>
                                            setData('request_type', value)
                                        }
                                    >
                                        <SelectTrigger
                                            className={
                                                errors.request_type
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                        >
                                            <SelectValue placeholder="Select request type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="document">
                                                Document Request
                                            </SelectItem>
                                            <SelectItem value="information">
                                                Information Request
                                            </SelectItem>
                                            <SelectItem value="meeting">
                                                Meeting Request
                                            </SelectItem>
                                            <SelectItem value="other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.request_type && (
                                        <p className="text-sm text-red-500">
                                            {errors.request_type}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Detailed description of what information or documents you're requesting"
                                        rows={6}
                                        className={
                                            errors.description
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="purpose">Purpose *</Label>
                                    <Textarea
                                        id="purpose"
                                        value={data.purpose}
                                        onChange={(e) =>
                                            setData('purpose', e.target.value)
                                        }
                                        placeholder="Please explain the purpose of this request"
                                        rows={4}
                                        className={
                                            errors.purpose
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    />
                                    {errors.purpose && (
                                        <p className="text-sm text-red-500">
                                            {errors.purpose}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        type="submit"
                                        className="bg-[var(--usg-primary)] hover:bg-[var(--usg-primary)]/90"
                                        disabled={processing}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        {processing
                                            ? 'Submitting...'
                                            : 'Submit Request'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </USGLayout>
    );
}
