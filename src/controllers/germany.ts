import { FetchGermanyResponse, Germany, GermanyResponse } from '~/interfaces/germany.interface';
import { Get, Route } from 'tsoa';

import axios from 'axios';
import config from 'config';

const _rkiApiUrl: string = config.get('RKI.API.URL');
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
            data: germanyInfo,
        };
    }
}
