import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Users, Clock } from 'lucide-react';

const Stats = () => {
    const stats = [
        { icon: Truck, value: "10M+", label: "Parcels Delivered" },
        { icon: MapPin, value: "64", label: "Districts Covered" },
        { icon: Users, value: "500k+", label: "Happy Customers" },
        { icon: Clock, value: "24/7", label: "Support Available" },
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center"
                        >
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-500">
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">{stat.value}</h3>
                            <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
