import { createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  initialState as runtimeInitialState,
  runtimeReducer,
} from "./runtime/reducers";
import { companyReducer, initialState as companyInitialState } from "./company/reducers";

export type AppState = ReturnType<typeof rootReducer>;

const rootReducer: Reducer = combineReducers({
  runtime: runtimeReducer,
  content: combineReducers({
    companies: companyReducer,
  }),
});

export const appInitialState: AppState = {
  runtime: runtimeInitialState,
  content: {
    companies: companyInitialState
  }
};

export default function configureStore(
  initialState: AppState = appInitialState
) {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
