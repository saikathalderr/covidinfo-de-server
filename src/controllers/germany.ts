import { Get, Route } from 'tsoa';

import axios from 'axios';
import config from 'config';

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
    germany: Germany;
}
const _rkiApiUrl: string = config.get('RKI.API.LOCAL.URL');
const _germanyApiUrl: string = `${_rkiApiUrl}/germany`;

@Route('germany')
export default class GermanyController {
    @Get('/')
    public async fetchInfo(): Promise<FetchGermanyResponse> {
        const { data } = await axios.get<GermanyResponse>(_germanyApiUrl);
        const germanyInfo: Germany = {
            cases: data.cases,
            deaths: data.deaths,
            recovered: data.recovered,
            weekIncidence: data.weekIncidence,
            casesPer100k: data.casesPer100k,
            casesPerWeek: data.casesPerWeek,
            delta: data.delta,
            r: data.r,
            hospitalization: data.hospitalization,
        };
        return {
            germany: germanyInfo,
        };
    }
}
