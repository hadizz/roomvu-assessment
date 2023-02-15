import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer>
            <Link href={'/'}>twitter</Link>
            <span>•</span>
            <Link href={'/'}>github</Link>
            <span>•</span>
            <Link href={'/'}>stack overflow</Link>
            <span>•</span>
            <Link href={'/'}>rss</Link>
        </footer>
    );
};

export default Footer;
