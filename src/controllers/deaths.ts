import { Get, Queries, Route } from 'tsoa';

import axios from 'axios';
import config from 'config';
import { handleDeathsSort } from '~/utils/sort';
import {
    DeathsQueryParams,
    DeathsResponse,
    FetchDeathsResponse,
} from '~/interfaces/deaths.interface';

const _rkiApiUrl: string = config.get('RKI.API.URL');
const _deathsEndPoint: string = config.get('RKI.API.ENDPOINTS.DEATHS');
const _deathsApiUrl = `${_rkiApiUrl}${_deathsEndPoint}`;

@Route('germany/deaths')
export default class DeathsController {
    @Get('/')
    public async fetchDeaths(
        @Queries() queryParams: DeathsQueryParams,
    ): Promise<FetchDeathsResponse> {
        const { sort, order } = queryParams;
        const { data } = await axios.get<DeathsResponse>(_deathsApiUrl);
        const { data: deathsData } = data;
        const deaths = deathsData.sort(handleDeathsSort({ order, sort }));
        return {
            data: deaths,
        };
    }
}
