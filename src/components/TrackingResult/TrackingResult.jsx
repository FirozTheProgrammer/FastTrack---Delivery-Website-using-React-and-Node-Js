import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, MapPin, Clock } from 'lucide-react';

const TrackingResult = ({ trackingId, onClose }) => {
    // Mock data simulation based on ID
    const steps = [
        { status: 'Order Placed', date: 'Oct 24, 10:00 AM', completed: true, icon: CheckCircle },
        { status: 'Picked Up', date: 'Oct 24, 02:30 PM', completed: true, icon: Truck },
        { status: 'In Transit', date: 'Oct 25, 09:15 AM', completed: true, icon: MapPin },
        { status: 'Out for Delivery', date: 'Today, 08:00 AM', completed: false, icon: Truck },
        { status: 'Delivered', date: 'Estimated: Today, 02:00 PM', completed: false, icon: CheckCircle },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full mx-auto border border-slate-100"
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Tracking Status</h3>
                    <p className="text-sm text-slate-500">ID: <span className="font-mono text-primary-600">{trackingId}</span></p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">Close</button>
            </div>

            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />

                <div className="space-y-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = step.completed;
                        const isCurrent = !step.completed && steps[index - 1]?.completed;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex gap-4"
                            >
                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-primary-600 border-primary-600 text-white' : isCurrent ? 'bg-white border-primary-600 text-primary-600' : 'bg-slate-50 border-slate-200 text-slate-300'}`}>
                                    <Icon size={16} />
                                </div>
                                <div>
                                    <h4 className={`font-semibold ${isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>{step.status}</h4>
                                    <p className="text-sm text-slate-500 flex items-center gap-1">
                                        <Clock size={14} />
                                        {step.date}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default TrackingResult;
