import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30",
        secondary: "bg-slate-800 text-white hover:bg-slate-700",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
