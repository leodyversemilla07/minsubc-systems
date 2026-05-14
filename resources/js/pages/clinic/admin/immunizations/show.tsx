import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Shield } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ImmunizationShow({ immunization }: { immunization: any }) {
    return (
        <AppLayout>
            <Head title="Immunization Details" />
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('clinic.admin.immunizations.index')}><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                    <h1 className="text-2xl font-bold"><Shield className="mr-2 inline h-6 w-6" />Immunization</h1>
                </div>
                <Card className="max-w-xl p-6">
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between"><dt className="text-muted-foreground">Patient</dt><dd className="font-medium">{immunization.medical_record?.first_name} {immunization.medical_record?.last_name}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Vaccine</dt><dd>{immunization.vaccine_name}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Dose</dt><dd>{immunization.dose_number ? `Dose ${immunization.dose_number}` : '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Date Administered</dt><dd>{immunization.date_administered ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Administered By</dt><dd>{immunization.administered_by ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Batch No.</dt><dd className="font-mono">{immunization.batch_no ?? '—'}</dd></div>
                        <div className="flex justify-between"><dt className="text-muted-foreground">Next Due</dt><dd>{immunization.next_due_date ?? '—'}</dd></div>
                    </dl>
                </Card>
            </div>
        </AppLayout>
    );
}