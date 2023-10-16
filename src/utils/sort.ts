import { Case, Order, Sort } from '~/controllers/cases';

type HandleSortArgs = {
    sort?: Sort;
    order?: Order;
};

type HandleSortFunction = (a: Case, b: Case) => number;

export function handleSort(args: HandleSortArgs): HandleSortFunction {
    return (a: Case, b: Case) => {
        const defaultSort = Sort.CASES;
        const defaultOrder = Order.DESC;

        const { sort = defaultSort, order = defaultOrder } = args;

        if (sort === Sort.CASES) {
            if (order === Order.ASC) {
                return a.cases - b.cases;
            }
            return b.cases - a.cases;
        } else if (sort === Sort.DATE) {
            if (order === Order.ASC) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    };
}
