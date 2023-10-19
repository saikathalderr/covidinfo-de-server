import config from 'config';
import axios from 'axios';
import { Get, Queries, Route } from 'tsoa';
import { INVALID_STATE_CODE } from '~/messages/errors';
import {
    FetchGermanyAllStatesDeathsHistoryResponse,
    GermanyAllStateDeathsHistoryResponse,
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
    FetchGermanyStateDeathsHistoryResponse,
    GermanyStateDeathsHistoryResponse,
    GermanyStatesCasesQueryParams,
    GermanyStatesDeathsQueryParams,
} from '~/interfaces/states.interface';
import { handleCasesSort, handleDeathsSort } from '~/utils/sort';
import { CasesOrder, CasesSort } from '~/interfaces/cases.interface';
import { DeathsOrder, DeathsSort } from '~/interfaces/deaths.interface';

const _rkiApiUrl: string = config.get('RKI.API.LOCAL.URL');
const _statesEndPoint: string = config.get('RKI.API.ENDPOINTS.STATES');
const _statesApiUrl = `${_rkiApiUrl}${_statesEndPoint}`;
const _statesCasesHistoryApiUrl: string = _statesApiUrl + '/history/cases';
const _stateCasesHistoryApiUrl: string = _statesApiUrl + '/{{state}}/history/cases';
const _statesDeathsHistoryApiUrl: string = _statesApiUrl + '/history/deaths';
const _stateDeathsHistoryApiUrl: string = _statesApiUrl + '/{{state}}/history/deaths';

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

async function fetchAllStatesCasesHistory({
    sort,
    order,
}: {
    sort?: CasesSort;
    order?: CasesOrder;
}): Promise<FetchGermanyAllStatesCasesHistoryResponse> {
    const { data } =
        await axios.get<GermanyAllStateCasesHistoryResponse>(_statesCasesHistoryApiUrl);
    const { data: statesData } = data;
    Object.values(statesData).forEach((entry) => {
        entry.history.sort(handleCasesSort({ sort, order }));
    });
    return {
        data: statesData,
    };
}

async function fetchStateCasesHistory({
    state,
    sort,
    order,
}: {
    state: GermanyStates;
    sort?: CasesSort;
    order?: CasesOrder;
}): Promise<FetchGermanyStateCasesHistoryResponse> {
    const { data } = await axios.get<GermanyStateCasesHistoryResponse>(
        _stateCasesHistoryApiUrl.replace('{{state}}', state),
    );
    const { data: statesData } = data;
    Object.values(statesData).forEach((entry) => {
        entry.history.sort(handleCasesSort({ sort, order }));
    });
    return {
        data: statesData,
    };
}

async function fetchAllStatesDeathsHistory({
    sort,
    order,
}: {
    sort?: DeathsSort;
    order?: DeathsOrder;
}): Promise<FetchGermanyAllStatesDeathsHistoryResponse> {
    const { data } = await axios.get<GermanyAllStateDeathsHistoryResponse>(
        _statesDeathsHistoryApiUrl,
    );
    const { data: statesData } = data;
    Object.values(statesData).forEach((entry) => {
        entry.history.sort(handleDeathsSort({ sort, order }));
    });
    return {
        data: statesData,
    };
}

async function fetchStateDeathsHistory({
    state,
    sort,
    order,
}: {
    state: GermanyStates;
    sort?: DeathsSort;
    order?: DeathsOrder;
}): Promise<FetchGermanyStateDeathsHistoryResponse> {
    const { data } = await axios.get<GermanyStateDeathsHistoryResponse>(
        _stateDeathsHistoryApiUrl.replace('{{state}}', state),
    );
    const { data: statesData } = data;
    Object.values(statesData).forEach((entry) => {
        entry.history.sort(handleDeathsSort({ sort, order }));
    });
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
        @Queries() queryParams: GermanyStatesCasesQueryParams,
    ): Promise<FetchGermanyStateCasesHistoryResponse | FetchGermanyAllStatesCasesHistoryResponse> {
        const { state, sort, order } = queryParams;

        if (!isValidState(state)) {
            throw new Error(INVALID_STATE_CODE);
        }

        if (!state) {
            return fetchAllStatesCasesHistory({ sort, order });
        }

        return fetchStateCasesHistory({ state, sort, order });
    }

    @Get('/deaths')
    public async fetchStatesDeathsHistory(
        @Queries() queryParams: GermanyStatesDeathsQueryParams,
    ): Promise<
        FetchGermanyStateDeathsHistoryResponse | FetchGermanyAllStatesDeathsHistoryResponse
    > {
        const { state, sort, order } = queryParams;

        if (!isValidState(state)) {
            throw new Error(INVALID_STATE_CODE);
        }

        if (!state) {
            return fetchAllStatesDeathsHistory({ sort, order });
        }

        return fetchStateDeathsHistory({ state, sort, order });
    }
}
