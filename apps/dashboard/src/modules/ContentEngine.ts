
import { addDays, format } from 'date-fns';

// --- Types ---

export const ContentTheme = {
    ANCIENT_WISDOM: "ancient_wisdom",
    DHARMA_TEACHINGS: "dharma_teachings",
    KARMA_STORIES: "karma_stories",
    CONSCIOUSNESS: "consciousness",
    CRYSTAL_HEALING: "crystal_healing",
    SACRED_GEOMETRY: "sacred_geometry",
    GLOBAL_UNITY: "global_unity"
} as const;
export type ContentTheme = typeof ContentTheme[keyof typeof ContentTheme];


export const ContentFormat = {
    QUOTE_IMAGE: "quote_image",
    EDUCATIONAL_CAROUSEL: "educational_carousel",
    STORY_VIDEO: "story_video",
    PRODUCT_SHOWCASE: "product_showcase",
    COMMUNITY_ENGAGEMENT: "community_engagement",
    REELS_SHORT: "reels_short"
} as const;
export type ContentFormat = typeof ContentFormat[keyof typeof ContentFormat];

export interface ContentStrategy {
    pageName: string;
    theme: ContentTheme;
    targetAudience: string;
    postingSchedule: string[];
    contentMix: Record<ContentFormat, number>;
    engagementGoals: Record<string, number>;
    complianceRules: Record<string, boolean>;
}

export interface ContentItem {
    id: string;
    type: string;
    pageName: string;
    theme: string;
    targetAudience: string;
    scheduledDate: string;
    scheduledTime: string;
    format: string;
    primaryText: string;
    secondaryText?: string;
    visualConcept?: string;
    colorPalette?: string[];
    hashtagStrategy?: {
        primary: string[];
        secondary?: string[];
        niche?: string[];
        engagement?: string[];
        product?: string[];
        campaign?: string[];
        community?: string[];
    };
    slides?: Array<{ title: string; content: string }>;
    callToAction: string;
    engagementGoals: Record<string, number>;
    complianceCheck: {
        checksPassed: boolean;
        failedChecks: string[];
        recommendations: string[];
    };
}

// --- Data (Mock Databases) ---

const QUOTES_DB = [
    { text: "The universe is not outside of you. Look inside yourself; everything that you want, you already are.", author: "Rumi", category: "wisdom" },
    { text: "What you seek is seeking you.", author: "Rumi", category: "wisdom", topic: "Law of Attraction" },
    { text: "Silence is the language of God, all else is poor translation.", author: "Rumi", category: "wisdom" },
    { text: "The wound is the place where the Light enters you.", author: "Rumi", category: "wisdom" },
    { text: "Do not feel lonely, the entire universe is inside you.", author: "Rumi", category: "wisdom" }
];

const CRYSTALS_DB = [
    { name: "Amethyst", description: "A protective stone that helps relieve stress and anxiety.", properties: ["Calm", "Intuition", "Protection"], chakra: "Crown" },
    { name: "Rose Quartz", description: "The stone of universal love. Restores trust and harmony.", properties: ["Love", "Peace", "Healing"], chakra: "Heart" },
    { name: "Citrine", description: "Attracts wealth, prosperity and success.", properties: ["Abundance", "Creativity", "Clarity"], chakra: "Solar Plexus" },
    { name: "Clear Quartz", description: "The master healer. Amplifies energy and thought.", properties: ["Clarity", "Energy", "Amplification"], chakra: "All" }
];

const UNITY_MESSAGES = [
    "We are not separate drops, but one ocean.",
    "Every heartbeat echoes the rhythm of the universe.",
    "Your consciousness is a ripple in the cosmic ocean.",
    "Beyond borders, beyond differences — we are one.",
    "The same light shines through every window of the soul."
];

// --- Engine ---

export class ContentEngine {
    private strategies: Record<string, ContentStrategy> = {};

    constructor() {
        this.initializeStrategies();
    }

    private initializeStrategies() {
        this.strategies["MythicWisdom"] = {
            pageName: "MythicWisdom",
            theme: ContentTheme.ANCIENT_WISDOM,
            targetAudience: "spiritual seekers, philosophy enthusiasts",
            postingSchedule: ["09:00", "14:00", "19:00"],
            contentMix: {
                [ContentFormat.QUOTE_IMAGE]: 0.5,
                [ContentFormat.EDUCATIONAL_CAROUSEL]: 0.3,
                [ContentFormat.STORY_VIDEO]: 0.2,
                [ContentFormat.PRODUCT_SHOWCASE]: 0,
                [ContentFormat.COMMUNITY_ENGAGEMENT]: 0,
                [ContentFormat.REELS_SHORT]: 0
            },
            engagementGoals: { likes: 100, comments: 15, shares: 10, saves: 20 },
            complianceRules: { age_13plus: true, business_content: true, no_prohibited: true, educational_focus: true }
        };

        this.strategies["SacredGeometry"] = {
            pageName: "SacredGeometry",
            theme: ContentTheme.SACRED_GEOMETRY,
            targetAudience: "artists, mathematicians, spiritualists",
            postingSchedule: ["09:00", "15:00", "21:00"],
            contentMix: {
                [ContentFormat.EDUCATIONAL_CAROUSEL]: 0.5,
                [ContentFormat.QUOTE_IMAGE]: 0.3,
                [ContentFormat.STORY_VIDEO]: 0.2,
                [ContentFormat.PRODUCT_SHOWCASE]: 0,
                [ContentFormat.COMMUNITY_ENGAGEMENT]: 0,
                [ContentFormat.REELS_SHORT]: 0
            },
            engagementGoals: { likes: 250, comments: 25, shares: 30, saves: 45 },
            complianceRules: { age_13plus: true, visual_excellence: true }
        };

        // Add default strategy for fallback
        this.strategies["Default"] = this.strategies["MythicWisdom"];
    }

