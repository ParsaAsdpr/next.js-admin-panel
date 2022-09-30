import React from 'react';

const SidebarSublink = ({
    title,
    url
}) => {
    return (
        <li className='w-full py-2 pr-12 hover:bg-opacity-[0.15] text-lg bg-white bg-opacity-0 cursor-pointer mt-1'>
            <a href={url}>{title}</a>
        </li>
    );
};

export default SidebarSublink;