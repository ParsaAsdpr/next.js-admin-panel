import React from 'react';
import Avatar from '../components/Sidebar/Avatar';
import AvatarImg from '../../public/images/doggo pfp.png'
import {FaUser} from 'react-icons/fa'
import SidebarButton from '../components/Sidebar/SidebarButton';
import SidebarSublink from '../components/Sidebar/SidebarSublink';

import DashboardItems from "../constants/dashboardItems.json"

const Sidebar = () => {
    return (
        <div className='h-screen w-2/12 rounded-tl-3xl bg-gradient-to-b from-teal-600 to-teal-400 py-20'>
            <div className='flex items-center justify-center'>
                <Avatar avatar={AvatarImg} />
            </div>
                <h3 className='text-white font-bold text-2xl mt-3 py-2 text-center'>پارسا اسدپور</h3>
                <p className='flex flex-row justify-center items-center text-white gap-2'><FaUser /> ادمین</p>

                <div className=' mt-5'>
                    <div className='px-5 opacity-20'>
                        <div className='border-t border-white'></div>
                    </div>
                    {DashboardItems.map((item, index) => (
                        <SidebarButton title={item.title} key={index} url={item.url ? item.url : null}>
                            {item.subs ? item.subs.map((sub, index) => (
                              <SidebarSublink title={sub.title} url={sub.url} key={index} />  
                            )) : null}
                            {/* {console.log(item.subs)} */}
                        </SidebarButton>
                    ))}
                </div>
        </div>
    );
};

export default Sidebar;