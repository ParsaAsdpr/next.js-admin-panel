import React from 'react';
import Notification from '../components/Header/Notification';
import SearchBox from '../components/Header/SearchBox';

import notifications from '../constants/notifications.json'

const Header = ({
  title,
}) => {
    return (
        <div className='px-6 py-7 flex flex-row justify-between items-center border-b border-stone-200 w-full mb-4'>

          <div className='flex flex-row'>
            <h1 className='text-5xl text-stone-700 font-bold'>{title}</h1>
          </div>
          <div className='flex flex-row items-center gap-5'>
            <SearchBox />
            <Notification notifications={notifications}/>
          </div>
            
        </div>
    );
};

export default Header;