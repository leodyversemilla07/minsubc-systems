import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Head, router, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle,
    Compass,
    Eye,
    Flag,
    History,
    Save,
    Target,
    Trophy,
} from 'lucide-react';
import { FormEventHandler } from 'react';

interface VMGOData {
    id?: number;
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

export default function VMGOManagement({ vmgo, canEdit = true }: Props) {
    const { data, setData, put, processing, errors, wasSuccessful } = useForm({
        vision: vmgo.vision || '',
        mission: vmgo.mission || '',
        goals: vmgo.goals || [''],
        objectives: vmgo.objectives || [''],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put('/usg/admin/vmgo');
    };

    const handleGoalChange = (index: number, value: string) => {
        const newGoals = [...data.goals];
        newGoals[index] = value;
        setData('goals', newGoals);
    };

    const addGoal = () => {
        setData('goals', [...data.goals, '']);
    };

    const removeGoal = (index: number) => {
        if (data.goals.length > 1) {
            const newGoals = data.goals.filter((_, i) => i !== index);
            setData('goals', newGoals);
        }
    };

    const handleObjectiveChange = (index: number, value: string) => {
        const newObjectives = [...data.objectives];
        newObjectives[index] = value;
        setData('objectives', newObjectives);
    };

    const addObjective = () => {
        setData('objectives', [...data.objectives, '']);
    };

    const removeObjective = (index: number) => {
        if (data.objectives.length > 1) {
            const newObjectives = data.objectives.filter((_, i) => i !== index);
            setData('objectives', newObjectives);
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
        <>
            <Head title="VMGO Management - USG Admin" />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        router.visit('/usg/admin/dashboard')
                                    }
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Dashboard
                                </Button>
                                <div>
                                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        VMGO Management
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Manage Vision, Mission, Goals &
                                        Objectives
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => router.visit('/usg/vmgo')}
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        router.visit('/usg/admin/vmgo/history')
                                    }
                                >
                                    <History className="mr-2 h-4 w-4" />
                                    History
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Success/Error Messages */}
                    {wasSuccessful && (
                        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800 dark:text-green-200">
                                VMGO information has been updated successfully!
                            </AlertDescription>
                        </Alert>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Please fix the errors below before saving.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Last Updated Info */}
                    {vmgo.updated_at && (
                        <Card className="mb-6">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <History className="h-4 w-4" />
                                        Last updated:{' '}
                                        {formatDate(vmgo.updated_at)}
                                    </div>
                                    {vmgo.updated_by && (
                                        <div>By: {vmgo.updated_by}</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
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
                                        value={data.vision}
                                        onChange={(e) =>
                                            setData('vision', e.target.value)
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
                                    should be inspirational and describe what
                                    the organization aspires to become.
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
                                        value={data.mission}
                                        onChange={(e) =>
                                            setData('mission', e.target.value)
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
                                    <strong>Tip:</strong> A mission statement
                                    should clearly define what the organization
                                    does and who it serves.
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
                                        {data.goals.length} item
                                        {data.goals.length !== 1 ? 's' : ''}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.goals.map((goal, index) => (
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
                                                    {errors[`goals.${index}`]}
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
                                                    +
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
                                                        data.goals.length <= 1
                                                    }
                                                >
                                                    -
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
                                        Add Another Goal
                                    </Button>
                                )}
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Tip:</strong> Goals should be broad,
                                    long-term outcomes that support your
                                    mission.
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
                                        {data.objectives.length} item
                                        {data.objectives.length !== 1
                                            ? 's'
                                            : ''}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {data.objectives.map((objective, index) => (
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
                                            {errors[`objectives.${index}`] && (
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
                                                    +
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeObjective(index)
                                                    }
                                                    disabled={
                                                        processing ||
                                                        data.objectives
                                                            .length <= 1
                                                    }
                                                >
                                                    -
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
                                        Add Another Objective
                                    </Button>
                                )}
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Tip:</strong> Objectives should be
                                    specific, measurable actions that help
                                    achieve your goals.
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        {canEdit && (
                            <div className="flex items-center justify-end gap-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        router.visit('/usg/admin/dashboard')
                                    }
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="min-w-[120px]"
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
                                            You don't have permission to edit
                                            VMGO information. Contact an
                                            administrator if you need to make
                                            changes.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
