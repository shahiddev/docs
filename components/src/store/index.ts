import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import { AppState } from "./state";
import { preferences } from "./reducers/preferences";

export const rootReducer = combineReducers({
    preferences
});

export const configureStore = () => {

    // Deserialize from localStorage.
    const local = localStorage.getItem("pulumi_state");
    const persistedState: Partial<AppState> = local ? JSON.parse(local) : {};

    const store = createStore(
        rootReducer,
        persistedState,
        composeWithDevTools(applyMiddleware(thunk))
    );

    // Serialize to localStorage.
    store.subscribe(() => {
        const state = store.getState();
        localStorage.setItem("pulumi_state", JSON.stringify(state));
    });

    return store;
}
