// Loading Fallback Component
// Professional skeleton loader for async components

interface LoadingFallbackProps {
    text?: string;
}

export default function LoadingFallback({ text = 'Loading...' }: LoadingFallbackProps) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
                {/* Animated spinner */}
                <div className="w-12 h-12 mx-auto border-2 border-white/10 border-t-white rounded-full animate-spin" />

                {/* Loading text */}
                <p className="text-sm text-white/60 font-medium animate-pulse">
                    {text}
                </p>
            </div>
        </div>
    );
}
