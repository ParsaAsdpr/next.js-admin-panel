import React from 'react';
import Avatar from '../components/Sidebar/Avatar';
import AvatarImg from '../../public/images/doggo pfp.png'
import {FaUser} from 'react-icons/fa'

const Sidebar = () => {
    return (
        <div className='h-screen w-2/12 rounded-tl-3xl bg-gradient-to-b from-teal-600 to-teal-400 py-20 px-6'>
            <div className='flex items-center justify-center'>
                <Avatar avatar={AvatarImg} />
            </div>
                <h3 className='text-white font-bold text-2xl mt-3 py-2 text-center'>پارسا اسدپور</h3>
                <p className='flex flex-row justify-center items-center text-white gap-2'><FaUser /> ادمین</p>

                <div className='border-t border-white border-opacity-20 mt-5'></div>
        </div>
    );
};

export default Sidebar;