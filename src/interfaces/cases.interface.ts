import { Meta } from './germany.interface';

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
