import { createSelector } from 'reselect';
import { getListFromMap } from 'common-utils/ducks';

const getParcelsMap = state => state.parcelsMap;

export const getParcelsList = createSelector(
  getParcelsMap,
  parcelsMap => {
    console.log('---', 'recomputing parcels list all ');
    return getListFromMap(parcelsMap);
  },
);
