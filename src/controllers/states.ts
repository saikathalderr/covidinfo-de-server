import config from 'config';
import axios from 'axios';
import { Get, Queries, Route } from 'tsoa';
import { INVALID_STATE_CODE } from '~/messages/errors';
import { Meta } from './germany';
import { Case } from './cases';

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

const _rkiApiUrl: string = config.get('RKI.API.LOCAL.URL');
const _statesEndPoint: string = config.get('RKI.API.ENDPOINTS.STATES');
const _statesApiUrl = `${_rkiApiUrl}${_statesEndPoint}`;
const _statesCasesHistoryApiUrl: string = _statesApiUrl + '/history/cases';
const _stateCasesHistoryApiUrl: string = _statesApiUrl + '/{{state}}/history/cases';

async function fetchAllStates(): Promise<FetchGermanyAllStatesResponse> {
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

async function fetchAllStatesCasesHistory(): Promise<FetchGermanyAllStatesCasesHistoryResponse> {
    const { data } =
        await axios.get<GermanyAllStateCasesHistoryResponse>(_statesCasesHistoryApiUrl);
    const { data: statesData } = data;
    return {
        data: statesData,
    };
}

async function fetchStateCasesHistory(
    state: GermanyStates,
): Promise<FetchGermanyStateCasesHistoryResponse> {
    const { data } = await axios.get<GermanyStateCasesHistoryResponse>(
        _stateCasesHistoryApiUrl.replace('{{state}}', state),
    );
    const { data: statesData } = data;
    return {
        data: statesData,
    };
}
async function isValidState(state?: GermanyStates): Promise<boolean> {
    return state?.length ? !Object.values(GermanyStates).includes(state as GermanyStates) : false;
}

@Route('germany/states')
export default class GermanyStatesController {
    @Get('/')
    public async fetchStates(
        @Queries() queryParams: GermanyStatesQueryParams,
    ): Promise<FetchGermanyAllStatesResponse | FetchGermanyStateResponse> {
        const { state } = queryParams;

        if (!isValidState(state)) {
            throw new Error(INVALID_STATE_CODE);
        }

        if (!state) {
            return fetchAllStates();
        }
        return fetchState(state);
    }

    @Get('/cases')
    public async fetchStatesCasesHistory(
        @Queries() queryParams: GermanyStatesQueryParams,
    ): Promise<FetchGermanyStateCasesHistoryResponse | FetchGermanyAllStatesCasesHistoryResponse> {
        const { state } = queryParams;

        if (!isValidState(state)) {
            throw new Error(INVALID_STATE_CODE);
        }

        if (!state) {
            return fetchAllStatesCasesHistory();
        }

        return fetchStateCasesHistory(state);
    }
}
