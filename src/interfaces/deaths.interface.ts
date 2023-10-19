import { Meta } from './germany.interface';

export enum DeathsOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export enum DeathsSort {
    DEATHS = 'deaths',
    DATE = 'date',
}

export interface Death {
    deaths: number;
    date: Date;
}

export interface DeathsResponse {
    data: Death[];
    meta: Meta;
}

export interface DeathsQueryParams {
    sort?: DeathsSort;
    order?: DeathsOrder;
}

export interface FetchDeathsResponse {
    data: Death[];
}
