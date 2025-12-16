import React from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Users, Clock } from 'lucide-react';

const Stats = () => {
    const stats = [
        { icon: Package, value: "10000000", label: "Parcels Delivered", display: "10M+" },
        { icon: MapPin, value: "64", label: "Districts Covered", display: "64" },
        { icon: Users, value: "500000", label: "Happy Customers", display: "500k+" },
        { icon: Clock, value: "24", label: "Support Available", display: "24/7" },
    ];

    return (
        <section className="relative pt-20 pb-40 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="stat-card bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-slate-100 dark:border-slate-700"
                        >
                            <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400">
                                <stat.icon size={24} />
                            </div>
                            <div className="text-3xl font-bold mb-2">
                                {stat.display}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;