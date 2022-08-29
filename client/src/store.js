import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { getFirebase } from "react-redux-firebase";
import ContactReducers from "./store/contact/reducers";
import CompanyReducers from "./store/company/reducers";

const reducers = combineReducers({
  contact: ContactReducers,
  company: CompanyReducers,
});

const initialState = {};

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const middleware = [thunk.withExtraArgument({ getFirebase })];

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
