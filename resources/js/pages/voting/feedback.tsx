import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Star, CheckCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import voting from '@/routes/voting';

interface Election {
    id: number;
    name: string;
}

interface Props {
    election: Election;
    hasSubmittedFeedback: boolean;
}

export default function Feedback({ election, hasSubmittedFeedback }: Props) {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        rating: 0,
        comment: '',
        experience: '',
        would_recommend: null as boolean | null,
        improvements: [] as string[],
    });

    const improvementOptions = [
        'Easier navigation',
        'Better instructions',
        'Faster loading times',
        'More candidate information',
        'Improved mobile experience',
        'Better accessibility',
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
                currentImprovements.filter((item) => item !== improvement)
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
        <AppLayout>
            <Head title="Feedback" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="w-full max-w-2xl">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">We Value Your Feedback!</CardTitle>
                            <CardDescription>
                                Help us improve the voting experience for {election.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {hasSubmittedFeedback ? (
                                <Alert className="bg-green-50 border-green-200">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <AlertDescription className="text-green-800">
                                        Thank you! You have already submitted feedback for this election.
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Rating */}
                                    <Field>
                                        <FieldLabel>
                                            How would you rate your overall voting experience? <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <div className="flex gap-2 justify-center py-4">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    key={rating}
                                                    type="button"
                                                    onClick={() => handleRatingClick(rating)}
                                                    onMouseEnter={() => setHoveredRating(rating)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`w-10 h-10 ${
                                                            rating <= (hoveredRating || selectedRating)
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {errors.rating && <FieldError>{errors.rating}</FieldError>}
                                    </Field>

                                    {/* Experience */}
                                    <Field>
                                        <FieldLabel>How was your experience?</FieldLabel>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {['excellent', 'good', 'average', 'poor'].map((exp) => (
                                                <Button
                                                    key={exp}
                                                    type="button"
                                                    variant={data.experience === exp ? 'default' : 'outline'}
                                                    onClick={() => handleExperienceClick(exp)}
                                                    className="capitalize"
                                                >
                                                    {exp}
                                                </Button>
                                            ))}
                                        </div>
                                    </Field>

                                    {/* Would Recommend */}
                                    <Field>
                                        <FieldLabel>Would you recommend this voting system?</FieldLabel>
                                        <div className="flex gap-4 justify-center">
                                            <Button
                                                type="button"
                                                variant={data.would_recommend === true ? 'default' : 'outline'}
                                                onClick={() => handleRecommendClick(true)}
                                                className="flex items-center gap-2"
                                            >
                                                <ThumbsUp className="w-4 h-4" />
                                                Yes
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={data.would_recommend === false ? 'default' : 'outline'}
                                                onClick={() => handleRecommendClick(false)}
                                                className="flex items-center gap-2"
                                            >
                                                <ThumbsDown className="w-4 h-4" />
                                                No
                                            </Button>
                                        </div>
                                    </Field>

                                    {/* Improvements */}
                                    <Field>
                                        <FieldLabel>What could we improve? (Select all that apply)</FieldLabel>
                                        <div className="space-y-2">
                                            {improvementOptions.map((improvement) => (
                                                <div key={improvement} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={improvement}
                                                        checked={data.improvements.includes(improvement)}
                                                        onCheckedChange={() =>
                                                            handleImprovementToggle(improvement)
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={improvement}
                                                        className="text-sm cursor-pointer"
                                                    >
                                                        {improvement}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Field>

                                    {/* Comment */}
                                    <Field>
                                        <FieldLabel>Additional comments (optional)</FieldLabel>
                                        <Textarea
                                            value={data.comment}
                                            onChange={(e) => setData('comment', e.target.value)}
                                            placeholder="Share your thoughts..."
                                            rows={4}
                                            maxLength={1000}
                                        />
                                        <div className="text-xs text-gray-500 text-right mt-1">
                                            {data.comment.length}/1000
                                        </div>
                                        {errors.comment && <FieldError>{errors.comment}</FieldError>}
                                    </Field>

                                    {/* Submit Button */}
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.visit(voting.index.url())}
                                        >
                                            Skip
                                        </Button>
                                        <Button type="submit" disabled={processing || data.rating === 0}>
                                            {processing ? 'Submitting...' : 'Submit Feedback'}
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {hasSubmittedFeedback && (
                                <div className="mt-6 text-center">
                                    <Button onClick={() => router.visit(voting.index.url())}>
                                        Return to Home
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
