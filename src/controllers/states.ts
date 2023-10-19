import config from 'config';
import axios from 'axios';
import { Get, Queries, Route } from 'tsoa';
import { INVALID_STATE_CODE } from '~/messages/errors';
import {
    FetchGermanyAllStatesCasesHistoryResponse,
    FetchGermanyAllStatesResponse,
    FetchGermanyStateCasesHistoryResponse,
    FetchGermanyStateResponse,
    GermanyAllStateCasesHistoryResponse,
    GermanyAllStatesResponse,
    GermanyStateCasesHistoryResponse,
    GermanyStateResponse,
    GermanyStates,
    GermanyStatesQueryParams,
} from '~/interfaces/states.interface';

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
