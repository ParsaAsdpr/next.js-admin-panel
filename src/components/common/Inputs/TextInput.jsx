import React from 'react';
import style from '../../../styles/modules/Input.module.css'

const TextInput = ({
    title,
    required,
    placeholder,
    type,
}) => {
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-stone-800 font-semibold'>{title} {required ? <sup className='text-red-500 px-1 text-xl'>*</sup> : null}</h3>
            <input className={` w-full text-stone-800 border border-stone-500 rounded-md py-3 px-3 outline-none focus:shadow-[0_0_7px_#449BFF] focus:border-[#449BFF]`} type={type} placeholder={placeholder} />
        </div>
    );
};

export default TextInput;