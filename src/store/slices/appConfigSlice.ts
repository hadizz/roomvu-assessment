import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "@/store/reducers";
import {changeTheme} from "@/hooks/useDarkMode";

export interface AppConfigSliceState {
    isDarkMode: boolean;
}

export const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState: {
        isDarkMode: false
    },
    reducers: {
        setIsDarkMode: (state: AppConfigSliceState, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
            changeTheme(action.payload)
        },
    },
})

export const {setIsDarkMode} = appConfigSlice.actions

export const selectAppConfig = (state: RootState): AppConfigSliceState => state.appConfig

export default appConfigSlice.reducer
