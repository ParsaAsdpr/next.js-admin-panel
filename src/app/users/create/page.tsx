import { Box } from '@chakra-ui/react';
import React from 'react';
import EditForm from './CreateUserForm';
import { metadata } from '../../layout';

metadata.title = "افزودن کاربر";

const page = () => {
    return (
        <Box px={6} width='100%'>
            <EditForm />
        </Box>
    );
};

export default page;