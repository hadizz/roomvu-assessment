import {Dispatch, SetStateAction, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {addItemToStorage, getItemFromStorage} from "@/util/storage";
import {DATA_THEME, THEME_DARK_KEY, THEME_LIGHT_KEY, THEME_STORAGE_KEY} from "@/constants/theme";

const changeTheme = (matchesDark: boolean) => {
    if (matchesDark) {
        addItemToStorage(THEME_STORAGE_KEY, THEME_DARK_KEY)
        document.documentElement.setAttribute(DATA_THEME, THEME_DARK_KEY);
    } else {
        addItemToStorage(THEME_STORAGE_KEY, THEME_LIGHT_KEY)
        document.documentElement.removeAttribute(DATA_THEME);
    }
};

type DarkModeHookReturnArgs = [isDarkMode: boolean, setIsDarkMode: Dispatch<SetStateAction<boolean>>]

const useDarkMode = (): DarkModeHookReturnArgs => {
    const [isDarkMode, setIsDarkMode] = useState<Readonly<boolean>>(false);

    // handles initializing theme of app
    useLayoutEffect(() => {

        const darkModeItem = getItemFromStorage(THEME_STORAGE_KEY)
        if (darkModeItem) {
            setIsDarkMode(darkModeItem === THEME_DARK_KEY)
            changeTheme(darkModeItem === THEME_DARK_KEY)
        } else {
            const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
            setIsDarkMode(matchMedia.matches)

            const handleOnChangeColorScheme = (event: MediaQueryListEvent) => {
                let matchesDark = event.matches; // if true means it's dark 🌚
                setIsDarkMode(matchesDark)
                changeTheme(matchesDark)
            }

            matchMedia.addEventListener('change', handleOnChangeColorScheme);
            return () => matchMedia.removeEventListener('change', handleOnChangeColorScheme)
        }
    }, [])

    useEffect(() => {
        // listen for changing when click button or system preferences change
        changeTheme(isDarkMode)
    }, [isDarkMode])

    return useMemo<DarkModeHookReturnArgs>(() => ([isDarkMode, setIsDarkMode]), [isDarkMode, setIsDarkMode]);
};

export default useDarkMode;
