export interface Meta {
    source: string;
    contact: string;
    info: string;
    lastUpdate: Date;
    lastCheckedForUpdate: Date;
}

export interface Delta {
    cases: number;
    deaths: number;
    recovered: number;
    weekIncidence: number;
}

export interface R {
    value: number;
    rValue4Days: RValue4Days;
    rValue7Days: RValue7Days;
    lastUpdate: string;
}

export interface RValue4Days {
    value: number;
    date: string;
}

export interface RValue7Days {
    value: number;
    date: string;
}

export interface Hospitalization {
    cases7Days: number;
    incidence7Days: number;
    date: string;
    lastUpdate: string;
}

export interface Germany {
    cases: number;
    deaths: number;
    recovered: number;
    weekIncidence: number;
    casesPer100k: number;
    casesPerWeek: number;
    delta: Delta;
    r: R;
    hospitalization: Hospitalization;
}

export interface GermanyResponse extends Germany {
    meta: Meta;
}
export interface FetchGermanyResponse {
    data: Germany;
}
