import React from 'react';
import {IoIosArrowDown} from 'react-icons/io'


const SidebarButton = props => {
    const [isClicked, setClicked] = React.useState(true)

    const handleClick = () => {
        setClicked(!isClicked)
    }

    let toggleButton = isClicked ? 'h-[60px]' : 'h-auto';
    return (
        <ul className={`bg-white bg-opacity-0 mt-1 text-lg text-gray-100 hover:bg-opacity-20 rounded-r-2xl mr-3 pb-2 overflow-hidden ${props.children ? toggleButton : 'h-[60px]' }`} onClick={handleClick}>
        <a className='w-full py-4 font-bold cursor-pointer transition flex-row flex justify-between  pl-12 px-7 items-center' href={null ? null : props.url}>
            {props.title}
            {props.children ? <IoIosArrowDown />  : undefined}
        </a>
        {props.children}
        </ul>
    );
};

export default SidebarButton;