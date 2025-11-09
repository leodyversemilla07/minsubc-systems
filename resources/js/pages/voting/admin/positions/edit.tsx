import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import voting from '@/routes/voting';
import { type BreadcrumbItem } from '@/types';

interface Election {
    id: number;
    name: string;
}

interface Position {
    position_id: number;
    description: string;
    max_vote: number;
    priority: number;
    election_id: number;
    election: Election;
}

interface Props {
    position: Position;
    errors?: Record<string, string>;
}

export default function Edit({ position, errors = {} }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Voting Admin', href: voting.admin.elections.index.url() },
        { title: 'Positions', href: voting.admin.positions.index.url() },
        { title: position.description, href: voting.admin.positions.show.url({ position: position.position_id }) },
        { title: 'Edit', href: voting.admin.positions.edit.url({ position: position.position_id }) },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('_method', 'PUT');
        router.post(voting.admin.positions.update.url({ position: position.position_id }), formData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Position" />

            <div className="max-w-3xl">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Header */}
                    <div className="border-b p-6">
                        <h1 className="text-2xl font-bold text-gray-800">Edit Position</h1>
                        <p className="text-sm text-gray-600 mt-1">Update position details</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Election (Read-only) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Election</label>
                            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                                {position.election.name}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Election cannot be changed</p>
                        </div>

                        {/* Position Description */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Position Title <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="text"
                                    id="description"
                                    name="description"
                                    defaultValue={position.description}
                                    required
                                    maxLength={255}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                {errors.description && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.description}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Max Vote */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="max_vote" className="block text-sm font-medium text-gray-700 mb-2">
                                    Maximum Votes <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="number"
                                    id="max_vote"
                                    name="max_vote"
                                    defaultValue={position.max_vote}
                                    required
                                    min={1}
                                    max={20}
                                    className={errors.max_vote ? 'border-red-500' : ''}
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Number of candidates voters can select for this position (1-20)
                                </p>
                                {errors.max_vote && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.max_vote}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Priority */}
                        <FieldGroup>
                            <Field>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                                    Display Priority <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    defaultValue={position.priority}
                                    required
                                    min={0}
                                    className={errors.priority ? 'border-red-500' : ''}
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Order in which this position appears (lower numbers appear first)
                                </p>
                                {errors.priority && (
                                    <FieldError>
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.priority}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        {/* Form Actions */}
                        <div className="flex gap-4 pt-4 border-t">
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                Update Position
                            </Button>
                            <Link href={voting.admin.positions.index.url()}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
