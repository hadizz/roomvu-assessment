import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Bio = () => {
    return (
        <div className='d-flex mb-32'>
            <Image className='mr-16 rounded' src={'/avatar.jpeg'} alt='avatar' width={56} height={56}/>
            <div className='d-flex flex-column fontSizeRegular'>
                <p>Personal Blog by <Link className='link' href={'https://linkedin.com/in/hadizare'}>Hadiz</Link></p>
                <p>I explain with words and code!</p>
            </div>
        </div>
    );
};

export default Bio;
