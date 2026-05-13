import { Head, Link } from '@inertiajs/react';
import { BookOpen, GraduationCap, FileText } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index() {
    return (
        <AppLayout>
            <Head title="Curriculum" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Curriculum & Syllabus Management</h1>
                <p className="text-muted-foreground">Academic programs, courses, curricula, and syllabus management system.</p>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/curriculum/programs'}>
                        <CardHeader><CardTitle><GraduationCap className="h-8 w-8 text-blue-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Programs</h3>
                            <p className="text-muted-foreground text-sm">View academic programs and their curricula</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = '/curriculum/courses'}>
                        <CardHeader><CardTitle><BookOpen className="h-8 w-8 text-purple-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Courses</h3>
                            <p className="text-muted-foreground text-sm">Browse all courses offered</p>
                        </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => window.location.href = route('curriculum.admin.syllabi.index')}>
                        <CardHeader><CardTitle><FileText className="h-8 w-8 text-green-600" /></CardTitle></CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold">Syllabi</h3>
                            <p className="text-muted-foreground text-sm">Access course syllabi and learning outcomes</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}