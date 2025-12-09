import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, MapPin, Clock } from 'lucide-react';

const TrackingResult = ({ parcel, onClose }) => {
    if (!parcel) return null;

    const allSteps = [
        { status: 'Pending Approval', icon: Clock }, // Added this as initial state
        { status: 'Order Placed', icon: CheckCircle }, // Assuming this equates to initial creation if different? Let's genericize.
        // Actually, let's stick to the statuses used in data.json: 'Pending Approval', 'In Transit', 'Delivered', 'Review', etc.
        // Let's make a standard flow:
        { status: 'Pending Approval', label: 'Order Placed', icon: CheckCircle },
        { status: 'Picked Up', label: 'Picked Up', icon: Truck },
        { status: 'In Transit', label: 'In Transit', icon: MapPin },
        { status: 'Delivered', label: 'Delivered', icon: CheckCircle },
    ];

    // Determine current step index
    // We map the string status to an index.
    // simple mapping:
    let currentStepIndex = 0;
    const statusLower = parcel.status.toLowerCase();

    if (statusLower.includes('pending')) currentStepIndex = 0;
    else if (statusLower.includes('picked')) currentStepIndex = 1;
    else if (statusLower.includes('transit')) currentStepIndex = 2;
    else if (statusLower.includes('delivered')) currentStepIndex = 3;
    else currentStepIndex = 1; // Default fallback if unknown, maybe 'Express' or something.

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 max-w-lg w-full mx-auto border border-slate-100 dark:border-slate-800"
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tracking Status</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">ID: <span className="font-mono text-primary-600">{parcel.id}</span></p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        From: {parcel.sender} &rarr; To: {parcel.receiver}
                    </p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Close</button>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800" />

                <div className="space-y-8">
                    {allSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex gap-4"
                            >
                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-primary-600 border-primary-600 text-white' : isCurrent ? 'bg-white dark:bg-slate-900 border-primary-600 text-primary-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'}`}>
                                    <Icon size={16} />
                                </div>
                                <div>
                                    <h4 className={`font-semibold ${isCompleted || isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600'}`}>{step.label}</h4>
                                    {isCurrent && (
                                        <p className="text-sm text-primary-600 font-medium mt-1">
                                            Current Status: {parcel.status}
                                        </p>
                                    )}
                                    {isCompleted && index === 0 && (
                                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            <Clock size={14} />
                                            {parcel.date}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Delivery Driver Section */}
            {(statusLower.includes('transit') || statusLower.includes('picked') || statusLower.includes('delivered')) && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800"
                >
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Delivery Partner</h4>
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                        <img
                            src="/delivery_driver_portrait_1765024369341.png"
                            alt="Driver"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                        />
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Rahim Uddin</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <span>⭐ 4.8/5</span> • <span>1200+ Deliveries</span>
                            </p>
                        </div>
                        <div className="ml-auto">
                            <a href="tel:+8801700000000" className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-green-600 shadow-sm border border-slate-100 dark:border-slate-600 hover:bg-green-50 dark:hover:bg-slate-600 transition-colors">
                                <Truck size={14} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default TrackingResult;
