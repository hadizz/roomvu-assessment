import React from 'react';
import Link from "next/link";
import Switch from "@/pages/components/Inputs/Switch/Switch";

interface HeaderProps {
    theme?: 'post' | 'default'
}

const Header: React.FC<HeaderProps> = ({theme = 'default'}) => {
    return (
        <header>
            <h3><Link href={'/'}>Roomvu {theme}</Link></h3>
            <Switch/>
        </header>
    );
};

export default Header;
