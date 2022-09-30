import Image from 'next/future/image';
import React from 'react';

const Avatar = ({
    avatar
}) => {
    return (
        <div className='rounded-full w-1/3 h-1/3 overflow-hidden' title='avatar'>
            <Image src={avatar} alt='avatar' width='100%' height='100%' layout={'raw'}></Image>
        </div>
    );
};

export default Avatar;