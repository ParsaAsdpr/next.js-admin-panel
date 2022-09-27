import React from 'react';

const SidebarSublink = props => {
    return (
        <li className='w-full py-2 pr-12 hover:bg-opacity-[0.15] bg-white bg-opacity-0 cursor-pointer mt-1'>
            <a href={props.url}>{props.title}</a>
        </li>
    );
};

export default SidebarSublink;