import { Box } from '@chakra-ui/react';
import React from 'react';
import CreateUserForm from './CreateUserForm';
import { metadata } from '../../../layout';

metadata.title = "افزودن کاربر";

const page = () => {
    return (
        <Box px={6} width='100%'>
            <CreateUserForm />
        </Box>
    );
};

export default page;