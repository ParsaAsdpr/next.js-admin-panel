import React from 'react';
import { IoMdSearch } from 'react-icons/io'

const SearchBox = () => {
    return (
        <div className='relative flex flex-row '>
            <input type='text' placeholder='جستجو...' className='w-full border border-stone-300 rounded-md outline-none px-2 py-2 pl-12 bg-transparent focus:border-[#449BFF]' />
            <button className='p-2 text-white text-xl absolute left-1 bg-teal-500 hover:bg-teal-600 transition rounded-md -translate-y-1/2 top-1/2'>
                <IoMdSearch />
            </button>
        </div>
    );
};

export default SearchBox;