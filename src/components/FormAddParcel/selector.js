import { createSelector } from "reselect";
import { getListFromMap } from "common-utils/ducks";
import { Record } from "immutable";

const getClientsMap = state => state.clientsMap;

export const getClientsOptionsList = createSelector(
  getClientsMap,
  clientsMap => {
    console.log("---", "recomputing clients options list");
    const clientsList = getListFromMap(clientsMap);
    const optionRecord = Record({
      label: "",
      value: ""
    });
    return clientsList
      .map(function(elem, index, list) {
        return optionRecord({
          label: elem.name,
          value: elem.id
        });
      })
      .insert(
        0,
        optionRecord({
          label: "Выберите клиента",
          value: ""
        })
      );
  }
);
