export interface Name {
    common: string;
    official: string;
    nativeName?: {
        [languageCode: string]: {
            official: string;
            common: string;
        };
    };
}

export interface Currency {
    name: string;
    symbol: string;
}

export interface Language {
    [languageCode: string]: string;
}

export interface Translations {
    [languageCode: string]: {
        official: string;
        common: string;
    };
}

export interface Demonyms {
    eng: {
        f: string;
        m: string;
    };
    [languageCode: string]: {
        f: string;
        m: string;
    };
}

export interface Country {
    lastClickedTimestamp?: number; // used for analytics
    name: Name;
    tld?: string[];
    cca2: string;
    ccn3?: string;
    cca3: string;
    cioc?: string;
    independent?: boolean;
    status: string;
    unMember: boolean;
    currencies?: {
        [currencyCode: string]: Currency;
    };
    idd: {
        root?: string;
        suffixes?: string[];
    };
    capital?: string[];
    altSpellings: string[];
    region: string;
    subregion?: string;
    languages?: Language;
    translations: Translations;
    latlng: [number, number];
    landlocked: boolean;
    borders?: string[];
    area: number;
    demonyms?: Demonyms;
    flag: string;
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    population: number;
    gini?: {
        [year: string]: number;
    };
    fifa?: string;
    car: {
        signs?: string[];
        side: string;
    };
    timezones: string[];
    continents: string[];
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    coatOfArms?: {
        png?: string;
        svg?: string;
    };
    startOfWeek: string;
    capitalInfo?: {
        latlng?: [number, number];
    };
    postalCode?: {
        format: string;
        regex?: string;
    };
}
