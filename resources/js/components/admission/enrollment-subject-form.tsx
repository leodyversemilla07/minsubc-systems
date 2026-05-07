import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Subject {
    id: number;
    code: string;
    name: string;
    description: string | null;
    units: number;
    semester: string;
    year_level: number;
    type: 'lec' | 'lab' | 'both';
    lec_hours: number;
    lab_hours: number;
    is_active: boolean;
    total_hours: number;
}

interface EnrollmentSubjectFormProps {
    enrollmentId: number;
    enrollmentYearLevel: number;
    existingSubjects: number[];
    availableSubjects: Subject[];
    onUpdate?: () => void;
}

export function EnrollmentSubjectForm({
    enrollmentId,
    enrollmentYearLevel,
    existingSubjects,
    availableSubjects,
    onUpdate,
}: EnrollmentSubjectFormProps) {
    const [selectedSubjects, setSelectedSubjects] = useState<number[]>(existingSubjects);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalUnits = selectedSubjects.reduce((sum, id) => {
        const subject = availableSubjects.find((s) => s.id === id);
        return sum + (subject?.units ?? 0);
    }, 0);

    const totalHours = selectedSubjects.reduce((sum, id) => {
        const subject = availableSubjects.find((s) => s.id === id);
        return sum + (subject?.total_hours ?? 0);
    }, 0);

    const toggleSubject = (subjectId: number) => {
        setSelectedSubjects((prev) =>
            prev.includes(subjectId)
                ? prev.filter((id) => id !== subjectId)
                : [...prev, subjectId]
        );
    };

    const selectAll = () => {
        const allIds = availableSubjects.map((s) => s.id);
        setSelectedSubjects(allIds);
    };

    const clearAll = () => {
        setSelectedSubjects([]);
    };

    const handleSubmit = () => {
        if (selectedSubjects.length === 0) {
            return;
        }

        setIsSubmitting(true);

        router.post(
            route('admission.admin.enrollments.assign-subjects', enrollmentId),
            {
                subject_ids: selectedSubjects,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    onUpdate?.();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    const subjectsByYearLevel = availableSubjects.reduce((acc, subject) => {
        if (!acc[subject.year_level]) {
            acc[subject.year_level] = [];
        }
        acc[subject.year_level].push(subject);
        return acc;
    }, {} as Record<number, Subject[]>);

    return (
        <div className="space-y-6">
            {/* Summary Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-blue-50 p-4 dark:bg-blue-950">
                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Year Level
                        </p>
                        <p className="text-xl font-bold">{enrollmentYearLevel}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Selected Subjects
                        </p>
                        <p className="text-xl font-bold">{selectedSubjects.length}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Units
                        </p>
                        <p className="text-xl font-bold">{totalUnits}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Hours/Week
                        </p>
                        <p className="text-xl font-bold">{totalHours}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={selectAll}>
                        Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearAll}>
                        Clear All
                    </Button>
                </div>
            </div>

            {/* Subject List by Year Level */}
            {Object.entries(subjectsByYearLevel)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([yearLevel, subjects]) => (
                    <div key={yearLevel}>
                        <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                            Year Level {yearLevel}
                            {Number(yearLevel) === enrollmentYearLevel && (
                                <Badge className="ml-2" variant="secondary">
                                    Current
                                </Badge>
                            )}
                        </h3>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {subjects.map((subject) => {
                                const isSelected = selectedSubjects.includes(
                                    subject.id
                                );
                                const isEnrolled = existingSubjects.includes(
                                    subject.id
                                );

                                return (
                                    <Card
                                        key={subject.id}
                                        className={cn(
                                            'cursor-pointer transition-all',
                                            isSelected
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                                : 'hover:border-gray-300 dark:hover:border-gray-600'
                                        )}
                                        onClick={() => toggleSubject(subject.id)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox
                                                            checked={isSelected}
                                                            className="pointer-events-none"
                                                        />
                                                        <span className="font-mono text-sm font-medium text-gray-600 dark:text-gray-300">
                                                            {subject.code}
                                                        </span>
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {subject.units} units
                                                        </Badge>
                                                        {subject.type !== 'lec' && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                {subject.type}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <h4 className="mt-1 font-medium text-gray-900 dark:text-white">
                                                        {subject.name}
                                                    </h4>
                                                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {subject.lec_hours} lec +{' '}
                                                            {subject.lab_hours} lab
                                                        </span>
                                                        {subject.semester !==
                                                            'All' && (
                                                            <span>
                                                                Sem {subject.semester}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {isEnrolled && (
                                                    <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                        <Check className="h-3 w-3" />
                                                        Enrolled
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                ))}

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedSubjects.length === 0
                        ? 'Select at least one subject'
                        : `${selectedSubjects.length} subject(s) selected`}
                </p>
                <Button
                    onClick={handleSubmit}
                    disabled={
                        selectedSubjects.length === 0 ||
                        isSubmitting ||
                        selectedSubjects.length === existingSubjects.length
                    }
                >
                    {isSubmitting ? 'Saving...' : 'Save Subjects'}
                </Button>
            </div>
        </div>
    );
}