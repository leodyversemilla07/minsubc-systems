import VMGOController from '@/actions/Modules/USG/Http/Controllers/Admin/VMGOController';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Form, Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle,
    Compass,
    Eye,
    Flag,
    History,
    Plus,
    Save,
    Target,
    Trash2,
    Trophy,
} from 'lucide-react';
import { useState } from 'react';

interface VMGOData {
    id: number;
    vision: string;
    mission: string;
    goals: string[];
    objectives: string[];
    updated_at?: string;
    updated_by?: string;
}

interface Props {
    vmgo: VMGOData;
    canEdit?: boolean;
}

export default function EditVMGO({ vmgo, canEdit = true }: Props) {
    // Individual state for each form field
    const [vision, setVision] = useState(vmgo.vision || '');
    const [mission, setMission] = useState(vmgo.mission || '');
    const [goals, setGoals] = useState<string[]>(
        vmgo.goals?.length ? vmgo.goals : [''],
    );
    const [objectives, setObjectives] = useState<string[]>(
        vmgo.objectives?.length ? vmgo.objectives : [''],
    );

    const handleGoalChange = (index: number, value: string) => {
        const newGoals = [...goals];
        newGoals[index] = value;
        setGoals(newGoals);
    };

    const addGoal = () => {
        setGoals([...goals, '']);
    };

    const removeGoal = (index: number) => {
        if (goals.length > 1) {
            const newGoals = goals.filter((_, i) => i !== index);
            setGoals(newGoals);
        }
    };

    const handleObjectiveChange = (index: number, value: string) => {
        const newObjectives = [...objectives];
        newObjectives[index] = value;
        setObjectives(newObjectives);
    };

    const addObjective = () => {
        setObjectives([...objectives, '']);
    };

    const removeObjective = (index: number) => {
        if (objectives.length > 1) {
            const newObjectives = objectives.filter((_, i) => i !== index);
            setObjectives(newObjectives);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Never updated';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'USG Admin', href: '/usg/admin' },
                { title: 'VMGO', href: '/usg/admin/vmgo/edit' },
            ]}
        >
            <Head title="Edit VMGO - USG Admin" />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Edit VMGO
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                                Update Vision, Mission, Goals & Objectives
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={() => router.visit('/usg/vmgo')}
                                className="hidden sm:flex"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() =>
                                    router.visit('/usg/admin/vmgo/history')
                                }
                                className="hidden sm:flex"
                            >
                                <History className="mr-2 h-4 w-4" />
                                History
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Last Updated Info */}
                {vmgo.updated_at && (
                    <Card className="mb-8">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <History className="h-4 w-4" />
                                    Last updated: {formatDate(vmgo.updated_at)}
                                </div>
                                {vmgo.updated_by && (
                                    <div>By: {vmgo.updated_by}</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Form {...VMGOController.update.form()} className="space-y-8">
                    {({
                        processing,
                        errors,
                        hasErrors,
                        wasSuccessful,
                        recentlySuccessful,
                    }) => (
                        <div className="space-y-8">
                            {/* Hidden inputs for arrays */}
                            <input type="hidden" name="vision" value={vision} />
                            <input
                                type="hidden"
                                name="mission"
                                value={mission}
                            />
                            <input
                                type="hidden"
                                name="goals"
                                value={JSON.stringify(
                                    goals.filter((g) => g.trim() !== ''),
                                )}
                            />
                            <input
                                type="hidden"
                                name="objectives"
                                value={JSON.stringify(
                                    objectives.filter((o) => o.trim() !== ''),
                                )}
                            />

                            {/* Success/Error Messages */}
                            {(wasSuccessful || recentlySuccessful) && (
                                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <AlertDescription className="text-green-800 dark:text-green-200">
                                        VMGO information has been updated
                                        successfully!
                                    </AlertDescription>
                                </Alert>
                            )}

                            {hasErrors && Object.keys(errors).length > 0 && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        Please fix the errors below before
                                        saving.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Vision Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Compass className="h-5 w-5 text-blue-600" />
                                        Vision Statement
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Textarea
                                            placeholder="Enter the organization's vision statement..."
                                            value={vision}
                                            onChange={(e) =>
                                                setVision(e.target.value)
                                            }
                                            rows={4}
                                            className={
                                                errors.vision
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canEdit}
                                        />
                                        {errors.vision && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.vision}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <strong>Tip:</strong> A vision statement
                                        should be inspirational and describe
                                        what the organization aspires to become.
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Mission Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5 text-green-600" />
                                        Mission Statement
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Textarea
                                            placeholder="Enter the organization's mission statement..."
                                            value={mission}
                                            onChange={(e) =>
                                                setMission(e.target.value)
                                            }
                                            rows={4}
                                            className={
                                                errors.mission
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            disabled={!canEdit}
                                        />
                                        {errors.mission && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.mission}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <strong>Tip:</strong> A mission
                                        statement should clearly define what the
                                        organization does and who it serves.
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Goals Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Trophy className="h-5 w-5 text-purple-600" />
                                        Goals
                                        <Badge variant="secondary">
                                            {goals.length} item
                                            {goals.length !== 1 ? 's' : ''}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {goals.map((goal, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="flex-1">
                                                <Textarea
                                                    placeholder={`Enter goal ${index + 1}...`}
                                                    value={goal}
                                                    onChange={(e) =>
                                                        handleGoalChange(
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    rows={2}
                                                    className={
                                                        errors[`goals.${index}`]
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                    disabled={!canEdit}
                                                />
                                                {errors[`goals.${index}`] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            errors[
                                                                `goals.${index}`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {canEdit && (
                                                <div className="flex flex-col gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={addGoal}
                                                        disabled={processing}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeGoal(index)
                                                        }
                                                        disabled={
                                                            processing ||
                                                            goals.length <= 1
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {canEdit && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={addGoal}
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Another Goal
                                        </Button>
                                    )}
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <strong>Tip:</strong> Goals should be
                                        broad, long-term outcomes that support
                                        your mission.
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Objectives Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Flag className="h-5 w-5 text-orange-600" />
                                        Objectives
                                        <Badge variant="secondary">
                                            {objectives.length} item
                                            {objectives.length !== 1 ? 's' : ''}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {objectives.map((objective, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="flex-1">
                                                <Textarea
                                                    placeholder={`Enter objective ${index + 1}...`}
                                                    value={objective}
                                                    onChange={(e) =>
                                                        handleObjectiveChange(
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    rows={2}
                                                    className={
                                                        errors[
                                                            `objectives.${index}`
                                                        ]
                                                            ? 'border-red-500'
                                                            : ''
                                                    }
                                                    disabled={!canEdit}
                                                />
                                                {errors[
                                                    `objectives.${index}`
                                                ] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {
                                                            errors[
                                                                `objectives.${index}`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {canEdit && (
                                                <div className="flex flex-col gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={addObjective}
                                                        disabled={processing}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeObjective(
                                                                index,
                                                            )
                                                        }
                                                        disabled={
                                                            processing ||
                                                            objectives.length <=
                                                                1
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {canEdit && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={addObjective}
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Another Objective
                                        </Button>
                                    )}
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <strong>Tip:</strong> Objectives should
                                        be specific, measurable actions that
                                        help achieve your goals.
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            {canEdit && (
                                <div className="flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:justify-end sm:gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            router.visit('/usg/admin')
                                        }
                                        disabled={processing}
                                        className="w-full sm:w-auto"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto sm:min-w-[120px]"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}

                            {!canEdit && (
                                <Card>
                                    <CardContent className="p-4">
                                        <Alert>
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                You don't have permission to
                                                edit VMGO information. Contact
                                                an administrator if you need to
                                                make changes.
                                            </AlertDescription>
                                        </Alert>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
