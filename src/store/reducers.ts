import {AnyAction, combineReducers} from '@reduxjs/toolkit';
import appConfigSlice from './slices/appConfigSlice';
import {HYDRATE} from "next-redux-wrapper";

const combined = combineReducers({
    appConfig: appConfigSlice,
});

const rootReducer = (state: ReturnType<typeof combined>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
    } else {
        return combined(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
