// Sacred Geometry SVG Components

interface SacredGeometryProps {
    className?: string;
    opacity?: number;
}

/**
 * Flower of Life pattern
 * Sacred geometry representing creation and universal consciousness
 */
export function FlowerOfLife({ className = '', opacity = 0.1 }: SacredGeometryProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <g stroke="currentColor" strokeWidth="1.5" fill="none">
                {/* Central circle */}
                <circle cx="200" cy="200" r="40" />

                {/* First ring - 6 petals */}
                <circle cx="200" cy="160" r="40" className="text-integration-gold" />
                <circle cx="234.6" cy="180" r="40" className="text-integration-gold" />
                <circle cx="234.6" cy="220" r="40" className="text-integration-gold" />
                <circle cx="200" cy="240" r="40" className="text-integration-gold" />
                <circle cx="165.4" cy="220" r="40" className="text-integration-gold" />
                <circle cx="165.4" cy="180" r="40" className="text-integration-gold" />

                {/* Second ring - 12 petals */}
                <circle cx="200" cy="120" r="40" className="text-integration-sage" />
                <circle cx="234.6" cy="140" r="40" className="text-integration-sage" />
                <circle cx="269.2" cy="160" r="40" className="text-integration-sage" />
                <circle cx="269.2" cy="200" r="40" className="text-integration-sage" />
                <circle cx="269.2" cy="240" r="40" className="text-integration-sage" />
                <circle cx="234.6" cy="260" r="40" className="text-integration-sage" />
                <circle cx="200" cy="280" r="40" className="text-integration-sage" />
                <circle cx="165.4" cy="260" r="40" className="text-integration-sage" />
                <circle cx="130.8" cy="240" r="40" className="text-integration-sage" />
                <circle cx="130.8" cy="200" r="40" className="text-integration-sage" />
                <circle cx="130.8" cy="160" r="40" className="text-integration-sage" />
                <circle cx="165.4" cy="140" r="40" className="text-integration-sage" />
            </g>
        </svg>
    );
}

/**
 * Metatron's Cube pattern
 * Sacred geometry representing the blueprint of creation
 */
export function MetatronsCube({ className = '', opacity = 0.1 }: SacredGeometryProps) {
    const points = [
        [200, 80],   // Top
        [280, 140],  // Top right
        [280, 260],  // Bottom right
        [200, 320],  // Bottom
        [120, 260],  // Bottom left
        [120, 140],  // Top left
    ];

    const center = [200, 200];

    return (
        <svg
            className={className}
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity }}
        >
            <g stroke="currentColor" strokeWidth="1" className="text-integration-gold">
                {/* Outer hexagon */}
                <path d="M 200,80 L 280,140 L 280,260 L 200,320 L 120,260 L 120,140 Z" />

                {/* Inner hexagon */}
                <path d="M 200,140 L 250,170 L 250,230 L 200,260 L 150,230 L 150,170 Z" />

                {/* Connect all points to center */}
                {points.map((point, i) => (
                    <line
                        key={`center-${i}`}
                        x1={center[0]}
                        y1={center[1]}
                        x2={point[0]}
                        y2={point[1]}
                    />
                ))}

                {/* Connect all points to each other */}
                {points.map((point1, i) =>
                    points.slice(i + 1).map((point2, j) => (
                        <line
                            key={`${i}-${j}`}
                            x1={point1[0]}
                            y1={point1[1]}
                            x2={point2[0]}
                            y2={point2[1]}
                            className="text-integration-sage"
                        />
                    ))
                )}

                {/* Circles at each point */}
                {points.map((point, i) => (
                    <circle
                        key={`point-${i}`}
                        cx={point[0]}
                        cy={point[1]}
                        r="8"
                        className="text-integration-gold"
                        fill="currentColor"
                    />
                ))}

                {/* Center circle */}
                <circle cx={center[0]} cy={center[1]} r="10" fill="currentColor" />
            </g>
        </svg>
    );
}

/**
 * Animated Sacred Geometry Background
 */
export function SacredGeometryBackground({ pattern = 'flower' }: { pattern?: 'flower' | 'metatron' }) {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                {pattern === 'flower' ? (
                    <FlowerOfLife className="w-full h-full max-w-4xl max-h-4xl animate-pulse" opacity={0.08} />
                ) : (
                    <MetatronsCube className="w-full h-full max-w-4xl max-h-4xl" opacity={0.06} />
                )}
            </div>

            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-integration-cosmic/5 to-transparent" />
        </div>
    );
}
