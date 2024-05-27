import React from 'react';
import { metadata } from '../layout';
import SignupForm from './SignupForm';

metadata.title = "ثبت نام";

const page = () => {
    return (
        <SignupForm />
    );
};

export default page;