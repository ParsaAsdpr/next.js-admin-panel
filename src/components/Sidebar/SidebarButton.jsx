import React from 'react';
import {IoIosArrowDown} from 'react-icons/io'


const SidebarButton = ({
    title,
    children,
    url
}) => {
    const [isClicked, setClicked] = React.useState(false)

    const handleClick = () => {
        setClicked(!isClicked)
    }

    let toggleButton = isClicked ? 'h-auto' : 'h-[60px]';
    return (
        <ul className={`bg-white bg-opacity-0 mt-1 text-lg text-gray-100 hover:bg-opacity-30 rounded-r-2xl mr-3 pb-2 overflow-hidden ${isClicked ? 'bg-opacity-20' : ''} ${children ? toggleButton : 'h-[60px]' }`}>
        <a className='w-full py-4 font-bold cursor-pointer transition flex-row flex justify-between  pl-12 px-7 items-center' href={null ? null : url} onClick={handleClick}>
            {title}
            {children ? <IoIosArrowDown />  : undefined}
        </a>
        {children}
        </ul>
    );
};

export default SidebarButton;