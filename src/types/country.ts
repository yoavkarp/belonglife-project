export interface Country {
    lastClickedTimestamp?: number; // used for analytics
    name: {
        common: string;
        official: string;
    };
    cca3: string;
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
}
