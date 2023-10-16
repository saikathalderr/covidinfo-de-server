import { Get, Queries, Route } from 'tsoa';

import axios from 'axios';
import config from 'config';
import { handleSort } from '~/utils/sort';

export enum Order {
    ASC = 'asc',
    DESC = 'desc',
}

export enum Sort {
    CASES = 'cases',
    DATE = 'date',
}

export interface Case {
    cases: number;
    date: Date;
}

export interface Meta {
    source: string;
    contact: string;
    info: string;
    lastUpdate: Date;
    lastCheckedForUpdate: Date;
}

export interface CasesResponse {
    data: Case[];
    meta: Meta;
}

export interface CasesQueryParams {
    sort?: Sort;
    order?: Order;
}

export interface FetchCasesResponse {
    cases: Case[];
}

const _rkiApiUrl: string = config.get('RKI.API.LOCAL.URL');
const _casesEndPoint: string = config.get('RKI.API.ENDPOINTS.CASES');
const _casesApiUrl = `${_rkiApiUrl}${_casesEndPoint}`;

@Route('cases')
export default class CasesController {
    @Get('/')
    public async fetchCases(@Queries() queryParams: CasesQueryParams): Promise<FetchCasesResponse> {
        const { sort, order } = queryParams;
        const { data } = await axios.get<CasesResponse>(_casesApiUrl);
        const { data: casesData } = data;
        const cases = casesData.sort(handleSort({ order, sort }));
        return {
            cases,
        };
    }
}
