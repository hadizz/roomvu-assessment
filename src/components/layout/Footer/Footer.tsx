import React from 'react';
import Link from "next/link";
import Typography from "@/components/Typography/Typography";

const Footer = () => {
    return (
        <footer className='d-flex flex-y-center'>
            <Typography color='link' className='d-inline-block'><Link
                href={'https://twitter.com'}>twitter</Link></Typography>
            <span className='px-4'>•</span>
            <Typography color='link' className='d-inline-block'><Link
                href={'https://github.com/in/hadizare'}>github</Link></Typography>
            <span className='px-4'>•</span>
            <Typography color='link' className='d-inline-block'><Link href={'https://stackoverflow.com'}>stack
                overflow</Link></Typography>
            <Typography color='link' className='d-inline-block' style={{marginLeft: 'auto'}}><Link href={'/'}>rss</Link></Typography>
        </footer>
    );
};

export default Footer;
