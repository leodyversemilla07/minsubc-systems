import { Form } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { CircleAlert, CircleCheck } from 'lucide-react';
import voting from '@/routes/voting';

interface Election {
    id: number;
    name: string;
    election_code: string;
}

interface LoginPageProps {
    elections: Election[];
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Login({ elections, flash }: LoginPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Login Card */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-green-600 mb-2">
                            Voter Login
                        </h2>
                        <p className="text-gray-600">
                            Enter your credentials to cast your vote
                        </p>
                    </div>

                    {/* Display Success Message */}
                    {flash?.success && (
                        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
                            <CircleCheck className="h-4 w-4 text-green-600" />
                            <div>{flash.success}</div>
                        </Alert>
                    )}

                    {/* Login Form */}
                    <Form action={voting.authenticate.url()} method="post">
                        {({ errors, processing }) => (
                            <div className="space-y-6">
                                {/* Display Errors */}
                                {Object.keys(errors).length > 0 && (
                                    <Alert variant="destructive">
                                        <CircleAlert className="h-4 w-4" />
                                        <div>
                                            <ul className="list-disc list-inside">
                                                {Object.values(errors).map((error, i) => (
                                                    <li key={i}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Alert>
                                )}

                                {/* Election Selection */}
                                <Field>
                                    <FieldLabel htmlFor="election_id">Election</FieldLabel>
                                    {elections.length > 1 ? (
                                        <select
                                            id="election_id"
                                            name="election_id"
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white text-gray-900"
                                        >
                                            <option value="">Select an election</option>
                                            {elections.map((election) => (
                                                <option key={election.id} value={election.id}>
                                                    {election.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : elections.length === 1 ? (
                                        <>
                                            <input
                                                type="hidden"
                                                name="election_id"
                                                value={elections[0].id}
                                            />
                                            <div className="text-sm text-gray-700 font-medium p-3 border rounded-lg bg-gray-50">
                                                {elections[0].name}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-sm text-gray-500 p-3 border rounded-lg bg-gray-50">
                                            No active elections available.
                                        </div>
                                    )}
                                    <FieldError>{errors.election_id}</FieldError>
                                </Field>

                                {/* Voter ID Field */}
                                <Field>
                                    <FieldLabel htmlFor="voters_id">Voter ID</FieldLabel>
                                    <Input
                                        type="text"
                                        id="voters_id"
                                        name="voters_id"
                                        required
                                        autoFocus
                                        placeholder="Enter your voter ID"
                                        className="w-full"
                                    />
                                    <FieldError>{errors.voters_id}</FieldError>
                                </Field>

                                {/* Password Field */}
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="Enter your password"
                                        className="w-full"
                                    />
                                </Field>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    {processing ? 'Logging in...' : 'Login to Vote'}
                                </Button>
                            </div>
                        )}
                    </Form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>
                            Don't have an account?{' '}
                            <Link
                                href={voting.index.url()}
                                className="text-green-600 hover:underline font-medium"
                            >
                                Go back
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Info Card */}
                <div className="mt-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
                    <p className="text-sm">
                        📅 <span className="font-semibold">Secure Voting System</span> -
                        Your vote matters!
                    </p>
                </div>
            </div>
        </div>
    );
}
