import {orderBy} from 'lodash';

function useOrderBy(arrOfObj, order, sens) {

    return orderBy(arrOfObj, [order], [sens])
}

export default useOrderBy;
