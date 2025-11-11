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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    Award,
    BarChart3,
    FileDown,
    FileSpreadsheet,
    Shield,
} from 'lucide-react';
import { useState } from 'react';

interface Scholarship {
    id: number;
    scholarship_name: string;
}

interface Props {
    scholarships: Scholarship[];
}

export default function Reports({ scholarships }: Props) {
    const currentYear = new Date().getFullYear();
    const [scholarshipFilters, setScholarshipFilters] = useState({
        scholarship_id: '',
        status: '',
        semester: '',
        academic_year: '',
        date_from: '',
        date_to: '',
    });

    const [insuranceFilters, setInsuranceFilters] = useState({
        policy_type: '',
        status: '',
        insurance_provider: '',
        date_from: '',
        date_to: '',
    });

    const downloadScholarshipPDF = () => {
        const params = new URLSearchParams(
            Object.entries(scholarshipFilters).filter(([_, v]) => v !== ''),
        );
        window.open(
            `/sas/admin/reports/scholarships/recipients?${params}`,
            '_blank',
        );
    };

    const downloadScholarshipExcel = () => {
        const params = new URLSearchParams({
            ...Object.fromEntries(
                Object.entries(scholarshipFilters).filter(([_, v]) => v !== ''),
            ),
            format: 'excel',
        });
        window.location.href = `/sas/admin/reports/scholarships/recipients?${params}`;
    };

    const downloadApprovedScholarsPDF = (
        semester: string,
        academicYear: string,
    ) => {
        window.open(
            `/sas/admin/reports/scholarships/approved/${semester}/${academicYear}`,
            '_blank',
        );
    };

    const downloadScholarshipStatisticsPDF = (academicYear: string) => {
        window.open(
            `/sas/admin/reports/scholarships/statistics/${academicYear}`,
            '_blank',
        );
    };

    const downloadInsurancePDF = () => {
        const params = new URLSearchParams(
            Object.entries(insuranceFilters).filter(([_, v]) => v !== ''),
        );
        window.open(`/sas/admin/reports/insurance/records?${params}`, '_blank');
    };

    const downloadInsuranceExcel = () => {
        const params = new URLSearchParams({
            ...Object.fromEntries(
                Object.entries(insuranceFilters).filter(([_, v]) => v !== ''),
            ),
            format: 'excel',
        });
        window.location.href = `/sas/admin/reports/insurance/records?${params}`;
    };

    const downloadInsuranceStatisticsPDF = (academicYear: string) => {
        window.open(
            `/sas/admin/reports/insurance/statistics/${academicYear}`,
            '_blank',
        );
    };

    return (
        <AppLayout>
            <Head title="Reports - SAS Admin" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Reports
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Generate and export scholarship and insurance
                            reports
                        </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                </div>

                {/* Tabs */}
                <Tabs defaultValue="scholarships" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="scholarships">
                            <Award className="mr-2 h-4 w-4" />
                            Scholarship Reports
                        </TabsTrigger>
                        <TabsTrigger value="insurance">
                            <Shield className="mr-2 h-4 w-4" />
                            Insurance Reports
                        </TabsTrigger>
                    </TabsList>

                    {/* Scholarship Reports */}
                    <TabsContent value="scholarships" className="space-y-6">
                        {/* Recipients Report */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Scholarship Recipients Report
                                </CardTitle>
                                <CardDescription>
                                    Generate a detailed report of scholarship
                                    recipients with filters
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="scholarship">
                                            Scholarship
                                        </Label>
                                        <Select
                                            value={
                                                scholarshipFilters.scholarship_id
                                            }
                                            onValueChange={(value) =>
                                                setScholarshipFilters({
                                                    ...scholarshipFilters,
                                                    scholarship_id: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Scholarships" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">
                                                    All Scholarships
                                                </SelectItem>
                                                {scholarships.map(
                                                    (scholarship) => (
                                                        <SelectItem
                                                            key={scholarship.id}
                                                            value={scholarship.id.toString()}
                                                        >
                                                            {
                                                                scholarship.scholarship_name
                                                            }
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={scholarshipFilters.status}
                                            onValueChange={(value) =>
                                                setScholarshipFilters({
                                                    ...scholarshipFilters,
                                                    status: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Statuses" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">
                                                    All Statuses
                                                </SelectItem>
                                                <SelectItem value="Active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="Inactive">
                                                    Inactive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="semester">
                                            Semester
                                        </Label>
                                        <Select
                                            value={scholarshipFilters.semester}
                                            onValueChange={(value) =>
                                                setScholarshipFilters({
                                                    ...scholarshipFilters,
                                                    semester: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Semesters" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">
                                                    All Semesters
                                                </SelectItem>
                                                <SelectItem value="1st Semester">
                                                    1st Semester
                                                </SelectItem>
                                                <SelectItem value="2nd Semester">
                                                    2nd Semester
                                                </SelectItem>
                                                <SelectItem value="Summer">
                                                    Summer
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="academic_year">
                                            Academic Year
                                        </Label>
                                        <Input
                                            id="academic_year"
                                            type="text"
                                            placeholder="e.g., 2024-2025"
                                            value={
                                                scholarshipFilters.academic_year
                                            }
                                            onChange={(e) =>
                                                setScholarshipFilters({
                                                    ...scholarshipFilters,
                                                    academic_year:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date_from">
                                            Date From
                                        </Label>
                                        <Input
                                            id="date_from"
                                            type="date"
                                            value={scholarshipFilters.date_from}
                                            onChange={(e) =>
                                                setScholarshipFilters({
                                                    ...scholarshipFilters,
                                                    date_from: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date_to">Date To</Label>
                                        <Input
                                            id="date_to"
                                            type="date"
                                            value={scholarshipFilters.date_to}
                                            onChange={(e) =>
                                                setScholarshipFilters({
                                                    ...scholarshipFilters,
                                                    date_to: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button onClick={downloadScholarshipPDF}>
                                        <FileDown className="mr-2 h-4 w-4" />
                                        Download PDF
                                    </Button>
                                    <Button
                                        onClick={downloadScholarshipExcel}
                                        variant="outline"
                                    >
                                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                                        Export to Excel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Reports */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Approved Scholars Report
                                    </CardTitle>
                                    <CardDescription>
                                        Generate report by semester and academic
                                        year
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() =>
                                                downloadApprovedScholarsPDF(
                                                    '1st Semester',
                                                    `${currentYear}-${currentYear + 1}`,
                                                )
                                            }
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            1st Semester {currentYear}-
                                            {currentYear + 1}
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                downloadApprovedScholarsPDF(
                                                    '2nd Semester',
                                                    `${currentYear}-${currentYear + 1}`,
                                                )
                                            }
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            2nd Semester {currentYear}-
                                            {currentYear + 1}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Scholarship Statistics
                                    </CardTitle>
                                    <CardDescription>
                                        Generate comprehensive statistics report
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        onClick={() =>
                                            downloadScholarshipStatisticsPDF(
                                                `${currentYear}-${currentYear + 1}`,
                                            )
                                        }
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <BarChart3 className="mr-2 h-4 w-4" />
                                        Statistics for {currentYear}-
                                        {currentYear + 1}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Insurance Reports */}
                    <TabsContent value="insurance" className="space-y-6">
                        {/* Insurance Records Report */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Insurance Records Report</CardTitle>
                                <CardDescription>
                                    Generate a detailed report of insurance
                                    records with filters
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="policy_type">
                                            Policy Type
                                        </Label>
                                        <Input
                                            id="policy_type"
                                            type="text"
                                            placeholder="e.g., Health, Life"
                                            value={insuranceFilters.policy_type}
                                            onChange={(e) =>
                                                setInsuranceFilters({
                                                    ...insuranceFilters,
                                                    policy_type: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ins_status">
                                            Status
                                        </Label>
                                        <Select
                                            value={insuranceFilters.status}
                                            onValueChange={(value) =>
                                                setInsuranceFilters({
                                                    ...insuranceFilters,
                                                    status: value,
                                                })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Statuses" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">
                                                    All Statuses
                                                </SelectItem>
                                                <SelectItem value="Active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="Expired">
                                                    Expired
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="provider">
                                            Provider
                                        </Label>
                                        <Input
                                            id="provider"
                                            type="text"
                                            placeholder="Insurance Provider"
                                            value={
                                                insuranceFilters.insurance_provider
                                            }
                                            onChange={(e) =>
                                                setInsuranceFilters({
                                                    ...insuranceFilters,
                                                    insurance_provider:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ins_date_from">
                                            Date From
                                        </Label>
                                        <Input
                                            id="ins_date_from"
                                            type="date"
                                            value={insuranceFilters.date_from}
                                            onChange={(e) =>
                                                setInsuranceFilters({
                                                    ...insuranceFilters,
                                                    date_from: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ins_date_to">
                                            Date To
                                        </Label>
                                        <Input
                                            id="ins_date_to"
                                            type="date"
                                            value={insuranceFilters.date_to}
                                            onChange={(e) =>
                                                setInsuranceFilters({
                                                    ...insuranceFilters,
                                                    date_to: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button onClick={downloadInsurancePDF}>
                                        <FileDown className="mr-2 h-4 w-4" />
                                        Download PDF
                                    </Button>
                                    <Button
                                        onClick={downloadInsuranceExcel}
                                        variant="outline"
                                    >
                                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                                        Export to Excel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Insurance Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Insurance Statistics</CardTitle>
                                <CardDescription>
                                    Generate comprehensive insurance statistics
                                    report
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() =>
                                        downloadInsuranceStatisticsPDF(
                                            `${currentYear}-${currentYear + 1}`,
                                        )
                                    }
                                    variant="outline"
                                    className="w-full"
                                >
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    Statistics for {currentYear}-
                                    {currentYear + 1}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
