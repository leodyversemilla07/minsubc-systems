import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface CarouselProps {
    items: ReactNode[];
    autoplay?: boolean;
    interval?: number;
    className?: string;
}

export default function Carousel({
    items,
    autoplay = true,
    interval = 5000,
    className = '',
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!autoplay || isPaused || isHovered || items.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoplay, isPaused, isHovered, interval, items.length]);

    if (items.length === 0) return null;

    return (
        <div
            className={`group relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Carousel Content */}
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="min-w-full">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows - Only show if more than 1 item */}
            {items.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPrevious}
                        className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white focus:ring-2 focus:ring-[var(--usg-primary)] focus:ring-offset-2 focus:outline-none dark:bg-gray-900/90 dark:hover:bg-gray-900"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNext}
                        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-white focus:ring-2 focus:ring-[var(--usg-primary)] focus:ring-offset-2 focus:outline-none dark:bg-gray-900/90 dark:hover:bg-gray-900"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </>
            )}

            {/* Controls */}
            {items.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-900/90">
                    {/* Dots */}
                    <div className="flex gap-2">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 w-2 rounded-full transition-all focus:ring-2 focus:ring-[var(--usg-primary)] focus:ring-offset-2 focus:outline-none ${
                                    index === currentIndex
                                        ? 'w-6 bg-[var(--usg-primary)]'
                                        : 'bg-gray-400 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={
                                    index === currentIndex ? 'true' : 'false'
                                }
                            />
                        ))}
                    </div>

                    {/* Play/Pause Button */}
                    {autoplay && (
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="rounded-full p-1 text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-[var(--usg-primary)] focus:ring-offset-2 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800"
                            aria-label={
                                isPaused ? 'Play carousel' : 'Pause carousel'
                            }
                        >
                            {isPaused ? (
                                <Play className="h-3 w-3" />
                            ) : (
                                <Pause className="h-3 w-3" />
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
