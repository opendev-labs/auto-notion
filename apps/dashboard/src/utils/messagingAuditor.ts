// Sublime Messaging Auditor
// Ensures content follows "Anchor Message Psychology" and "No Drift" SOPs

export interface AuditResult {
    passed: boolean;
    score: number; // 0-100
    violations: string[];
    recommendations: string[];
    frequency: 'high' | 'medium' | 'low';
}

export interface MessageRules {
    minWordCount: number;
    maxWordCount: number;
    requiredThemes: string[];
    prohibitedWords: string[];
    toneRequirements: string[];
}

// Anchor Message Psychology Rules
const ANCHOR_RULES: MessageRules = {
    minWordCount: 10,
    maxWordCount: 280,
    requiredThemes: ['consciousness', 'integration', 'awareness', 'action', 'transformation'],
    prohibitedWords: ['hate', 'fear', 'anger', 'division', 'blame', 'victim'],
    toneRequirements: ['empowering', 'insightful', 'action-oriented']
};

// High-frequency keywords (spiritual alignment)
const HIGH_FREQUENCY_KEYWORDS = [
    'integration', 'consciousness', 'awareness', 'alignment', 'manifestation',
    'transformation', 'realization', 'awakening', 'divine', 'sacred',
    'energy', 'vibration', 'frequency', 'cosmic', 'universal',
    'wisdom', 'insight', 'clarity', 'truth', 'unity'
];

// Low-frequency keywords (to avoid)
const LOW_FREQUENCY_KEYWORDS = [
    'problem', 'crisis', 'failure', 'impossible', 'never',
    'hate', 'fear', 'anger', 'conflict', 'division',
    'blame', 'victim', 'suffer', 'pain', 'loss'
];

/**
 * Audit message content against "No Drift" SOPs
 */
export function auditMessage(content: string): AuditResult {
    const violations: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Word count check
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < ANCHOR_RULES.minWordCount) {
        violations.push(`Message too short (${wordCount} words, minimum ${ANCHOR_RULES.minWordCount})`);
        score -= 15;
    }
    if (wordCount > ANCHOR_RULES.maxWordCount) {
        violations.push(`Message too long (${wordCount} words, maximum ${ANCHOR_RULES.maxWordCount})`);
        score -= 10;
    }

    // Prohibited words check
    const lowerContent = content.toLowerCase();
    const foundProhibited = ANCHOR_RULES.prohibitedWords.filter(word =>
        lowerContent.includes(word)
    );
    if (foundProhibited.length > 0) {
        violations.push(`Contains low-frequency words: ${foundProhibited.join(', ')}`);
        score -= foundProhibited.length * 20;
    }

    // Check for additional low-frequency keywords
    const foundLowFreq = LOW_FREQUENCY_KEYWORDS.filter(word =>
        lowerContent.includes(word) && !foundProhibited.includes(word)
    );
    if (foundLowFreq.length > 0) {
        recommendations.push(`Consider replacing: ${foundLowFreq.join(', ')}`);
        score -= foundLowFreq.length * 5;
    }

    // High-frequency keyword presence
    const foundHighFreq = HIGH_FREQUENCY_KEYWORDS.filter(word =>
        lowerContent.includes(word)
    );
    if (foundHighFreq.length === 0) {
        recommendations.push('Add high-frequency spiritual keywords for amplified resonance');
        score -= 15;
    } else if (foundHighFreq.length >= 3) {
        score += 10; // Bonus for multiple high-frequency keywords
    }

    // Theme check
    const hasTheme = ANCHOR_RULES.requiredThemes.some(theme =>
        lowerContent.includes(theme)
    );
    if (!hasTheme) {
        violations.push('Missing core spiritual theme (consciousness/integration/awareness)');
        score -= 25;
    }

    // Action-oriented check (should contain verbs of transformation)
    const actionVerbs = ['realize', 'integrate', 'transform', 'awaken', 'manifest', 'align', 'embody'];
    const hasAction = actionVerbs.some(verb => lowerContent.includes(verb));
    if (!hasAction) {
        recommendations.push('Add action-oriented language to inspire transformation');
        score -= 10;
    }

    // Determine frequency level
    let frequency: 'high' | 'medium' | 'low';
    if (score >= 80 && foundHighFreq.length >= 2 && foundLowFreq.length === 0) {
        frequency = 'high';
    } else if (score >= 60 && foundLowFreq.length <= 1) {
        frequency = 'medium';
    } else {
        frequency = 'low';
    }

    return {
        passed: score >= 70 && violations.length === 0,
        score: Math.max(0, Math.min(100, score)),
        violations,
        recommendations,
        frequency
    };
}

/**
 * Generate compliance report for content batch
 */
export function generateComplianceReport(messages: string[]): {
    overallCompliance: number;
    passedCount: number;
    failedCount: number;
    averageFrequency: string;
    criticalViolations: string[];
} {
    const results = messages.map(auditMessage);
    const passedCount = results.filter(r => r.passed).length;
    const failedCount = results.length - passedCount;
    const overallCompliance = results.reduce((sum, r) => sum + r.score, 0) / results.length;

    const criticalViolations = results
        .flatMap(r => r.violations)
        .filter((v, i, arr) => arr.indexOf(v) === i); // unique violations

    const frequencyCounts = {
        high: results.filter(r => r.frequency === 'high').length,
        medium: results.filter(r => r.frequency === 'medium').length,
        low: results.filter(r => r.frequency === 'low').length
    };

    let averageFrequency = 'low';
    if (frequencyCounts.high >= messages.length / 2) averageFrequency = 'high';
    else if (frequencyCounts.medium >= messages.length / 3) averageFrequency = 'medium';

    return {
        overallCompliance,
        passedCount,
        failedCount,
        averageFrequency,
        criticalViolations
    };
}

/**
 * Suggest improvements for low-frequency content
 */
export function suggestImprovements(content: string): string[] {
    const audit = auditMessage(content);
    const suggestions: string[] = [];

    if (audit.frequency === 'low') {
        suggestions.push('🔮 Elevate the frequency: Replace problem-focused language with solution-oriented messaging');
        suggestions.push('✨ Add spiritual keywords: Integration, consciousness, alignment, manifestation');
    }

    if (audit.violations.some(v => v.includes('low-frequency'))) {
        suggestions.push('⚡ Remove fear-based words and replace with empowering alternatives');
    }

    if (!content.match(/\b(realize|integrate|transform|awaken)\b/i)) {
        suggestions.push('🎯 Include transformation verbs: realize, integrate, transform, embody');
    }

    if (audit.score < 80) {
        suggestions.push('🌟 Anchor the message: Root content in universal wisdom and actionable insight');
    }

    return suggestions;
}
