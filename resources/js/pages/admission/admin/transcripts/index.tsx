import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Link, router } from '@inertiajs/react';
import {
    FileText,
    Download,
    Eye,
    Shield,
    Search,
    User,
} from 'lucide-react';
import { type PageProps } from '@/types';

interface Student {
    id: number;
    student_id: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };
    course: string | null;
    year_level: number | null;
}

interface TranscriptLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface TranscriptsPageProps extends PageProps {
    students: { data: Student[]; links: TranscriptLink[] };
    courses: string[];
    filters: Record<string, string>;
}

export default function TranscriptsIndex({ students, courses, filters }: TranscriptsPageProps) {
    const handleFilter = (key: string, value: string) => {
        router.get(route('admission.admin.transcripts.index'), {
            ...filters,
            [key]: value || undefined,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Transcript Management
                    </h1>
                    <p className="text-muted-foreground">
                        Generate and manage official transcripts
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href={route('admission.admin.transcripts.verify')} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                            <Shield className="mr-2 h-4 w-4" />
                            Verify Transcript
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-end gap-4">
                        <div className="flex-1 min-w-[250px]">
                            <label className="text-sm font-medium mb-1 block">
                                Search Student
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Name, ID, or email..."
                                    className="pl-9"
                                    value={filters.search || ''}
                                    onChange={(e) =>
                                        handleFilter('search', e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="text-sm font-medium mb-1 block">
                                Course
                            </label>
                            <Select
                                value={filters.course || ''}
                                onValueChange={(v: string | null) => handleFilter('course', v ?? '')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Courses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Courses</SelectItem>
                                    {courses.map((course) => (
                                        <SelectItem key={course} value={course}>
                                            {course}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() =>
                                router.get(
                                    route('admission.admin.transcripts.index')
                                )
                            }
                        >
                            Clear
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Students List */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                                    Student ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                                    Course
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium uppercase">
                                    Year
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {students.data.map((student) => (
                                <tr
                                    key={student.id}
                                    className="hover:bg-muted/30"
                                >
                                    <td className="px-4 py-3">
                                        <span className="font-mono font-medium">
                                            {student.student_id}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {student.user.first_name}{' '}
                                                    {student.user.last_name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {student.user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {student.course || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm">
                                        {student.year_level || 1}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <a
                                                href={route(
                                                    'admission.admin.transcripts.preview',
                                                    student.student_id
                                                )}
                                                target="_blank"
                                                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-2.5 py-1.5 text-sm font-medium hover:bg-accent"
                                            >
                                                <Eye className="mr-1 h-4 w-4" />
                                                Preview
                                            </a>
                                            <a
                                                href={route(
                                                    'admission.admin.transcripts.download',
                                                    student.student_id
                                                )}
                                                className="inline-flex items-center justify-center rounded-md bg-primary px-2.5 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                            >
                                                <Download className="mr-1 h-4 w-4" />
                                                Download
                                            </a>
                                            <a
                                                href={route(
                                                    'admission.admin.transcripts.true-copy',
                                                    student.student_id
                                                )}
                                                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-2.5 py-1.5 text-sm font-medium hover:bg-accent"
                                            >
                                                <FileText className="mr-1 h-4 w-4" />
                                                TCOG
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {students.data.length === 0 && (
                    <div className="p-12 text-center">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">
                            No students found
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {students.links && (
                    <div className="border-t p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {students.data.length} results
                            </p>
                            <div className="flex gap-1">
                                {students.links.map(
                                    (link, index) => (
                                        <Button
                                            key={index}
                                            variant={
                                                link.active ? 'default' : 'ghost'
                                            }
                                            size="sm"
                                            disabled={!link.url}
                                            className={!link.active ? 'hover:bg-accent' : ''}
                                            onClick={() => {
                                                if (link.url) {
                                                    router.get(link.url);
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}