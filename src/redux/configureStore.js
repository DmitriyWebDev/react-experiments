import thunk from "redux-thunk";
import rootReducer from "./root-reducer";
import randomId from "../middlewares/generateRandomId";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    rootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        randomId
      )
    )
  );

  return store;
}
