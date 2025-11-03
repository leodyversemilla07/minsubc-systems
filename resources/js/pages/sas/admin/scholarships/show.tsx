import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import SASLayout from '@/layouts/sas-layout';
import sas from '@/routes/sas';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit } from 'lucide-react';

interface Scholarship {
    id: number;
    scholarship_code: string;
    scholarship_name: string;
    scholarship_type: string;
    provider: string;
    amount: number;
    is_active: boolean;
    description: string;
}

interface Props {
    scholarship: Scholarship;
}

export default function ScholarshipShow({ scholarship }: Props) {
    return (
        <AppLayout>
            <SASLayout>
                <Head title={`${scholarship.scholarship_name} - SAS Admin`} />

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href={sas.admin.scholarships.index.url()}>
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {scholarship.scholarship_name}
                                </h1>
                                <p className="text-muted-foreground">
                                    {scholarship.scholarship_code}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={`/sas/admin/scholarships/${scholarship.id}/edit`}
                        >
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Type
                                    </p>
                                    <p className="font-medium">
                                        {scholarship.scholarship_type}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Provider
                                    </p>
                                    <p className="font-medium">
                                        {scholarship.provider}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Amount
                                    </p>
                                    <p className="font-medium">
                                        ₱{scholarship.amount?.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Status
                                    </p>
                                    <Badge>
                                        {scholarship.is_active
                                            ? 'Active'
                                            : 'Inactive'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">
                                    {scholarship.description}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SASLayout>
        </AppLayout>
    );
}
