import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2";
    const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-primary-600/30',
        secondary: 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10'
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
                ${baseStyles} 
                ${variants[variant]} 
                ${className}
                rounded-full
            `}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
