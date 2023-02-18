import React from 'react';
import Link from "next/link";
import Toggle from "@/components/Inputs/Toggle/Toggle";
import Image from "next/image";
import {ReactChildren} from "@/types";
import useDarkMode from "@/hooks/useDarkMode";
import {setIsDarkMode} from "@/store/slices/appConfigSlice";
import {useDispatch} from "react-redux";

interface HeaderProps {
    theme?: 'post' | 'default'
}

const Header: React.FC<HeaderProps> = ({theme = 'default'}) => {
    const dispatch = useDispatch();
    const isDarkMode = useDarkMode();

    const NameWrapper: React.FC<ReactChildren> = ({children}) => theme === 'post' ?
        <h3 className='colorPinkLight'>{children}</h3> : <h1 className='text-extra-bold'>{children}</h1>;

    return (
        <header className='d-flex flex-x-between flex-y-center mb-32'>
            <NameWrapper><Link href={'/'}>Roomvu</Link></NameWrapper>
            <Toggle
                onChange={e => dispatch(setIsDarkMode(e.target.checked))}
                checked={isDarkMode}
                icons={{
                    unchecked: <Image src={'/sun-icon.png'} alt='sun' width={10} height={10}/>,
                    checked: <Image src={'/moon-icon.png'} alt='moon' width={10} height={10}/>
                }}/>
        </header>
    );
};

export default Header;
