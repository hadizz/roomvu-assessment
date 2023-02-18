import {useEffect, useLayoutEffect} from 'react';
import {addItemToStorage, getItemFromStorage} from "@/util/storage";
import {DATA_THEME, THEME_DARK_KEY, THEME_LIGHT_KEY, THEME_STORAGE_KEY} from "@/constants/theme";
import {selectAppConfig, setIsDarkMode} from "@/store/slices/appConfigSlice";
import {useDispatch, useSelector} from 'react-redux'

export const changeTheme = (matchesDark: boolean) => {
    if (matchesDark) {
        addItemToStorage(THEME_STORAGE_KEY, THEME_DARK_KEY)
        document.documentElement.setAttribute(DATA_THEME, THEME_DARK_KEY);
    } else {
        addItemToStorage(THEME_STORAGE_KEY, THEME_LIGHT_KEY)
        document.documentElement.removeAttribute(DATA_THEME);
    }
};

type DarkModeHookReturnType = boolean

const useDarkMode = (): DarkModeHookReturnType => {
    const dispatch = useDispatch();
    // @ts-ignore
    const {isDarkMode} = useSelector(selectAppConfig);

    // handles initializing theme of app
    useLayoutEffect(() => {
        const darkModeItem = getItemFromStorage(THEME_STORAGE_KEY)
        if (darkModeItem) {
            const newTheme = darkModeItem === THEME_DARK_KEY
            if (isDarkMode !== newTheme) {
                dispatch(setIsDarkMode(darkModeItem === THEME_DARK_KEY))
            }
        } else {
            const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
            if (isDarkMode !== matchMedia.matches) {
                dispatch(setIsDarkMode(matchMedia.matches))
            }
        }
    }, [])

    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

        const handleOnChangeColorScheme = (event: MediaQueryListEvent) => {
            let matchesDark = event.matches; // if true means it's dark 🌚
            if (isDarkMode !== matchesDark) {
                dispatch(setIsDarkMode(matchesDark))
            }
        }

        matchMedia.addEventListener('change', handleOnChangeColorScheme);
        return () => matchMedia.removeEventListener('change', handleOnChangeColorScheme)
    }, [isDarkMode])

    return isDarkMode;
};

export default useDarkMode;
