import React from 'react';

const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={`px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${className}`}
            {...props}
        />
    );
};

export default Input;
