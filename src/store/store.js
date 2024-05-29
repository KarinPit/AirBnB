
import { createStore, combineReducers } from "redux";

import { systemReducer } from "./reducers/system.reducer";
import { userReducer } from "./reducers/user.reducer";
import { stayReducer } from "./reducers/stay.reducer";
import {orderReducer } from "./reducers/order.reducer";

const rootReducer = combineReducers({
  systemModule: systemReducer,
  userModule: userReducer,
  stayModule: stayReducer,
  orderModule: orderReducer,
});

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined;

export const store = createStore(rootReducer, middleware);
