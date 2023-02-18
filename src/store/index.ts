import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import rootReducer, {RootState} from "@/store/reducers";
import {createWrapper} from "next-redux-wrapper";

const makeStore = () => configureStore({
    // @ts-ignore
    reducer: rootReducer
})
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
export const nextReduxWrapper = createWrapper<AppStore>(makeStore);
