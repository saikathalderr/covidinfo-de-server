import { Case, CasesOrder, CasesSort } from '~/interfaces/cases.interface';
import { Death, DeathsOrder, DeathsSort } from '~/interfaces/deaths.interface';

type HandleCasesSortArgs = {
    sort?: CasesSort;
    order?: CasesOrder;
};

type HandleDeathsSortArgs = {
    sort?: DeathsSort;
    order?: DeathsOrder;
};

type HandleCasesSortFunction = (a: Case, b: Case) => number;
type HandleDeathsSortFunction = (a: Death, b: Death) => number;

export function handleCasesSort(args: HandleCasesSortArgs): HandleCasesSortFunction {
    return (a: Case, b: Case) => {
        const defaultSort = CasesSort.CASES;
        const defaultOrder = CasesOrder.DESC;

        const { sort = defaultSort, order = defaultOrder } = args;

        if (sort === CasesSort.CASES) {
            if (order === CasesOrder.ASC) {
                return a.cases - b.cases;
            }
            return b.cases - a.cases;
        } else if (sort === CasesSort.DATE) {
            if (order === CasesOrder.ASC) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    };
}

export function handleDeathsSort(args: HandleDeathsSortArgs): HandleDeathsSortFunction {
    return (a: Death, b: Death) => {
        const defaultSort = DeathsSort.DEATHS;
        const defaultOrder = DeathsOrder.DESC;

        const { sort = defaultSort, order = defaultOrder } = args;

        if (sort === DeathsSort.DEATHS) {
            if (order === DeathsOrder.ASC) {
                return a.deaths - b.deaths;
            }
            return b.deaths - a.deaths;
        } else if (sort === DeathsSort.DATE) {
            if (order === DeathsOrder.ASC) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    };
}
