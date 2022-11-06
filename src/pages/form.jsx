import React from 'react';
import {TextInput} from '../components/common/Inputs'
import Layout from '../components/Layout';

export default function form() {
    return (
      <Layout title='داشبورد' >
        <div className='px-10 py-5 grid grid-cols-3 gap-10'>
        <TextInput placeholder='نام و نام خانوادگی' title='نلم کامل' type='text' required id='name' />
        <TextInput placeholder='example@domain.com' title='ایمیل' type='email' required id='email' />
        <TextInput placeholder='گذرواژه' title='گذرواژه' type='password' required id='password' />
        </div>
      </Layout>
    );
  }