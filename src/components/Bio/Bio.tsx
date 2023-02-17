import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography/Typography";

const Bio = () => {
    return (
        <div className='d-flex mb-32'>
            <Image className='mr-16 rounded' src={'/avatar.jpeg'} alt='avatar' width={56} height={56}/>
            <div className='d-flex flex-column fontSizeRegular'>
                <Typography fontFamily='secondary'>Personal Blog by <Typography className='d-inline-block' color='link'><Link
                    href={'https://linkedin.com/in/hadizare'}>Hadiz</Link></Typography></Typography>
                <Typography fontFamily='secondary'>I explain with words and code!</Typography>
            </div>
        </div>
    );
};

export default Bio;
