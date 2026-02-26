import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { HelpTooltip } from '@/components/voting/help-tooltip';
import voting from '@/routes/voting';
import { Form, Link } from '@inertiajs/react';
import { CircleAlert, CircleCheck, ShieldCheck } from 'lucide-react';

interface Election {
    id: number;
    name: string;
    election_code: string;
}

interface AuthenticatedUser {
    name: string;
    student_id: string;
    email: string;
}

interface LoginPageProps {
    elections: Election[];
    authenticatedUser?: AuthenticatedUser | null;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Login({
    elections,
    authenticatedUser,
    flash,
}: LoginPageProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/10 via-background to-background px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header - Moved Outside Card */}
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

                    <h2 className="text-gradient-primary mb-2 text-3xl font-bold">
                        Voter Login
                    </h2>
                    <p className="text-muted-foreground">
                        Enter your credentials to cast your vote
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-xl border border-border bg-card p-8 shadow-2xl">
                    {/* Display Success Message */}
                    {flash?.success && (
                        <Alert className="mb-6 border-primary/30 bg-primary/10 text-primary">
                            <CircleCheck className="h-4 w-4 text-primary" />
                            <div>{flash.success}</div>
                        </Alert>
                    )}

                    {/* Authenticated User Welcome */}
                    {authenticatedUser && (
                        <Alert className="mb-6 border-primary/30 bg-primary/10 text-primary">
                            <CircleCheck className="h-4 w-4 text-primary" />
                            <div>
                                <p className="font-semibold">
                                    Welcome, {authenticatedUser.name}!
                                </p>
                                <p className="mt-1 text-sm">
                                    You're logged in as{' '}
                                    {authenticatedUser.student_id}. Select an
                                    election and confirm your password to vote.
                                </p>
                            </div>
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
                                            className="w-full rounded-lg border-2 border-input bg-background px-4 py-3 text-foreground transition focus:border-primary focus:ring-2 focus:ring-ring"
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
                                            <div className="rounded-lg border-2 border-primary/30 bg-primary/10 p-3 text-sm font-medium text-foreground">
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

                                {/* School ID Field - Only for non-authenticated users */}
                                {!authenticatedUser ? (
                                    <Field>
                                        <div className="flex items-center gap-2">
                                            <FieldLabel htmlFor="school_id">
                                                School ID
                                            </FieldLabel>
                                            <HelpTooltip content="Your school identification number" />
                                        </div>
                                        <Input
                                            type="text"
                                            id="school_id"
                                            name="school_id"
                                            required
                                            autoFocus
                                            placeholder="Enter your school ID"
                                            className="w-full"
                                            aria-label="School ID"
                                        />
                                        {errors.school_id && (
                                            <FieldError>
                                                {errors.school_id}
                                            </FieldError>
                                        )}
                                    </Field>
                                ) : (
                                    <input
                                        type="hidden"
                                        name="school_id"
                                        value={authenticatedUser.student_id}
                                    />
                                )}

                                {/* Password Field */}
                                <Field>
                                    <div className="flex items-center gap-2">
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <HelpTooltip
                                            content={
                                                authenticatedUser
                                                    ? 'Confirm your account password to proceed'
                                                    : 'Your secure password for this election'
                                            }
                                        />
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
                                    className="w-full bg-linear-to-r from-primary to-primary/80 py-6 text-lg font-semibold shadow-lg hover:from-primary/90 hover:to-primary/70"
                                >
                                    {processing ? (
                                        <>
                                            <Spinner className="mr-2 h-5 w-5 text-primary-foreground" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="mr-2 h-5 w-5" />
                                            Login to Vote
                                        </>
                                    )}
                                </Button>

                                <Alert className="border-primary/30 bg-primary/10 text-primary">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <div>
                                        <h5 className="mb-1 leading-none font-medium tracking-tight">
                                            Secure Voting System
                                        </h5>
                                        <div className="text-sm opacity-90">
                                            Your vote is encrypted, anonymous,
                                            and secure. Protected by
                                            industry-standard security
                                            protocols.
                                        </div>
                                    </div>
                                </Alert>
                            </div>
                        )}
                    </Form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Not a voter yet?{' '}
                            <Link
                                href={voting.index.url()}
                                className="font-semibold text-primary hover:underline"
                            >
                                Learn more
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
