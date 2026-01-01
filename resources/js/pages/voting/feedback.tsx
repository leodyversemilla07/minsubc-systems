import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';
import voting from '@/routes/voting';
import { Head, router, useForm } from '@inertiajs/react';
import {
    BookOpen,
    CheckCircle,
    Eye,
    Navigation,
    Smartphone,
    Star,
    ThumbsDown,
    ThumbsUp,
    Users,
    Zap,
} from 'lucide-react';
import { useState } from 'react';

interface Election {
    id: number;
    name: string;
}

interface Props {
    election: Election;
    hasSubmittedFeedback: boolean;
    feedbackToken?: string;
}

export default function Feedback({
    election,
    hasSubmittedFeedback,
    feedbackToken,
}: Props) {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        rating: 0,
        comment: '',
        experience: '',
        would_recommend: null as boolean | null,
        improvements: [] as string[],
        token: feedbackToken || '',
    });

    const improvementOptions = [
        { label: 'Easier navigation', icon: Navigation },
        { label: 'Better instructions', icon: BookOpen },
        { label: 'Faster loading times', icon: Zap },
        { label: 'More candidate information', icon: Users },
        { label: 'Improved mobile experience', icon: Smartphone },
        { label: 'Better accessibility', icon: Eye },
    ];

    const handleRatingClick = (rating: number) => {
        setSelectedRating(rating);
        setData('rating', rating);
    };

    const handleExperienceClick = (experience: string) => {
        setData('experience', experience);
    };

    const handleRecommendClick = (value: boolean) => {
        setData('would_recommend', value);
    };

    const handleImprovementToggle = (improvement: string) => {
        const currentImprovements = data.improvements;
        if (currentImprovements.includes(improvement)) {
            setData(
                'improvements',
                currentImprovements.filter((item) => item !== improvement),
            );
        } else {
            setData('improvements', [...currentImprovements, improvement]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(voting.feedback.store.url());
    };

    return (
        <>
            <Head title="Feedback" />

            <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-info/5 to-background p-4">
                <div className="w-full max-w-2xl">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">
                                We Value Your Feedback!
                            </CardTitle>
                            <CardDescription>
                                Help us improve the voting experience for{' '}
                                {election.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {hasSubmittedFeedback ? (
                                <Alert className="border-primary/30 bg-primary/10">
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <AlertDescription className="text-primary">
                                        Thank you! You have already submitted
                                        feedback for this election.
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* Rating */}
                                    <Field>
                                        <FieldLabel>
                                            How would you rate your overall
                                            voting experience?{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FieldLabel>
                                        <div className="flex justify-center gap-2 py-4">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    key={rating}
                                                    type="button"
                                                    onClick={() =>
                                                        handleRatingClick(
                                                            rating,
                                                        )
                                                    }
                                                    onMouseEnter={() =>
                                                        setHoveredRating(rating)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredRating(0)
                                                    }
                                                    className="transition-transform hover:scale-110 focus:outline-none"
                                                >
                                                    <Star
                                                        className={`h-10 w-10 ${
                                                            rating <=
                                                            (hoveredRating ||
                                                                selectedRating)
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {errors.rating && (
                                            <FieldError>
                                                {errors.rating}
                                            </FieldError>
                                        )}
                                    </Field>

                                    {/* Experience */}
                                    <Field>
                                        <FieldLabel>
                                            How was your experience?
                                        </FieldLabel>
                                        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                            {[
                                                'excellent',
                                                'good',
                                                'average',
                                                'poor',
                                            ].map((exp) => (
                                                <Button
                                                    key={exp}
                                                    type="button"
                                                    variant={
                                                        data.experience === exp
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    onClick={() =>
                                                        handleExperienceClick(
                                                            exp,
                                                        )
                                                    }
                                                    className="capitalize"
                                                >
                                                    {exp}
                                                </Button>
                                            ))}
                                        </div>
                                    </Field>

                                    {/* Would Recommend */}
                                    <Field>
                                        <FieldLabel>
                                            Would you recommend this voting
                                            system?
                                        </FieldLabel>
                                        <div className="flex justify-center gap-4">
                                            <Button
                                                type="button"
                                                variant={
                                                    data.would_recommend ===
                                                    true
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                onClick={() =>
                                                    handleRecommendClick(true)
                                                }
                                                className="flex items-center gap-2"
                                            >
                                                <ThumbsUp className="h-4 w-4" />
                                                Yes
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={
                                                    data.would_recommend ===
                                                    false
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                onClick={() =>
                                                    handleRecommendClick(false)
                                                }
                                                className="flex items-center gap-2"
                                            >
                                                <ThumbsDown className="h-4 w-4" />
                                                No
                                            </Button>
                                        </div>
                                    </Field>

                                    {/* Improvements */}
                                    <Field>
                                        <FieldLabel>
                                            What could we improve? (Select all
                                            that apply)
                                        </FieldLabel>
                                        <div className="space-y-2">
                                            {improvementOptions.map(
                                                (improvement) => {
                                                    const Icon =
                                                        improvement.icon;
                                                    const isChecked =
                                                        data.improvements.includes(
                                                            improvement.label,
                                                        );

                                                    return (
                                                        <Item
                                                            key={
                                                                improvement.label
                                                            }
                                                            variant="outline"
                                                            className={`cursor-pointer transition-all ${
                                                                isChecked
                                                                    ? 'border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-950'
                                                                    : 'hover:border-gray-400 dark:hover:border-gray-600'
                                                            }`}
                                                            onClick={() =>
                                                                handleImprovementToggle(
                                                                    improvement.label,
                                                                )
                                                            }
                                                        >
                                                            <ItemMedia>
                                                                <div
                                                                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                                                        isChecked
                                                                            ? 'bg-green-100 dark:bg-green-900'
                                                                            : 'bg-gray-100 dark:bg-gray-800'
                                                                    }`}
                                                                >
                                                                    <Icon
                                                                        className={`h-4 w-4 ${
                                                                            isChecked
                                                                                ? 'text-green-600 dark:text-green-400'
                                                                                : 'text-gray-600 dark:text-gray-400'
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </ItemMedia>
                                                            <ItemContent>
                                                                <ItemTitle className="text-gray-900 dark:text-gray-100">
                                                                    {
                                                                        improvement.label
                                                                    }
                                                                </ItemTitle>
                                                            </ItemContent>
                                                            <Checkbox
                                                                checked={
                                                                    isChecked
                                                                }
                                                                onCheckedChange={() =>
                                                                    handleImprovementToggle(
                                                                        improvement.label,
                                                                    )
                                                                }
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                            />
                                                        </Item>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </Field>

                                    {/* Comment */}
                                    <Field>
                                        <FieldLabel>
                                            Additional comments (optional)
                                        </FieldLabel>
                                        <Textarea
                                            value={data.comment}
                                            onChange={(e) =>
                                                setData(
                                                    'comment',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Share your thoughts..."
                                            rows={4}
                                            maxLength={1000}
                                        />
                                        <div className="mt-1 text-right text-xs text-gray-500">
                                            {data.comment.length}/1000
                                        </div>
                                        {errors.comment && (
                                            <FieldError>
                                                {errors.comment}
                                            </FieldError>
                                        )}
                                    </Field>

                                    {/* Submit Button */}
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                router.visit(voting.index.url())
                                            }
                                        >
                                            Skip
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={
                                                processing || data.rating === 0
                                            }
                                        >
                                            {processing
                                                ? 'Submitting...'
                                                : 'Submit Feedback'}
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {hasSubmittedFeedback && (
                                <div className="mt-6 text-center">
                                    <Button
                                        onClick={() =>
                                            router.visit(voting.index.url())
                                        }
                                    >
                                        Return to Home
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
