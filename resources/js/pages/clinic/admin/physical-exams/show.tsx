import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckSquare } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PhysicalExamShow({ exam }: { exam: any }) {
    return (
        <AppLayout>
            <Head title="Physical Exam" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.physical-exams.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><CheckSquare className="mr-2 inline h-6 w-6" />Physical Exam</h1>
                </div>
                <Card className="max-w-xl p-6">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Patient</dt><dd className="font-medium">{exam.medical_record?.first_name} {exam.medical_record?.last_name}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{exam.exam_date ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Height</dt><dd>{exam.height_cm ? `${exam.height_cm} cm` : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Weight</dt><dd>{exam.weight_kg ? `${exam.weight_kg} kg` : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">BMI</dt><dd>{exam.bmi ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Blood Pressure</dt><dd>{exam.blood_pressure ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Heart Rate</dt><dd>{exam.heart_rate ? `${exam.heart_rate} bpm` : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Temperature</dt><dd>{exam.temperature ? `${exam.temperature}°C` : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Vision L/R</dt><dd>{exam.vision_left ?? '—'} / {exam.vision_right ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Cleared</dt><dd>{exam.is_cleared ? '✅ Yes' : '❌ No'}</dd></div>
                    </dl>
                    {exam.findings && <div className="mt-4"><h3 className="mb-1 text-sm font-medium">Findings</h3><p className="text-sm text-muted-foreground">{exam.findings}</p></div>}
                    {exam.recommendations && <div className="mt-2"><h3 className="mb-1 text-sm font-medium">Recommendations</h3><p className="text-sm text-muted-foreground">{exam.recommendations}</p></div>}
                </Card>
            </div>
        </AppLayout>
    );
}