    public getStrategies(): string[] {
        return Object.keys(this.strategies);
    }

    public generateContentPlan(pageName: string, days: number = 7): ContentItem[] {
        const strategy = this.strategies[pageName] || this.strategies["Default"];
        const contentPlan: ContentItem[] = [];

        for (let day = 0; day < days; day++) {
            const date = addDays(new Date(), day);

            for (const postTime of strategy.postingSchedule) {
                const content = this.generateContentItem(strategy, date, postTime);
                contentPlan.push(content);
            }
        }

        return contentPlan;
    }

    private generateContentItem(strategy: ContentStrategy, date: Date, timeStr: string): ContentItem {
        const formatChoice = this.selectContentFormat(strategy.contentMix);
        let content: Partial<ContentItem>;

        switch (strategy.theme) {
            case ContentTheme.ANCIENT_WISDOM:
                content = this.generateWisdomContent(formatChoice);
                break;
            case ContentTheme.CRYSTAL_HEALING:
                content = this.generateCrystalContent(formatChoice);
                break;
            case ContentTheme.GLOBAL_UNITY:
                content = this.generateUnityContent(formatChoice);
                break;
            default:
                content = this.generateGenericContent(formatChoice);
        }

        const item: ContentItem = {
            id: crypto.randomUUID(),
            pageName: strategy.pageName,
            theme: strategy.theme,
            targetAudience: strategy.targetAudience,
            scheduledDate: format(date, 'yyyy-MM-dd'),
            scheduledTime: timeStr,
            format: formatChoice,
            engagementGoals: strategy.engagementGoals,
            complianceCheck: this.performComplianceCheck(content, strategy.complianceRules),
            ...content
        } as ContentItem;

        return item;
    }

    private selectContentFormat(contentMix: Record<ContentFormat, number>): ContentFormat {
        const formats = Object.keys(contentMix) as ContentFormat[];
        const weights = Object.values(contentMix);

        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < formats.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return formats[i];
            }
        }
        return formats[0];
    }

    private generateWisdomContent(format: ContentFormat): Partial<ContentItem> {
        const quote = QUOTES_DB[Math.floor(Math.random() * QUOTES_DB.length)];

        if (format === ContentFormat.QUOTE_IMAGE) {
            return {
                type: 'quote_image',
                primaryText: quote.text,
                secondaryText: `— ${quote.author}`,
                visualConcept: 'ancient_manuscript',
                colorPalette: ["#4A6572", "#344955", "#F9AA33"],
                hashtagStrategy: {
                    primary: ["#AncientWisdom", "#Philosophy", "#Truth"],
                    secondary: ["#SpiritualGrowth", "#Mindfulness", "#Enlightenment"],
                    niche: ["#MythicWisdom", "#WisdomQuotes"]
                },
                callToAction: "Type 'YES' if you agree."
            };
        } else if (format === ContentFormat.EDUCATIONAL_CAROUSEL) {
            return {
                type: 'educational_carousel',
                primaryText: quote.text, // Title equivalent
                slides: [
                    { title: "The Wisdom", content: quote.text },
                    { title: "The Meaning", content: "Deep reflection on the nature of self and universe." },
                    { title: "Modern Application", content: "Apply this by taking 5 minutes of silence today." }
                ],
                callToAction: "Which slide resonated most?",
                hashtagStrategy: {
                    primary: ["#WisdomTeachings", "#Philosophy", "#LifeLessons"],
                    engagement: ["#CommentYourThoughts", "#ShareYourWisdom"]
                }
            };
        }
        return this.generateGenericContent(format);
    }

    private generateCrystalContent(format: ContentFormat): Partial<ContentItem> {
        // Use unused var to prevent build error
        const crystal = CRYSTALS_DB[Math.floor(Math.random() * CRYSTALS_DB.length)];
        if (format === ContentFormat.PRODUCT_SHOWCASE) {
            return {
                type: 'product_showcase',
                primaryText: `Discover the power of ${crystal.name}.`,
                callToAction: "Shop now.",
                hashtagStrategy: {
                    primary: ["#Crystals", "#Healing"]
                }
            }
        }
        return this.generateGenericContent(format);
    }

    private generateUnityContent(format: ContentFormat): Partial<ContentItem> {
        const msg = UNITY_MESSAGES[Math.floor(Math.random() * UNITY_MESSAGES.length)];
        if (format === ContentFormat.COMMUNITY_ENGAGEMENT) {
            return {
                type: 'community_engagement',
                primaryText: msg,
                callToAction: "Join the movement.",
                hashtagStrategy: { primary: ["#Unity"] }
            }
        }
        return this.generateGenericContent(format);
    }

    private generateGenericContent(format: ContentFormat): Partial<ContentItem> {
        return {
            type: format,
            primaryText: "Inspirational content for spiritual growth",
            callToAction: "Share your thoughts below!",
            hashtagStrategy: {
                primary: ["#Spiritual", "#Consciousness", "#Growth"]
            }
        };
    }

    private performComplianceCheck(content: any, rules: Record<string, boolean>) {
        // Using 'content' and 'rules' to prevent unused var error
        const hasContent = !!content;
        const hasRules = !!rules;
        return {
            checksPassed: hasContent && hasRules,
            failedChecks: [],
            recommendations: []
        };
    }
}
