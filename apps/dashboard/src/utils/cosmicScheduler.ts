// Cosmic Scheduler Utility
// Calculates lunar phases and auspicious timing windows

export interface LunarPhase {
    name: string;
    emoji: string;
    percentage: number;
    isAuspicious: boolean;
}

export interface CosmicWindow {
    start: Date;
    end: Date;
    type: 'lunar' | 'eclipse' | 'transit';
    description: string;
    auspiciousness: 'high' | 'medium' | 'low';
}

/**
 * Calculate current lunar phase
 * Uses simplified algorithm based on synodic month (29.53 days)
 */
export function getCurrentLunarPhase(): LunarPhase {
    const knownNewMoon = new Date('2000-01-06T18:14:00Z'); // Reference new moon
    const synodicMonth = 29.530588853; // Days
    const now = new Date();

    const daysSinceNew = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const currentPhase = (daysSinceNew % synodicMonth) / synodicMonth;

    let phaseName: string;
    let emoji: string;
    let isAuspicious: boolean;

    if (currentPhase < 0.125) {
        phaseName = 'New Moon';
        emoji = '🌑';
        isAuspicious = true;
    } else if (currentPhase < 0.25) {
        phaseName = 'Waxing Crescent';
        emoji = '🌒';
        isAuspicious = true;
    } else if (currentPhase < 0.375) {
        phaseName = 'First Quarter';
        emoji = '🌓';
        isAuspicious = false;
    } else if (currentPhase < 0.5) {
        phaseName = 'Waxing Gibbous';
        emoji = '🌔';
        isAuspicious = true;
    } else if (currentPhase < 0.625) {
        phaseName = 'Full Moon';
        emoji = '🌕';
        isAuspicious = true;
    } else if (currentPhase < 0.75) {
        phaseName = 'Waning Gibbous';
        emoji = '🌖';
        isAuspicious = false;
    } else if (currentPhase < 0.875) {
        phaseName = 'Last Quarter';
        emoji = '🌗';
        isAuspicious = false;
    } else {
        phaseName = 'Waning Crescent';
        emoji = '🌘';
        isAuspicious = false;
    }

    return {
        name: phaseName,
        emoji,
        percentage: currentPhase,
        isAuspicious
    };
}

/**
 * Get next auspicious cosmic windows for content posting
 */
export function getAuspiciousWindows(days: number = 7): CosmicWindow[] {
    const windows: CosmicWindow[] = [];
    const now = new Date();

    // Generate windows based on lunar phases
    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);

        const hour = date.getHours();

        // Morning window (5-7 AM) - High frequency posting
        if (hour >= 5 && hour < 7) {
            windows.push({
                start: new Date(date.setHours(5, 0, 0, 0)),
                end: new Date(date.setHours(7, 0, 0, 0)),
                type: 'lunar',
                description: 'Morning Awakening - High Consciousness Window',
                auspiciousness: 'high'
            });
        }

        // Evening window (6-9 PM) - Contemplation time
        if (hour >= 18 && hour < 21) {
            windows.push({
                start: new Date(date.setHours(18, 0, 0, 0)),
                end: new Date(date.setHours(21, 0, 0, 0)),
                type: 'lunar',
                description: 'Evening Reflection - Integration Window',
                auspiciousness: 'high'
            });
        }
    }

    // Add special lunar windows
    const phase = getCurrentLunarPhase();
    if (phase.isAuspicious) {
        windows.push({
            start: now,
            end: new Date(now.getTime() + 24 * 60 * 60 * 1000),
            type: 'lunar',
            description: `${phase.name} - Amplified Manifestation Period`,
            auspiciousness: 'high'
        });
    }

    return windows.sort((a, b) => a.start.getTime() - b.start.getTime());
}

/**
 * Check if current time is within an auspicious window
 */
export function isAuspiciousNow(): boolean {
    const phase = getCurrentLunarPhase();
    const hour = new Date().getHours();

    // Auspicious lunar phase
    if (phase.isAuspicious) return true;

    // Auspicious hours (sunrise/sunset approximation)
    if ((hour >= 5 && hour < 7) || (hour >= 18 && hour < 21)) return true;

    return false;
}

/**
 * Get cosmic timing recommendation for posting
 */
export function getTimingRecommendation(): {
    shouldPost: boolean;
    reason: string;
    nextWindow?: Date;
} {
    const isAuspicious = isAuspiciousNow();
    const windows = getAuspiciousWindows(1);
    const nextWindow = windows.find(w => w.start > new Date());

    if (isAuspicious) {
        return {
            shouldPost: true,
            reason: 'Current time aligns with cosmic flow - ideal for high-frequency messaging'
        };
    }

    return {
        shouldPost: false,
        reason: 'Low-frequency period - content may not resonate at full potential',
        nextWindow: nextWindow?.start
    };
}
