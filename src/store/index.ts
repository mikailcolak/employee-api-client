import { createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  initialState as runtimeInitialState,
  runtimeReducer,
} from "./runtime/reducers";
import { companyReducer, initialState as companiesInitialState } from "./company/reducers";
import { employeesReducer, initialState as employeesInitialState } from "./employee/reducers";

export type AppState = ReturnType<typeof rootReducer>;

const rootReducer: Reducer = combineReducers({
  runtime: runtimeReducer,
  content: combineReducers({
    companies: companyReducer,
    employees: employeesReducer,
  }),
});

export const appInitialState: AppState = {
  runtime: runtimeInitialState,
  content: {
    companies: companiesInitialState,
    employees: employeesInitialState
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
