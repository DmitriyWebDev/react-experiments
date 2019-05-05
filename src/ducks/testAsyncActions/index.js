// side effects, only as applicable
// e.g. thunks, epics, etc
import { doAjaxRequest } from "./utils";
import { FAIL, START, SUCCESS } from "../../constants-common";
export const ASYNC_ACTION = "ASYNC_ACTION";

export function doAsyncAction() {
  return function(dispatch) {
    dispatch({ type: ASYNC_ACTION + START });

    return doAjaxRequest()
      .then(data => {
        dispatch({ type: ASYNC_ACTION + SUCCESS, data });
      })
      .catch(error => {
        dispatch({ type: ASYNC_ACTION + FAIL, error });
      });
  };
}
