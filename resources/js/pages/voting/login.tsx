import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { HelpTooltip } from '@/components/voting/help-tooltip';
import { SecurityBadge } from '@/components/voting/security-badge';
import voting from '@/routes/voting';
import { Form, Link } from '@inertiajs/react';
import { CircleAlert, CircleCheck, Info, ShieldCheck } from 'lucide-react';

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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-white px-4 py-12 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        {/* Logo */}
                        <div className="mb-6 flex justify-center">
                            <Link href={voting.index.url()}>
                                <img
                                    src="/votesys-logo.png"
                                    alt="VoteSys Logo"
                                    className="h-20 w-auto cursor-pointer transition hover:opacity-80"
                                />
                            </Link>
                        </div>

                        <h2 className="mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent dark:from-green-400 dark:to-emerald-400">
                            Voter Login
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Enter your credentials to cast your vote
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="mb-6 flex justify-center">
                        <SecurityBadge variant="compact" />
                    </div>

                    {/* Display Success Message */}
                    {flash?.success && (
                        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                            <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-500" />
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
                                            <ul className="list-inside list-disc text-sm">
                                                {Object.values(errors).map(
                                                    (error, i) => (
                                                        <li key={i}>{error}</li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </Alert>
                                )}

                                {/* Election Selection */}
                                <Field>
                                    <div className="flex items-center gap-2">
                                        <FieldLabel htmlFor="election_id">
                                            Election
                                        </FieldLabel>
                                        <HelpTooltip content="Select the active election you want to participate in" />
                                    </div>
                                    {elections.length > 1 ? (
                                        <select
                                            id="election_id"
                                            name="election_id"
                                            required
                                            className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-green-600 dark:focus:ring-green-600"
                                            aria-label="Select an election"
                                        >
                                            <option value="">
                                                Select an election
                                            </option>
                                            {elections.map((election) => (
                                                <option
                                                    key={election.id}
                                                    value={election.id}
                                                >
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
                                            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-3 text-sm font-medium text-gray-700 dark:border-green-800 dark:bg-green-950 dark:text-gray-300">
                                                {elections[0].name}
                                            </div>
                                        </>
                                    ) : (
                                        <Alert
                                            variant="destructive"
                                            className="mt-2"
                                        >
                                            <CircleAlert className="h-4 w-4" />
                                            <div className="text-sm">
                                                No active elections available at
                                                this time.
                                            </div>
                                        </Alert>
                                    )}
                                    {errors.election_id && (
                                        <FieldError>
                                            {errors.election_id}
                                        </FieldError>
                                    )}
                                </Field>

                                {/* Voter ID Field */}
                                <Field>
                                    <div className="flex items-center gap-2">
                                        <FieldLabel htmlFor="voters_id">
                                            Voter ID
                                        </FieldLabel>
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
                                    {errors.voters_id && (
                                        <FieldError>
                                            {errors.voters_id}
                                        </FieldError>
                                    )}
                                </Field>

                                {/* Password Field */}
                                <Field>
                                    <div className="flex items-center gap-2">
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
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
                                    {errors.password && (
                                        <FieldError>
                                            {errors.password}
                                        </FieldError>
                                    )}
                                </Field>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={
                                        processing || elections.length === 0
                                    }
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-6 text-lg font-semibold shadow-lg hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600"
                                >
                                    {processing ? (
                                        <>
                                            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="mr-2 h-5 w-5" />
                                            Login to Vote
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </Form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Not a voter yet?{' '}
                            <Link
                                href={voting.index.url()}
                                className="font-semibold text-green-600 hover:underline dark:text-green-400"
                            >
                                Learn more
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Info Card */}
                <div className="mt-6 rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 text-center text-green-800 shadow-lg dark:border-green-800 dark:from-green-950 dark:to-emerald-950 dark:text-green-200">
                    <div className="mb-2 flex items-center justify-center gap-2">
                        <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <span className="text-lg font-bold">
                            Secure Voting System
                        </span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        Your vote is encrypted, anonymous, and secure. Protected
                        by industry-standard security protocols.
                    </p>
                </div>
            </div>
        </div>
    );
}
