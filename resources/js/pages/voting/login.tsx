import { Form } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { CircleAlert, CircleCheck, ShieldCheck, Lock, Info } from 'lucide-react';
import voting from '@/routes/voting';
import { SecurityBadge } from '@/components/voting/security-badge';
import { HelpTooltip } from '@/components/voting/help-tooltip';

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
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-white flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                {/* Login Card */}
                <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                            Voter Login
                        </h2>
                        <p className="text-gray-600">
                            Enter your credentials to cast your vote
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="mb-6">
                        <SecurityBadge variant="compact" />
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
                                            <ul className="list-disc list-inside text-sm">
                                                {Object.values(errors).map((error, i) => (
                                                    <li key={i}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Alert>
                                )}

                                {/* Election Selection */}
                                <Field>
                                    <div className="flex items-center gap-2">
                                        <FieldLabel htmlFor="election_id">Election</FieldLabel>
                                        <HelpTooltip content="Select the active election you want to participate in" />
                                    </div>
                                    {elections.length > 1 ? (
                                        <select
                                            id="election_id"
                                            name="election_id"
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white text-gray-900"
                                            aria-label="Select an election"
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
                                            <div className="text-sm text-gray-700 font-medium p-3 border-2 border-green-200 rounded-lg bg-green-50">
                                                {elections[0].name}
                                            </div>
                                        </>
                                    ) : (
                                        <Alert variant="destructive" className="mt-2">
                                            <CircleAlert className="h-4 w-4" />
                                            <div className="text-sm">
                                                No active elections available at this time.
                                            </div>
                                        </Alert>
                                    )}
                                    {errors.election_id && <FieldError>{errors.election_id}</FieldError>}
                                </Field>

                                {/* Voter ID Field */}
                                <Field>
                                    <div className="flex items-center gap-2">
                                        <FieldLabel htmlFor="voters_id">Voter ID</FieldLabel>
                                        <HelpTooltip content="Your unique voter identification number provided by the election administrator" />
                                    </div>
                                    <Input
                                        type="text"
                                        id="voters_id"
                                        name="voters_id"
                                        required
                                        autoFocus
                                        placeholder="Enter your voter ID"
                                        className="w-full"
                                        aria-label="Voter ID"
                                    />
                                    {errors.voters_id && <FieldError>{errors.voters_id}</FieldError>}
                                </Field>

                                {/* Password Field */}
                                <Field>
                                    <div className="flex items-center gap-2">
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <HelpTooltip content="Your secure password for this election" />
                                    </div>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="Enter your password"
                                        className="w-full"
                                        aria-label="Password"
                                    />
                                    {errors.password && <FieldError>{errors.password}</FieldError>}
                                </Field>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={processing || elections.length === 0}
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-6 text-lg font-semibold shadow-lg"
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="w-5 h-5 mr-2" />
                                            Login to Vote
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </Form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Not a voter yet?{' '}
                            <Link
                                href={voting.index.url()}
                                className="text-green-600 hover:underline font-semibold"
                            >
                                Learn more
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Info Card */}
                <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-xl text-center shadow-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-lg">Secure Voting System</span>
                    </div>
                    <p className="text-sm text-green-700">
                        Your vote is encrypted, anonymous, and secure. Protected by industry-standard security protocols.
                    </p>
                </div>
            </div>
        </div>
    );
}
