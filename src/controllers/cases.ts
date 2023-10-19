import { Get, Queries, Route } from 'tsoa';

import axios from 'axios';
import config from 'config';
import { handleCasesSort } from '~/utils/sort';
import { Meta } from './germany';

export enum CasesOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export enum CasesSort {
    CASES = 'cases',
    DATE = 'date',
}

export interface Case {
    cases: number;
    date: Date;
}
export interface CasesResponse {
    data: Case[];
    meta: Meta;
}

export interface CasesQueryParams {
    sort?: CasesSort;
    order?: CasesOrder;
}

export interface FetchCasesResponse {
    data: Case[];
}

const _rkiApiUrl: string = config.get('RKI.API.LOCAL.URL');
const _casesEndPoint: string = config.get('RKI.API.ENDPOINTS.CASES');
const _casesApiUrl = `${_rkiApiUrl}${_casesEndPoint}`;

@Route('germany/cases')
export default class CasesController {
    @Get('/')
    public async fetchCases(@Queries() queryParams: CasesQueryParams): Promise<FetchCasesResponse> {
        const { sort, order } = queryParams;
        const { data } = await axios.get<CasesResponse>(_casesApiUrl);
        const { data: casesData } = data;
        const cases = casesData.sort(handleCasesSort({ order, sort }));
        return {
            data: cases,
        };
    }
}
