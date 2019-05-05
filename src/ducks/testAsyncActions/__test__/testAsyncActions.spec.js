import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import { FAIL, START, SUCCESS } from "../../../constants-common";
import { doAsyncAction, ASYNC_ACTION } from "../index";
import * as utils from "../utils";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Async actions common test", () => {
  it("action success", () => {
    const responseData = [1, 2, 3];
    const expectedActions = [
      { type: ASYNC_ACTION + START },
      { type: ASYNC_ACTION + SUCCESS, data: responseData }
    ];
    const store = mockStore({});

    utils.doAjaxRequest = jest.fn();
    utils.doAjaxRequest.mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          resolve(responseData);
        })
    );

    return store.dispatch(doAsyncAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("action error", () => {
    const error = "Not found";
    const expectedActions = [
      { type: ASYNC_ACTION + START },
      { type: ASYNC_ACTION + FAIL, error }
    ];
    const store = mockStore({});

    utils.doAjaxRequest = jest.fn();
    utils.doAjaxRequest.mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject(error);
        })
    );

    return store.dispatch(doAsyncAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
