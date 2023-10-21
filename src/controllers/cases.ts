import { Get, Queries, Route } from 'tsoa';

import axios from 'axios';
import config from 'config';
import { handleCasesSort } from '~/utils/sort';
import { CasesQueryParams } from '~/interfaces/cases.interface';
import { CasesResponse, FetchCasesResponse } from '~/interfaces/cases.interface';
const _rkiApiUrl: string = config.get('RKI.API.URL');
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
