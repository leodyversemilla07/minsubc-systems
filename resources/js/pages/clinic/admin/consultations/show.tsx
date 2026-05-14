import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ConsultationShow({ consultation }: { consultation: any }) {
    return (
        <AppLayout>
            <Head title="Consultation Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.consultations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold">Consultation Details</h1>
                </div>
                <Card className="max-w-xl p-6">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Patient</dt><dd className="font-medium">{consultation.medical_record?.first_name} {consultation.medical_record?.last_name}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{consultation.consultation_date ? new Date(consultation.consultation_date).toLocaleString() : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Complaint</dt><dd>{consultation.complaint ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Diagnosis</dt><dd className="font-medium">{consultation.diagnosis ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Treatment</dt><dd>{consultation.treatment ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Prescription</dt><dd className="font-mono text-xs">{consultation.prescription ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Follow-up</dt><dd>{consultation.follow_up_date ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{consultation.status}</dd></div>
                    </dl>
                    <div className="mt-4 flex gap-2">
                        <Link href={route('clinic.admin.consultations.edit', consultation.id)}><Button variant="outline" size="sm">Edit</Button></Link>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}