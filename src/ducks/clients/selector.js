import { createSelector } from "reselect";
import { getListFromMap } from "common-utils/ducks";

const getClientsMap = state => state.clientsMap;

export const getClientsList = createSelector(
  getClientsMap,
  clientsMap => {
    console.log("---", "recomputing clients");
    return getListFromMap(clientsMap);
  }
);
