import React from 'react';

const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={`px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${className}`}
            {...props}
        />
    );
};

export default Input;
