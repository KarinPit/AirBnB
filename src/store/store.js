import { createStore, combineReducers } from "redux";

import { systemReducer } from "./reducers/system.reducer";
import { userReducer } from "./reducers/user.reducer";

const rootReducer = combineReducers({
  systemModule: systemReducer,
  userModule: userReducer,
});

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined;

export const store = createStore(rootReducer, middleware);
