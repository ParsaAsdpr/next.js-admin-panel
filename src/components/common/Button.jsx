import React from 'react';

const Button = ({
    type,
    children,
    large
}) => {
    return (
        <button className={`btn-${type} ${large ? 'text-lg px-8 py-3' : 'text-base px-4 py-2'} text-white rounded-sm`}>
            {children}
        </button>
    );
};

export default Button;