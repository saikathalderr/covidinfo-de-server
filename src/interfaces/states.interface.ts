import { Case, CasesQueryParams } from './cases.interface';
import { Death, DeathsQueryParams } from './deaths.interface';

import { Meta } from './germany.interface';

export enum GermanyStates {
    'Schleswig-Holstein' = 'SH',
    'Hamburg' = 'HH',
    'Niedersachsen' = 'NI',
    'Bremen' = 'HB',
    'Nordrhein-Westfalen' = 'NW',
    'Hessen' = 'HE',
    'Rheinland-Pfalz' = 'RP',
    'Baden-Württemberg' = 'BW',
    'Bayern' = 'BY',
    'Saarland' = 'SL',
    'Berlin' = 'BE',
    'Brandenburg' = 'BB',
    'Mecklenburg-Vorpommern' = 'MV',
    'Sachsen' = 'SN',
    'Sachsen-Anhalt' = 'ST',
    'Thüringen' = 'TH',
}

export interface GermanyStateCasesHistory {
    id: number;
    name: string;
    history: Case[];
}

export interface GermanyStateDeathsHistory {
    id: number;
    name: string;
    history: Death[];
}

export interface GermanyStatesQueryParams {
    state?: GermanyStates;
}

export interface GermanyStatesCasesQueryParams extends CasesQueryParams {
    state?: GermanyStates;
}

export interface GermanyStatesDeathsQueryParams extends DeathsQueryParams {
    state?: GermanyStates;
}
export interface Delta {
    cases: number;
    deaths: number;
    recovered: number;
    weekIncidence: number;
}

export interface Hospitalization {
    cases7Days: number;
    incidence7Days: number;
    date: string;
    lastUpdate: string;
}

export interface GermanyState {
    id: number;
    name: string;
    population: number;
    cases: number;
    deaths: number;
    casesPerWeek: number;
    deathsPerWeek: number;
    recovered: number;
    abbreviation: string;
    weekIncidence: number;
    casesPer100k: number;
    delta: Delta;
    hospitalization: Hospitalization;
}

export interface GermanyAllStatesResponse {
    data: {
        SH: GermanyState;
        HH: GermanyState;
        NI: GermanyState;
        HB: GermanyState;
        NW: GermanyState;
        HE: GermanyState;
        RP: GermanyState;
        BW: GermanyState;
        BY: GermanyState;
        SL: GermanyState;
        BE: GermanyState;
        BB: GermanyState;
        MV: GermanyState;
        SN: GermanyState;
        ST: GermanyState;
        TH: GermanyState;
    };
    meta: Meta;
}
export interface FetchGermanyAllStatesResponse {
    data: {
        SH: GermanyState;
        HH: GermanyState;
        NI: GermanyState;
        HB: GermanyState;
        NW: GermanyState;
        HE: GermanyState;
        RP: GermanyState;
        BW: GermanyState;
        BY: GermanyState;
        SL: GermanyState;
        BE: GermanyState;
        BB: GermanyState;
        MV: GermanyState;
        SN: GermanyState;
        ST: GermanyState;
        TH: GermanyState;
    };
}

export interface GermanyStateResponse {
    data: {
        [state: string]: GermanyState;
    };
    meta: Meta;
}

export interface FetchGermanyStateResponse {
    data: GermanyState;
}

export interface FetchGermanyAllStatesCasesHistoryResponse {
    data: {
        SH: GermanyStateCasesHistory;
        HH: GermanyStateCasesHistory;
        NI: GermanyStateCasesHistory;
        HB: GermanyStateCasesHistory;
        NW: GermanyStateCasesHistory;
        HE: GermanyStateCasesHistory;
        RP: GermanyStateCasesHistory;
        BW: GermanyStateCasesHistory;
        BY: GermanyStateCasesHistory;
        SL: GermanyStateCasesHistory;
        BE: GermanyStateCasesHistory;
        BB: GermanyStateCasesHistory;
        MV: GermanyStateCasesHistory;
        SN: GermanyStateCasesHistory;
        ST: GermanyStateCasesHistory;
        TH: GermanyStateCasesHistory;
    };
}

export interface FetchGermanyStateCasesHistoryResponse {
    data: {
        [state: string]: GermanyStateCasesHistory;
    };
}

export interface GermanyAllStateCasesHistoryResponse
    extends FetchGermanyAllStatesCasesHistoryResponse {
    meta: Meta;
}

export interface GermanyStateCasesHistoryResponse extends FetchGermanyStateCasesHistoryResponse {
    meta: Meta;
}

export interface FetchGermanyAllStatesDeathsHistoryResponse {
    data: {
        SH: GermanyStateDeathsHistory;
        HH: GermanyStateDeathsHistory;
        NI: GermanyStateDeathsHistory;
        HB: GermanyStateDeathsHistory;
        NW: GermanyStateDeathsHistory;
        HE: GermanyStateDeathsHistory;
        RP: GermanyStateDeathsHistory;
        BW: GermanyStateDeathsHistory;
        BY: GermanyStateDeathsHistory;
        SL: GermanyStateDeathsHistory;
        BE: GermanyStateDeathsHistory;
        BB: GermanyStateDeathsHistory;
        MV: GermanyStateDeathsHistory;
        SN: GermanyStateDeathsHistory;
        ST: GermanyStateDeathsHistory;
        TH: GermanyStateDeathsHistory;
    };
}
export interface GermanyAllStateDeathsHistoryResponse
    extends FetchGermanyAllStatesDeathsHistoryResponse {
    meta: Meta;
}

export interface FetchGermanyStateDeathsHistoryResponse {
    data: {
        [state: string]: GermanyStateDeathsHistory;
    };
}

export interface GermanyStateDeathsHistoryResponse extends FetchGermanyStateDeathsHistoryResponse {
    meta: Meta;
}
