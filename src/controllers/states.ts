import config from 'config';
import axios from 'axios';
import { Get, Queries, Route } from 'tsoa';
import { INVALID_STATE_CODE } from '~/messages/errors';
import { Meta } from './germany';

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

export interface GermanyStatesQueryParams {
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
export interface FetchAllGermanyStatesResponse {
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

const _rkiApiUrl: string = config.get('RKI.API.LOCAL.URL');
const _statesEndPoint: string = config.get('RKI.API.ENDPOINTS.STATES');
const _statesApiUrl = `${_rkiApiUrl}${_statesEndPoint}`;

async function fetchAllStates(): Promise<FetchAllGermanyStatesResponse> {
    const { data } = await axios.get<GermanyAllStatesResponse>(_statesApiUrl);
    const { data: statesData } = data;
    return {
        data: statesData,
    };
}

async function fetchState(state: GermanyStates): Promise<FetchGermanyStateResponse> {
    const { data } = await axios.get<GermanyStateResponse>(_statesApiUrl);
    const { data: statesData } = data;
    return {
        data: statesData[state],
    };
}

@Route('germany/states')
export default class GermanyStatesController {
    @Get('/')
    public async fetchStates(
        @Queries() queryParams: GermanyStatesQueryParams,
    ): Promise<FetchAllGermanyStatesResponse | FetchGermanyStateResponse> {
        const { state } = queryParams;
        // validate state
        if (state?.length && !Object.values(GermanyStates).includes(state as GermanyStates)) {
            throw new Error(INVALID_STATE_CODE);
        }
        // fetch states data if state is not provided
        // else fetch state data by state code
        if (!state) {
            return fetchAllStates();
        }
        return fetchState(state);
    }
}
