import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk))
);


